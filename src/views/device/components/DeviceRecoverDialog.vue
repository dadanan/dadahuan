<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="设备恢复" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-card>
      <el-form label-width="120px" label-position="left">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="加盟商名称 :">
              <el-select v-model="form.franNo" placeholder="请选择">
                <el-option v-for="item in option" :key="item.id" :label="item.name" :value="item.franNo"> </el-option> 
              </el-select>
            </el-form-item>
             <el-form-item label="加盟商分润比例 :">
              <el-input v-model="form.franPercent" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <br>
    <el-card>
      <el-table :data="list" @selection-change="handleSelectionChange" style="width: 100%" highlight-current-row border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="设备名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="modelName" label="型号名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="deviceNo" label="设备No" show-overflow-tooltip sortable>
        </el-table-column>
      </el-table>
    </el-card>
   
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="recoverDevicePart">确认分配</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { 
  queryToFranFreeDevice,
  patchToFran,
  franList
} from '@/api/zulin'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedDeviceList: [],
      list: [],
      option:[],
      form:{},
      query: {
        length: 100,
        page: 1
      },
      deveceNos:[]
    }
  },
  created () {
    this.queryToFranFreeDevice()
    this.franList()
  },
  methods: {
    franList(){
      franList(this.query).then(res=>{
        this.option = res.data
      })
    },
    queryToFranFreeDevice(){
      queryToFranFreeDevice().then(res=>{
        this.list = res.data
      })
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      for(var i = 0;i<this.selectedDeviceList.length;i++){
        this.deveceNos.push(this.selectedDeviceList[i].deviceNo)
      }
    },
    recoverDevicePart() {
      this.form.deviceNoList =[]
      this.form.deviceNoList = this.deveceNos
      this.$confirm('此操作将分配设备动作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          patchToFran(this.form).then(() => {
            this.$message({
              message: '分配成功！',
              type: 'success'
            })
            this.$emit('update:visible', false)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消分配'
          })
        })
    },
  },
}
</script>
