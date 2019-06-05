<template>
  <div class="dashboard-container">
    <el-card>
      <!-- <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-input placeholder="消息名称" v-model="query.topic"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div> -->
      <add-message :visible.sync="AddMessage" @add-data='addData'></add-message>
      <edit-message :visible.sync="EditMessage" :data="editMessageData" @add-data='addData'></edit-message>

      <el-table :data="messageList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="序号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="nickname" label="反馈人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="content" label="内容" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template v-if='scope.row.createTime'>
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
            <template v-else>
              - -
            </template>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editMessage(scope.row)">修改</el-button>
            <el-button type="text" @click="sendMessage(scope.row)">发送消息</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import AddMessage from './components/AddMessage'
import EditMessage from './components/EditMessage'

import { feedback} from '@/api/zulin'
export default {
  components: {
    AddMessage,
    EditMessage
  },
  data() {
    return {
      messageList: [],
      AddMessage:false,
      EditMessage:false,
      editMessageData:{},
      activeTab: '1',
      query: {
        length: 100,
        page: 1
      },
      query1: {
        length: 10000,
        page: 1
      },
      total: 0,
      selectedDeviceList:[],
      ids:[]
    }
  },
  methods: {
    addData(){
      this.feedback()
    },
    editMessage(val){
      this.EditMessage = true
      this.editMessageData = val
    },
    reset(){
      this.query.topic ='',
      this.feedback()
    },
    search() {
      feedback(this.query).then(res => {
        this.total = res.data.currentCount
        this.messageList = res.data.userMessageList
      })
    },
    feedback() {
      feedback(this.query).then(res => {
        this.messageList = res.data
      })
    },
    feedback1() {
      feedback(this.query1).then(res => {
        this.total = (res.data).length
      })
    },
    handleSizeChange(val) {
      this.query.length = val
      this.feedback()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.feedback()
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
  },
  created() {
    this.feedback()
    this.feedback1()
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 230px;
  width: 100%;
}
.btn {
  text-align: center;
  color: #646464;
  h2 {
    padding-top: 20px;
    font-size: 50px;
  }
}
</style>
