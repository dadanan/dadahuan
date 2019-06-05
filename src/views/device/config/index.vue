<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <!-- <el-button type="primary" icon="el-icon-plus" @click="handleDeviceCopy">复制型号</el-button> -->
          <el-button type="primary" icon="el-icon-plus" @click="addmodel">添加
          </el-button>
        </el-button-group>
      </div>
      <el-table @selection-change="handleSelectionChange" :data="list" v-loading.body="loading" class="mb20" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="型号名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="id" label="型号ID" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="formatNo" label="厂家分类" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template v-if="scope.row.formatNo == '1'">
              米子盾
            </template>
            <template v-if="scope.row.formatNo == '2'">
              环可科技
            </template>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="mdoelNo" label="收费规则" show-overflow-tooltip sortable>
        </el-table-column> -->
        <el-table-column label="型号缩图">
          <template slot-scope="scope">
            <template v-if="scope.row.imgUrl">
              <img :src="scope.row.imgUrl[0]" class="table-img">
            </template>
            <template v-else>
              暂无缩图
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="deviceNum" label="设备数量" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="createUserName" label="创建人" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- {{scope.row.lastUpdateTime}} -->
            {{new Date(scope.row.createTime).toLocaleString()}}
        </template>
        </el-table-column>
        <el-table-column prop="description" label="备注" show-overflow-tooltip sortable>
        </el-table-column>
        <!-- <el-table-column prop="devicePoolCount" label="配额" show-overflow-tooltip sortable>
        </el-table-column> -->
        <!-- <el-table-column prop="createUser" label="修改人" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="createTime" label="修改时间" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            {{scope.row.lastUpdateTime}} -->
        <!-- {{new Date(scope.row.lastUpdateTime).toLocaleString()}} -->
        <!-- </template>
        </el-table-column> -->
        <el-table-column label="操作" show-overflow-tooltip width='180'>
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="createWxDeviceIds(scope.row)">增加配额</el-button> -->
            <el-button type="text" @click="showEditDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteRow(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="listQuery.page" :page-sizes="[100,200,300,400]" :page-size="listQuery.length" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
    <create-config-dialog :visible.sync="createConfigDialogVisible" :deviceModelData="list" @add-data='addData'></create-config-dialog>
    <edit-config-dialog :data='editingData' @update-data='updateData' :deviceModelData="list" :visible.sync="editConfigDialogVisible"></edit-config-dialog>
    <model-copy-dialog :data='editingData' @update-data='updateData' :deviceModelData="list" :visible.sync="modelCopyDialogVisible"></model-copy-dialog>
  </div>
</template>

<script>
import CreateConfigDialog from './components/CreateConfigDialog'
import EditConfigDialog from './components/EditConfigDialog'
import ModelCopyDialog from './components/ModelCopyDialog'

import { 
  deviceModelList,     //查询设备型号配置信息列表
  deletes
} from '@/api/zulin'

export default {
  data() {
    return {
      loading: false,
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        length: 100,
      },
      listQuery1: {
        page: 1,
        length: 10000,
      },
      createConfigDialogVisible: false,
      editConfigDialogVisible: false,
      isClientColumnVisibleDialogVisible: false,
      modelCopyDialogVisible:false,
      clientColumnVisible: {
        name: true,
        type: true,
        publicName: true,
        deviceTypeList: true,
        groupList: true,
        administrator: true,
        intro: true,
        deviceTotal: false,
        orderTotal: false,
        isDashboardEnabled: false,
        isAndroidEnabled: false,
        use: false
      },
      editingData: {},
      selectedDeviceList: [],
      copyVisible: false
    }
  },
  methods: {
    deviceModelAbility() {
      deviceModelList(this.listQuery).then(res => {
        this.list = res.data
      })
    },
    deviceModelAbility1() {
      deviceModelList(this.listQuery1).then(res => {
        this.total = (res.data).length
      })
    },
    deleteRow(val){
      const s = []
      s.push(val)
      this.$confirm('将执行删除操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      deletes({idList:s}).then(res=>{
        if(res.data){
          this.$emit('update:visible', false)
          this.$message({
            message: '型号删除成功！',
            type: 'success'
          })
          this.deviceModelAbility()
        }
      })
      })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    handleDeviceCopy(){
      this.modelCopyDialogVisible = true
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    addData(data) {
      // this.list.push(data)
      this.deviceModelAbility()
    },
    addmodel(){
      this.createConfigDialogVisible = true
    },
    updateData(data) {
      this.list.map(item => {
        if (item.id === data.id) {
          Object.assign(item, data)
        }
      })
    },
    showEditDialog(data) {
      // this.selectById(data.id)
      this.editConfigDialogVisible = true
      this.editingData = data
    },

    selectCount() {
      selectCount(this.listQuery.status).then(res => {
        this.total = res.data
      })
    },
    // selectById(id) {
    //   selectById(id).then(res => {
    //     this.editConfigDialogVisible = true
    //     this.editingData = res.data
    //   })
    // },
    handleSizeChange(val) {
      this.listQuery.length = val
      this.deviceModelAbility1()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.deviceModelAbility1()
    },
  },
  created() {
    this.deviceModelAbility()
    this.deviceModelAbility1()
    // this.selectCount()
  },
  components: {
    CreateConfigDialog,
    EditConfigDialog,
    ModelCopyDialog
  }
}
</script>

<style>
.table-img {
  width: 100%;
}
</style>