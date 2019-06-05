<template>
  <div class="dashboard-container">
    <div class="table-opts">
      <el-form :inline="true" class="el-form--flex">
        <el-form-item>
          <el-input placeholder="请输入查询名称" v-model="listQuery.nickname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card>
      <el-table @selection-change="handleSelectionChange" :data="list" class="mb20" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="openId" label="openid" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="headimgurl" label="头像" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <img :src="scope.row.headimgurl" style="width:30%">
          </template>
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" show-overflow-tooltip sortable>
        </el-table-column>
        <!-- <el-table-column prop="modelNo" label="充值金额" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="modelNo" label="赠送余额" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="modelNo" label="积分" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="modelNo" label="累计消费" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="modelNo" label="累计签到" show-overflow-tooltip sortable>
        </el-table-column> -->
        <!-- <el-table-column label="操作" show-overflow-tooltip width='180'>
          <template slot-scope="scope">
            <el-button type="text" @click="showEditDialog(scope.row)">详情</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination :current-page="listQuery.page" :page-sizes="[100,200,300,400]" :page-size="listQuery.length" layout="total, sizes, prev, pager, next, jumper" :total="total" >
      </el-pagination>
    </el-card>
    <add-dlacklist :visible.sync="addDlacklistDiload"  @add-data='addData'></add-dlacklist>
    <user-detail-dialogs :visible.sync="userDetailDialog" @add-data='addData'></user-detail-dialogs>
  </div>
</template>
<script>
import AddDlacklist from './components/addDlacklist'
import UserDetailDialogs from './components/userDetailDialogs'


import { customeraccount } from '@/api/zulin'

export default {
  data() {
    return {
     list:[],
     listQuery:{
       length:100,
       page:1,
       nickname:''
     },
     listQuery1:{
       length:10000,
       page:1,
       nickname:''
     },
     total:0,
     addDlacklistDiload:false,
     userDetailDialog:false
    }
  },
  methods: {
    search(){
      this.customeraccount()
    },
    customeraccount(){
      customeraccount(this.listQuery).then(res=>{
        this.list = res.data
      })
    },
     customeraccount1(){
      customeraccount(this.listQuery1).then(res=>{
        this.total = (res.data).length
      })
    },
    addData(data) {
      this.list.push(data)
    },
    handleDeviceCopy(){
      this.addDlacklistDiload = true
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    showEditDialog(data) {
      // this.selectById(data)
    },
    handleSizeChange(val) {
      this.listQuery.length = val
      this.customeraccount()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.customeraccount()
    }
  },
  created() {
    this.customeraccount()
    this.customeraccount1()

  },
  components: {
    AddDlacklist,
    UserDetailDialogs
  }
}
</script>

<style>
.table-img {
  width: 100%;
}
</style>