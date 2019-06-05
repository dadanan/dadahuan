<template>
  <div>
  <el-dialog class='device-detail-container' top='4vh' width='95%' :close-on-click-modal=false title="添加设备主" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <p>设备主基本信息</p>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="90px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="设备主名称 :">
                  <el-input v-model="form.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="设备主描述 :">
                  <el-input v-model="form.description" placeholder="请输入内容"></el-input>                
                </el-form-item>
              </el-col>
              <el-col :span="8">  
                <el-form-item label="联系人 :">
                  <el-select v-model="form.masterRegisterNo" placeholder="请选择" @change="changs">
                    <el-option v-for="item in option" :key="item.id" :label="item.name" :value="item.registerNo"> </el-option> 
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话 :">
                  <el-input v-model="form.mobileNo" disabled></el-input>                
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <p>业务关系</p>
        <!-- <div class="flex mb20"> -->
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
              <el-row :gutter="20">
                <el-col :span="12"  v-if="form.partnerReferrerName">
                  <el-form-item label=" 育成总监:">
                    <el-input v-model="form.partnerName" disabled></el-input>    
                  </el-form-item>
                </el-col> 
                <el-col :span="12"  v-else>
                  <el-form-item label=" 总监:">
                    <el-input v-model="form.partnerName" disabled></el-input>    
                  </el-form-item>
                </el-col> 
                <el-col :span="12" v-if="form.partnerReferrerName">  
                  <el-form-item label="总监">
                    <el-input v-model="form.partnerReferrerName" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
          <div class="flex-item">
      </div>
      </div>
      <!-- </div> -->
    </div>
    <div class="flex mb20">
        <el-card class="el-card--solid map-container">
          <el-form label-width="50px" label-position="left">
            <p>场所图册</p>
            <el-form-item label="图册">
                <image-uploader :key='4' :urls='filterBg(form.imgsList)' @get-url='setImg' @remove-url='removeImg' :isList='true' :limit='5'></image-uploader>
            </el-form-item>
          </el-form>
        </el-card>
    </div>
    <!-- <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="add">添加</el-button>
          <el-button type="primary" @click="dele">删除</el-button>
        </el-button-group>
      </div>
      <el-table :data="levelList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="deviceNo" label="deviceNo" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="设备名称" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="modelId" label="型号ID" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="investPercent" label="分润比例" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <el-input v-model="scope.row.investPercent"></el-input>
            </template>
          </el-table-column>
      </el-table>
    </el-card> -->
    <div class="btn">
      <el-button type="primary" @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="as">确认添加</el-button>
    </div>
  </el-dialog>
  <!-- 添加设备 -->
  <el-dialog top='4vh' :close-on-click-modal=false title="添加设备" :visible.sync="addRules">
    <el-form label-width="118px" label-position="left">
      <el-table :data="levelList1" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange1">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="deviceNo" label="deviceNo" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="name" label="设备名称" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="modelId" label="型号ID" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="investPercent" label="分润比例" show-overflow-tooltip sortable>
        <template slot-scope="scope">
          <el-input v-model="scope.row.investPercent"></el-input>
        </template>
      </el-table-column>
    </el-table>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addDeva">确定</el-button>
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
  inQueryFreeDevice,       //查询可分配设备列表
  updataGroundMaps,      //修改场地位置信息
  invests,                   //设备主添加
  getRegisterUserList,   //获取用户信息列表 
  queryInvestDeviceList,  //查询投资项的设备列表
  baseParam,
  getRegisterReferrerInfo,
  getBaseParam
} from '@/api/zulin'
import VueQrcode from '@chenfengyuan/vue-qrcode'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detailData:{
      type:String
    }
  },
  data() {
    return {
      addRules:false,
      addRules1:false,
      query: {
        length: 100,
        page: 1,
      },
      query1: {
        length: 100,
        page: 1,
        parameterName:'rent_invest_referrer1_default_percent'
      },
      query2: {
        length: 100,
        page: 1,
        parameterName:'rent_invest_referrer2_default_percent'
      },
      levelList:[],
      modelPercents:{
      },
      levelList1:[],
      option: [],
      value:'',
      inputs:'',
      total:0,
      addRules:false,
      addForm:{},
      tableData: [],
      form: {
        imgsList:[],
      },
      valId: '',
      location:'',
      datas:0,
      users:{},
      pars:false,
      within:false,
      withins:false,
      lsArr:[]
    }
  },
  created () {
    this.getRegisterUserList()
    this.baseParam()
  },
  methods: {
    baseParam(){
      getBaseParam(this.query1).then(res=>{
        const data = res.data
        this.form.referrer1Percent = data
      })
      getBaseParam(this.query2).then(res=>{
        const data = res.data
        this.form.referrer2Percent = data
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
      this.getRegisterReferrerInfo(val)
    },
    getRegisterReferrerInfo(val){
      getRegisterReferrerInfo(val).then(res=>{
        const data = res.data
        this.form.referrer1Name = data.referrer1Name
        this.form.referrer2Name = data.referrer2Name
        this.form.partnerReferrerName = data.partnerReferrerName
        this.form.partnerName = data.partnerName
        this.form  = Object.assign({},this.form,{})
      })
    },
    dele(){
      for(var i = 0;i<this.adds.length;i++){
        this.levelList.splice((this.levelList.indexOf(this.adds[i])),1)
      }
    },
    getRegisterUserList(){
      getRegisterUserList(this.users).then(res=>{
        this.option = res.data
      })
    },
    as(){
      this.form.investDeviceRentInfos=[]
      // 设备
      for(var i= 0 ; i<this.levelList.length;i++){
        this.form.investDeviceRentInfos.push({
          deviceNo:this.levelList[i].deviceNo,
          investPercent:this.levelList[i].investPercent
        })
      }
      invests(this.form).then(res=>{
        if(res.data){
          this.$emit('update:visible', false)
          this.$message({
            message: '设备主添加成功！',
            type: 'success'
          })
        this.$emit('add-data', this.addForm)
        }
      })
    },
    addRuless(){
      this.addRules1 = false
      this.tableData.push(this.modelPercents)
    },
    add(){
      this.addRules = true
      inQueryFreeDevice(this.datas).then(res=>{
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
      // const index = this.form.imgs.findIndex(v => v.image === file.url)
      this.form.imgsList.splice((this.form.imgsList.indexOf(file.url)),1)
    },
    rules(){
      this.addRules = true
    },
    addDeva(){
      const list = this.lsArr
      this.addRules = false
    },
    init(val) {
      this.form = JSON.parse(JSON.stringify(val))
      this.queryGroundDeviceList()

    },
    getLocation({ gps, location }) {
      this.form.location = location
      this.form.gpsMap = gps.toString()
      this.form = Object.assign({},this.form,{})
      this.$message({
        message: '设备位置信息更新成功！',
        type: 'success'
      })
    },
    handleSelectionChange(selection) {
      // this.levelList = selection
    },
    handleSelectionChange1(selection) {
      this.lsArr = selection
    }
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
  width: 100%;
  height: 360px;
  
}

.flex-item {
  margin: 0 10px;
  &--full {
    flex: 2;
  }
}
.btn{
  text-align: right;
}
</style>
