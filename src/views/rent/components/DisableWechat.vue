<template>
  <div>
  <el-dialog class='device-detail-container' top='4vh' width='80%' :close-on-click-modal=false title="禁用规则" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <p>规则基本信息</p>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="124px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="规则名称 :">
                    {{addForm.name}}
                </el-form-item>
                <el-form-item label="计费单位 :">
                    {{addForm.name}}
                </el-form-item>
                <el-form-item label="奖励有限期 :">
                    {{addForm.name}}
                </el-form-item>
              </el-col>
              <el-col :span="6">  
                <el-form-item label="适用产品 :">
                    {{addForm.name}}
                </el-form-item>
                <el-form-item label="计费金额 :">
                    {{addForm.name}}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="适用运营商 :">
                    {{addForm.name}}
                </el-form-item>
                <el-form-item label="奖励有限期 :">
                    {{addForm.name}}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="奖励方案 :">
                    {{addForm.name}}
                </el-form-item>
                <el-form-item label="计费方式 :">
                    {{addForm.name}}
                </el-form-item>
                
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </div>
    <el-card>
        <p>启用该推荐人将使以下设备恢复使用</p>
      <el-table :data="levelList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="设备编号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="设备名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="场所" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="最后上线时间" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="归属" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="createTime" label="工作状态" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template>
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
          </template>
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
  </div>
</template>

<script>
import {
  updateDevice, //地理位置
} from '@/api/device/list'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
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
      addRules:false,
      addForm:{
          name:111
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
  padding: 20px 0px;
  text-align: right;
}
</style>
