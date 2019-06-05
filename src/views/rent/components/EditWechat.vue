<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="修改规则" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
      <p>规则基本信息</p>
      <el-form label-width="130px" class="mb-22">
        <el-form-item label="规则名称">
          <el-input v-model="form.name" placeholder="规则名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="适用产品">
          <el-input v-model="form.sort" placeholder="适用产品"></el-input>
        </el-form-item> -->
        <el-form-item label="奖励有效期(秒)">
          <el-input v-model="form.time" placeholder="奖励有效期"></el-input>
        </el-form-item>
        <el-form-item label="计费金额">
          <el-input v-model="form.amount" placeholder="奖励有效期"></el-input>
        </el-form-item>
        <el-form-item label="规则描述">
          <el-input type="textarea" :rows='3' placeholder="实施阶段描述..." v-model='form.description'></el-input>
        </el-form-item>
        <el-form-item >
        </el-form-item>
      </el-form>
      <!-- <p>收费设置</p>
      <el-form label-width="130px" class="mb-22" :model="form" :rules="rules" ref="form">
        <el-form-item label="计费方式" prop="label">
           <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> 
           </el-select>
        </el-form-item>
        <el-form-item label="计费单位">
          <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> 
           </el-select>
        </el-form-item>
        <el-form-item label="计费金额（元）">
          <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> 
           </el-select>
        </el-form-item>
        <el-form-item >
        </el-form-item>
      </el-form>
      <p>奖励设置</p>
      <el-form label-width="130px" class="mb-22" :model="form" :rules="rules" ref="form">
        <el-form-item label="奖励方案" prop="label">
           <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> 
           </el-select>
        </el-form-item>
        <el-form-item label="奖励设置">
          <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> 
           </el-select>
        </el-form-item>
      </el-form> -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click='addDict'>确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { 
  editProductRule
 } from '@/api/zulin'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data:{
      type:Object
    }
  },
  data() {
    return {
      options: [],
      value: '',
      form: {
      },
      // rules: {
      //   label: [
      //     { required: true, message: '请输入实施阶段名称', trigger: 'blur' },
      //     { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
      //   ],
      //   description: [
      //     { required: true, message: '请输入实施阶段描述', trigger: 'blur' },
      //     { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
      //   ]
      // }
    }
  },
  watch: {
    data(val){
      this.form = val
    }
  },
  methods: {
    addDict() {
      editProductRule(this.form).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$emit('update:visible', false)
          this.$emit('add-data', this.form)
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
  }
}
</script>
<style lang='scss'>
.color{
  color: #969696
}
</style>