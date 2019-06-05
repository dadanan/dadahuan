<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="复制设备型号" :visible="visible" @update:visible="$emit('update:visible', $event)" width='60%' class='create-config-container'>
    <el-form label-width="100px" class="mb-22" :model="form" :rules="rules" ref="form">
      <el-form-item label="型号名称" prop="customerId">
        <el-input v-model="form.modelCode"></el-input>        
      </el-form-item>
      <el-form-item label="型号" prop="typeId">
        <el-input v-model="form.modelCode"></el-input>
      </el-form-item>
      <el-form-item label="版式">
        <el-select v-model="form.typeId">
          <el-option v-for="model in typeList" :key="model.id" :label="model.name" :value="model.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收费规则" prop="typeId">
        <el-select v-model="form.typeId">
          <el-option v-for="model in typeList" :key="model.id" :label="model.name" :value="model.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理归属" prop="typeId">
        <el-select v-model="form.typeId">
          <el-option v-for="model in typeList" :key="model.id" :label="model.name" :value="model.id">
          </el-option>
        </el-select>
      </el-form-item>
      <template v-if="form.typeId">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="缩图">
          <!-- <image-uploader :urls='form.icon' @get-url='setURL(arguments,form,"icon")'></image-uploader> -->
         <image-uploader :key='3' :urls='filterBg(form.icons)' @get-url='setImg' @remove-url='removeImg' :isList='true' :limit='5'></image-uploader>

        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 4 }"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="设备缩图">
        <!-- <file @get-url='setURL(arguments,null,"software")' :file-name='getImageName(this.software)'></file> -->
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from '@/components/Upload/image'
import File from '@/components/Upload/file'
import { fetchList as getTypeList } from '@/api/device/type'
import { selectAllCustomers as getCustomer } from '@/api/customer'
import { selectFormatsByCustomerId, select } from '@/api/format'
import { createDeviceModel } from '@/api/device/model'
import { selectTypesBySLD } from '@/api/device/type'
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
        typeId: '',
        customerId: '',
        showStatus: true,
        productQrCode: '',
        productId: '',
        customer: '',
        name: '',
        modelCode: '',
        remark: '',
        icons:[]
      },
      childModelIds: [],
      formatId: '',
      formatSelectedList: [], // 用户可选择的总版式列表
      formatSelected: [], // 用户选择的某个版式列表
      pageOfForamt: [], // 用户选择的某个版式列表的页面配置
      dialogFormVisible: false,
      typeList: [],
      abilitySelected: [
        {
          name: '功能项1',
          id: 1
        },
        {
          name: '功能项2',
          id: 2
        },
        {
          name: '功能项3',
          id: 3
        }
      ],
      deviceModelAbilitys: [],
      step: 0,
      options: [
        {
          name: 'asd',
          type: '开关类',
          remark: '备注1'
        },
        {
          name: 'dfgfg',
          type: '文本类',
          remark: '备注2'
        }
      ],
      customterList: [],
      modifyData: {}, // 正在自定义的功能配置项数据
      typeModel: {
        1: '文本类',
        2: '单选类',
        3: '多选类',
        4: '阈值类',
        5: '阈值选择类',
        6: '设备传参类'
      },
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