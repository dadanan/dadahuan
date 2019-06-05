<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="addWechat = true">添加</el-button>
          <el-button type="primary" @click="enableDict">启用</el-button>
          <el-button type="primary" @click ="disableDict">禁用</el-button>
          <el-button type="primary" @click="deleteDict">删除</el-button>
        </el-button-group>
      </div>
      <add-wechat :visible.sync="addWechat"  @add-data='addData'></add-wechat>
      <edit-wechat :visible.sync="editWechat" :data ='editingData'></edit-wechat>
      <enable-wechat :visible.sync="EnableWechat" :data ='editingData'></enable-wechat>
      <disable-wechat :visible.sync="DisableWechat" :data ='editingData'></disable-wechat>

      <deta-wechat :visible.sync="detaWechat" ></deta-wechat>
      <el-table :data="alarmList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <!-- <el-table-column prop="label" label="规则代号" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column prop="franNo" label="加盟商" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="规则名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="description" label="规则描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="amount" label="计费金额" show-overflow-tooltip >
        </el-table-column>
        <!-- <el-table-column prop="isDelete" label="奖励方案" show-overflow-tooltip >
        </el-table-column> -->
        <el-table-column prop="time" label="时间有效期" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="status" label="启用状态" show-overflow-tooltip >
          <template slot-scope="scope">
            <template v-if="scope.row.status == 1">
              启用
            </template>
            <template v-else>
              禁用
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="createUser" label="创建人" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip >
          <template slot-scope="scope">
            <template v-if="scope.row.createTime">
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
            <template v-else>
              --
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="EditWechat(scope.row)">编辑</el-button>
            <!-- <el-button type="text" @click="detaWechat = true">详情</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.length" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import AddWechat from './components/AddWechat'
import EditWechat from './components/EditWechat'
import DetaWechat from './components/DetaWechat'
import EnableWechat from './components/EnableWechat'
import DisableWechat from './components/DisableWechat'


import { 
  productRule,
  prdelete,
  forbit,
  restart
} from '@/api/zulin'


export default {
  components: {
    AddWechat,
    EditWechat,
    DetaWechat,
    EnableWechat,
    DisableWechat
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
      },
      query1:{
        length:10000,
        page:1,
      },
      total:0,
      selectedDeviceList:[],
      ids:[],
      editingData:{}
    }
  },
  methods: {
    addData(data) {
      this.alarmList.push(data)
      this.productRule()
    },
    productRule() {
      productRule(this.query).then(res => {
        this.alarmList = res.data
        // this.total = res.data.totalCount
      })
    },
    productRule1() {
      productRule(this.query1).then(res => {
        this.total = (res.data).length
        // this.total = res.data.totalCount
      })
    },
    productRule() {
      productRule(this.query).then(res => {
        this.alarmList = res.data
        // this.total = res.data.totalCount
      })
    },
    deleteDict() {
      prdelete({idList:this.ids}).then(res => {
        if (res.code === 200) {
          this.productRule()
          this.ids = []
          this.selectedDeviceList = []
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    disableDict() {
      // this.DisableWechat = true
      forbit({idList:this.ids}).then(res=>{
        if (res.code === 200) {
          this.productRule()
          this.ids = []
          this.selectedDeviceList = []
          this.$message({
            type: 'success',
            message: '禁用成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    enableDict() {
      // this.EnableWechat = true
      restart({idList:this.ids}).then(res=>{
        if (res.code === 200) {
          this.productRule()
          this.ids = []
          this.selectedDeviceList = []
          this.$message({
            type: 'success',
            message: '启用成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    handleSizeChange(val) {
      this.query.length = val
      this.productRule()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.productRule()
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      for(var i=0;i<this.selectedDeviceList.length;i++){
        this.ids.push(this.selectedDeviceList[i].id)
      }
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
     this.productRule()
     this.productRule1()
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 360px;
  width: 100%;
}
</style>
