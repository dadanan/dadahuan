<template>
  <div>
  <el-dialog class='device-detail-container' top='4vh' width='75%' :close-on-click-modal=false title="编辑加盟商" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <p>加盟商基本信息</p>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="120px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="加盟商名称 :">
                  <el-input v-model="form.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                 <el-form-item label="加盟商区域 :">
                  <el-input v-model="form.address" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="加盟商分润比例 :">
                  <el-input v-model="form.referrerPercent" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="管理人账号 :">
                  <el-select v-model="form.adminRegisterNo" placeholder="请选择" @change="changs">
                    <el-option v-for="item in option" :key="item.id" :label="item.name" :value="item.registerNo"> </el-option> 
                  </el-select>
                </el-form-item>
                <el-form-item label="电话 :">
                  <el-input v-model="form.mobileNo"  disabled></el-input>                
                </el-form-item>
                <p>场所图册</p>
                <el-form-item label="图册">
                    <image-uploader :key='4' :urls='filterBg(form.imgsList)' @get-url='setImg' @remove-url='removeImg' :isList='true' :limit='5'></image-uploader>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="ass">确认编辑</el-button>
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
  getRegisterUserList,
  franEdit
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
      form: {
        imgsList:[]
      },
      option:[],
      users:{},
    }
  },
  watch: {
    data(val){
      this.form = val
      this.getRegisterUserList()
    }
  },
  methods: {
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
    changs(val){
      for(var i=0;i<this.option.length;i++){
        if(this.option[i].registerNo == val){
          this.form.mobileNo = this.option[i].mobileNo
        }
      }
    },
   getRegisterUserList(){
      getRegisterUserList(this.users).then(res=>{
        // console.log(res.data)
        this.option = res.data
      })
    },
    ass(){
      franEdit(this.form).then(res=>{
        console.log(res.data)
        if(res.data){
          this.$emit('update:visible', false)
          this.$message({
            message: '加盟商修改成功！',
            type: 'success'
          })
          this.$emit('add-data', this.form)
        }
      })
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
