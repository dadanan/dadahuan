<template>
  <div>
  <el-dialog class='device-detail-container' top='4vh' width='95%' :close-on-click-modal=false title="场地详情" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <p>场地基本信息</p>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="108px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="场地名称 :">
                  <el-input v-model="form.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="场所地址 :">
                  <el-input  v-model="form.location" disabled></el-input>
                </el-form-item>
                <el-form-item label="围栏半径(米) :">
                  <el-input v-model="form.warnDistance" placeholder="请输入内容"></el-input>                
                </el-form-item>
              </el-col>
              <el-col :span="8">  
                <el-form-item label="联系人 :">
                  <el-select v-model="form.masterRegisterNo" placeholder="请选择" @change="changs">
                    <el-option v-for="item in option" :key="item.id" :label="item.name" :value="item.registerNo"> </el-option> 
                  </el-select>
                </el-form-item>
                <el-form-item label="场所描述 :">
                  <el-input v-model="form.description" placeholder="请输入内容"></el-input>                
                </el-form-item>
                <el-form-item label="电子围栏 :">
                  <el-switch v-model="form.isOpenWarnDistance" active-text="开启" inactive-text="禁止">
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话 :">
                  <el-input v-model="form.mobileNo"  disabled></el-input>                
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <p>业务关系</p>
        <el-card class="el-card--solid">
         <el-form label-width="90px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="推荐人1:">
                  <el-input v-model="form.referrer1Name" disabled></el-input>    
                </el-form-item>
              </el-col> 
              <el-col :span="12">  
                <el-form-item label="分润比例">
                  <el-input v-model="form.referrer1Percent"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="推荐人2:">
                  <el-input v-model="form.referrer2Name" disabled></el-input>    
                </el-form-item>
              </el-col> 
              <el-col :span="12">  
                <el-form-item label="分润比例">
                  <el-input v-model="form.referrer2Percent"></el-input>
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
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <div class="">
            <el-row :gutter="20">
              <el-col :span="12">
                <p>经营设置</p>
              </el-col>
              <!-- <el-col :span="12" style="text-align:right">
                <el-button type="primary" @click="addRules1 = true">添加</el-button>
              </el-col> -->
            </el-row>    
          </div>
          <el-table :data="tableData" style="width: 100%" border height="274px">
            <el-table-column type="index"></el-table-column>
            <el-table-column  prop="modelId" label="设备型号" sortable>
              <template slot-scope="scope">
                <el-select v-model="scope.row.modelId" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.modelNo" :label="item.name" :value="item.id"> </el-option> 
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="productRuleIds" label="收费规则" sortable>
              <template slot-scope="scope">
                  <el-select v-model="scope.row.productRuleIds" multiple collapse-tags clearable placeholder="请选择">
                    <el-option
                      v-for="item in optiones"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="percent" label="分润比例" sortable>
              <template slot-scope="scope">
                <el-input v-model="scope.row.percent"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <div class="flex-item">
        <el-card class="el-card--solid map-container">
          <el-form label-width="50px" label-position="left">
            <p>场所资料</p>
            <el-form-item label="资料">
                 <image-uploader :key='4' :urls='filterBg(form.imgsList)' @get-url='setImg' @remove-url='removeImg' :isList='true' :limit='5'></image-uploader>
              </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="营收统计" name="1">
        <el-form label-width="110px" label-position="left">
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
                  {{(form.canWithdrawAmt)/100}}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="已提现 :">
                  {{(form.withdrewAmt)/100}}
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
      </el-tab-pane>
      <el-tab-pane label="设备管理" name="2">
        <el-table :data="levelList" style="width: 100%" class="mb20" border height="250">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="deviceNo" label="deviceNo" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="name" label="设备名称" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="modelName" label="型号名" show-overflow-tooltip sortable>
            </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="订单管理" name="3">
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
    </el-tabs>
    <div class="btn">
      <el-button type="primary" @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">确认</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import Operation from './deviceDetail/Operation'
import AMap from './deviceDetail/AMap'
import ShareList from './deviceDetail/ShareList'
import ImageUploader from "@/components/Upload/image1";

