<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="编辑产品定价" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
      <el-form label-width="130px" class="mb-22" :model="form">
        <el-form-item label="产品名称">
          <el-input v-model="form.name" placeholder="产品名称" disabled></el-input>
        </el-form-item>
       <el-form-item label="产品型号">
        <el-input v-model="form.modelNo" placeholder="产品型号" disabled></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.price" placeholder="价格"></el-input>
      </el-form-item>
        <el-form-item label="产品定价描述">
          <el-input type="textarea" :rows='3' placeholder="产品定价描述..." v-model='form.description' disabled></el-input>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click='editDict'>确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { setPrice } from '@/api/zulin'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      form: {}
    }
  },
  methods: {
    editDict() {
      const s ={}
      s.id = this.form.id
      s.price = this.form.price
      setPrice(s).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '型号定价成功!'
          })
          this.$emit('update:visible', false)
          this.$emit('update-data', this.form)
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    handleCancel() {
      this.$emit('update:visible', false)
    }
  },
  watch: {
    data(val) {
      this.form = val
    }
  }
}
</script>
