<template>
  <div>
    <el-dialog top='4vh' :close-on-click-modal=false title="修改设备" :visible="visible" @update:visible="$emit('update:visible', $event)">
      <el-form label-width="80px" label-position="left" :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="名称" prop="SN">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="IMEI">
          <!-- <el-input v-model="addForm.modelId"></el-input> -->
          <el-select v-model="addForm.modelId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="MAC" prop="型号">
          <el-input v-model="addForm.deviceNo"></el-input>
        </el-form-item>
        <!-- <el-form-item label="备注" prop="备注">
          <el-input v-model="addForm.birthTime"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取消</el-button>
        <el-button type="primary" @click="createDevice">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList } from '@/api/device/type'
import { 
  lists,              //查询运营商
  deviceModelList,  //查询型号列表
  adddeve,            //
  deviceEdit
} from '@/api/zulin'

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
      options: [],
      userl:[],
      value: '',
      operator:'',
      addForm: {
      },
      addDeviceDialogVisible: false,
      list: [],
      listQuery: {
        length: 100,
        page: 1
      },
      deviceList: [],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '请选择设备类型', trigger: 'change' }
        ],
        mac: [
          { required: true, message: '请输入Mac', trigger: 'blur' },
          { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    data(val){
      // console.log(val)
      this.addForm = val
    }
  },
  methods: {
    userList(){
      lists(this.listQuery).then(res=>{
        this.userl = res.data
      })
    },
    deviceModelList(){
      deviceModelList(this.listQuery).then(res=>{
        this.options = res.data
        // console.log(this.options)
      })
    },
    createDevice() {
      // const tempDeviceList = JSON.parse(JSON.stringify(this.deviceList))
      // console.log(tempDeviceList)
      deviceEdit(this.addForm).then(res=>{
        this.$emit('update:visible', false)
        if(res.data){
          this.$message({
            message: '添加设备成功！',
            type: 'success'
          })
          this.$emit('add-data', this.addForm)
        }
      })
    }
  },
  created() {
    // this.userList()
    this.deviceModelList()
    // this.getDeviceTypeList()
  }
}
</script>
