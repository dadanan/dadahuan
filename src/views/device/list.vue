<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-input placeholder="请输入搜索ID" v-model="query.id"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入搜索型号" v-model="query.modelName"></el-input>
          </el-form-item>
         <el-form-item>
            <el-input placeholder="请输入搜索场地" v-model="query.groundName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入搜索MAC" v-model="query.deviceNo"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="list">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="deviceImportDialogVisible = true">导入</el-button>
          <el-button type="primary" @click="deviceAddDialogVisible = true">添加</el-button>
          <el-button type="primary" @click="handleDeviceDisable">激活</el-button>
          <el-button type="primary" @click='handleDeviceRecover'>分配</el-button>
          <el-button type="primary" @click="handleDeviceFree">取消激活</el-button>
          <el-button type="primary" @click="deleteOneDeviceHandler">删除</el-button>
          <!-- <el-button type="primary" @click="deviceExportDialogVisible = true">导出</el-button> -->
          <!-- <el-button type="primary" @click="deviceColumnControlDialogVisible = true">自定义</el-button> -->
        </el-button-group>
      </div>
      <el-table :data="computeDeviceList" style="width: 100%" @selection-change="handleSelectionChange" class="mb20" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="设备编号" show-overflow-tooltip sortable v-if="deviceColumnVisible.id">
        </el-table-column>
        <el-table-column prop="franNo" label="加盟商" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="设备名称" show-overflow-tooltip sortable v-if="deviceColumnVisible.name">
        </el-table-column>
        <el-table-column prop="modelName" label="设备型号" show-overflow-tooltip v-if="deviceColumnVisible.mac">
        </el-table-column>
        <el-table-column prop="groundName" label="设备场所" show-overflow-tooltip sortable v-if="deviceColumnVisible.customerName">
        </el-table-column>
        <el-table-column prop="deviceNo" label="设备mac" show-overflow-tooltip sortable v-if="deviceColumnVisible.customerName">
        </el-table-column>
        <el-table-column prop="isActive" label="激活状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.customerName">
          <template slot-scope="scope">
            <template v-if="scope.row.isActive == 1">
              已激活
            </template>
            <template v-else>
              未激活
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="onlineStatus" label="在线状态" show-overflow-tooltip >
          <template slot-scope="scope">
            <template v-if="scope.row.onlineStatus == 1">
              在线
            </template>
            <template v-else>
              离线
            </template>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="warningStatus" label="告警状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.groupName">
        </el-table-column> -->
        <el-table-column prop="workStatus" label="工作状态" show-overflow-tooltip >
          <template slot-scope="scope">
            <template v-if="scope.row.workStatus == 1">
              正在使用
            </template>
            <template v-else>
              待机状态
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="investName" label="投资人" show-overflow-tooltip v-if="deviceColumnVisible.powerStatus">
        </el-table-column>
        <el-table-column prop="modelName" label="本日营收" show-overflow-tooltip sortable v-if="deviceColumnVisible.modelName">
        </el-table-column>
        <el-table-column prop="modelCode" label="累计营收" show-overflow-tooltip v-if="deviceColumnVisible.modelCode">
        </el-table-column>
         <el-table-column prop="userName" label="激活状态" show-overflow-tooltip v-if="deviceColumnVisible.userName">
        </el-table-column>
        <el-table-column label="最后上线时间" show-overflow-tooltip v-if="deviceColumnVisible.birthTime">
          <template slot-scope="scope">
           <template v-if='scope.row.createTime'>
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
            <template v-else>
              - -
            </template>
          </template>
        </el-table-column>
        <el-table-column label="激活人" show-overflow-tooltip v-if="deviceColumnVisible.lastOnlineTime">
        </el-table-column>
        <el-table-column prop="createUser" label="所在区域" show-overflow-tooltip sortable v-if="deviceColumnVisible.createUser">
        </el-table-column>
        <el-table-column prop="ewm" label="二维码" show-overflow-tooltip width="200px" align="center">
          <template slot-scope="scope">
            <vue-qrcode :value="scope.row.ewm" :options="{ width: 150 }"></vue-qrcode>
          </template>
        </el-table-column>
        <el-table-column prop="manageName" label="IMEI" show-overflow-tooltip v-if="deviceColumnVisible.manageName">
        </el-table-column>
        <el-table-column prop="manageName" label="MAC" show-overflow-tooltip v-if="deviceColumnVisible.MAC">
        </el-table-column>
        <el-table-column prop="description" label="备注信息" show-overflow-tooltip v-if="deviceColumnVisible.information">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="showDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100,200,300,400]" :page-size="query.length" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
    <device-import-dialog :visible.sync="deviceImportDialogVisible" @add-data='addData'></device-import-dialog>
    <device-add-dialog @add-data='addData' :visible.sync="deviceAddDialogVisible"></device-add-dialog>
    <!-- <device-allocate-dialog :visible.sync="deviceAllocateDialogVisible" :device-list="selectedDeviceList"></device-allocate-dialog> -->
    <!-- <device-delete-dialog :visible.sync="deviceDeleteDialogVisible" :device-list="selectedDeviceList"></device-delete-dialog> -->
    <device-recover-dialog :visible.sync="deviceRecoverDialogVisible" :device-list="selectedDeviceList"></device-recover-dialog>
    <device-free-dialog :visible.sync="deviceFreeDialogVisible" :device-list="selectedDeviceList"></device-free-dialog>
    <device-disable-dialog :visible.sync="deviceDisableDialogVisible" :device-list="selectedDeviceList"></device-disable-dialog>
    <!-- <device-able-dialog :visible.sync="deviceAbleDialogVisible" :device-list="selectedDeviceList"></device-able-dialog> -->
    <!-- <device-cluster-dialog :visible.sync="deviceClusterDialogVisible" :device-list="selectedDeviceList"></device-cluster-dialog> -->
    <!-- <device-cluster-control-dialog :visible.sync="deviceClusterControlDialogVisible"></device-cluster-control-dialog> -->
    <!-- <device-bind-dialog :visible.sync="deviceBindDialogVisible" :device-list="selectedDeviceList"></device-bind-dialog> -->
    <!-- <device-unbind-dialog :visible.sync="deviceUnbindDialogVisible" :device-list="selectedDeviceList"></device-unbind-dialog> -->
    <device-detail-dialog :visible.sync="deviceDetailDialogVisible" :detail-data='detailData'></device-detail-dialog>
    <device-edit-dialog  :data='editDatasd' :visible.sync="deviceEditDialogVisible"></device-edit-dialog>
    <device-export-dialog :visible.sync="deviceExportDialogVisible" :total="total" :query="query" :deviceColumnVisible="deviceColumnVisible"></device-export-dialog>
    <el-dialog top='4vh' :close-on-click-modal=false title="自定义显示列" :visible.sync="deviceColumnControlDialogVisible">
      <el-form inline>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.id">设备编号</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.name">设备名称</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.deviceNo">设备型号</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.customerName">设备场所</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.assignStatus">收费规则</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.bindStatus">业务归属</el-checkbox>
        </el-form-item>
         <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.enableStatus">在线状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.onlineStatus">工作状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.powerStatus">投资人</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.groupName">告警状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.modelName">本日营收</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.modelCode">累计营收</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.userName">激活状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.birthTime">最后上线时间</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.lastOnlineTime">激活人</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.createUser">所在区域</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.location">二维码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.manageName">IMEI</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.MAC">mac</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.information">备注信息</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.manageName">操作</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="deviceColumnControlDialogVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DeviceImportDialog from './components/DeviceImportDialog'
