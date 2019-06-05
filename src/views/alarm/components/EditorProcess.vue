<template>
  <div>
  <el-dialog class='device-detail-container' top='4vh' width='95%' :close-on-click-modal=false title="场地编辑" :visible="visible" @update:visible="$emit('update:visible', $event)">
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
              <el-col :span="12" style="text-align:right">
                <el-button type="primary" @click="addRules1 = true">添加</el-button>
              </el-col>
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
            <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="modify(scope.row)">删除</el-button>
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
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-input placeholder="请输入搜索ID" v-model="idsd"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="addRules = true">添加</el-button>
          <el-button type="primary" @click="del">删除</el-button>

        </el-button-group>
      </div>
      <el-table :data="device" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange1">
        <el-table-column type="selection"></el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="deviceNo" label="deviceNo" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="设备名称" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="modelName" label="型号名" show-overflow-tooltip sortable>
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
  <!-- 添加规则 -->
  <el-dialog top='4vh' :close-on-click-modal=false title="添加规则" :visible.sync="addRules1">
    <el-form label-width="118px"  label-position="left">
      <el-form-item label="设备型号 :">
        <el-select v-model="modelPercents.modelId" placeholder="请选择">
          <el-option v-for="item in options" :key="item.modelNo" :label="item.name" :value="item.id"> </el-option> 
        </el-select>
      </el-form-item>
      <el-form-item  label="收费规则">
        <el-select v-model="modelPercents.productRuleIds" collapse-tags multiple placeholder="请选择">
          <el-option
            v-for="item in optiones"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分润比例 :">
        <el-input placeholder="请输入分润规则" v-model="modelPercents.percent" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addRules1 = false">取消</el-button>
      <el-button type="primary" @click="addRuless">确定</el-button>
    </div>
  </el-dialog>
  <!-- 添加设备 -->
  <el-dialog top='4vh' :close-on-click-modal=false title="添加设备" :visible.sync="addRules">
    <div class="table-opts">
      <el-form :inline="true" class="el-form--flex">
        <el-form-item>
          <el-input placeholder="请输入搜索id" v-model="idsds"></el-input>
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
      query1: {
        length: 100,
        page: 1,
        parameterName:'rent_ground_default_percent'
      },
      optiones:[],
      addRules:false,
      addRules1:false,
      query: {
        length: 100,
        page: 1,
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
        modelPercents:[],
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
      idsds:'',
      idsd:'',
      addsd:[]
    }
  },
  watch: {
    data(val) {
      console.log(val)
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

      if(val.modelPercents.length > 0){
        for(var i = 0;i< val.groundModelProductSets.length;i++){
          if(this.tableData[i].modelId == val.modelPercents[i].modelId){
            this.tableData[i].percent = val.modelPercents[i].percent
          }
        }
      }
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
    }
  },
  computed:{
    device:function(){
      var arrByZM = []
      if(this.levelList.length < 0){
        return arrByZM
      }
      console.log(this.levelList)
      for(var i = 0;i< this.levelList.length;i++){
          if((this.levelList[i].deviceNo).search(this.idsd) != -1){
            arrByZM.push(this.levelList[i])
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
          if((this.levelList1[i].deviceNo).search(this.idsds) != -1){
            arrByZM.push(this.levelList1[i])
          }
      }
      return arrByZM
    },
  },
  created () {
    this.getRegisterUserList()
    this.baseParam()
  },
  methods: {
    baseParam(){
      getBaseParam(this.query1).then(res=>{
        const data = res.data
        this.modelPercents.percent = data
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
    addDev(){
      this.addRules = true
      const s = []
      for(var i = 0;i<this.adds.length;i++){
        s.push({
          deviceNo:this.adds[i].deviceNo,
          percent:0
        })
      }
       addDevice({deviceRentInfos:s,id:this.form.id}).then(res=>{
        if(res.data){
          this.$message({
            message: '设备添加成功！',
            type: 'success'
          })
          this.adds = []
          this.addRules = false
        }
      })

    },
    del(){
      const s = []
      for(var i = 0;i<this.addsd.length;i++){
        s.push({
          deviceNo:this.addsd[i].deviceNo,
          percent:0
        })
      }
      grRemoveDevice({deviceRentInfos:s,id:this.form.id}).then(res=>{
        if(res.data){
          for(var i = 0;i<this.addsd.length;i++){
            this.levelList.splice((this.levelList.indexOf(this.addsd[i])),1)
          }
          this.$message({
            message: '设备移除场地成功！',
            type: 'success'
          })
          this.addsd = []
        }
      })
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
    as(){
      if(this.form.isOpenWarnDistance){
        this.form.isOpenWarnDistance = 1
      }else{
        this.form.isOpenWarnDistance = 0
      }
      this.form.groundDeviceRentInfos=[]
      this.form.modelPercents=[]
      this.form.groundModelProductSets=[]
      // 设备
      for(var i= 0 ; i<this.levelList1.length;i++){
        this.form.groundDeviceRentInfos.push({
          deviceNo:this.levelList1[i].modelId,
          groundPercent:''
        })
      }

      // 分润
      console.log(this.tableData)
      for(var i= 0 ; i<this.tableData.length;i++){
        this.form.modelPercents.push({
          modelId:this.tableData[i].modelId,
          percent:this.tableData[i].percent
        })
        this.form.groundModelProductSets.push({
          modelId:this.tableData[i].modelId,
          productRuleIds:this.tableData[i].productRuleIds
        })
      }
      groundEdit(this.form).then(res=>{
        if(res.data){
          this.$emit('update:visible', false)
          this.$message({
            message: '场地修改成功！',
            type: 'success'
          })
          this.adds = []
        }
      })
    },
    addRuless(){
      this.addRules1 = false
      console.log(this.modelPercents)
      this.tableData.push(Object.assign({}, this.modelPercents))
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
      // const index = this.form.imgs.findIndex(v => v.image === file.url)
      this.form.imgsList.splice((this.form.imgsList.indexOf(file.url)),1)
    },
    rules(){
      this.addRules = true
    },
    modify(val){
      this.tableData.splice((this.tableData.indexOf(val)),1)
    },
    blur(){
      const location1 = (this.form.location).split(",")
      location1.pop()
      location1.push(this.location)
      const location = location1.toString()
      const gps = this.form.mapGps
    // updataGroundMaps({
    //       id: this.form.id,
    //       location,
    //       mapGps: gps
    //     }).then(() => {
    //       this.$message({
    //         message: '设备位置信息更新成功！',
    //         type: 'success'
    //       })
          
    //       this.location = location.split(",")[3]
    //   })
    },
    init(val) {
      this.form = JSON.parse(JSON.stringify(val))
      this.queryGroundDeviceList()

    },
    getLocation({ gps, location }) {
      this.form.location = location
      this.form.gpsMap = gps.toString()
      this.$message({
        message: '设备位置信息更新成功！',
        type: 'success'
      })
    },
    handleSelectionChange(selection) {
      this.levelList = selection
      this.adds = selection
      // for(var i = 0; i<selection.length;i++){
      //   this.options.push(selection[i])
      // }
    },
    handleSelectionChange1(selection) {
      this.addsd = selection
      // for(var i = 0; i<selection.length;i++){
      //   this.options.push(selection[i])
      // }
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
