<template>
  <div>
  <el-dialog class='device-detail-container' top='4vh' width='95%' :close-on-click-modal=false title="设备主详情" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <p>设备主基本信息</p>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="118px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="设备主名称 :">
                  {{addForm.name}}
                </el-form-item>
                <el-form-item label="运营状态 :">
                  <template v-if="addForm.enable == 0">
                    禁用
                  </template>
                  <template v-else>
                    启用
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="6">    
                <el-form-item label="联系人:">
                  {{addForm.registName}}
                </el-form-item>
                <el-form-item label="业务相关人(内):">
                  {{addForm.referrer1Name}}
                </el-form-item>
              </el-col>
              <el-col :span="6">  
                <el-form-item label="电话 :">
                  {{addForm.mobileNo}}
                </el-form-item>
                <el-form-item label="设备数量 :">
                  {{addForm.deviceCount}}               
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="注册时间 :">
                   <template v-if="addForm.createTime">
                     {{new Date(addForm.createTime).toLocaleString()}}
                   </template>
                   <template v-else>
                      - - 
                   </template>
                </el-form-item>
                <el-form-item label="所在区域 :">
                  <!-- {{addForm.name}} -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card class="el-card--solid">
            <el-form label-width="90px" label-position="left">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="推荐人1:">
                    <el-input v-model="addForm.referrer1Name" disabled></el-input>    
                  </el-form-item>
                </el-col> 
                <el-col :span="12">  
                  <el-form-item label="分润比例">
                    <el-input v-model="addForm.referrer1Percent"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="推荐人2:">
                    <el-input v-model="addForm.referrer2Name" disabled></el-input>    
                  </el-form-item>
                </el-col> 
                <el-col :span="12">  
                  <el-form-item label="分润比例">
                    <el-input v-model="addForm.referrer2Percent"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              
            </el-form>
        </el-card>
      </div>
    </div>
    <el-tabs v-model="activeName2" type="card">
      <el-tab-pane label="设备管理" name="1">
        <el-table style="width: 100%" border :data="deviceList" height="250">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="deviceNo" label="设备编号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="设备名称" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="modelName" label="设备型号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="groundName" label="场所" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column  label="告警状态" show-overflow-tooltip sortable>
            <template>
              未报警
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="订单管理" name="2">
        <el-table style="width: 100%" border :data="deviceList1" height="250">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="orderNo" label="订单编号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="groundName" label="场地主" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="groundLocation" label="场所" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="ruleName" label="收费规则" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="orderAmt" label="订单金额" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <template>
                {{(scope.row.orderAmt)/100}}
              </template>
            </template>  
          </el-table-column>
          <el-table-column prop="orderResult" label="订单状态" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="orderTime" label="订单时间" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <template v-if='scope.row.orderTime'>
                {{new Date(scope.row.orderTime).toLocaleString()}}
              </template>
              <template v-else>
                - -
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="营收统计" name="3">
        <el-form label-width="118px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="今日营收 :">
                  {{(addForm.todayTxnAmt)/100}}
                </el-form-item>
              </el-col>
              <el-col :span="6">    
                <el-form-item label="累计营收 :">
                  {{(addForm.totalTxnAmt)/100}}
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">  
                <el-form-item label="可提现:">
                  {{(addForm.canWithdrawAmt)/100}}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="已提现:">
                  {{(addForm.withdrewAmt)/100}}
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
      </el-tab-pane>
      <el-tab-pane label="设备购买订单明细" name="4">
         <el-table style="width: 100%" border :data="deviceList2">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="orderNo" label="订单编号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="acctNo" label="账户编号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="modelId" label="modelId" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="orderAmt" label="订单金额" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="orderCount" label="设备数量" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="orderResult" label="订单状态" show-overflow-tooltip sortable>
            <template slot-scope="scope">
            <template v-if="scope.row.orderResult == 'PayWait'">
              待支付
            </template>
            <template v-else-if="scope.row.orderResult == 'PaySucc'">
               支付成功
            </template>
            <template v-else-if="scope.row.orderResult == 'PayFail'">
               支付失败
            </template>
            <template v-else-if="scope.row.orderResult == 'PayClose'">
               支付订单关闭
            </template>
            <template v-else-if="scope.row.orderResult == 'SplitFail'">
               分润失败
            </template>
            <template v-else-if="scope.row.orderResult == 'SplitSucc'">
               分润成功
            </template>
          </template>
          </el-table-column>
          <el-table-column prop="source" label="支付方式" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <template v-if="scope.row.source == '1'">
                线下支付
              </template>
              <template v-else-if="scope.row.source == '2'">
                余额支付
              </template>
              <template v-else-if="scope.row.source == '3'">
                微信支付
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="orderTime" label="订单时间" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <template v-if='scope.row.orderTime'>
                {{new Date(scope.row.orderTime).toLocaleString()}}
              </template>
              <template v-else>
                - -
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
  <el-dialog top='4vh' :close-on-click-modal=false title="订单详情" :visible.sync="addRules" width="80%">
      <el-form label-width="118px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="订单编号 :">
                  {{addForm.name}}
                </el-form-item>
                <el-form-item label="订单状态 :">
                  {{addForm.name}}
                </el-form-item>
                <el-form-item label="设备mac :">
                  {{addForm.name}}
                </el-form-item>
              </el-col>
              <el-col :span="6">  
                <el-form-item label="用户昵称 :">
                  {{addForm.name}}
                </el-form-item>
                <el-form-item label="设备使用时长 :">
                  {{addForm.name}}               
                </el-form-item>
                <el-form-item label="场所名称 :">
                  {{addForm.name}}               
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="支付费用 :">
                  {{addForm.name}}               
                </el-form-item>
                <el-form-item label="支付方式 :">
                  {{addForm.name}}               
                </el-form-item>
                <el-form-item label="收费规则 :">
                  {{addForm.name}}               
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="下单时间 :">
                  {{addForm.name}}               
                </el-form-item>
                <el-form-item label="支付时间 :">
                  {{addForm.name}}               
                </el-form-item>
                <el-form-item label="收费详情 :">
                  {{addForm.name}}               
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addRules = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Operation from './deviceDetail/Operation'
import AMap from './deviceDetail/AMap'
import ShareList from './deviceDetail/ShareList'
import {
  updateDevice, //地理位置
} from '@/api/device/list'
import {
  investOrderList, //地理位置
} from '@/api/zulin'
import VueQrcode from '@chenfengyuan/vue-qrcode'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data:{
      type:Object
    }
  },
  data() {
    return {
      addRules:false,
      queryOperLogCound:0,
      activeName2:'1',
      deviceList:[],
      deviceList1:[],
      deviceList2:[],
      queryOperLog:{
        page:0,
        limit:100
      },
      value:'',
      input:'',
      addForm:{
          name:123123
      },
      form: {},
      valId: '',
      location:'',
      length:10000
    }
  },
  watch: {
    data(val) {
      if(val.location){
        this.location = (val.location).split(",")[3]
      }
      this.deviceList2 = val.buyOrders
      this.addForm = val
      this.deviceList = val.deviceList
      this.investOrderList()
    }
  },
  methods: {
    investOrderList(){
      investOrderList({id:this.addForm.id,length:this.length}).then(res=>{
        this.deviceList1 = res.data
      })
    },
    res(){
      this.addRules = true
    },
    modify(){

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
    },
    getLocation({ gps, location }) {
      updateDevice({
        id: this.form.id,
        location,
        mapGps: gps.toString()
      }).then(() => {
        this.$message({
          message: '设备位置信息更新成功！',
          type: 'success'
        })
        this.form.location = location
        this.location = (this.form.location).split(",")[3]
      })
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
  height: 360px;
  
}

.flex-item {
  margin: 0 10px;
  &--full {
    flex: 1;
  }
}
.btn{
  text-align: right;
}
</style>
