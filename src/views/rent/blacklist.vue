<template>
  <div class="dashboard-container">
    <el-card>
      <add-black-list :visible.sync="addBlackList" @add-data='addData'></add-black-list>
      <edit-black-list :visible.sync="editBlackList" :data='editingData'></edit-black-list>
      <deta-black-list :visible.sync="detaBlackList"></deta-black-list>
      <el-table :data="alarmList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="mdoelNo" label="型号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="型号名称" show-overflow-tooltip sortable>
        </el-table-column> 
        <el-table-column prop="createTime" label="型号缩图" show-overflow-tooltip sortable>
           <template slot-scope="scope">
            <template v-if="scope.row.imgUrl">
              <img :src="scope.row.imgUrl[0]" class="table-img">
            </template>
            <template v-else>
              - -
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格(元)" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="description" label="型号描述" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <template v-if="scope.row.createTime">
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
             <template v-else>
              - -
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="EditBlackList(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.length" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import AddBlackList from './components/AddBlackList'
import EditBlackList from './components/EditBlackList'
import DetaBlackList from './components/DetaBlackList'
import { selectList , deleteDict} from '@/api/rent'
import { disableDict ,enableDict } from '@/api/alarm'
import { 
  deviceModelList
} from '@/api/zulin'


export default {
  components: {
    AddBlackList,
    EditBlackList,
    DetaBlackList
  },
  data() {
    return {
      alarmList: [],
      addBlackList: false,
      editBlackList: false,
      detaBlackList: false,
      query: {
        length: 100,
        page: 1,
      },
      query1: {
        length: 10000,
        page: 1,
      },
      total: 0,
      selectedDeviceList: [],
      ids:[],
      editingData:{}
    }
  },
  methods: {
    addData(data) {
      this.alarmList.push(data)
      this.selectList()
    },
    selectList() {
      deviceModelList(this.query).then(res => {
        this.alarmList = res.data
        // this.total = res.data.totalCount
      })
    },
    selectList1() {
      deviceModelList(this.query1).then(res => {
        this.total = (res.data).length
      })
    },
    deleteDict() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      deleteDict({valueList:this.ids}).then(res => {
        if (res.code === 200) {
          this.selectList()
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
      disableDict({valueList:this.ids}).then(res => {
        if (res.code === 200) {
          this.selectList()
          this.ids = []
          this.selectedDeviceList = []
          this.$message({
            type: 'success',
            message: '禁用成功!'
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
    enableDict() {
      enableDict({valueList:this.ids}).then(res => {
        if (res.code === 200) {
          this.selectList()
          this.ids = []
          this.selectedDeviceList = []
          this.$message({
            type: 'success',
            message: '启用成功!'
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
    handleSizeChange(val) {
      this.query.length = val
      this.selectList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.selectList()
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      for(var i=0;i<this.selectedDeviceList.length;i++){
        this.ids.push(this.selectedDeviceList[i].id)
      }
    },
    EditBlackList(data){
      this.editingData = data
      this.editBlackList = true
    }
  },
  created() {
    this.selectList()
    this.selectList1()
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 360px;
  width: 100%;
}
.table-img {
  width: 100%;
}
</style>