import {
  updateDevice, //地理位置
} from '@/api/device/list'
import {
  queryGroundDeviceList, //查询场地内的设备信息
  queryFreeDevice,       //查询可分配设备列表
  updataGroundMaps,      //修改场地位置信息
  add,                   //场地添加
  getRegisterUserList,   //获取用户信息列表 
  addDevice,             //场地增加新设备
  productRule,
  grRemoveDevice,
  groundEdit,
  deviceModelList,
  getBaseParam,
  groundOrderList
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
      deviceWorkLog:[],
      deviceList1:[],
      activeTab: '1',
      query1: {
        length: 100,
        page: 1,
        parameterName:'rent_ground_default_percent'
      },
      optiones:[],
      query: {
        length: 100,
        page: 1,
      },
      levelList:[],
      levelList1:[],
      options: [],
      option: [],
      value:'',
      inputs:'',
      total:0,
      addForm:{},
      tableData: [],
      form: {
        imgsList:[],
        groundDeviceRentInfos:[],
        groundModelProductSets:[],
        isOpenWarnDistance:false,
      },
      valId: '',
      location:'',
      datas:0,
      users:{},
      adds:[],
      groundIds:0,
       pars:false,
      within:false,
      withins:false,
      addsd:[],
      length:1000
    }
  },
  watch: {
    data(val) {
      this.datas = val.id
      this.deviceModelList()
      this.productRule()
      this.form = val
      if(this.form.isOpenWarnDistance){
        this.form.isOpenWarnDistance = 1
      }else{
        this.form.isOpenWarnDistance = 0
      }
      // this.tableData = val.modelPercentList
      this.tableData = val.groundModelProductSets
      this.groundIds = val.id
      this.levelList = val.deviceList
      for(var i=0;i<this.option.length;i++){
        if(this.option[i].registerNo == this.form.referrer1){
          if(this.option[i].acctType == 'par'){
            this.within = false
            this.pars = true
            this.withins = true
            this.inputs = this.option[i].referrerName
          }else if(this.option[i].acctType == 'emp'){
            this.within = true
            this.pars = false
            this.withins = false
            this.inputs = ''
          }else{
            this.withins = false
            this.within = false
            this.pars = false
            this.inputs = ''
          }
        }
      }
      this.queryFreeDevice()
      this.groundOrderList()
    }
  },
  created () {
    this.getRegisterUserList()
  },
  methods: {
    groundOrderList(){
      groundOrderList({id:this.form.id,length:this.length}).then(res=>{
        this.deviceList1 = res.data
      })
    },
    deviceModelList(){
      deviceModelList(this.query).then(res=>{
        this.options = res.data
      })
    },
    blurs(val){
      if( val > 1 || val == 1){
        this.$message({
          message: '分润比例必须小于1',
          type: 'error'
        })
      }
    },
    changs(val){
      for(var i=0;i<this.option.length;i++){
        if(this.option[i].registerNo == val){
          this.form.mobileNo = this.option[i].mobileNo
        }
      }
    },
    productRule(){
      productRule(this.query).then(res=>{
        this.optiones = res.data
      })
    },
    getRegisterUserList(){
      getRegisterUserList(this.users).then(res=>{
        this.option = res.data
      })
    },
    queryFreeDevice(){
      queryFreeDevice(this.datas).then(res=>{
        this.levelList1 = res.data
      })
    },
    filterBg(data) {
       return data
    },
    setImg(file) {
      this.form.imgsList = [...this.form.imgsList, file.url]
    },
    removeImg(file) {
      this.form.imgsList.splice((this.form.imgsList.indexOf(file.url)),1)
    },
    rules(){
    },
    blur(){
      const location1 = (this.form.location).split(",")
      location1.pop()
      location1.push(this.location)
      const location = location1.toString()
      const gps = this.form.mapGps
    },
    init(val) {
      this.form = JSON.parse(JSON.stringify(val))
      this.queryGroundDeviceList()

    },
    getLocation({ gps, location }) {
      // this.form.location = location
      // this.form.gpsMap = gps.toString()
      // this.$message({
      //   message: '设备位置信息更新成功！',
      //   type: 'success'
      // })
    },
  },
  components: {
    Operation,
    AMap,
    VueQrcode,
    ShareList,
    ImageUploader
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