import DeviceAddDialog from './components/DeviceAddDialog'
import DeviceAllocateDialog from './components/DeviceAllocateDialog'
import DeviceDeleteDialog from './components/DeviceDeleteDialog'
import DeviceRecoverDialog from './components/DeviceRecoverDialog'
import DeviceFreeDialog from './components/DeviceFreeDialog'
import DeviceDisableDialog from './components/DeviceDisableDialog'
import DeviceAbleDialog from './components/DeviceAbleDialog'
import DeviceClusterDialog from './components/DeviceClusterDialog'
import DeviceClusterControlDialog from './components/DeviceClusterControlDialog'
import DeviceBindDialog from './components/DeviceBindDialog'
import DeviceUnbindDialog from './components/DeviceUnbindDialog'
import DeviceDetailDialog from './components/DeviceDetailDialog'
import DeviceEditDialog from './components/DeviceEditDialog'
import DeviceExportDialog from './components/DeviceExportDialog'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import {
  list,
  detail,
  devicedel,
  details,
  patchDeviceActive,
  patchDeviceUnActive
} from '@/api/zulin'

export default {
  components: {
    DeviceImportDialog,
    DeviceAddDialog,
    DeviceAllocateDialog,
    DeviceDeleteDialog,
    DeviceRecoverDialog,
    DeviceFreeDialog,
    DeviceDisableDialog,
    DeviceAbleDialog,
    DeviceClusterDialog,
    DeviceClusterControlDialog,
    DeviceBindDialog,
    DeviceUnbindDialog,
    DeviceDetailDialog,
    DeviceEditDialog,
    DeviceExportDialog,
    VueQrcode
  },
  data() {
    return {
      value:'',
      deviceList: [],
      deviceImportDialogVisible: false, //导入
      deviceAddDialogVisible: false,  //添加
      // deviceAllocateDialogVisible: false,
      // deviceDeleteDialogVisible: false,
      deviceRecoverDialogVisible: false,
      deviceFreeDialogVisible: false,
      deviceDisableDialogVisible: false,
      // deviceAbleDialogVisible: false,
      // deviceClusterDialogVisible: false,
      // deviceClusterControlDialogVisible: false,
      // deviceBindDialogVisible: false,
      // deviceUnbindDialogVisible: false,
      deviceDetailDialogVisible: false,
      deviceEditDialogVisible: false,
      deviceExportDialogVisible: false,
      selectedDeviceList: [],
      deviceColumnVisible: {
        name: true,
        mac: true,
        customerName: true,
        deviceType: false,
        assignStatus: true,
        bindStatus: false,
        enableStatus: true,
        groupId: false,
        id: true,
        groupName: true,
        powerStatus: false,
        onlineStatus: true,
        modelName: false,
        modelCode: false,
        birthTime: true,
        lastOnlineTime: false,
        bindCustomer: false,
        location: true,
        createUser: false,
        manageName: false,
        userName: false,
        MAC:false,
        information:false
      },
      deviceColumnControlDialogVisible: false,
      query: {
        length: 100,
        page: 1,
      },
      query1: {
        length: 10000,
        page: 1,
      },
      total: 1,
      detailData: {},
      editDatasd: {},
      unassignStatus: '',
      computeDeviceList:[],
      idLists:[]
    }
  },
  computed: {

  },
  created() {
    const query = this.$route.query
    this.list()
    this.list1()
  },
  methods: {
    reset(){
      this.query.id = ''
      this.query.groundName = ''
      this.query.modelName = ''
      this.query.deviceNo = ''
      this.list()
    },
    selectList(){

    },
    list(){
      list(this.query).then(res=>{
        this.computeDeviceList = res.data
        const data = res.data
        for(var i = 0;i< data.length;i++){
          this.computeDeviceList[i].ewm = `http://${window.location.host}/h5/init?deveceNo=${data[i].deviceNo}&pay=1`
        }
      })
    },
    list1(){
      list(this.query1).then(res=>{
        this.total = (res.data).length
      })
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      if (this.selectedDeviceList.length) {
        this.unassignStatus = this.selectedDeviceList[0].assignStatus
      }
    },
    showEdit(val){
      details(val.deviceNo).then(res=>{
        this.editDatasd = res.data
        this.deviceEditDialogVisible = true
      })
    },
    showDetail(val){
      this.deviceDetailDialogVisible = true
      detail(val.deviceNo).then(res=>{
        this.detailData = res.data
      })
    },
    handleSizeChange(val) {
      this.query.length = val
      this.list()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.list()
    },
    addData(data) {
      this.list()
    },
    updateData(data) {
      this.deviceList.map(item => {
        if (item.id === data.id) {
          Object.assign(item, data)
        }
      })
    },
    deleteOneDeviceHandler() {
      const ids = []
      for(var i = 0;i<this.selectedDeviceList.length;i++){
        ids.push((this.selectedDeviceList)[i].id)
      }
      devicedel({idList:ids}).then(res => {
            // const form = this.selectedDeviceList
          this.$message({
              message: '添加设备成功！',
              type: 'success'
            })
          this.list()
        })
      // this.isOperable().then(_ => {
      //   this.$confirm('将执行删除操作, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   })
      //     .then(() => {
      //       const form = this.selectedDeviceList
      //     })
      //     .catch(() => {
      //       this.$message({
      //         type: 'info',
      //         message: '已取消删除'
      //       })
      //     })
      // })
    },
    // 分配
    handleDeviceRecover() {
        this.deviceRecoverDialogVisible = true
    },
    // 取消激活
    handleDeviceFree() {
      this.isOperable().then(_ => {
        for(var i = 0;i<this.selectedDeviceList.length;i++){
          this.idLists.push((this.selectedDeviceList)[i].deviceNo)
        }
      this.isOperable().then(_ => {
        this.$confirm('将执行取消激活操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
          patchDeviceUnActive({value:this.idLists}).then(res=>{
            if(res.data){
              this.selectedDeviceList = []
              this.list()
              this.$message({
                type: 'success',
                message: '取消激活成功'
              })
            }else{
              this.$message({
                type: 'error',
                message: '取消激活失败'
              })
            }
          })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
      })
      })
    },
    // 激活
    handleDeviceDisable() {
      this.isOperable().then(_ => {
        for(var i = 0;i<this.selectedDeviceList.length;i++){
          this.idLists.push(this.selectedDeviceList[i].deviceNo)
        }
        console.log(this.idLists)
        this.isOperable().then(_ => {
        this.$confirm('将执行激活操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
        patchDeviceActive({value:this.idLists}).then(res =>{
          if(res.data){
            this.selectedDeviceList = []
            this.$message({
              type: 'success',
              message: '激活成功'
            })
            this.list()
          }else{
            this.$message({
              type: 'error',
              message: '激活失败'
            })
          }
        })
        })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
      })
      })
    },
    isOperable() {
      return new Promise(resolve => {
        if (this.selectedDeviceList.length) {
          resolve()
        } else {
          this.$message.warning('请选择设备后再进行操作')
        }
      })
    },
    assignStatusList() {
      // 如果不包含0，即不包含未分配设备
      return !this.selectedDeviceList.map(item => item.assignStatus).includes(0)
    },
    assignStatus() {
      return new Promise(resolve => {
        if (this.assignStatusList()) {
          resolve()
        } else {
          this.$message.warning('选中的设备中有未分配设备，请重新操作')
        }
      })
    }
  }
}
</script>
