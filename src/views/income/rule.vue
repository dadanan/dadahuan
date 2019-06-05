<template>
  <div class="dashboard-container">
    <div class="table-opts">
      <el-form :inline="true" class="el-form--flex">
        <el-form-item>
          <el-input placeholder="请输入查询名称" v-model="query.registName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card>
      <!-- <add-wechat :visible.sync="addWechat"  @add-data='addData'></add-wechat> -->
      <edit-wechat :visible.sync="editWechat" :data ='editingData'></edit-wechat>
      <!-- <enable-wechat :visible.sync="EnableWechat" :data ='editingData'></enable-wechat>
      <disable-wechat :visible.sync="DisableWechat" :data ='editingData'></disable-wechat> -->

      <!-- <deta-wechat :visible.sync="detaWechat" ></deta-wechat> -->
      <el-table :data="alarmList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="orderNo" label="订单编号" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="franNo" label="加盟商" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="registerNo" label="提款账号" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="cardNo" label="银行帐号" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="bankBranch" label="开户行" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="cardMasterName" label="姓名" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="orderAmt" label="提现金额(元)" show-overflow-tooltip >
            <template slot-scope="scope">
                {{(scope.row.orderAmt)/100}}
            </template>
        </el-table-column>
        <el-table-column prop="resultAmt" label="应付金额(元)" show-overflow-tooltip >
          <template slot-scope="scope">
                {{(scope.row.resultAmt)/100}}
            </template>
        </el-table-column>
        <el-table-column prop="updateUser" label="审核人" show-overflow-tooltip >
        </el-table-column>
        <!-- <el-table-column prop="updateUser" label="审核人" show-overflow-tooltip >
        </el-table-column> -->
        <el-table-column prop="updateTime" label="审核时间" show-overflow-tooltip >
          <template slot-scope="scope">
            <template v-if="scope.row.updateTime">
              {{new Date(scope.row.updateTime).toLocaleString()}}
            </template>
            <template v-else>
               -- 
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="orderResult" label="提现状态" show-overflow-tooltip >
            <template slot-scope="scope">
                <template v-if="scope.row.orderResult == 'PayWait'">
                    待通过
                </template>
                <template v-else-if="scope.row.orderResult == 'SplitSucc'">
                    已完成
                </template>
                <template v-else-if="scope.row.orderResult == 'PayFail'">
                    已拒绝
                </template>
                <template v-else-if="scope.row.orderResult == 'PaySucc' || scope.row.orderResult == 'SplitFail'">
                    未入账
                </template>
            </template>
        </el-table-column>
        <el-table-column prop="orderTime" label="订单时间" show-overflow-tooltip >
          <template slot-scope="scope">
            <template>
              {{new Date(scope.row.orderTime).toLocaleString()}}
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <template v-if="scope.row.orderResult == 'PayWait'">
                <el-button type="text" @click="EditWechat(scope.row,1)">通过</el-button>
                <el-button type="text" @click="EditWechat(scope.row,2)">拒绝</el-button>
              </template>
              <template v-else-if="scope.row.orderResult == 'SplitSucc'">
                    已完成
                </template>
                <template v-else-if="scope.row.orderResult == 'PayFail'">
                    已拒绝
                </template>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.length" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import EditWechat from './components/DisableBill'
import { selectList , deleteDict } from '@/api/rent'
import { disableDict ,enableDict } from '@/api/alarm'
import { 
    withdrawList,   //申请列表
    withdrawMark    //申请审批
 } from '@/api/zulin'



export default {
  components: {
    // AddWechat,
    EditWechat,
    // DetaWechat,
    // EnableWechat,
    // DisableWechat
  },
  data() {
    return {
      alarmList:[],
      addWechat:false,
      editWechat:false,
      detaWechat:false,
      EnableWechat:false,
      DisableWechat:false,
      query:{
        length:100,
        page:1,
        registName:''
      },
      query1:{
        length:10000,
        page:1,
        registName:''
      },
      total:0,
      selectedDeviceList:[],
      ids:[],
      editingData:{}
    }
  },
  methods: {
    search(){
      this.withdrawList()
    },
    addData(data) {
      this.alarmList.push(data)
      this.withdrawList()
    },
    withdrawList() {
      withdrawList(this.query).then(res => {
        this.alarmList = res.data
      })
    },
    withdrawList1() {
      withdrawList(this.query1).then(res => {
        this.total = (res.data).length
      })
    },
    disableDict() {
      this.DisableWechat = true
    },
    enableDict() {
      this.EnableWechat = true
    },
    handleSizeChange(val) {
      this.query.length = val
      this.withdrawList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.withdrawList()
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      for(var i=0;i<this.selectedDeviceList.length;i++){
        this.ids.push(this.selectedDeviceList[i].id)
      }
      // if (this.selectedDeviceList.length) {
      //   this.unassignStatus = this.selectedDeviceList[0].assignStatus
      // }
    },
    EditWechat(data,val){
        let s = ''
        if(val == 1){
            s = 'PaySucc'
        }else{
            s= 'PayFail'
        }
        const resule = {
            id:data.id,
            orderResult:s
        }
        withdrawMark(resule).then(res=>{
             this.$message({
                type: 'success',
                message: '标记成功!'
            })
            this.withdrawList()
        })
    }

  },
  created () {
     this.withdrawList()
     this.withdrawList1()
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 360px;
  width: 100%;
}
</style>
