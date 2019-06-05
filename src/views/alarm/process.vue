<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <!-- <el-form-item>
            <el-select placeholder="区域" v-model="query.linkType">
              <el-option label="上海" value="1"></el-option>
              <el-option label="北京" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="业务分类" v-model="query.warnLevel">
              <el-option label="内部" value="1"></el-option>
              <el-option label="外部" value="2"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-input placeholder="场地名称" v-model="query.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="AddProcess = true">添加</el-button>
          <!-- <el-button type="primary" @click="AddProcess = true">审核</el-button> -->
          <el-button type="primary" @click="enable">启用</el-button>
          <el-button type="primary" @click="disable">禁用</el-button>
          <el-button type="primary" @click="deletes">删除</el-button>
          <!-- <el-button type="primary" @click="isColumnDialogVisible = true">自定义</el-button> -->
        </el-button-group>
      </div>
      <add-process :visible.sync="AddProcess" @add-data='addData'></add-process>
      <details-process :visible.sync="DetailsProcess" :data='editingDatas' @update-data='updateData'></details-process>
      <enable-process :visible.sync="EnableProcess" @add-data='addData'></enable-process>
      <disable-process :visible.sync="DisableProcess" @add-data='addData'></disable-process>

      <editor-process :visible.sync="EditorProcess" :data='editingData' @update-data='updateData'></editor-process>

      <el-table :data="levelList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <!-- <el-table-column label="场地代号" show-overflow-tooltip sortable>
        </el-table-column> -->
        <el-table-column prop="franNo" label="加盟商" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="场地名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="location" label="区域" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="masterRegisterNo" label="负责人" show-overflow-tooltip sortable>
        </el-table-column>
        <!-- <el-table-column label="管理帐号" show-overflow-tooltip sortable>
        </el-table-column> -->
        <el-table-column prop="deviceCount" label="设备数量" show-overflow-tooltip sortable>
          <!-- <template slot-scope="scope">
            <template>
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
          </template> -->
        </el-table-column>
        <el-table-column prop="totleTxn" label="累计营收(元)" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            {{(scope.row.totleTxn)/100}}
          </template>
        </el-table-column>
        <el-table-column prop="enable" label="场所状态" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template v-if="scope.row.enable == 1">
             启用
            </template>
            <template v-else>
             禁用
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="备注信息" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="img" label="场所图片" show-overflow-tooltip sortable>
         <template slot-scope="scope">
            <template v-if="scope.row.img">
              <img :src="(scope.row.img)" style="width:100%;">
            </template>
            <template v-else>
              - -
            </template>
         </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="details(scope.row)">详情</el-button>
            <el-button type="text" @click="editorProcess(scope.row)">编辑</el-button>
            <!-- <el-button type="text" @click="deveProcess(scope.row)">设备</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.length" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import AddProcess from './components/AddProcess'
import EditorProcess from './components/EditorProcess'
import DetailsProcess from './components/DetailsProcess'
import EnableProcess from './components/EnableProcess'
import DisableProcess from './components/DisableProcess'

import {
    ground,   //查询场地配置信息列表
    delet,   //删除场地配置信息
    getGroundInfoDetail,   //查询场地的详细信息
    disableGround,     //场地禁用
    enableGround       //场地启用

 } from '@/api/zulin'

export default {
  components: {
    AddProcess,
    EditorProcess,
    DetailsProcess,
    EnableProcess,
    DisableProcess
  },
  data() {
    return {
      levelList: [],
      value1: '',
      value2: '',
      value3: '',
      AddProcess: false,
      EditorProcess: false,
      DetailsProcess:false,
      DeveProcess:false,
      EnableProcess:false,
      DisableProcess:false,
      editingDatas:{},
      query: {
        length: 100,
        page: 1,
        name:''
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
      ids:[]
    }
  },
  created() {
    this.ground()
    this.ground1()

  },
  methods: {
    deletes(){
      for(var i = 0;i<this.selectedDeviceList.length;i++){
        this.ids.push(this.selectedDeviceList[i].id)
      }
      delet({idList:this.ids}).then(res=>{
        this.selectedDeviceList = []
        if(res.data){
          this.$message({
            message: '删除场地成功！',
            type: 'success'
          })
          this.ground()
        }
      })
    },
    ground(){
      ground(this.query).then(res=>{
        this.levelList = res.data
        for(var i = 0;i<this.levelList.length;i++){
          this.imgLists.push(
            this.levelList[i].imgsList[0]
          )
          this.levelList[i].img = this.imgLists[i]   
        }
      })
    },
     ground1(){
      ground(this.query).then(res=>{
        this.total = (res.data).length
      })
    },
    disable(){

      for(var i = 0;i<this.selectedDeviceList.length;i++){
        this.ids.push(this.selectedDeviceList[i].id)
      }
      disableGround({value:this.ids}).then(res=>{
        if(res.data){
          this.$message({
            message: '禁用场地成功！',
            type: 'success'
          })
          this.ground()
          this.selectedDeviceList = []
          this.ids=[]
        }
      })
    },
    enable(){
      for(var i = 0;i<this.selectedDeviceList.length;i++){
        this.ids.push(this.selectedDeviceList[i].id)
      }
      enableGround({value:this.ids}).then(res=>{
        if(res.data){
          this.$message({
            message: '启用场地成功！',
            type: 'success'
          })
          this.ground()
          this.selectedDeviceList = []
          this.ids=[]
        }
      })
    },
    details(val){
      getGroundInfoDetail(val.id).then(res=>{
        this.editingDatas = res.data
        this.DetailsProcess = true
      })
    },
    deveProcess(){
      this.DeveProcess=true
    },
    addData(data) {
      // this.selectList()
      this.levelList.push(data)
    },
    updateData(data) {
      // this.selectList()
    },
    search(){
      this.ground()
    },
    reset(){
      this.query.name = ''
    },
    handleSizeChange(val) {
      this.query.limit = val
    },
    handleCurrentChange(val) {
      this.query.page = val
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
