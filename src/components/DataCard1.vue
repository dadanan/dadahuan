<template>
  <div class="data-card">
    <div class="data-card__body">
      <!-- <font-awesome-icon v-if="icon" :icon="icon" class="data-card__icon"></font-awesome-icon> -->
      <span class="data-card__content">
        <span class="data-card__title">{{ name }}</span>
        <br>
        <el-input v-model="vals" placeholder="请输入内容" @blur="changs(name,id,vals)"></el-input>
      </span>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import {
  baseParamEdit
} from "@/api/zulin"

export default {
  components: {
    CountTo
  },
  data(){
    return{
      ids:0,
      vals:this.value,
      baseParamDetailList:[]
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      default: 0.00
    },
    id: {
      type: Number
    }
  },
  watch: {
    value(val){
      console.log(val)
      this.vals = val
    }
  },
  created() {
    Object.assign({}, this.options, {})
  },
  methods: {
    changs(nm,ids,val){
      if(nm == '每日提现最小金额' || nm == '每日提现最大金额'){
        this.baseParamDetailList=[
        {
          id:ids,
          paramValue:val*100
        }
      ]
      }else{
        this.baseParamDetailList=[
          {
            id:ids,
            paramValue:val
          }
        ]
      }
      
      baseParamEdit({baseParamDetailList:this.baseParamDetailList}).then(res=>{
        if(res.data){
           this.$message({
              type: 'success',
              message: '参数修改成功!'
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.data-card {
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #d3dce6;
  color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  &__body {
    display: flex;
  }
  &__icon {
    height: 60px;
    width: 60px;
    margin-right: 20px;
  }
  &__content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__title {
    font-size: 14px;
    margin-bottom: 0px;
    white-space: nowrap;
  }
  &__data {
    font-size: 20px;
    white-space: nowrap;
  }
}
</style>
