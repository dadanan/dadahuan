<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="AddOperator= true">添加</el-button>
        </el-button-group>
      </div>
      <add-operator :visible.sync="AddOperator" @add-data='addData'></add-operator>
      <details-dev :visible.sync="DetailsDev" :data='editingData' @update-data='updateData'></details-dev>
      <editor-operator :visible.sync="EditorOperator" :data='editingData' @update-data='updateData'></editor-operator>

      <el-table :data="levelList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="总监名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="franNo" label="加盟商" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="manageArea" label="经营区域" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="manageLocation" label="经营场所" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="registerNo" label="管理帐号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="totalTxnAmt" label="累计营收(元)" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            {{(scope.row.totalTxnAmt)/100}}
          </template>
        </el-table-column>
        <el-table-column prop="referrer1Name" label="推荐人" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="createTime" label="生成时间" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template v-if="scope.row.createTime">
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
            <template v-else>
              --
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="bj(scope.row)">编辑</el-button>
            <el-button type="text" @click="detail(scope.row)">详情</el-button>

            <!-- <el-button type="text" @click="deleteRule(scope.row)">取消总监</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.length" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import AddOperator from './components/AddOperator'
import EditorOperator from './components/EditorOperator'
import DetailsDev from './components/DetailsOperator'




import { 
  partnerList,      //总监列表
  addPartner,        //添加总监
  removePartner,      //删除总监
  getPartnerDetail

} from '@/api/zulin'

export default {
  components: {
    AddOperator,
    DetailsDev,
    EditorOperator
  },
  data() {
    return {
      levelList: [],
      value1: '',
      value2: '',
      value3: '',
      AddOperator: false,
      EditorOperator:false,
      DetailsDev:false,
      query: {
        length: 100,
        page: 1,
      },
      query1: {
        length: 10000,
        page: 1,
      },
      total: 0,
      editingData: {},
      ids: [],
      selectedDeviceList: []
    }
  },
  methods: {
    bj(val){
      this.EditorOperator = true
      this.editingData = val
    },
    detail(val){
      getPartnerDetail(val.id).then(res=>{
        this.DetailsDev = true
        this.editingData = res.data
      })
    },
    partnerList(){
      partnerList(this.query).then(res=>{
        this.levelList = res.data
      })
    },
    partnerList1(){
      partnerList(this.query1).then(res=>{
        this.total = (res.data).length
      })
    },
    detailsDev(){
      this.DetailsDev = true
    },
    reverseDeve(){
      // this.EnableDev = true
    },
    addData(data) {
      this.partnerList()
      // this.levelList.push(data)
    },
    updateData(data) {
      // this.selectList()
    },
    reset(){
      this.query.name = ''
      this.query.status = ''
      this.query.warnLevel = ''
      // this.selectList()
    },
    deleteRule(val) {
      removePartner(val).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '取消成功!'
          })
          this.partnerList()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    forbitRule() {
      this.DisableDev = true
    },
    handleSizeChange(val) {
      this.query.length = val
      this.partnerList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.partnerList()
    },
    editorProcess(data) {
      this.editingData = data
      this.EditorProcess = true
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      // console.log(selection)
    }
  },
  created() {
    this.partnerList()
    this.partnerList1()
  }
}
</script>
