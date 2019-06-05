<template>
  <div>
    <el-dialog top='4vh' :close-on-click-modal=false title="添加设备" :visible="visible" @update:visible="$emit('update:visible', $event)">
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
        <el-button type="primary" @click="createDevice">确认添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList } from '@/api/device/type'
import { 
  lists,              //查询运营商
  deviceModelList,  //查询型号列表
  adddeve             //
} from '@/api/zulin'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
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
      adddeve(this.addForm).then(res=>{
        this.$emit('update:visible', false)
        if(res.data){
          this.$message({
            message: '添加设备成功！',
            type: 'success'
          })
          this.$emit('add-data', this.addForm)
        }
      })
    },
    submitForm(formName) {  //判断表单数据是否为空
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addDevice()
        } else {
          return false;
        }
      });
    },
    resetForm(formName) { //清空表单里面的数据
      this.$refs[formName].resetFields();
      this.addDeviceDialogVisible = false
    },
    addDevice() {
        this.deviceList.push(Object.assign({}, this.addForm))
        this.addDeviceDialogVisible = false
    },
    deleteDeviceHandler(index) {
      this.deviceList.splice(index, 1)
    },
    // getDeviceTypeList() {
    //   fetchList(this.listQuery).then(res => {
    //     if (res.data || res.data.length === 0) {
    //       // #TODO 增加个不可关闭的弹框，让用户必须先去设备类型那里添加至少一个设备类型
    //     }
    //     this.list = res.data
    //   })
    // }
  },
  created() {
    // this.userList()
    this.deviceModelList()
    // this.getDeviceTypeList()
  }
}
</script>
