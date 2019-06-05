<template>
  <div>
  <el-dialog class='device-detail-container' top='4vh' width='95%' :close-on-click-modal=false title="编辑推荐人" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <p>推荐人基本信息</p>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="98px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="推荐人名称 :">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>                  
                </el-form-item>
              </el-col>
              <el-col :span="8">  
                <el-form-item label="电话 :">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>                  
                </el-form-item>
              </el-col>
              <el-col :span="8"> 
                <el-form-item label="推荐人描述 :">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>                  
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
                <el-form-item label="业务相关人(外):">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>                                 
                </el-form-item>
              </el-col>
              <el-col :span="12">  
                <el-form-item label="推荐人openid:">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>                                 
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="备注信息:">
                  <el-input v-model="input" type="textarea" placeholder="请输入内容"></el-input>                
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <div class="flex-item">
        <el-card class="el-card--solid map-container">
          <!-- <a-map :gps='detailData && detailData.mapGps' @getLocation='getLocation'></a-map> -->
        </el-card>
      </div>
    </div>
     <p>经营设置</p>
        <el-card class="el-card--solid">
          <el-form label-width="110px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="24">
                  <el-form-item label="找业务:">
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">永久</template>
                        <template slot="append">%</template>
                    </el-input>  
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">1年</template>
                        <template slot="append">%</template>
                    </el-input>  
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">2年</template>
                        <template slot="append">%</template>
                    </el-input>  
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">3年</template>
                        <template slot="append">%</template>
                    </el-input>  
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">4年</template>
                        <template slot="append">%</template>
                    </el-input>  
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">5年</template>
                        <template slot="append">%</template>
                    </el-input>              
                  </el-form-item>
              </el-col>
              <el-col :span="24">
                  <el-form-item label="找场地:">
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">永久</template>
                        <template slot="append">%</template>
                    </el-input>  
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">1年</template>
                        <template slot="append">%</template>
                    </el-input>  
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">2年</template>
                        <template slot="append">%</template>
                    </el-input>  
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">3年</template>
                        <template slot="append">%</template>
                    </el-input>  
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">4年</template>
                        <template slot="append">%</template>
                    </el-input>  
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">5年</template>
                        <template slot="append">%</template>
                    </el-input>              
                  </el-form-item>
              </el-col>
              <el-col :span="24">
                  <el-form-item label="找投资:">
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">永久</template>
                        <template slot="append">%</template>
                    </el-input>  
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">1年</template>
                        <template slot="append">%</template>
                    </el-input>  
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">2年</template>
                        <template slot="append">%</template>
                    </el-input>  
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">3年</template>
                        <template slot="append">%</template>
                    </el-input>  
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">4年</template>
                        <template slot="append">%</template>
                    </el-input>  
                    <el-input v-model="input3" style="width:200px;">
                        <template slot="prepend">5年</template>
                        <template slot="append">%</template>
                    </el-input>              
                  </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
  </el-dialog>
  </div>
</template>

<script>
import Operation from './deviceDetail/Operation'
import AMap from './deviceDetail/AMap'
import ShareList from './deviceDetail/ShareList'
import {
  updateDevice, //地理位置
} from '@/api/device/list'
import VueQrcode from '@chenfengyuan/vue-qrcode'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      input3:'',
      addRules:false,
      queryOperLogCound:0,
      activeName2:'1',
      deviceList:[{
        name:111
      }],
      queryOperLog:{
        page:0,
        limit:100
      },
      value:'',
      input:'',
      addForm:{
          name:123123
      },
      form: {},
      valId: '',
      location:''
    }
  },
  // watch: {
  //   detailData(val) {
  //     if(val.location){
  //       this.location = (val.location).split(",")[3]
  //     }
  //     this.init(val)
  //     this.valId = val.id
  //   }
  // },
  methods: {
    res(){
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
    }
  },
  components: {
    Operation,
    AMap,
    VueQrcode,
    ShareList
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
  height: 322px;
  
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
