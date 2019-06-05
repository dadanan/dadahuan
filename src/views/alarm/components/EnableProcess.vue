<template>
  <div>
  <el-dialog class='device-detail-container' top='4vh' width='80%' :close-on-click-modal=false title="启用场地" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <p>场地基本信息</p>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="118px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="场地名称 :">
                    {{addForm.name}}
                </el-form-item>
                <el-form-item label="场所地址 :">
                    {{addForm.name}}
                </el-form-item>
                <el-form-item label="运营状态 :">
                    {{addForm.name}}
                </el-form-item>
              </el-col>
              <el-col :span="6">  
                <el-form-item label="联系人 :">
                    {{addForm.name}}
                </el-form-item>
                <el-form-item label="场所面积 :">
                    {{addForm.name}}
                </el-form-item>
                <el-form-item label="注册时间 :">
                    {{addForm.name}}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="电话 :">
                    {{addForm.name}}
                </el-form-item>
                <el-form-item label="场所用途 :">
                    {{addForm.name}}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="设备数量 :">
                    {{addForm.name}}
                </el-form-item>
                <el-form-item label="业务相关人(内) :">
                    {{addForm.name}}
                </el-form-item>
                
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </div>
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <!-- <el-form-item>
            <el-input placeholder="输入名称" v-model="query.name"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-select placeholder="区域" v-model="query.linkType">
              <el-option label="上海" value="1"></el-option>
              <el-option label="北京" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="业务分类" v-model="query.warnLevel">
              <el-option label="内部" value="1"></el-option>
              <el-option label="外部" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="场地名称" v-model="query.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="addRules = true">添加</el-button>
          <el-button type="primary" @click="AddProcess = true">删除</el-button>

        </el-button-group>
      </div>
      <el-table :data="levelList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="场地代号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="场地名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="区域" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="负责人" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="管理帐号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="createTime" label="设备数量" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template>
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="累计营收" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="场所状态" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="备注信息" show-overflow-tooltip sortable>
        </el-table-column>
      </el-table>
      <!-- <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination> -->
    </el-card>
    <div class="btn">
      <el-button type="primary">取消</el-button>
      <el-button type="primary">确认添加</el-button>
    </div>
  </el-dialog>
    <el-dialog top='4vh' :close-on-click-modal=false title="添加设备" :visible.sync="addRules">
      <el-form label-width="118px" label-position="left">
        <el-form-item label="设备型号 :" prop="SN">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> 
          </el-select>
        </el-form-item>
        <el-form-item label="收费规则 :" prop="SN">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> 
          </el-select>
        </el-form-item>
        <el-form-item label="分润规则 :" prop="SN">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> 
          </el-select>
        </el-form-item>
        <el-table :data="levelList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="场地代号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="场地名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="区域" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="负责人" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="管理帐号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="createTime" label="设备数量" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template>
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="累计营收" show-overflow-tooltip sortable>
        </el-table-column>
      </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addRules = false">确定</el-button>
      </div>
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
    },
    editingData:{
      type:Object
    }
  },
  data() {
    return {
      addRules:false,
      query: {
        limit: 100,
        page: 1,
        type: ''
      },
      levelList:[{
        name:1
      }],
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
      input:'',
      total:0,
      addRules:false,
      addForm:{
          name:111
      },
      form: {},
      valId: '',
      location:''
    }
  },
  watch: {
    editingData(val) {
      console.log(val)
      // if(val.location){
      //   this.location = (val.location).split(",")[3]
      // }
      // this.init(val)
      // this.valId = val.id
    }
  },
  methods: {
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
