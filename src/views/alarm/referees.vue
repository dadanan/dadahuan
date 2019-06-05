<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-input placeholder="请输入查询名称" v-model="query.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <enable-referess :visible.sync="EnableReferess" :data='editingData' @add-data='addData'></enable-referess>
      <editor-referess :visible.sync="EditorReferess" :data='editingData' @update-data='updateData'></editor-referess>


      <el-table :data="levelList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="推荐人" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="franNo" label="加盟商" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="registerNo" label="管理帐号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="totalTxn" label="累计分润(元)" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template>
              {{(scope.row.totalTxn)/100}}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="referrerSum" label="有效推荐" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="头像" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template v-if="scope.row.headImgUrl">
              <img :src="scope.row.headImgUrl" style="width:30%">
            </template>
            <template v-else>
              --
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="detailsDev(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.length" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import EnableReferess from './components/EnableReferees'
import EditorReferess from './components/EditorReferees'

import {
  referrer,     //推荐人列表
  referrerDetail  //推荐人详情
} from '@/api/zulin'




// import { selectList, deleteRule, forbitRule, reverseRule } from '@/api/alarm'

export default {
  components: {
    EnableReferess,
    EditorReferess
  },
  data() {
    return {
      levelList: [{
        name:111
      }],
      value1: '',
      value2: '',
      value3: '',
      EnableReferess:false,
      EditorReferess:false,
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
      selectedDeviceList: []
    }
  },
  methods: {
    search(){
      this.referrer()
    },
    referrer(){
      referrer(this.query).then(res=>{
        this.levelList = res.data
      })
    },
    referrer1(){
      referrer(this.query).then(res=>{
        this.total = (res.data).length
      })
    },
    editorDev(){
      this.EditorReferess = true
    },
    detailsDev(val){
      referrerDetail({registerNo:val.registerNo}).then(res=>{
        this.EnableReferess = true
        this.editingData = res.data
      })
    },
    addData(data) {
      this.selectList()
      // this.levelList.push(data)
    },
    updateData(data) {
      // this.selectList()
    },
    reset(){
      this.query.name = ''
      this.query.status = ''
      this.query.warnLevel = ''
      // this.selectList()
    },
    deleteRule() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      deleteRule({ valueList: this.ids }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.selectedDeviceList = []
          this.ids = []
          // this.selectList()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    reverseRule() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      reverseRule({ valueList: this.ids }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '启用成功!'
          })
          this.selectedDeviceList = []
          this.ids = []          
          // this.selectList()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    forbitRule() {
      // this.DisableDev = true
    },
    handleSizeChange(val) {
      this.query.length = val
      this.referrer()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.referrer()
    },
    editorProcess(data) {
      this.editingData = data
      this.EditorProcess = true
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      // console.log(selection)
    }
  },
  created() {
   this.referrer()
   this.referrer1()
  }
}
</script>
