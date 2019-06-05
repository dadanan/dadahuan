<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="修改设备型号" :visible="visible" @update:visible="$emit('update:visible', $event)" width='60%' class='create-config-container'>
    <!-- <el-steps :active="step" finish-status="success" class="mb20" align-center>
      <el-step title="设备配置"></el-step>
      <el-step title="客户信息设置"></el-step>
      <el-step title="硬件功能项"></el-step>
      <el-step title="版式配置"></el-step>
    </el-steps> -->
    <el-form label-width="100px" class="mb-22">
      <el-form-item label="型号名称">
        <el-input v-model="form.name"></el-input>        
      </el-form-item>
      <el-form-item label="型号描述">
        <el-input  type="textarea" :rows="4"  v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label='厂家分类'>
        <el-select v-model="form.formatNo" placeholder="请选择">
          <el-option v-for="item in option" :key="item.id" :label="item.name" :value="item.id"> </el-option> 
        </el-select>
      </el-form-item>
      <el-form-item label="型号图册">
          <image-uploader :key='2' :urls='filterBg(form.imgUrl)' @get-url='setImg' @remove-url='removeImg' :isList='true' :limit='1'></image-uploader>
      </el-form-item>
      <el-form-item label="型号封面图">
          <image-uploader :url='form.logoImg' @get-url='setURL(arguments,form,"logoImg")'></image-uploader>
      </el-form-item>
      <!-- <el-form-item label="版式">
        <el-select v-model="form.typeId">
          <el-option v-for="model in typeList" :key="model.id" :label="model.name" :value="model.id">
          </el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="收费规则" prop="typeId">
        <el-select v-model="form.typeId">
          <el-option v-for="model in typeList" :key="model.id" :label="model.name" :value="model.id">
          </el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="管理归属" prop="typeId">
        <el-select v-model="form.typeId">
          <el-option v-for="model in typeList" :key="model.id" :label="model.name" :value="model.id">
          </el-option>
        </el-select>
      </el-form-item> -->
      <!-- <template v-if="form.typeId">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="缩图">
          <image-uploader :urls='form.icon' @get-url='setURL(arguments,form,"icon")'></image-uploader>
         <image-uploader :key='3' :urls='filterBg(form.icons)' @get-url='setImg' @remove-url='removeImg' :isList='true' :limit='5'></image-uploader>

        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 4 }"></el-input>
        </el-form-item>
      </template> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="deviceModelEdit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from "@/components/Upload/image1";
import File from '@/components/Upload/file'
import { fetchList as getTypeList } from '@/api/device/type'
import { selectAllCustomers as getCustomer } from '@/api/customer'
import { selectFormatsByCustomerId, select } from '@/api/format'
import { createDeviceModel } from '@/api/device/model'
import { selectTypesBySLD } from '@/api/device/type'
import { deviceModelEdit } from '@/api/zulin'
import DTitle from '@/components/Title'
export default {
  components: {
    ImageUploader,
    DTitle,
    File
  },
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
      },
      option:[
        {
          name:'环可科技',
          id:'2'
        },
        {
          name:'米子盾',
          id:'1'
        },
      ],
      childModelIds: [],
      formatId: '',
      formatSelectedList: [], // 用户可选择的总版式列表
      formatSelected: [], // 用户选择的某个版式列表
      pageOfForamt: [], // 用户选择的某个版式列表的页面配置
      dialogFormVisible: false,
      typeList: [],
      deviceModelAbilitys: [],
      step: 0,
      customterList: [],
      modifyData: {}, // 正在自定义的功能配置项数据
      software: '',
      // rules: {
      //   customerId: [
      //     { required: true, message: '请选择客户', trigger: 'change' }
      //   ],
      //   typeId: [
      //     { required: true, message: '请选择设备类型', trigger: 'change' }
      //   ]
      // }
    }
  },
  methods: {
    deviceModelEdit(){
      deviceModelEdit(this.form).then(res=>{
         if(res.data){
          this.$message({
            message: '设备型号修改成功！',
            type: 'success'
          })
        }
        this.$emit('update:visible', false)
      })
    },
    setURL(argu, data, name) {
      if (!data) {
        this[name] = argu[0]
        return
      }
      data[name] = argu[0]
    },
    filterBg(data) {
      return data
    },
    setImg(file) {
      this.form.imgUrl = []
      this.form.imgUrl = [...this.form.imgUrl, file.url]
    },
    removeImg(file) {
      this.form.imgUrl.splice((this.form.imgUrl.indexOf(file.url)),1)
    },
  },
  created() {
    // this.getCustomer()
    // this.getAndroidFrmatList()
  },
  watch: {
    data(val) {
      this.form = val
      this.form.name = val.name
      this.form.description = val.description
      this.form.imgUrl = val.imgUrl
    }
  }
}
</script>

<style lang='scss'>
.create-config-container {
  .box-card {
    margin-top: 10px;
  }
  .format-page-img {
    width: 300px;
  }
}
.color{
  color: #969696;
}
</style>