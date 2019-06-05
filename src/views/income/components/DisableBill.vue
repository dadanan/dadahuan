<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="账单详情" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
    <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
      <el-form label-width="100px" class="mb-22">
        <el-form-item label="分润对象" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="关联产品" prop="manageName">
          <el-input v-model="form.manageName"></el-input>
        </el-form-item>
        <el-form-item label="适用运营商">
          <el-input v-model="form.manageName"></el-input>
        </el-form-item>
        <el-form-item label="分润方式">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="分润状态">
          <el-input v-model="form.manageName"></el-input>
        </el-form-item>
        <el-form-item label="营收分润">
          <el-input v-model="form.manageName"></el-input>
        </el-form-item>
        <el-form-item label="分润比例">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="奖励金额">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="合计分润">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="关联订单">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="分润用户">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="审核方式">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="审核人">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.manageName"></el-input>
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click='updateDevice'>确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import VDistpicker from 'v-distpicker'
import {
  updateDevice,
  shareDeviceToken,
  clearRelation,
  updateAllRelation,
  updateRelation,
  deviceShareList,
  queryAllParamConfig,
  addParamConfig
} from '@/api/device/list'
import VueQrcode from '@chenfengyuan/vue-qrcode'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object
    }
  },
  data() {
    return {
       options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      value:'',
      ginsengList: [],
      form: {
        name: '',
        manageName: '',
        location: '',
        wxDeviceId: '',
        userOpenId: '',
        customerId: '',
        id: ''
      },
      shareURL: '...',
      shareData: {
        list: []
      },
      status: '',
      ginseng:true,
      status1: false
    }
  },
  methods: {
    permitAll(status) {
      updateAllRelation({
        deviceId: this.shareData.deviceId,
        status
      }).then(() => {
        this.shareData.list.forEach((item, index) => {
          // if (!index) {
          //   // 如果第一个数据，表示主用户，无操作
          //   return
          // }
          item.status = !item.status
        })
        this.$message({
          message: `全部${status === 1 ? '启用' : '禁用'}成功！`,
          type: 'success'
        })
      })
    },
    deleteUser(openId) {
      this.$confirm('此操作将解除分享, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          clearRelation({
            deviceId: this.shareData.deviceId,
            openId
          }).then(() => {
            this.$message({
              message: `解除分享成功！`,
              type: 'success'
            })
            this.shareData.list = this.shareData.list.filter(
              item => item.openId !== openId
            )
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    getDeviceShareList() {
      deviceShareList(this.form.id)
        .then(res => {
          if(!res.data){
            return
          }
          this.shareData = {
            deviceId: this.form.id,
            list: res.data
          }
          this.status = '设备已绑定'
        })
        .catch(res => {
          this.status = '设备未绑定'
        })
    },
       //设备参数修改
    addParamConfig(id) {
      this.status1 = true
      let paramConfigList = []
      if (id == 1) {
        console.log(this.ginsengList)
        for (var i = 0; i < this.ginsengList.length; i++) {
          var valuesList = {}
          const list = this.ginsengList[i].configValuesList
          var defaultValue = []
          for (var j = 0; j < list.length; j++) {
            if (list[j].currentValue == '') {
              defaultValue.push(Number(list[j].defaultValue))
            } else {
              var s = list[j].currentValue
              if (s < list[j].maxValue && s > list[j].minValue) {
                defaultValue.push(Number(list[j].currentValue))
              } else {
                this.status1 = false
                this.$message({
                  message: this.ginsengList[i].paramName +' ' +list[j].definedName +'最小值为' +list[j].minValue +'最大值为' +list[j].maxValue,
                  type: 'error'
                })
              }
            }
          }
          valuesList.sort = i
          valuesList.valuesList = defaultValue
          paramConfigList.push(valuesList)
          // console.log(paramConfigList)
        }
      } else {
        for (var i = 0; i < this.ginsengList.length; i++) {
          var valuesList = {}
          const list = this.ginsengList[i].configValuesList
          var defaultValue = []
          for (var j = 0; j < list.length; j++) {
            defaultValue.push(Number(list[j].defaultValue))
          }
          valuesList.sort = i
          valuesList.valuesList = defaultValue
          paramConfigList.push(valuesList)
          // console.log(paramConfigList)
        }
      }
      if (this.status1) {
        addParamConfig({
          deviceId: this.form.id,
          abilityTypeName: 'C10',
          paramConfigList: paramConfigList
        }).then(res => {
          if(!res.data){
            return
          }
          this.queryAllParamConfig()
          this.$message({
          message: '修改成功！',
          type: 'success'
        })
        })
      }
    },
    // 设备传参
    queryAllParamConfig() {
      queryAllParamConfig(this.form.id)
        .then(res => {
          if(!res.data){
              return
            }
          if(res.data){
            this.ginseng = true
            if(res.data[0].paramName){
              this.ginsengList = res.data
            }else{
              this.ginsengList = []
            }
          }else{
            this.ginseng = false
          }
        })
        .catch(res => {
          // this.status ="设备未绑定"
        })
    },
    updateDevice() {
      const form = {
        ...this.form
      }
      updateDevice(form).then(() => {
        this.$message({
          type: 'success',
          message: '修改设备详情成功！'
        })
        this.$emit('update-data', form)
        this.$emit('update:visible', false)
      })
    },
    handleCancel() {
      this.$emit('update:visible', false)
    },
    getSld() {
      // 获取二级域名
      const sld = location.href.match(/:\/\/(.*?).hcocloud/)
      if (sld) {
        return sld[1]
      }
      return ''
    },
    isDev() {
      // 是开发环境？
      const sld = this.getSld()
      return sld === '' || sld === 'dev'
    },
    // 获取分享二维码
    getShareToken() {
      shareDeviceToken(this.form.wxDeviceId).then(res => {
        const form = this.form

        const url = `http://${
          this.isDev() ? 'dev' : form.sld
        }.hcocloud.com/h5/init?masterOpenId=${form.userOpenId}&deviceId=${
          form.id
        }&token=${res.data}&customerId=${form.customerId}`

        // console.log('分享URL: ', url)
        this.shareURL = url
      })
    }
  },
  watch: {
    editData(val) {
      const data = JSON.parse(JSON.stringify(val))
      this.form = data
      this.getShareToken()
      this.getDeviceShareList()
      this.queryAllParamConfig()
    }
  },
  components: {
    VueQrcode
  }
}
</script>
<style lang="scss" scoped>
.button-group {
  padding-top: 30px;
}
.inside-image {
  width: 100%;
}
.table{
  border: 1px solid #ccc;
  td{
   border: 1px solid #ccc;
   border-right: none;
   border-bottom: none;
  }
}
.table td:first-child{
  border-left: none
}
</style>