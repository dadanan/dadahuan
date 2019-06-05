<template>
  <div>
  <el-dialog class='device-detail-container' top='4vh' width='95%' :close-on-click-modal=false title="规则详情" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <p>规则基本信息</p>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="118px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="规则名称 :">
                  {{addForm.name}}
                </el-form-item>
                <el-form-item label="计费单位 :">
                  {{addForm.name}}
                </el-form-item>
              </el-col>
              <el-col :span="6">    
                <el-form-item label="适用产品:">
                  {{addForm.name}}
                </el-form-item>
                <el-form-item label="计费金额:">
                  {{addForm.name}}
                </el-form-item>
              </el-col>
              <el-col :span="6">  
                <el-form-item label="适用运营商 :">
                  {{addForm.name}}
                </el-form-item>
                <el-form-item label="计费方式 :">
                  {{addForm.name}}               
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="奖励方案 :">
                  {{addForm.name}}               
                </el-form-item>
                <el-form-item label="奖励有限期 :">
                  {{addForm.name}}               
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card class="el-card--solid">
          <el-form label-width="110px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="备注信息:">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>                
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </div>
    <el-tabs v-model="activeName2" type="card">
      <el-tab-pane label="计费规则" name="1">
        <el-table style="width: 100%" border :data="deviceList">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="name" label="设备编号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="设备名称" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="设备型号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="场所" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="收费规则" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="告警状态" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="最后上线时间" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="在线状态" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{new Date(scope.row.operateTime).toLocaleString()}}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="工作状态" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <template v-if='scope.row.responseTime'>
                {{new Date(scope.row.responseTime).toLocaleString()}}
              </template>
              <template v-else>
                - -
              </template>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="queryOperLog.page" :page-sizes="[50,100,200,300]" :page-size="queryOperLog.limit" layout="total, sizes, prev, pager, next, jumper" :total="queryOperLogCound">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="营收统计" name="2">
        暂无开发
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button>取消</el-button>
      <el-button type="primary">确定</el-button>
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
      queryOperLogCound:0,
      activeName2:'1',
      deviceList:[{
        name:111
      }],
      queryOperLog:{
        page:0,
        limit:100
      },
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
      addForm:{
          name:123123
      },
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
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
