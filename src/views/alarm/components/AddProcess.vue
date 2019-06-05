<template>
  <div>
  <el-dialog class='device-detail-container' top='4vh' width='95%' :close-on-click-modal=false title="添加场地" :visible="visible" @update:visible="$emit('update:visible', $event)">
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
            <el-table-column prop="modelId" label="设备型号" sortable>
              <template slot-scope="scope">
                <el-select v-model="scope.row.modelId" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.modelNo" :label="item.name" :value="item.id"> </el-option> 
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="value5" label="收费规则" sortable>
              <template slot-scope="scope">
                  <el-select v-model="scope.row.value5" multiple collapse-tags placeholder="请选择">
                    <el-option
                      v-for="item in optiones"
                      :key="item.name"
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
            <p>场所图册</p>
            <el-form-item label="图册">
                <image-uploader :key='4' :urls='filterBg(form.imgsList)' @get-url='setImg' @remove-url='removeImg' :isList='true' :limit='5'></image-uploader>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
    <!-- <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="addsDev">添加</el-button>
          <el-button type="primary" @click="AddProcess = true">删除</el-button>

        </el-button-group>
      </div>
      <el-table :data="levelList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange1">
        <el-table-column type="selection"></el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="deviceNo" label="deviceNo" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="设备名称" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="modelId" label="型号ID" show-overflow-tooltip sortable>
          </el-table-column>
      </el-table>
    </el-card> -->
    <div class="btn">
      <el-button type="primary" @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="as">确认添加</el-button>
    </div>
  </el-dialog>
  <!-- 添加规则 -->
  <el-dialog top='4vh' :close-on-click-modal=false title="添加规则" :visible.sync="addRules1">
    <el-form label-width="118px"  label-position="left">
      <el-form-item label="设备型号 :">
        <el-select v-model="modelPercentsd.modelId" placeholder="请选择">
          <el-option v-for="item in options" :key="item.modelNo" :label="item.name" :value="item.id"> </el-option> 
        </el-select>
      </el-form-item>
      <el-form-item label="收费规则">
        <el-select v-model="modelPercentsd.value5" collapse-tags multiple placeholder="请选择">
          <el-option
            v-for="item in optiones"
            :key="item.name"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分润比例 :">
        <el-input placeholder="请输入分润规则" v-model="modelPercentsd.percent" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addRules1 = false">取消</el-button>
      <el-button type="primary" @click="addRuless">确定</el-button>
    </div>
  </el-dialog>
  <!-- 添加设备 -->
  <el-dialog top='4vh' :close-on-click-modal=false title="添加设备" :visible.sync="addRules">
    <el-form label-width="118px" label-position="left">
      <el-table :data="levelList1" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
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
      <el-button type="primary" @click="addRules = false">确定</el-button>
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
  getRegisterUserList,    //获取用户信息列表 
  productRule,
  baseParam,
  deviceModelList,
  getRegisterReferrerInfo,
  getBaseParam,
  groundEdit
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
      // value5:[],
      list:[
        {
          name:'是',
          value:1
        },
        {
          name:'否',
          value:0
        }
      ],
      addRules:false,
      addRules1:false,
      query: {
        length: 100,
        page: 1,
      },
      query1: {
        length: 100,
        page: 1,
        parameterName:'rent_ground_referrer1_default_percent'
      },
      query2: {
        length: 100,
        page: 1,
        parameterName:'rent_ground_referrer2_default_percent'
      },
      query3: {
        length: 100,
        page: 1,
        parameterName:'rent_ground_default_percent'
      },
      levelList:[],
      modelPercentsd:{
        value5:[]
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
        groundDeviceRentInfos:[],
        modelPercents:[],
        groundModelProductSets:[],
        isOpenWarnDistance:false
      },
      valId: '',
      location:'',
      datas:0,
      users:{},
      optiones:[],
      pars:false,
      within:false,
      withins:false
    }
  },
  created () {
    this.getRegisterUserList()
    this.productRule()
    this.baseParams()
    this.deviceModelList()
  },
  methods: {
    addsDev(){
      this.addRules = true
      this.queryFreeDevice()
    },
    deviceModelList(){
      deviceModelList(this.query).then(res=>{
        this.options = res.data
      })
    },
    baseParams(){
      getBaseParam(this.query1).then(res=>{
        const data = res.data
        this.form.referrer1Percent = data
      })
      getBaseParam(this.query2).then(res=>{
        const data = res.data
        this.form.referrer2Percent = data
      })
      getBaseParam(this.query3).then(res=>{
        const data = res.data
        this.modelPercentsd.percent = data
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
        this.form  = Object.assign({},this.form,{})
      })
    },
    getRegisterUserList(){
      getRegisterUserList(this.users).then(res=>{
        // console.log(res.data)
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
      // 设备
      for(var i= 0 ; i<this.levelList.length;i++){
        this.form.groundDeviceRentInfos.push({
          deviceNo:this.levelList[i].deviceNo,
          groundPercent:0
        })
      }
      // 分润
      // console.log(this.tableData)
      for(var i= 0 ; i<this.tableData.length;i++){
        this.form.modelPercents.push({
          modelId:this.tableData[i].modelId,
          percent:this.tableData[i].percent
        })
        this.form.groundModelProductSets.push({
          modelId:this.tableData[i].modelId,
          productRuleIds:this.tableData[i].value5
        })
      }
      
      add(this.form).then(res=>{
        if(res.data){
          this.$emit('update:visible', false)
          this.$message({
            message: '场地添加成功！',
            type: 'success'
          })
        }
      })
    },
    addRuless(){
      this.addRules1 = false
      this.tableData.push(Object.assign({}, this.modelPercentsd))
    },
    productRule(){
      productRule(this.query).then(res=>{
        // console.log(res.data)
        this.optiones = res.data
      })
    },
    queryFreeDevice(){
      queryFreeDevice(this.datas).then(res=>{
        // console.log(res.data)
        this.levelList1 = res.data
      })
    },
    filterBg(data) {
      return data
    },
    setImg(file) {
      // console.log(file)
      this.form.imgsList = []
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
      this.form = Object.assign({}, this.form, {});
      this.$message({
        message: '设备位置信息更新成功！',
        type: 'success'
      })
    },
    handleSelectionChange(selection) {
      this.levelList = selection
      // const s = []
      // for(var i = 0; i<selection.length;i++){
      //     console.log(s.indexOf(selection[i].modelId))
      //    if(s.indexOf(selection[i].modelId) == -1){
      //       s.push(selection[i].modelId)
      //       this.options.push(selection[i])
      //    }
      // }
    },
    handleSelectionChange1(selection){

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
// .el-select{
//   width: 680px;
// }

</style>
