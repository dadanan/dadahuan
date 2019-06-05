<template>
  <el-dialog class='device-detail-container' top='4vh' width='95%' :close-on-click-modal=false title="微信用户详情" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="80px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="4">
                <el-form-item label="用户昵称 :">
                  {{form.name}}
                </el-form-item>
                <el-form-item label="充值余额 :">
                  {{form.manageName}}
                </el-form-item>
                <el-form-item label="收件地址 :">
                  {{form.manageName}}
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="所在地 :">
                  {{form.bindStatus === 1 ? '已绑定' : '未绑定'}}
                </el-form-item>
                <el-form-item label="赠送余额 :">
                  {{form.mac}}
                </el-form-item>
                <el-form-item label="累计签到 :">
                  {{form.mac}}
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="姓别 :">
                  {{form.assignStatus === 1 ? '已分配' : '未分配'}}
                </el-form-item>
                <el-form-item label="积分 :">
                  {{form.groupName}}
                </el-form-item>
              </el-col>
              <el-col :span="4">  
                <el-form-item label="手机号 :">
                </el-form-item>
                <el-form-item label="累计消费 :" >
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="姓名 :">
                </el-form-item>
                <el-form-item label="商城消费 :" >
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="openid :" >
                </el-form-item>
                <el-form-item label="用户头像 :">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item label="备注信息 :">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.manageName"></el-input>
                  </el-form-item>
                </el-col>
            </el-row> 
          </el-form>         
        </el-card>
      </div>
    </div>
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="订单管理" name="1">
        <div class="table-opts">
          <el-button-group>
            <el-button-group>
              <el-button >今天</el-button>
              <el-button >7天</el-button>
              <el-button >30天</el-button>
              <el-button >全部</el-button>
            </el-button-group>
          </el-button-group>
          <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="margin:0px 20px"> </el-date-picker>
          <el-button size="small" type="primary">搜索</el-button>
          <el-button size="small" type="primary">重置</el-button>
        </div>
        <el-table style="width: 100%" border :data="deviceList1">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="co2" label="订单编号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="hcho" label="设备mac" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="hum" label="设备型号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="pm" label="场所" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="tem" label="收费规则" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="tvoc" label="订单金额" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="订单状态" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="支付方式" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="订单时间" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="操作" show-overflow-tooltip sortable>
            <el-button>订单详情</el-button>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="queryDevice.page" :page-sizes="[50,100,200,300]" :page-size="queryDevice.limit" layout="total, sizes, prev, pager, next, jumper" :total="queryDeviceSensorStatCound">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="充值记录" name="2">
        <div class="table-opts">
          <el-button-group>
            <el-button-group>
              <el-button >今天</el-button>
              <el-button >7天</el-button>
              <el-button >30天</el-button>
              <el-button >全部</el-button>
            </el-button-group>
          </el-button-group>
          <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="margin:0px 20px"> </el-date-picker>
          <el-button size="small" type="primary">搜索</el-button>
          <el-button size="small" type="primary">重置</el-button>
        </div>
        <el-table style="width: 100%" border :data="deviceList1">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="co2" label="充值单号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="hcho" label="用户昵称" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="hum" label="充值金额" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="pm" label="充值规则" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="tem" label="赠送金额" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="tvoc" label="赠送积分" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="充值状态" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="充值方式" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="充值时间" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="操作" show-overflow-tooltip sortable>
            <el-button>订单详情</el-button>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="queryDevice.page" :page-sizes="[50,100,200,300]" :page-size="queryDevice.limit" layout="total, sizes, prev, pager, next, jumper" :total="queryDeviceSensorStatCound">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="商城消费" name="3">
        <div class="table-opts">
          <el-button-group>
            <el-button-group>
              <el-button >今天</el-button>
              <el-button >7天</el-button>
              <el-button >30天</el-button>
              <el-button >全部</el-button>
            </el-button-group>
          </el-button-group>
          <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="margin:0px 20px"> </el-date-picker>
          <el-button size="small" type="primary">搜索</el-button>
          <el-button size="small" type="primary">重置</el-button>
        </div>
        <el-table style="width: 100%" border :data="deviceList1">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="co2" label="订单编号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="hcho" label="用户昵称" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="hum" label="用户手机号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="pm" label="产品" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="tem" label="单价（元）" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="tvoc" label="数量" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="消费金额（元）" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="订单状态" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="支付方式" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="订单时间" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="操作" show-overflow-tooltip sortable>
            <el-button>订单详情</el-button>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="queryDevice.page" :page-sizes="[50,100,200,300]" :page-size="queryDevice.limit" layout="total, sizes, prev, pager, next, jumper" :total="queryDeviceSensorStatCound">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="签到记录" name="4">
        <div class="table-opts">
          <el-button-group>
            <el-button-group>
              <el-button >今天</el-button>
              <el-button >7天</el-button>
              <el-button >30天</el-button>
              <el-button >全部</el-button>
            </el-button-group>
          </el-button-group>
          <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="margin:0px 20px"> </el-date-picker>
          <el-button size="small" type="primary">搜索</el-button>
          <el-button size="small" type="primary">重置</el-button>
        </div>
        <el-table style="width: 100%" border :data="deviceList1">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="co2" label="签到编号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="hcho" label="用户昵称" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="hum" label="签到奖励金额" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="pm" label="签到奖励积分" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="tem" label="签到规则" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="tvoc" label="签到时间" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="操作" show-overflow-tooltip sortable>
            <el-button>订单详情</el-button>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="queryDevice.page" :page-sizes="[50,100,200,300]" :page-size="queryDevice.limit" layout="total, sizes, prev, pager, next, jumper" :total="queryDeviceSensorStatCound">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
// import Operation from './deviceDetail/Operation'
import { selectById } from '@/api/device/model'
import {} from '@/api/device/list'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeTab:'1',
      deviceList1:[],
      form: {},
      queryDevice:{
        page:1,
        limit:100
      },
      queryDeviceSensorStatCound:0,
      value6:''
    }
  },
  // watch: {
  //   detailData(val) {
  //     if(val.location){
  //       this.location = (val.location).split(",")[3]
  //     }
  //     this.init(val)
  //     this.valId = val.id
  //     this.selectById(val.modelId)
  //   }
  // },
  methods: {
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
  min-height: 440px;
}

.flex-item {
  margin: 0 10px;
  &--full {
    flex: 1;
  }
}
</style>
