<template>
  <el-dialog class='device-detail-container' top='4vh' width='95%' :close-on-click-modal=false title="设备详情" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="110px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="设备mac :">
                  {{form.deviceNo}}
                </el-form-item>
                <el-form-item label="设备型号 :">
                  {{form.modelName}}
                </el-form-item>
                <el-form-item label="设备名称 :">
                  {{form.name}}
                </el-form-item>
                <el-form-item label="设备序列号 :">
                  {{form.modelNo}}
                </el-form-item>
                <el-form-item label="在线状态 :">
                  {{form.onlineStatus === 1 ? '在线' : '关闭'}}
                </el-form-item>
                <el-form-item label="工作状态 :">
                  {{form.workStatus === 1 ? '开启' : '关闭'}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="激活时间 :">
                  <template v-if="form.activeTime">
                    {{new Date(form.activeTime).toLocaleString()}}
                  </template>
                  <template v-else>
                    --
                  </template>
                </el-form-item>
                <el-form-item label="最后上线时间 :">
                  <template v-if="form.activeTime">
                    {{new Date(form.activeTime).toLocaleString()}}
                  </template>
                  <template v-else>
                    --
                  </template>
                </el-form-item>
                <el-form-item label="设备位置 :">
                  <el-input v-model="form.location"  disabled></el-input>
                </el-form-item>
                <el-form-item label="备注信息 :">
                  <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.description"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <div class="flex-item">
        <el-card class="el-card--solid map-container">
          <a-map :gps='form && form.gpsMap' @getLocation='getLocation'></a-map>
        </el-card>
      </div>
    </div>
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="运营信息" name="1">
        <el-form label-width="110px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="收费规则 :">
                  {{operation.productDetail}}
                </el-form-item>
                <el-form-item label="场所名称 :">
                  {{operation.groundName}}
                </el-form-item>
                <el-form-item label="设备主 :">
                  {{operation.investRegisterName}}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="收费类别 :">
                  {{operation.productRuleIds}}
                </el-form-item>
                <el-form-item label="场所地址 :">
                  {{operation.gpsMap}}
                </el-form-item>
                <el-form-item label="设备主电话 :">
                  {{operation.investMobile}}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="收费价格 :">
                  {{operation.productDetailPrice}}
                </el-form-item>
                <el-form-item label="场所负责人 :">
                  {{operation.groundRegisterName}}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="设备归属 :">
                  {{operation.activeTime}}
                </el-form-item>
                <el-form-item label="场地主电话 :">
                  {{operation.groundMobile}}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
      </el-tab-pane>
      <el-tab-pane label="设备控制" name="2">
        <el-form label-width="110px" label-position="left">
          <el-row :gutter="20">
            <el-col :span="8">  
              <el-form-item label="设备控制 :">
                <el-switch v-model="control" active-text="开启" inactive-text="关闭" @change="controls">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="订单列表" name="3">
        <el-table style="width: 100%" border :data="deviceWorkLog" height="250px">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="orderNo" label="订单编号" show-overflow-tooltip sortable>
            <!-- <template slot-scope="scope">
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template> -->
          </el-table-column>
          <el-table-column prop="userName" label="用户昵称" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="openId" label="用户openid" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="groundName" label="场所" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="productRuleId" label="收费规则" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="orderAmt" label="订单金额" show-overflow-tooltip sortable>
            <template slot-scope="orderAmt">
              {{(scope.row.orderAmt)/100}}
            </template>
          </el-table-column>
          <el-table-column prop="orderResult" label="订单状态" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <template v-if="scope.row.orderResult == 'SplitFail'">
                订单结束
              </template>
              <template v-if="scope.row.orderResult == 'PayClose'">
                支付关闭
              </template>
              <template v-if="scope.row.orderResult == 'SplitSucc'">
                已完成
              </template>
              <template v-if="scope.row.orderResult == 'PaySucc'">
                支付成功
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="source" label="支付方式" show-overflow-tooltip sortable>
            <template slot-scope="scope">
            <template v-if="scope.row.source == '1'">
              微信支付
            </template>
            <template v-else-if="scope.row.source == '2'">
               余额支付
            </template>
            <template v-else-if="scope.row.source == '3'">
               线下支付
            </template>
          </template>
          </el-table-column>
          <el-table-column prop="orderTime" label="订单时间" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <template v-if="scope.row.orderTime">
                {{new Date(scope.row.orderTime).toLocaleString()}}
              </template>
              <template v-else>
                --
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="运行日志" name="4">
        <el-table style="width: 100%" border :data="runLists" height="250px">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="content" label="状态" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="createTime" label="时间" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
          </el-table-column>
          <el-table-column label="设备故障" show-overflow-tooltip sortable>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="告警记录" name="5">
        <el-table style="width: 100%" border :data="deviceListJ" height="250px">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="id" label="序号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="createTime" label="告警时间" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
          </el-table-column>
          <el-table-column prop="content" label="告警内容" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column label="告警等级" show-overflow-tooltip sortable>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import Operation from './deviceDetail/Operation'
import AMap from './deviceDetail/AMap'
import ShareList from './deviceDetail/ShareList'
import { 
  operationMsg,   // 设备运营信息
  orderList,      // 设备订单列表 
  runLog,         // 设备运行日志
  warnLog,
  sendFunc
} from '@/api/zulin'
import {
  updateDevice, //地理位置
  // queryDeviceWorkLog // 工作日志
} from '@/api/device/list'
import VueQrcode from '@chenfengyuan/vue-qrcode'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detailData: {
      type: Object
    }
  },
  data() {
    return {
      orderl:{
        length: 50,
        page: 1
      },
      control:false,
      runl:{
        length: 50,
        page: 1
      },
      operation:{},
      runLists:[],

      selected: [],
      placeholder: 'placeholder',
      activeTab: '1',
      deviceList: [],
      deviceListJ: [],
      form: {},
      deviceId: 1,
      queryOperLogc: {
        limit: 50,
        page: 1
      },
      queryDevice: {
        limit: 50,
        page: 1
      },
      queryDeviceW: {
        limit: 50,
        page: 1
      },
      deviceWarn: {
        length: 10000,
        page: 1
      },
      deviceList1: [],
      deviceWorkLog: [],
      shareURL: '...',
      valId: '',
      queryOperLogCound: 0,
      queryDeviceSensorStatCound: 0,
      deviceWorkLogCound: 0,
      shareListVisible: false,
      shareData: {}, // 分享数据
      group: '--',
      location:'',
      deviceModelAbilitys: [],
    }
  },
  watch: {
    detailData(val) {
      if(val.location){
        this.location = (val.location).split(",")[3]
      }
      this.init(val)
      this.valId = val.id
    }
  },
  methods: {
    controls(val){
      console.log(val)
      let vals = 0
      if(val){
        vals = 1
      }else{
        vals = 0
      }
      sendFunc({
        deviceId:this.form.id,
        funcId:'210',
        funcValue:vals
      }).then(res=>{
        if(res.data){
          this.$message({
            message: '指令发送成功',
            type: 'success'
          })
        }
      })
    },
    opertye(row) {
      let opertye = row.operType
      if (opertye == 1) {
        return '微信操作'
      } else if (opertye == 2) {
        return '安卓操作'
      } else if (opertye == 3) {
        return '管理端'
      }
    },
    warnLog(val){
      warnLog(val,this.deviceWarn).then(res=>{
        this.deviceListJ = res.data
      })
    },
    blur(){
      const location1 = (this.form.location).split(",")
      location1.pop()
      location1.push(this.location)
      const location = location1.toString()
      const gps = this.form.mapGps
    updateDevice({
          id: this.form.id,
          location,
          mapGps: gps
        }).then(() => {
          this.$message({
            message: '设备位置信息更新成功！',
            type: 'success'
          })
          
          this.location = location.split(",")[3]
      })
    },
    init(val) {
      this.form = JSON.parse(JSON.stringify(val))
      // console.log(this.form)
      this.operationMsg(val.deviceNo)
      this.orderList(val.deviceNo)
      this.runLog(val.deviceNo)
      this.warnLog(val.deviceNo)


    },
    runLog(val){
      runLog(val,this.runl).then(res=>{
        // console.log(res.data)
        this.runLists = res.data
      })
    },
    orderList(val){
      orderList(val,this.orderl).then(res=>{
        // console.log(res.data)
        this.deviceWorkLog = res.data
      })
    },
    operationMsg(val){
      operationMsg(val).then(res=>{
        // console.log(res.data)
        this.operation = res.data
      })
    },
    getLocation({ gps, location }) {
      this.form.gpsMap = gps
      this.form.location = location
      // updateDevice({
      //   id: this.form.id,
      //   location,
      //   mapGps: gps.toString()
      // }).then(() => {
      //   this.$message({
      //     message: '设备位置信息更新成功！',
      //     type: 'success'
      //   })
      //   this.form.location = location
      //   this.location = (this.form.location).split(",")[3]
      // })
    },
    getSld() {
      // 获取二级域名
      const sld = location.href.match(/:\/\/(.*?).hcocloud/)
      if (sld) {
        return sld[1]
      }
      return ''
    },
    handleSizeChange(val) {
      this.queryDevice.limit = val
    },
    handleCurrentChange(val) {
      this.queryDevice.page = val
    },
    handleSizeChange1(val) {
      this.queryOperLogc.limit = val
      // this.queryOperLog(this.valId)
    },
    handleCurrentChange1(val) {
      this.queryOperLogc.page = val
      // this.queryOperLog(this.valId)
    },
    handleSizeChange3(val) {
      this.queryDeviceW.limit = val
      // this.queryDeviceWorkLog(this.valId)
    },
    handleCurrentChange3(val) {
      this.queryDeviceW.page = val
      // this.queryDeviceWorkLog(this.valId)
    }
  },
  components: {
    Operation,
    AMap,
    VueQrcode,
    ShareList
  }
}
</script>

<style lang="scss" scoped>
.device-detail-container {
  margin-bottom: 2rem;
}
.flex {
  display: flex;
  margin-left: -10px;
  margin-right: -10px;
}

.map-container {
  width: 560px;
  min-height: 440px;
}

.flex-item {
  margin: 0 10px;
  &--full {
    flex: 1;
  }
}
</style>
