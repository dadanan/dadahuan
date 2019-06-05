<template>
  <div class="dashboard-container">
    <el-card>
      <!-- <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-select placeholder="类型">
              <el-option label="充值单号" value="1"></el-option>
              <el-option label="用户昵称" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="关键词"></el-input>
          </el-form-item>
          <div style="flex: 1;"></div>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary">导出</el-button>
          <el-button type="primary" @click="paymentListColumnDialogVisible = true">自定义</el-button>
        </el-button-group>
      </div> -->
      <el-table :data="paymentList" style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="orderNo" label="订单编号" show-overflow-tooltip sortable v-if="paymentListColumnVisible.id">
        </el-table-column>
        <el-table-column prop="franNo" label="加盟商" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="orderAmt" label="金额" show-overflow-tooltip sortable v-if="paymentListColumnVisible.nickname">
          <template slot-scope="scope">
            {{(scope.row.orderAmt)/100}}
          </template>
        </el-table-column>
        <el-table-column prop="ruleName" label="订单内容" show-overflow-tooltip sortable v-if="paymentListColumnVisible.cost">
        </el-table-column>
        <el-table-column prop="deviceNo" label="订单设备" show-overflow-tooltip sortable v-if="paymentListColumnVisible.datetime">
        </el-table-column>
        <el-table-column prop="orderTime" label="订单时间" show-overflow-tooltip sortable v-if="paymentListColumnVisible.type">
          <template slot-scope="scope">
            {{new Date(scope.row.orderTime).toLocaleString()}}
          </template>
        </el-table-column>
        <el-table-column prop="groundName" label="场所" show-overflow-tooltip sortable v-if="paymentListColumnVisible.state">
        </el-table-column>
        <el-table-column prop="groundLocation" label="区域" show-overflow-tooltip sortable v-if="paymentListColumnVisible.state">
        </el-table-column>
        <el-table-column prop="acctNo" label="消费者" show-overflow-tooltip sortable v-if="paymentListColumnVisible.state">
        </el-table-column>
        <el-table-column prop="orderType" label="付款方式" show-overflow-tooltip sortable v-if="paymentListColumnVisible.state">
            <template slot-scope="scope">
              <template v-if="scope.row.orderResult ==''">
                微信支付
              </template>
            </template>
        </el-table-column>
        <el-table-column prop="orderResult" label="订单状态" show-overflow-tooltip sortable v-if="paymentListColumnVisible.state">
          <template slot-scope="scope">
            <template v-if="scope.row.orderResult == 'SplitFail'">
              订单结束
            </template>
            <template v-if="scope.row.orderResult == 'PayClose'">
              支付关闭
            </template>
            <template v-if="scope.row.orderResult == 'SplitSucc'">
              已完成
            </template>
            <template v-if="scope.row.orderResult == 'PaySucc'">
              支付成功
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="分润状态" show-overflow-tooltip sortable v-if="paymentListColumnVisible.state">
          <template slot-scope="scope">
            <template v-if="scope.row.orderResult == 'SplitFail'">
              分润失败
            </template>
            <template v-if="scope.row.orderResult == 'PayClose'">
              订单关闭
            </template>
            <template v-if="scope.row.orderResult == 'SplitSucc'">
              分润成功
            </template>
            <template v-if="scope.row.orderResult == 'PaySucc'">
              待分润
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <template v-if="scope.row.orderResult == 'SplitFail'">
                  <el-button type="primary" @click="validate(scope.row)">确定</el-button>
              </template>
          </template>
        </el-table-column>
      </el-table>
     <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.length" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
    <el-dialog top='4vh' :close-on-click-modal=false title="自定义显示列" :visible.sync="paymentListColumnDialogVisible">
      <el-form inline>
        <el-form-item>
          <el-checkbox v-model="paymentListColumnVisible.id">充值单号</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="paymentListColumnVisible.nickname">用户昵称</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="paymentListColumnVisible.cost">充值金额</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="paymentListColumnVisible.datetime">充值时间</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="paymentListColumnVisible.type">充值方式</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="paymentListColumnVisible.state">充值状态</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="paymentListColumnDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="paymentListColumnDialogVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {orderLists , reSplit} from '@/api/zulin'
export default {
  data() {
    return {
      paymentList:[],
      paymentListColumnVisible: {
        id: true,
        nickname: true,
        cost: true,
        datetime: true,
        type: true,
        state: true
      },
      query:{
        length:100,
        page:1,
      },
      query1:{
        length:10000,
        page:1,
      },
      total:0,
      paymentListColumnDialogVisible: false
    }
  },
  created () {
    this.orderLists()
    this.orderLists1()
  },
  methods: {
    validate(val){
      const s = val.orderNo
      reSplit(s).then(res=>{
        if(res.data){
          this.$message({
            type: 'success',
            message: '重新发起分润成功!'
          })
          this.orderLists()
        }else{
          this.$message({
            type: 'success',
            message: '重新发起分润失败!'
          })
        }
      })
    },
    orderLists(){
      orderLists(this.query).then(res=>{
        this.paymentList = res.data
      })
    },
    orderLists1(){
      orderLists(this.query1).then(res=>{
        this.total = (res.data).length
      })
    },
    handleSizeChange(val) {
      this.query.length = val
      this.orderLists()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.orderLists()
    },

  }
}
</script>
