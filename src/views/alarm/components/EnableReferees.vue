<template>
  <div>
  <el-dialog class='device-detail-container' top='4vh' width='95%' :close-on-click-modal=false title="推荐人详情" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <p>推荐人基本信息</p>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="118px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="推荐人名称 :">
                  <el-input v-model="form.name" placeholder="请输入内容" disabled></el-input>                  
                </el-form-item>
                <el-form-item label="推荐人账号 :">
                  <el-input v-model="form.registerNo" placeholder="请输入内容" disabled></el-input>                  
                </el-form-item>
              </el-col>
              <el-col :span="6">  
                <el-form-item label="手机号 :">
                  <el-input v-model="form.mobileNo" placeholder="请输入内容" disabled></el-input> 
                </el-form-item>
              </el-col>
              <el-col :span="6"> 
                <el-form-item label="累计分润 :">
                  <el-input v-model="form.totalTxn" placeholder="请输入内容" disabled></el-input>               
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="有效推荐个数 :">
                  <el-input v-model="form.referrerSum" placeholder="请输入内容" disabled></el-input>               
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </div>
    <el-tabs v-model="activeName2" type="card">
      <el-tab-pane label="推荐场地" name="1">
        <el-table style="width: 100%" border :data="deviceList">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="groundName" label="场地名称" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="deviceCount" label="设备总数" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="location" label="场地地址" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="todayTxnAmt" label="今日营收" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{ (scope.row.todayTxnAmt)/100 }}
            </template>
          </el-table-column>
           <el-table-column prop="totalTxnAmt" label="总营收" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{ (scope.row.totalTxnAmt)/100 }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="推荐设备主" name="2">
        <el-table style="width: 100%" border :data="deviceList1">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="name" label="设备主名称" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="deviceCount" label="设备总数" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="location" label="场地地址" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="todayTxnAmt" label="今日营收" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{ (scope.row.todayTxnAmt)/100 }}
            </template>
          </el-table-column>
           <el-table-column prop="totalTxnAmt" label="总营收" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{ (scope.row.totalTxnAmt)/100 }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="推荐的伙伴" name="3">
        <el-table style="width: 100%" border :data="deviceList2">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="name" label="伙伴名称" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="mobile" label="手机号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="referrerCount" label="推荐总数" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="todayTxnAmt" label="今日营收" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{ (scope.row.todayTxnAmt)/100 }}
            </template>
          </el-table-column>
          <el-table-column prop="totalTxnAmt" label="总营收" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{ (scope.row.totalTxnAmt)/100 }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="设备购买订单" name="4">
        <el-table style="width: 100%" border :data="deviceList3">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="orderNo" label="订单号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="resultAmt" label="订单金额" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{(scope.row.resultAmt)/100}}
            </template>
          </el-table-column>
          <el-table-column prop="deviceCount" label="购买设备数" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="resultTime" label="今日营收" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <template v-if="scope.row.resultTime">
                {{new Date(scope.row.resultTime).toLocaleString()}}
              </template>
              <template v-else>
                --
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="订单状态" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <template v-if="scope.row.status == 'PayWait'">
                待支付
              </template>
              <template v-else-if="scope.row.status == 'PaySucc'">
                支付成功
              </template>
              <template v-else-if="scope.row.status == 'PayFail'">
                支付失败
              </template>
              <template v-else-if="scope.row.status == 'PayClose'">
                支付订单关闭
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="消费订单" name="5">
        <el-table :data="deviceList4" style="width: 100%" class="mb20" border>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="orderNo" label="订单编号" show-overflow-tooltip sortable >
          </el-table-column>
          <el-table-column prop="franNo" label="加盟商" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="orderAmt" label="金额" show-overflow-tooltip sortable >
            <template slot-scope="scope">
              {{(scope.row.orderAmt)/100}}
            </template>
          </el-table-column>
          <el-table-column prop="ruleName" label="订单内容" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="deviceNo" label="订单设备" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="orderTime" label="订单时间" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{new Date(scope.row.orderTime).toLocaleString()}}
            </template>
          </el-table-column>
          <el-table-column prop="groundName" label="场所" show-overflow-tooltip sortable >
          </el-table-column>
          <el-table-column prop="groundLocation" label="区域" show-overflow-tooltip sortable >
          </el-table-column>
          <el-table-column prop="acctNo" label="消费者" show-overflow-tooltip sortable >
          </el-table-column>
          <el-table-column prop="orderType" label="付款方式" show-overflow-tooltip sortable>
              <template slot-scope="scope">
                <template v-if="scope.row.orderResult ==''">
                  微信支付
                </template>
              </template>
          </el-table-column>
          <el-table-column prop="orderResult" label="订单状态" show-overflow-tooltip sortable >
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
          <el-table-column prop="state" label="分润状态" show-overflow-tooltip sortable >
            <template slot-scope="scope">
              <template v-if="scope.row.orderResult == 'SplitFail'">
                分润失败
              </template>
              <template v-if="scope.row.orderResult == 'PayClose'">
                订单关闭
              </template>
              <template v-if="scope.row.orderResult == 'SplitSucc'">
                分润成功
              </template>
              <template v-if="scope.row.orderResult == 'PaySucc'">
                待分润
              </template>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <template v-if="scope.row.orderResult == 'SplitFail'">
                    <el-button type="primary" @click="validate(scope.row)">确定</el-button>
                </template>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="账单" name="6">
        <el-table :data="deviceList5" style="width: 100%" class="mb20" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="logicTxnSeq" label="流水号" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="name" label="分润角色" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="deviceNo" label="分润设备" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="orderNo" label="订单号" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="productNo" label="产品No" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="txnAmt" label="分润金额(元)" show-overflow-tooltip>
            <template slot-scope="scope">
              {{(scope.row.txnAmt)/100}}
            </template>
          </el-table-column>
          <el-table-column prop="txnTime" label="分润时间" show-overflow-tooltip >
            <template slot-scope="scope">
              <template>
                {{new Date(scope.row.txnTime).toLocaleString()}}
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="txnType" label="分润来源" show-overflow-tooltip >
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="营收统计" name="7">
        <el-form label-width="118px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="今日营收 :">
                  {{(form.todayTxnAmt)/100}}
                </el-form-item>
              </el-col>
              <el-col :span="6">    
                <el-form-item label="累计营收 :">
                  {{(form.totalTxnAmt)/100}}
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">  
                <el-form-item label="可提现:">
                  {{(form.canWithdrawAmt)/100}}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="已提现:">
                  {{(form.withdrewAmt)/100}}
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
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
  referrerBuyOrderList, //查询推荐人相关设备购买订单
  referrerOrderList,    //查询推荐人相关消费订单
  referrerTxnProfitList  //推荐人分润流水列表
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
      deviceList3:[],
      deviceList4:[],
      deviceList5:[],
      queryOperLog:{
        page:0,
        limit:100
      },
      queryOperLog1:{
        page:1,
        id:0,
        limit:1000
      },
      options: [],
      value:'',
      input:'',
      addForm:{
          name:123123
      },
      tableData: [],
      form: {},
      valId: '',
      location:''
    }
  },
  watch: {
    data(val){
      console.log(val)
      this.form = val
      this.deviceList = val.referrerGroundInfos
      this.deviceList1 = val.referrerInvestInfos
      this.deviceList2 = val.referrerReferrerInfos
      this.queryOperLog1.id = val.id
      this.referrerBuyOrderList()
      this.referrerOrderList()
      this.referrerTxnProfitList()
    }
  },
  methods: {
    referrerBuyOrderList(){
      referrerBuyOrderList(this.queryOperLog1).then(res=>{
        this.deviceList3 = res.data
      })
    },
    referrerOrderList(){
      referrerOrderList(this.queryOperLog1).then(res=>{
        this.deviceList4 = res.data
      })
    },
    referrerTxnProfitList(){
      referrerTxnProfitList(this.queryOperLog1).then(res=>{
        this.deviceList5 = res.data
      })
    },
    res(){
      this.addRules = true
    },
    modify(){

    },

    init(val) {
      this.form = JSON.parse(JSON.stringify(val))
    },
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
