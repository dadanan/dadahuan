<template>
  <div class="set dashboard-container">
    <div v-for="item in frans" :key="item.id" v-if="!inResize">
      <h3>{{item.name}}</h3>
      <div v-for="items in item.franLists" :key="items.id">
        <p>提现规则</p>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :lg="4" v-for="datas in items.reflect" :key="datas.id">
            <data-card :id="datas.id" :name="datas.name" :value="datas.value" :unit="datas.unit" :style="{ backgroundColor: '#58D68D' }"></data-card>
          </el-col>
        </el-row>
        <p>默认分润比例设置</p>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :lg="4" v-for="datas in items.fenrun" :key="datas.id">
            <data-card :id="datas.id" :name="datas.name" :value="datas.value" :unit="datas.unit" :style="{ backgroundColor: '#5DADE2' }"></data-card>
          </el-col>
        </el-row>
        <p>设备购买分润比例设置</p>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :lg="4" v-for="datas in items.buy" :key="datas.id">
            <data-card :id="datas.id" :name="datas.name" :value="datas.value" :unit="datas.unit" :style="{ backgroundColor: '#5DADE2' }"></data-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import DataCard from '@/components/DataCard1'
import { baseParam , franList } from '@/api/zulin'
import { getCurrentUser } from '@/api/user'

import Vue from 'vue'

