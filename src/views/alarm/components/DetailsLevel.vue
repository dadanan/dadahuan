<template>
  <div>
  <el-dialog class='device-detail-container' top='4vh' width='75%' :close-on-click-modal=false title="编辑运营商" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <p>运营商基本信息</p>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="90px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="运营商名称 :">
                  <el-input v-model="form.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="appid :">
                  <el-input v-model="form.appid" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="appsecret :">
                  <el-input v-model="form.appsecret" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">  
                <el-form-item label="parentOrg :">
                  <el-input v-model="form.parentOrg" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="二级域名 :">
                  <el-input v-model="form.sld" placeholder="请输入内容"></el-input>                
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话 :">
                  <el-input v-model="form.mobileNo" type="tel" placeholder="请输入内容"></el-input>                
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="ass">确认</el-button>
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
  orgadd,   // 添加运营商配置信息
  orgedit
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
      form: {}
    }
  },
  watch: {
    data(val){
      this.form = val
    }
  },
  methods: {
    ass(){
      this.$emit('update:visible', false)
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
