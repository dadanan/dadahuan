<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <!-- <el-form-item>
            <el-input placeholder="输入名称" v-model="query.name"></el-input>
          </el-form-item> -->
          <el-form-item>
           <el-input placeholder="请输入搜索的区域" v-model="query.address"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-select placeholder="业务分类" v-model="query.warnLevel">
              <el-option label="内部" value="1"></el-option>
              <el-option label="外部" value="2"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-input placeholder="请输入搜索的名称" v-model="query.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="AddLevel= true">添加</el-button>
          <!-- <el-button type="primary" @click="AddProcess = true">审核</el-button> -->
          <!-- <el-button type="primary" @click="reverseDeve">启用</el-button>
          <el-button type="primary" @click="forbitRule">禁用</el-button> -->
          <el-button type="primary" @click="deleteRule">删除</el-button>
          <!-- <el-button type="primary" @click="isColumnDialogVisible = true">自定义</el-button> -->
        </el-button-group>
      </div>
      <add-level :visible.sync="AddLevel" @add-data='addData'></add-level>
      <editor-level :visible.sync="EditorLevel" :data='editingData' @update-data='updateData' @add-data='addData'></editor-level>
      <details-dev :visible.sync="DetailsDev" :data='editingData' @update-data='updateData'></details-dev>

      <el-table :data="levelList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="加盟商名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="deviceCount" label="设备数量" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="address" label="加盟区域" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="referrerPercent" label="分润比例" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="updateUser" label="修改人" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新日期" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template v-if="scope.row.updateTime">
              {{new Date(scope.row.updateTime).toLocaleString()}}
            </template>
            <template v-else>
               --
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="detailsDev(scope.row)">详情</el-button> -->
            <el-button type="text" @click="editorDev(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.length" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import AddLevel from './components/AddLevel'
import EditorLevel from './components/EditorLevel'
import DetailsDev from './components/DetailsLevel'

import {
  franList,        //查询加盟商配置信息列表
  franDelete,     //删除加盟商配置信息

 } from '@/api/zulin'

export default {
  components: {
    AddLevel,
    EditorLevel,
    DetailsDev,
  },
  data() {
    return {
      levelList: [],
      value1: '',
      value2: '',
      value3: '',
      AddLevel: false,
      EditorLevel:false,
      DetailsDev:false,
      query: {
        length: 100,
        page: 1
      },
      query1: {
        length: 10000,
        page: 1
      },
      total: 0,
      editingData: {},
      ids: [],
      selectedDeviceList: []
    }
  },
  created() {
    this.franList()
    this.franList1()
  },
  methods: {
    search(){
      this.franList()
    },
    // 设备列表
    franList(){
      franList(this.query).then(res=>{
        this.levelList = res.data
      })
    },
    franList1(){
      franList(this.query1).then(res=>{
        this.total = (res.data).length
      })
    },
    editorDev(val){
      this.editingData = val
      this.EditorLevel = true
    },
    detailsDev(val){
      this.editingData =val
      this.DetailsDev = true
    },
    addData(data) {
      this.franList()
      // this.levelList.push(data)
    },
    updateData(data) {
      this.franList()
    },
    reset(){
      this.query.name = ''
      this.query.address = ''
      // this.franList()
    },
    deleteRule() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      franDelete({ idList: this.ids }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.selectedDeviceList = []
          this.ids = []
          this.franList()
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
      this.DisableDev = true
    },
    handleSizeChange(val) {
      this.query.length = val
      this.franList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.franList()
    },
    editorProcess(data) {
      this.editingData = data
      this.EditorProcess = true
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      // console.log(selection)
    }
  }
}
</script>
