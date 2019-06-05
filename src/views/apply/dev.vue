<template>
  <div class="dashboard-container">
    <el-card>

      <el-table :data="levelList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange" @row-click="openDetails">
        <el-table-column type="expand">
          <!-- <template slot-scope="scope">
            <el-table v-if='scope.row !== 0' :data=" scope.row " style="width: 100%" class="mb20" border>
              <el-table-column type="index"></el-table-column>
              <el-table-column prop="name" label="从设备名称" show-overflow-tooltip sortable >
              </el-table-column>
            </el-table>
            <el-alert v-else title="该主设备下没有对应从设备！" type="info" center show-icon :closable="false"></el-alert>
          </template> -->
        </el-table-column>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="设备主申请人" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="franNo" label="加盟商" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="buyOrderNo" label="订单编号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="deviceCount" label="设备数量" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="applyStatus" label="申请状态" show-overflow-tooltip sortable>
            <template slot-scope="scope">
                <template v-if="scope.row.applyStatus == 'applying'">
                    申请中
                </template>
                <template v-if="scope.row.applyStatus == 'pass'">
                    已通过
                </template>
                <template v-if="scope.row.applyStatus == 'refuse'">
                    已拒绝
                </template>
            </template>
        </el-table-column>
        <el-table-column prop="referrer1" label="推荐人" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="registerNo" label="申请人账号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <template v-if="scope.row.applyStatus == 'applying'">
                    <el-button type="text" @click="pass(scope.row)">同意</el-button>
                    <el-button type="text" @click="refuse(scope.row)">拒绝</el-button>
                </template>
                <template v-if="scope.row.applyStatus == 'pass'">
                    已通过
                </template>
                <template v-if="scope.row.applyStatus == 'refuse'">
                    已拒绝
                </template>
            
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.length" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
    <el-dialog top='4vh' :close-on-click-modal=false title="申请设备审核" :visible.sync="isCreateUserDialogVisible">
      <el-form label-position="left" label-width="120px">
        <el-form-item label="设置激活时间(天)">
          <el-input v-model="creatingData.time"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isCreateUserDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="validate()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {
    investApplyList,   //设备主申请信息列表
    investApplyPass,   //同意申请
    investApplyRefuse   //拒绝申请

 } from '@/api/zulin'

export default {
  components: {
  },
  data() {
    return {
      isCreateUserDialogVisible:false,
      levelList: [],
      query: {
        length: 100,
        page: 1,
      },
      query1: {
        length: 10000,
        page: 1,
      },
      total: 0,
      editingData: {},
      ids: [],
      selectedDeviceList: [],
      imgLists:[],
      form:{
        description: "",
        endTime: "",
        id: 0,
        imgsList: [],
        investDeviceRentInfos: [],
        location: "",
        mobileNo: "",
        name: "",
        referrer1: "",
        registerNo: "",
      },
      creatingData:{}
    }
  },
  created() {
    this.investApplyList()
    this.investApplyList1()
  },
  methods: {
    openDetails(row){
      console.log(row)
    },
    validate(){
      this.form.enableDays = Number(this.creatingData.time)
       investApplyPass(this.form).then(res=>{
        if(res.data){
          this.isCreateUserDialogVisible = false
          this.$message({
            message: '您同意了该申请',
            type: 'success'
          })
          this.investApplyList()
        }
      })
    },
    pass(val){
      this.isCreateUserDialogVisible = true
      this.form.name = val.name
      this.form.registerNo = val.registerNo
      this.form.mobileNo = val.mobileNo
      this.form.referrer1 = val.referrer1
      this.form.id  = val.id
    },
    refuse(val){
      this.form.name = val.name
      this.form.registerNo = val.registerNo
      this.form.mobileNo = val.mobileNo
      this.form.referrer1 = val.referrer1
      this.form.id  = val.id
      investApplyRefuse(this.form).then(res=>{
        if(res.data){
          this.$message({
            message: '您拒绝了该申请',
            type: 'success'
          })
          this.investApplyList()
        }
      })
    },
    investApplyList(){
      investApplyList(this.query).then(res=>{
        const list = res.data
        for(var i = 0;i<list.length;i++){
          
        }
        this.levelList = res.data
        
      })
    },
    investApplyList1(){
      investApplyList(this.query1).then(res=>{
        this.total = (res.data).length
      })
    },
    handleSizeChange(val) {
      this.query.length = val
      this.investApplyList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.investApplyList()
    },
    editorProcess(data) {
      getGroundInfoDetail(data.id).then(res=>{
        // console.log(11)
        // console.log(res.data)
      this.editingData = res.data
      })
      this.EditorProcess = true
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      // console.log(selection)
    }
  }
}
</script>
