<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="添加设备型号" :visible="visible" @update:visible="$emit('update:visible', $event)" width='60%' class='create-config-container'>
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
        <el-input type="textarea" :rows="4" v-model="form.description"></el-input>
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
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="deviceModel">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from '@/components/Upload/image1'
import File from '@/components/Upload/file'
import { 
  deviceModel     //添加设备型号配置信息
 } from '@/api/zulin'
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
    deviceModelData: Array
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
        {
          name:'基础型号',
          id:'0'
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
      rules: {
        customerId: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ],
        typeId: [
          { required: true, message: '请选择设备类型', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
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
    setURL(argu, data, name) {
      if (!data) {
        this[name] = argu[0]
        return
      }
      data[name] = argu[0]
    },
    deviceModel(){
      deviceModel(this.form).then(res=>{
        if(res.data){
          this.$emit('update:visible', false)
          this.$message({
            message: '型号添加成功！',
            type: 'success'
          })
          this.$emit('add-data', this.form)
        }
      })
    }

  },
  created() {
    // this.getCustomer()
    // this.getAndroidFrmatList()
  },
  watch: {
    visible(val) {
      if (val) {
        this.step = 0
      }
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