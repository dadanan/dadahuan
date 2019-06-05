<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="isCreateUserDialogVisible = true">添加</el-button>
        </el-button-group>
      </div>
      <el-table :data="userList" style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="registerNo" label="账号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="昵称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="franName" label="加盟商" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="wxHeadimgurl" label="微信头像" show-overflow-tooltip>
          <template slot-scope="scope">
            <template v-if="scope.row.wxHeadimgurl">
              <img :src="scope.row.wxHeadimgurl" class="table-img">
            </template>
            <template v-else>
              --
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="wxNickName" label="微信昵称" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template v-if="scope.row.wxNickName">
              {{scope.row.wxNickName}}
            </template>
            <template v-else>
              --
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="acctType" label="用户类型" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template v-if="scope.row.acctType == 'web'">
              普通用户
            </template>
            <template v-else-if="scope.row.acctType == 'emp'">
              内部员工
            </template>
            <template v-else-if="scope.row.acctType == 'par'">
              总监
            </template>
            <template v-else-if="scope.row.acctType == 'fran'">
              加盟商
            </template>
            <template v-else-if="scope.row.acctType == 'operator'">
              运营商
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip sortable>
          <template slot-scope="scope">
              <template v-if="scope.row.createTime">
                {{ new Date(scope.row.createTime).toLocaleString() }}
              </template>
              <template v-else>
                --
              </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEditRoleDialog(scope.row)">编辑</el-button>
            <!-- <el-button type="text" @click="deleteUser(scope.row.id)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination :current-page="listQuery.page" :page-sizes="listQuery.pageSizes" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.limit">
      </el-pagination> -->
    </el-card>
    <!-- 添加用户 -->
    <el-dialog top='4vh' :close-on-click-modal=false title="添加系统用户" :visible.sync="isCreateUserDialogVisible">
      <el-form :model='creatingData' :rules='rules' ref='creatingData' label-position="left" label-width="150px">
        <el-form-item label="昵称" prop='name'>
          <el-input v-model="creatingData.name"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop='registerNo'>
          <el-input v-model='creatingData.registerNo'></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input v-model="creatingData.password"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="creatingData.acctType" placeholder="请选择" style="width:300px">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select v-model="creatingData.roleId" multiple collapse-tags  placeholder="请选择" style="width:300px">
            <el-option v-for="item in options" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop='mobileNo'>
          <el-input type='number' v-model="creatingData.mobileNo"></el-input>
        </el-form-item>
        <el-form-item label="绑定微信 Open ID" prop='openId'>
          <el-input v-model="creatingData.openId"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isCreateUserDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="validate('creatingData','webAddUser')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog top='4vh' :close-on-click-modal=false title="编辑系统用户" :visible.sync="isEditUserDialogVisible">
      <el-form label-position="left" label-width="150px" :model='editingData' :rules='rules' ref='editingData'>
        <el-form-item label="昵称" prop='name'>
          <el-input v-model="editingData.name"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="registerNo">
          <el-input v-model='editingData.registerNo' disabled></el-input>
        </el-form-item>
        <el-form-item label="用户类型"  v-if=" editingData.acctType != 'operator' && editingData.acctType != 'fran'">
          <el-select v-model="editingData.acctType" placeholder="请选择" style="width:300px">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型" v-else>
          <el-select v-model="editingData.acctType" placeholder="请选择" disabled style="width:300px">
            <el-option v-for="item in roleList1" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select v-model="editingData.roleIds" multiple collapse-tags  placeholder="请选择"  style="width:300px">
            <el-option v-for="item in options" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop='mobileNo'>
          <el-input type='number' v-model="editingData.mobileNo"></el-input>
        </el-form-item>
        <el-form-item label="绑定微信 Open ID" prop='openId'>
          <el-input v-model="editingData.openId" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码" prop='password'>
          <el-input v-model="editingData.password"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="validate('editingData','editUser')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createUser, getUserList, updateUser, delUser ,getUserById} from '@/api/user'
import { 
  getRegisterUserList,
  webAddUser,
  getRoleList,
  editUserInfo,
  getRegisterUserInfo,
  deleteRole
} from '@/api/zulin'

export default {
  data() {
    return {
      listQuery: {
        length: 100,
        page: 1
      },
      userList: [],
      isCreateUserDialogVisible: false,
      isEditUserDialogVisible: false,
      creatingData: {},
      editingData: {
        roleIds:[],
        acctType:''
      },
      options:[],
      roleList: [
        {
          id: 'web',
          roleName: '普通账号'
        },
        {
          id: 'emp',
          roleName: '员工账号'
        },
        {
          id: 'par',
          roleName: '总监'
        }
      ],
      roleList1:[
        {
          id: 'operator',
          roleName: '运营商'
        },{
          id: 'fran',
          roleName: '加盟商'
        }

      ],
      status: [
        {
          value: 'enable',
          label: '启用'
        },
        {
          value: 'disable',
          label: '禁用'
        },
        {
          value: 'limited',
          label: '限制'
        }
      ],
      rules: {
        registerNo: [
          { max: 15, message: '最大长度为15个字符', trigger: 'blur' },
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        mobileNo: [
          { min: 11, max: 11, message: '长度为11个数字', trigger: 'blur' },
          {
            required: true,
            message: '请输入合法手机号',
            trigger: 'blur'
          }
        ],
        openId: [
          { min: 1, max: 50, message: '最长为50个字符', trigger: 'blur' }
        ],
        password: [
          { max: 40, message: '最长为40个字符', trigger: 'blur' },
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        name: [
          { max: 20, message: '最长为20个字符', trigger: 'blur' },
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    cancel(){
      this.isEditUserDialogVisible = false
      this.editingData.roleIds=[],
      this.editingData.acctType=''
    },
    validate(form, cb) {
      /**
       * 函数式表单验证
       * @param form 表单ref引用名
       * @param cb 验证成功需要调用的函数名
       */
      this.$refs[form].validate(valid => {
        if (valid) {
          this[cb]()
        } else {
          this.$message({
            type: 'error',
            message: '表单验证失败！'
          })
          return false
        }
      })
    },
    getStatusName(value) {
      const status = this.status.filter(item => item.value === value)[0]
      if (status && status.label) {
        return status.label
      }
    },
    showEditRoleDialog(data1) {
      // this.editingData.roleIds = []
      this.isEditUserDialogVisible = true
      getRegisterUserInfo({registerNo:data1.registerNo}).then(res=>{
        this.editingData = res.data
      })
    },
    // 修改
    editUser() {
      editUserInfo(this.editingData).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
          this.isEditUserDialogVisible = false
          this.getRegisterUserList()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    webAddUser() {
      const time = new Date().toISOString()
      webAddUser(this.creatingData).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.isCreateUserDialogVisible = false
          this.getRegisterUserList()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    deleteUser(id) {
      this.$confirm('此操作将永久删除该系统用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRole(id)
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                // 从表格中移除此条数据
                this.userList = this.userList.filter(item => item.id !== id)
              } else {
                this.$message({
                  type: 'error',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '删除失败！'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getUserList() {
      getUserList(this.listQuery).then(res => {
        if (res.code === 200) {
          this.userList = res.data
          const length = res.data.length
          this.listQuery.limit = length
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getUserList()
    },
    getRegisterUserList() {
      getRegisterUserList(this.listQuery).then(res => {
          this.userList = res.data
      })
    },
    getRoleList(){
      getRoleList().then(res=>{
        this.options = res.data
      })
    }
  },
  created() {
    // this.getUserList()
    this.getRoleList()
    this.getRegisterUserList()
  }
}
</script>
<style>
.table-img{
  width: 50%;
}
</style>
