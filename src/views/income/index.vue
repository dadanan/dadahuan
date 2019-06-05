<template>
  <div class="dashboard-container">
    <div class="table-opts">
      <el-form :inline="true" class="el-form--flex">
         <el-form-item>
            <el-select placeholder="类型" v-model="vals">
              <el-option label="分润" value="1"></el-option>
              <el-option label="提现" value="0"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card>
      <!-- <add-wechat :visible.sync="addWechat"  @add-data='addData'></add-wechat> -->
      <edit-wechat :visible.sync="editWechat" :data ='editingData'></edit-wechat>
      <!-- <enable-wechat :visible.sync="EnableWechat" :data ='editingData'></enable-wechat>
      <disable-wechat :visible.sync="DisableWechat" :data ='editingData'></disable-wechat> -->

      <!-- <deta-wechat :visible.sync="detaWechat" ></deta-wechat> -->
      <el-table :data="alarmList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="logicTxnSeq" label="流水号" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="name" label="分润角色" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="deviceNo" label="分润设备" show-overflow-tooltip >
        </el-table-column>
        
        <!-- <el-table-column prop="updateTime" label="归属运营商" show-overflow-tooltip >
          <template slot-scope="scope">
            <template>
              {{new Date(scope.row.updateTime).toLocaleString()}}
            </template>
          </template>
        </el-table-column> -->
        <el-table-column prop="orderNo" label="订单号" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="productNo" label="产品No" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="txnAmt" label="分润金额(元)" show-overflow-tooltip>
          <template slot-scope="scope">
            {{(scope.row.txnAmt)/100}}
          </template>
        </el-table-column>
        <el-table-column prop="txnTime" label="分润时间" show-overflow-tooltip >
          <template slot-scope="scope">
            <template>
              {{new Date(scope.row.txnTime).toLocaleString()}}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="txnType" label="分润来源" show-overflow-tooltip >
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.length" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import EditWechat from './components/DisableBill'

import { selectList , deleteDict } from '@/api/rent'
import { disableDict ,enableDict } from '@/api/alarm'
import { 
  profitList  //分润流水列表
 } from '@/api/zulin'



export default {
  components: {
    // AddWechat,
    EditWechat,
    // DetaWechat,
    // EnableWechat,
    // DisableWechat
  },
  data() {
    return {
      alarmList:[],
      addWechat:false,
      editWechat:false,
      detaWechat:false,
      EnableWechat:false,
      DisableWechat:false,
      query:{
        length:100,
        page:1,
        typeList:[]
      },
      query1:{
        length:10000,
        page:1,
      },
      total:0,
      selectedDeviceList:[],
      ids:[],
      editingData:{},
      vals:''
    }
  },
  methods: {
    search(){
      this.query.typeList.push(this.vals)
      this.profitList()
    },
    addData(data) {
      this.alarmList.push(data)
      this.profitList()
    },
    profitList() {
      profitList(this.query).then(res => {
        this.alarmList = res.data
        this.query.typeList = []
      })
    },
    profitList1() {
      profitList(this.query1).then(res => {
        this.total = (res.data).length
      })
    },
    deleteDict() {
      deleteDict({valueList:this.ids}).then(res => {
        if (res.code === 200) {
          this.profitList()
          this.ids = []
          this.selectedDeviceList = []
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$emit('update:visible', false)
          this.$emit('update-data', this.form)
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    disableDict() {
      this.DisableWechat = true
    },
    enableDict() {
      this.EnableWechat = true
    },
    handleSizeChange(val) {
      this.query.length = val
      this.profitList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.profitList()
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      for(var i=0;i<this.selectedDeviceList.length;i++){
        this.ids.push(this.selectedDeviceList[i].id)
      }
      console.log(this.ids)
      // if (this.selectedDeviceList.length) {
      //   this.unassignStatus = this.selectedDeviceList[0].assignStatus
      // }
    },
    EditWechat(data){
      this.editingData = data
      this.editWechat = true
    }

  },
  created () {
     this.profitList()
     this.profitList1()
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 360px;
  width: 100%;
}
</style>
