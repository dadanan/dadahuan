<template>
  <div>
  <el-dialog class='device-detail-container' top='4vh' width='95%' :close-on-click-modal=false title="编辑总监" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <p>总监基本信息</p>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="98px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="总监名称 :">
                  <el-select v-model="form.registerNo" placeholder="请选择" disabled>
                    <el-option v-for="item in option" :key="item.id" :label="item.name" :value="item.registerNo"> </el-option> 
                  </el-select>
                </el-form-item>
                <el-form-item label="总监地址 :">
                  <el-input v-model="form.manageLocation" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">  
                <el-form-item label="联系人 :">
                  <el-input v-model="form.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                <!-- <el-form-item label="总监描述 :">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>                
                </el-form-item> -->
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话 :">
                  <el-input v-model="form.mobileNo" placeholder="请输入内容"></el-input>                
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <p>业务关系</p>
        <el-card class="el-card--solid">
          <el-form label-width="110px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="业务相关人(内):">
                  <el-input v-model="form.referrer1Name" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </div>
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="营收统计" name="1" >
        <el-form label-width="110px" label-position="left" height="250">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="今日营收 :">
                  {{(form.todayTxnAmt)/100}}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="累计营收 :">
                  {{(form.totalTxnAmt)/100}}
                </el-form-item>
              </el-col>
              <!-- <el-col :span="5">
                <el-form-item label="可提现 :">
                  <template v-if="form.canWithdrawAmt">
                    {{(form.canWithdrawAmt)/100}}
                  </template>
                  <template v-else>
                     - -
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="已提现 :">
                  <template v-if="form.withdrewAmt">
                    {{(form.withdrewAmt)/100}}
                  </template>
                  <template v-else>
                     - -
                  </template>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
      </el-tab-pane>
      <el-tab-pane label="我的团队" name="2" >
        <el-form label-width="110px" label-position="left" height="250">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="总销售(元) :">
                  {{(form.teamSendAmt)/100}}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="总人数(人) :">
                  {{(form.teamPersionCount)}}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="销售分润(元) :">
                  {{(form.teamSendMyAmt)/100}}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="运营分润(元) :">
                  {{(form.teamRentMyAmt)/100}}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
      </el-tab-pane>
      <el-tab-pane label="我的奖励" name="3" >
        <el-form label-width="110px" label-position="left" height="250">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="今日奖励 :">
                  {{(form.myTodayPartnerAmt)/100}}
                </el-form-item>
                <el-form-item label="我的育成:">
                  {{(form.myPartnerReferrerCount)/100}}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="累计奖励 :">
                  {{(form.myTotalPartnerAmt)/100}}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="合伙奖励 :">
                  {{(form.myPartnerAmt)/100}}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="育成奖励 :">
                  {{(form.myPartnerReferrerAmt)}}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
      </el-tab-pane>
      <el-tab-pane label="帐单" name="4">
        <el-table :data="levelList" style="width: 100%" class="mb20" border height="250">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="deviceNo" label="deviceNo" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="name" label="姓名" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="orderNo" label="订单号" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="productNo" label="产品号" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="txnType" label="分润类型" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="txnAmt" label="分润金额" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{(scope.row.txnAmt)/100}}
            </template>
          </el-table-column>
            <el-table-column prop="txnTime" label="分润时间" show-overflow-tooltip sortable>
              <template slot-scope="scope">
                <template v-if='scope.row.txnTime'>
                  {{new Date(scope.row.txnTime).toLocaleString()}}
                </template>
                <template v-else>
                  - -
                </template>
              </template>
            </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="订单管理" name="5">
        <el-table style="width: 100%" border :data="deviceList1" height="250">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="orderNo" label="订单编号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="deviceNo" label="设备编号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="groundName" label="场所" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="groundLocation" label="场所区域" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="orderAmt" label="订单金额" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{(scope.row.orderAmt)/100}}
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
      <el-tab-pane label="设备购买订单" name="6">
        <el-table style="width: 100%" border :data="levelLists" height="250">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="orderNo" label="订单编号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="deviceCount" label="设备数量" show-overflow-tooltip sortable>
          </el-table-column>
          <!-- <el-table-column prop="groundName" label="场所" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="groundLocation" label="场所区域" show-overflow-tooltip sortable>
          </el-table-column> -->
          <el-table-column prop="resultAmt" label="订单金额" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{(scope.row.resultAmt)/100}}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="订单状态" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="resultTime" label="订单时间" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <template v-if='scope.row.resultTime'>
                {{new Date(scope.row.resultTime).toLocaleString()}}
              </template>
              <template v-else>
                - -
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="btn">
      <el-button type="primary" @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">确认</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import {
  getRegisterUserList,   //获取用户信息列表 
  editPartner,        //修改总监
  partnerOrderList,
  partnerTxnProfitList,
  partnerBuyOrderList
} from '@/api/zulin'
import {
  updateDevice, //地理位置
} from '@/api/device/list'
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
      activeTab:'1',
      deviceList1:[],
      deviceList1:[],

      levelList:[],
      levelLists:[],
      addRules:false,
      users: {
        length: 100,
        page: 1,
      },
      selectedDeviceList:[],
      options: [],
      option: [],
      value:'',
      input:'',
      addRules:false,
      addForm:{},
      tableData: [],
      form: {},
      valId: '',
      location:'',
      length: 10000,
    }
  },
  watch: {
    data(val) {
      console.log(val)
      this.form = val
      this.partnerOrderList()
      this.partnerBuyOrderList()
      this.partnerTxnProfitList()
    }
  },
  created () {
    this.getRegisterUserList()
  },
  methods: {
    partnerOrderList(){
      partnerOrderList({id:this.form.id,length:this.length}).then(res=>{
        this.deviceList1 = res.data
      })
    },
    partnerTxnProfitList(){
      partnerTxnProfitList({id:this.form.id,length:this.length}).then(res=>{
        this.levelList = res.data
      })
    },
    partnerBuyOrderList(){
      partnerBuyOrderList({id:this.form.id,length:this.length}).then(res=>{
        this.levelLists = res.data
      })
    },
    getRegisterUserList(){
      getRegisterUserList(this.users).then(res=>{
        this.option = res.data
      })
    },
    rules(){
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
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      // console.log(selection)
    }
  },
  components: {

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
  padding: 20px 0px;
}
</style>