export default {
  data() {
    return {
      query:{
        length:1000,
        page:1
      },
      inResize:false,
      kanbanData: {
          reflect: [{
              id: 100,
              name: '每日提现最小金额',
              value: 0,
            },
            {
              id: 101,
              name: '每日提现最大金额',
              value: 0,
            },
            {
              id: 102,
              name: '每日提现最大次数',
              value: 0,
            },
            {
              id: 122,
              name: '提现税率',
              value: 0,
            },
            {
              id: 123,
              name: '提现费率',
              value: 0,
            }
          ],
          fenrun: [{
                  id: 105,
                  name: '公众号分润最低比例',
                  value: 0,
                },
                {
                  id: 106,
                  name: '加盟商分润最低比例',
                  value: 0,
                },
                {
                  id: 107,
                  name: '场地主分润默认值',
                  value: 0,
                },
                {
                  id: 108,
                  name: '设备主分润默认值',
                  value: 0,
                },
                {
                  id: 109,
                  name: '场地主推荐人分润默认值',
                  value: 0,
                },
                {
                  id: 110,
                  name: '设备主推荐人分润默认值',
                  value: 0,
                },
                {
                  id: 111,
                  name: '场地主二级推荐人分润默认值',
                  value: 0,
                },
                {
                  id: 112,
                  name: '设备主二级推荐人分润默认值',
                  value: 0,
                },
                {
                  id: 113,
                  name: '总监分润比例',
                  value: 0,
                },
                {
                  id: 114,
                  name: '育成总监的总监分润比例',
                  value: 0,
                }
          ],
          buy:[{
                id: 115,
                name: '一级推荐人分润比例',
                value: 0,
              },
              {
                id: 116,
                name: '二级推荐人分润比例',
                value: 0,
              },
              {
                id: 117,
                name: '总监/育成总监分润比例',
                value: 0,
              },
              {
                id: 118,
                name: '育成总监的总监分润比例',
                value: 0,
              },
              {
                id: 119,
                name: '管理员分润比例',
                value: 0,
              }
          ]
      },
      frans:[],
      userLogin:{}
      // franLists:[]
    }
  },
  methods: {
    getCurrentUser(){
      getCurrentUser().then(res=>{
        this.userLogin = res.data
        this.franList()
      })
    },
    franList(){
      franList(this.query).then(res=>{
        this.frans = res.data
        if(this.userLogin.franNo == "" || this.userLogin.franNo == null){
          this.frans.unshift({
            adminRegisterNo: "",
            createTime: "",
            createUser: '',
            franNo: null,
            id: 10000,
            isDelete: 0,
            mobileNo: "",
            name: "运营商",
            orgName: null,
            referrerPercent:'',
            updateTime: '',
            updateUser: ''
          })
        }
        
        this.baseParam()
      })
    },
    baseParam(){
      baseParam(this.query).then(res=>{
        const data = res.data
        for(var a = 0;a<this.frans.length ;a++){
          const dataList = []
          this.frans[a].franLists = []
          for(var j = 0;j<data.length;j++){
            if(this.frans[a].franNo == data[j].franNo){
              dataList.push(data[j])
            }
          }
          let lists ={
              reflect: [{
                  id: 100,
                  name: '每日提现最小金额',
                  value: 0,
                },
                {
                  id: 101,
                  name: '每日提现最大金额',
                  value: 0,
                },
                {
                  id: 102,
                  name: '每日提现最大次数',
                  value: 0,
                },
                {
                  id: 122,
                  name: '提现税率',
                  value: 0,
                },
                {
                  id: 123,
                  name: '提现费率',
                  value: 0,
                }
              ],
              fenrun: [{
                  id: 105,
                  name: '公众号分润最低比例',
                  value: 0,
                },
                {
                  id: 106,
                  name: '加盟商分润最低比例',
                  value: 0,
                },
                {
                  id: 107,
                  name: '场地主分润默认值',
                  value: 0,
                },
                {
                  id: 108,
                  name: '设备主分润默认值',
                  value: 0,
                },
                {
                  id: 109,
                  name: '场地主推荐人分润默认值',
                  value: 0,
                },
                {
                  id: 110,
                  name: '设备主推荐人分润默认值',
                  value: 0,
                },
                {
                  id: 111,
                  name: '场地主二级推荐人分润默认值',
                  value: 0,
                },
                {
                  id: 112,
                  name: '设备主二级推荐人分润默认值',
                  value: 0,
                },
                {
                  id: 113,
                  name: '总监分润比例',
                  value: 0,
                },
                {
                  id: 114,
                  name: '育成总监的总监分润比例',
                  value: 0,
                }
              ], 
              buy:[{
                id: 115,
                name: '一级推荐人分润比例',
                value: 0,
              },
              {
                id: 116,
                name: '二级推荐人分润比例',
                value: 0,
              },
              {
                id: 117,
                name: '总监/育成总监分润比例',
                value: 0,
              },
              {
                id: 118,
                name: '育成总监的总监分润比例',
                value: 0,
              },
              {
                id: 119,
                name: '管理员分润比例',
                value: 0,
              }
          ]}
          for(var i=0;i<dataList.length;i++){
              const reflect = lists.reflect
              const fenrun = lists.fenrun
              const buy = lists.buy
              // 设备购买
                if(dataList[i].description == '设备购买一级推荐人分润比例'){
                  buy[0].id = dataList[i].id
                  buy[0].value = Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,4})?/))
                }
                if(dataList[i].description == '设备购买二级推荐人分润比例'){
                  buy[1].id = dataList[i].id
                  buy[1].value = Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,4})?/))
                }
                if(dataList[i].description == '设备购买总监/育成总监分润比例'){
                  buy[2].id = dataList[i].id
                  buy[2].value = Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,4})?/))
                }
                if(dataList[i].description == '设备购买育成总监的总监分润比例'){
                  buy[3].id = dataList[i].id
                  buy[3].value = Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,4})?/))
                }
                if(dataList[i].description == '设备购买管理员分润比例'){
                  buy[4].id = dataList[i].id
                  buy[4].value = Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,4})?/))
                }
              // 提现规则
                if(dataList[i].description == '每日提现最小金额'){
                  reflect[0].id = dataList[i].id
                  reflect[0].value = parseInt((dataList[i].parameterBodyVo)/100)
                }
                if(dataList[i].description == '每日提现最大金额'){
                  reflect[1].id = dataList[i].id
                  reflect[1].value = parseInt((dataList[i].parameterBodyVo)/100)
                }
                if(dataList[i].description == '每日提现最大次数'){
                  reflect[2].id = dataList[i].id
                  reflect[2].value = parseInt(dataList[i].parameterBodyVo)
                }
                if(dataList[i].description == '提现税率'){
                  reflect[3].id = dataList[i].id
                  reflect[3].value =Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,4})?/))
                }
                if(dataList[i].description == '提现费率'){
                  reflect[4].id = dataList[i].id
                  reflect[4].value =Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,4})?/))
                }
                // 分润
                if(dataList[i].description == '公众号分润最低比例'){
                  fenrun[0].id = dataList[i].id
                  // fenrun[0].value = (dataList[i].parameterBodyVo)
                 fenrun[0].value = Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,2})?/))
                }
                if(dataList[i].description == '加盟商分润最低比例'){
                  fenrun[1].id = dataList[i].id
                  fenrun[1].value = Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,4})?/))
                }
                if(dataList[i].description == '场地主分润默认值'){
                  fenrun[2].id = dataList[i].id
                  fenrun[2].value = Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,4})?/))
                }
                if(dataList[i].description == '设备主分润默认值'){
                  fenrun[3].id = dataList[i].id
                  fenrun[3].value = Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,4})?/))
                }
                if(dataList[i].description == '场地主推荐人分润默认值'){
                  fenrun[4].id = dataList[i].id
                  fenrun[4].value = Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,4})?/))
                }
                if(dataList[i].description == '设备主推荐人分润默认值'){
                  fenrun[5].id = dataList[i].id
                  fenrun[5].value = Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,4})?/))
                }
                if(dataList[i].description == '场地主二级推荐人分润默认值'){
                  fenrun[6].id = dataList[i].id
                  fenrun[6].value = Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,4})?/))
                }
                if(dataList[i].description == '设备主二级推荐人分润默认值'){
                  fenrun[7].id = dataList[i].id
                  fenrun[7].value = Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,4})?/))
                }
                if(dataList[i].description == '总监分润比例'){
                  fenrun[8].id = dataList[i].id
                  fenrun[8].value = Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,4})?/))
                }
                if(dataList[i].description == '育成总监的总监分润比例'){
                  fenrun[9].id = dataList[i].id
                  fenrun[9].value = Number((dataList[i].parameterBodyVo).toString().match(/^\d+(?:\.\d{0,4})?/))
                }
          } 
          this.frans[a].franLists.push(lists)
        }
        this.inResize = true;
        Vue.nextTick(t => {
            this.inResize = false;
        })
      })
    }
  },
  components: {
    DataCard
  },
  created() {
    // this.baseParam()
    this.getCurrentUser()
  }
}
</script>

<style lang='scss'>
.sld-inside {
  display: flex;
  align-items: center;
  .sld-input {
    width: 50%;
  }
  p {
    font-size: 15px;
    line-height: 1;
  }
}
.set {
  padding: 30px 30px 30px 50px;
  background: #fff;
}
.tool {
  text-align: right;
  font-size: 24px;
  color: #646464;
}
.color{
  color: #969696
}
</style>