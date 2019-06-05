<template>
  <div>
  <el-dialog class='device-detail-container' top='4vh' width='95%' :close-on-click-modal=false title="编辑总监" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <p>总监基本信息</p>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="98px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="总监名称 :">
                  <el-select v-model="form.registerNo" placeholder="请选择" disabled>
                    <el-option v-for="item in option" :key="item.id" :label="item.name" :value="item.registerNo"> </el-option> 
                  </el-select>
                </el-form-item>
                <el-form-item label="总监地址 :">
                  <el-input v-model="form.manageLocation" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">  
                <el-form-item label="联系人 :">
                  <el-input v-model="form.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                <!-- <el-form-item label="总监描述 :">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>                
                </el-form-item> -->
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话 :">
                  <el-input v-model="form.mobileNo" placeholder="请输入内容"></el-input>                
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <p>业务关系</p>
        <el-card class="el-card--solid">
          <el-form label-width="110px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="业务相关人(内):">
                  <el-input v-model="form.referrer1Name" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="addPartners">确认修改</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import {
  getRegisterUserList,   //获取用户信息列表 
  editPartner,        //修改总监
} from '@/api/zulin'
import {
  updateDevice, //地理位置
} from '@/api/device/list'
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
      users: {
        length: 100,
        page: 1,
      },
      levelList:[{
        name:1
      }],
      selectedDeviceList:[],
      options: [],
      option: [],
      value:'',
      input:'',
      addRules:false,
      addForm:{},
      tableData: [],
      form: {},
      valId: '',
      location:''
    }
  },
  watch: {
    data(val) {
      console.log(val)
      this.form = val
    }
  },
  created () {
    this.getRegisterUserList()
  },
  methods: {
    addPartners(){
      editPartner(this.form).then(res=>{
        if(res.data){
           this.$emit('update:visible', false)
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.$emit('add-data', this.form)
        }
      })
    },
    getRegisterUserList(){
      getRegisterUserList(this.users).then(res=>{
        this.option = res.data
      })
    },
    rules(){
      this.addRules = true
    },
    modify(){

    },
    blur(){
      const location1 = (this.form.location).split(",")
      location1.pop()
      location1.push(this.location)
      const location = location1.toString()
      const gps = this.form.mapGps
    updateDevice({
          id: this.form.id,
          location,
          mapGps: gps
        }).then(() => {
          this.$message({
            message: '设备位置信息更新成功！',
            type: 'success'
          })
          
          this.location = location.split(",")[3]
      })
    },
    init(val) {
      this.form = JSON.parse(JSON.stringify(val))
    },
    getLocation({ gps, location }) {
      updateDevice({
        id: this.form.id,
        location,
        mapGps: gps.toString()
      }).then(() => {
        this.$message({
          message: '设备位置信息更新成功！',
          type: 'success'
        })
        this.form.location = location
        this.location = (this.form.location).split(",")[3]
      })
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      // console.log(selection)
    }
  },
  components: {

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
  padding: 20px 0px;
}
</style>
