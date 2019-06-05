<template>
  <div>
    <el-dialog top='4vh' :close-on-click-modal=false title="加入黑名单" :visible="visible" @update:visible="$emit('update:visible', $event)">
      <el-table :data="deviceList" style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="openid" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="typeId" label="昵称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="mac" label="手机号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop='birthTime' label="头像" show-overflow-tooltip sortable>
        </el-table-column>
      </el-table>
      <el-form>
        <el-form-item label="添加备注">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="description">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取消</el-button>
        <el-button type="primary" @click="createDevice">加入黑名单</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList } from '@/api/device/type'
// import { createDevice } from '@/api/device/list'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      description: '',
      listQuery: {
        limit: 100,
        page: 1
      },
      deviceList: [],
    }
  },
  methods: {
      createDevice(){

      },
  },
  created() {
      
  }
}
</script>
