<template>
  <div class="dashboard-container">
    <el-card>

      <el-table :data="levelList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="加盟商名字" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="manageArea" label="经营区域" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="manageLocation" label="经营地址" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="preCount" label="设备数量" show-overflow-tooltip sortable>
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
        <el-table-column prop="createRegisterNo" label="申请人账号" show-overflow-tooltip sortable>
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
  </div>
</template>

<script>

import {
    franApplyList,   //加盟商申请信息列表
    franApplyPass,   //同意申请
    franApplyRefuse   //拒绝申请

 } from '@/api/zulin'

export default {
  components: {
  },
  data() {
    return {
      levelList: [{
      }],
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
        registerNo: ""
      }
    }
  },
  created() {
    this.franApplyList()
    this.franApplyList1()
  },
  methods: {
    pass(val){
      this.form.name = val.name
      this.form.mobileNo = val.mobileNo
      this.form.adminRegisterNo = val.createRegisterNo
      this.form.manageArea = val.manageArea
      this.form.manageLocation = val.manageLocation
      this.form.id  = val.id
      franApplyPass(this.form).then(res=>{
        if(res.data){
          this.$message({
            message: '您同意了该申请',
            type: 'success'
          })
          this.franApplyList()
        }
      })
    },
    refuse(val){
      franApplyRefuse(val.id).then(res=>{
        if(res.data){
          this.$message({
            message: '您拒绝了该申请',
            type: 'success'
          })
          this.franApplyList()
        }
      })
    },
    franApplyList(){
      franApplyList(this.query).then(res=>{
        this.levelList = res.data
      })
    },
    franApplyList1(){
      franApplyList(this.query1).then(res=>{
        this.total = (res.data).length
      })
    },
    handleSizeChange(val) {
      this.query.length = val
      this.franApplyList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.franApplyList()
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
