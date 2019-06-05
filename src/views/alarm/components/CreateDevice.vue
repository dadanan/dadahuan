<template>
  <div>
  <el-dialog class='device-detail-container' top='4vh' width='95%' :close-on-click-modal=false title="修改设备主" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <p>设备主基本信息</p>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="120px" label-position="left">
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
                  <el-select v-model="form.masterRegisterNo" placeholder="请选择" @change="changs" disabled>
                    <el-option v-for="item in option" :key="item.id" :label="item.name" :value="item.registerNo"> </el-option> 
                  </el-select>
                </el-form-item>
                <el-form-item label="购买数量 :">
                  <el-input v-model="form.deviceCount" disabled></el-input>                
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话 :">
                  <el-input v-model="form.mobileNo" disabled></el-input>                
                </el-form-item>
                <el-form-item label="剩余时长(台*天):">
                  <el-input v-model="form.enableTime" disabled></el-input>                
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
      </div>
      <!-- <div class="flex-item">
        <el-card class="el-card--solid map-container">
          <a-map :gps='form && form.mapGps' @getLocation='getLocation'></a-map>
        </el-card>
      </div> -->
    </div>
    <el-card>
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
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-input placeholder="请输入搜索ID" v-model="idsd"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="add">添加</el-button>
          <el-button type="primary" @click="ableDevices">设备激活</el-button>
          <el-button type="primary" @click="deactivate">取消激活</el-button>
          <el-button type="primary" @click="delets">删除</el-button>
        </el-button-group>
      </div>
      <el-table :data="device" style="width: 100%" class="mb20" border @selection-change="handleSelectionChanges">
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
      <!-- <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination> -->
    </el-card>
    <div class="btn">
      <el-button type="primary" @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="as">确认修改</el-button>
    </div>
  </el-dialog>
  <!-- 添加设备 -->
  <el-dialog top='4vh' :close-on-click-modal=false title="添加设备" :visible.sync="addRules">
    <div class="table-opts">
      <el-form :inline="true" class="el-form--flex">
        <el-form-item>
          <el-input placeholder="请输入搜索ID" v-model="idsds"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-form label-width="118px" label-position="left">
      <el-table :data="addDevs" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
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
      <el-button type="primary" @click="addDev">确定</el-button>
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
  inQueryFreeDevice,       //查询可分配设备列表
  getRegisterUserList,   //获取用户信息列表 
  queryInvestDeviceList,  //查询投资项的设备列表
  edit,
  removeDevice,           //设备主移除设备
  inAddDevice,
  ableDevice,
  unAbleDevice,
  getBaseParam
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
      addRules1:false,
      query: {
        limit: 100,
        page: 1,
        parameterName:'rent_invest_default_percent'
      },
      levelList:[],
      modelPercents:{
      },
      levelList1:[],
      options: [],
      option: [],
      value:'',
      inputs:'',
      total:0,
      addRules:false,
      addForm:{},
      tableData: [],
      form: {
        imgsList:[],
        groundDeviceRentInfos:[],
        modelPercents:[]
      },
      valId: '',
      location:'',
      datas:0,
      users:{},
      ides:[],
      ids:[],
      remo:[],
      pars:false,
      within:false,
      withins:false,
      idsd:'',
      idsds:'',
      searchs:false,
    }
  },
  watch: {
    data(val) {
      this.form = val
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
    },
  },
  computed:{
    device:function(){
      var arrByZM = []
      if(this.levelList.length < 0){
        return arrByZM
      }
      for(var i = 0;i< this.levelList.length;i++){
        if(this.levelList[i]){
          if((this.levelList[i].deviceNo).search(this.idsd) != -1){
            arrByZM.push(this.levelList[i])
          }
        }
      }
      return arrByZM
    },
    addDevs:function(){
      var arrByZM = []
      if(this.levelList1.length < 0){
        return arrByZM
      }
      for(var i = 0;i< this.levelList1.length;i++){
        if(this.levelList1[i]){
          if((this.levelList1[i].deviceNo).search(this.idsds) != -1){
            arrByZM.push(this.levelList1[i])
          }
        }
      }
      return arrByZM
    },
  },
  created () {
    this.getRegisterUserList()
  },
  methods: {
    ableDevices(){
      for(var i = 0;i<this.ides.length;i++){
        this.ids.push(this.ides[i].deviceNo
        )
      }
      ableDevice({value:this.ids}).then(res=>{
        if(res.data){
          this.ides = []
           this.$message({
              message: '激活成功',
              type: 'success'
            })
        }
      })
    },
    // 取消激活
    deactivate(){
      for(var i = 0;i<this.ides.length;i++){
        this.ids.push(this.ides[i].deviceNo
        )
      }
      unAbleDevice({value:this.ids}).then(res=>{
        if(res.data){
          this.ides = []
           this.$message({
              message: '取消激活成功',
              type: 'success'
            })
        }
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
    addDev(){
      this.addRules = false
      const s = []
      for(var i = 0;i<this.remo.length;i++){
        s.push({
          deviceNo:this.remo[i].deviceNo,
          percent:this.remo[i].investPercent
        })
      }
      inAddDevice({deviceRentInfos:s,id:this.form.id}).then(res=>{
        if(res.data){
          this.$message({
            message: '设备添加成功！',
            type: 'success'
          })
          this.remo = []
          this.$emit('update:visible', false)
        }
      })
    },
    delets(){
      for(var i = 0;i<this.ides.length;i++){
        this.ids.push({
          deviceNo:this.ides[i].deviceNo,
          percent:0
        })
      }
      removeDevice({deviceRentInfos:this.ids,id:this.form.id}).then(res=>{
        if(res.data){
          for(var i = 0;i<this.ides.length;i++){
            this.levelList.splice((this.levelList.indexOf(this.ides[i])),1)
          }
          this.$message({
            message: '设备移除成功！',
            type: 'success'
          })
          this.ides = []
        }
      })
    },
    getRegisterUserList(){
      getRegisterUserList(this.users).then(res=>{
        // console.log(res.data)
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
      edit(this.form).then(res=>{
        if(res.data){
          this.$emit('update:visible', false)
          this.$message({
            message: '设备主修改成功！',
            type: 'success'
          })
        }
      })
      // console.log(this.form)
    },
    addRuless(){
      this.addRules1 = false
      this.tableData.push(this.modelPercents)
    },
    add(){
      this.addRules = true
      inQueryFreeDevice(this.form.id).then(res=>{
        if(res.data){
          const lists = res.data
          getBaseParam(this.query).then(res=>{
            const data = res.data
            for(var i =0;i<lists.length;i++){
              lists[i].investPercent = data
            }
            this.levelList1 = lists
          })
        }
      })
    },
    filterBg(data) {
      return data
    },
    setImg(file) {
      // console.log(file)
      this.form.imgsList = [...this.form.imgsList, file.url]
    },
    removeImg(file) {
      // const index = this.form.imgs.findIndex(v => v.image === file.url)
      // console.log(file)
      this.form.imgsList.splice((this.form.imgsList.indexOf(file.url)),1)
    },
    rules(){
      this.addRules = true
    },
    modify(){
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
      this.remo = selection
      for(var i = 0; i<selection.length;i++){
        this.options.push(selection[i])
      }
      // this.levelList = this.remo
      // this.device = this.remo
      // this.levelList = this.levelList.concat(this.remo)
    },
    handleSelectionChanges(selection){
      this.ides  = selection
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
  width: 100%;
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
