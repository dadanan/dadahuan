<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <!-- <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-input placeholder="按工程名称搜索" v-model="query.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="告警级别" v-model="query.warnLevel">
              <el-option label="一级告警" value="1"></el-option>
              <el-option label="二级告警" value="2"></el-option>
              <el-option label="三级告警" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="状态" v-model="query.flowStatus">
              <el-option label="待分配" value="1"></el-option>
              <el-option label="待审核" value="2"></el-option>
              <el-option label="待处理" value="3"></el-option>
              <el-option label="待归档" value="4"></el-option>
              <el-option label="完成" value="5"></el-option>
              <el-option label="忽略" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="queryWarnJob">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form> -->
      </div>
      <!-- CreateLevel -->
     <!-- <create-level :visible.sync="CreateLevel" :data='editingDataCre' @add-data='addData'></create-level>
      <deal-level :visible.sync="DealLevel" :data='editingData'></deal-level>
      <audit-deal-level :visible.sync="AuditDealLevel" :data='editingDataD' @add-data='addData'></audit-deal-level> -->

      <el-table :data="levelList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="title" label="报警名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="content" label="报警描述" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="deviceNo" label="设备No" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="type" label="告警类型" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template v-if='scope.row.type == 1'>
              电子围栏告警
            </template>
            <template v-else>
               未知
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="warnTime" label="报警日期" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template>
              {{new Date(scope.row.warnTime).toLocaleString()}}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="flowStatus" label="状态" show-overflow-tooltip sortable>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.length" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script> 
import {
  warnList
} from '@/api/zulin'
export default {
  data() {
    return {
      levelList: [],
      value1: '',
      value2: '',
      value3: '',
      query: {
        length: 100,
        page: 1
      },
      query1: {
        length: 10000,
        page: 1
      },
      total: 0,
      selectedDeviceList: [],
      ids: [],
      activeTab: '1',
    }
  },
  methods: {
    reset(){
      this.query.name = ''
      this.query.status = ''
      this.query.warnLevel = ''
      this.query.linkType =''
      this.warnList()
    },
    warnList() {
      warnList(this.query).then(res => {
        const list = res.data
        this.levelList = list
      })
    },
     warnList1() {
      warnList(this.query1).then(res => {
        this.total = (res.data).length
      })
    },
    handleSizeChange(val) {
      this.query.limit = val
      this.warnList()
    },
    handleCurrentChange(val) {
      this.query.currentPage = val
      this.warnList()
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
  },
  created() {
    this.warnList()
    this.warnList1()
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 230px;
  width: 100%;
}
.btn {
  text-align: center;
  color: #646464;
  h2 {
    padding-top: 20px;
    font-size: 50px;
  }
}
</style>
