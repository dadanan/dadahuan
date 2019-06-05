<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="isCreateRoleDialogVisible = true">添加</el-button>
        </el-button-group>
      </div>
      <el-table :data="roleList" style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="roleDesc" label="简介" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="userCount" label="系统用户数量" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template  v-if="scope.row.updateTime">
              <span>{{ new Date(scope.row.updateTime).toLocaleString() }}</span>
            </template>
            <template v-else>
              <span>{{ new Date(scope.row.createTime).toLocaleString() }}</span>
            </template>
          </template>
          <!-- <template slot-scope="scope" v-else>
            <span>{{ new Date(scope.row.updateTime).toLocaleString() }}</span>
          </template> -->
        </el-table-column>
        <!-- <el-table-column prop="lastUpdateTime" label="上次修改时间" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <span>{{ new Date(scope.row.lastUpdateTime).toLocaleString() }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEditRoleDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteRole(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.length" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination> -->
    </el-card>
    <!-- 添加角色 -->
    <el-dialog top='4vh' width=80% :close-on-click-modal=false title="添加角色" :visible.sync="isCreateRoleDialogVisible" >
      <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
        <el-row :gutter="20" style="width: 100%">
          <el-col :span="8">
            <p>页面权限</p>
            <el-tree ref="tree" :data="permissionList" show-checkbox node-key="id" :default-expand-all='true' :props="defaultProps" class="permission-list">
            </el-tree>
          </el-col>
          <el-col :span="8">
            <p>功能权限</p>
            <el-tree ref="tree1" :data="permissionList1" show-checkbox node-key="id" :default-expand-all='true' :props="defaultProps" class="permission-list">
            </el-tree>
          </el-col>
          <el-col :span="8">
            <el-form :rules='rules' ref='addForm' :model='addForm' label-position="left" label-width="150px">
              <el-form-item label="角色名" prop='roleName'>
                <el-input v-model='addForm.roleName'></el-input>
              </el-form-item>
              <el-form-item label="简介" prop='roleDesc'>
                <el-input v-model='addForm.roleDesc'></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isCreateRoleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="validate('addForm','addRole')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色 -->
    <el-dialog top='4vh' width="80%" :close-on-click-modal=false title="编辑角色" :visible.sync="isEditRoleDialogVisible">
      <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
        <el-row :gutter="20" style="width: 100%">
          <el-col :span="8">
            <p>页面权限</p>
            <el-tree :data="permissionList" ref='editTree' show-checkbox node-key="id" :default-expand-all='true' :props="defaultProps" class="permission-list">
            </el-tree>
          </el-col>
          <el-col :span="8">
            <p>功能权限</p>
            <el-tree :data="permissionList1" ref='editTree1' show-checkbox node-key="id" :default-expand-all='true' :props="defaultProps" class="permission-list">
            </el-tree>
          </el-col>
          <el-col :span="8">
            <el-form :model='editingData' :rules='rules' ref='editingData' label-position="left" label-width="150px">
              <el-form-item label="角色名" prop='roleName'>
                <el-input v-model="editingData.roleName"></el-input>
              </el-form-item>
              <el-form-item label="简介" prop='roleDesc'>
                <el-input v-model='editingData.roleDesc'></el-input>
              </el-form-item>
              <!-- <el-form-item label="修改时间">
                <div>{{new Date(editingData.lastUpdateTime).toLocaleString()}}</div>
              </el-form-item>
              <el-form-item label="创建时间">
                <div>{{new Date(editingData.createTime).toLocaleString()}}</div>
              </el-form-item> -->
              <!-- <el-form-item label="系统用户数量">
                <div>{{editingData.userCount}}</div>
              </el-form-item> -->
            </el-form>
          </el-col>
        </el-row>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEditRoleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="validate('editingData','editRole')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPermissions,
  createRole,
  // getRoleList,
  // deleteRole,
  updateRole,
  getRoleDetail
} from '@/api/role'
import { 
  getRoleList,
  getWebPermissionList,       //获取页面权限
  getBackendPermissionList,  //获取页面功能权限
  addRole,                   //添加权限
  getRoleInfo,               //修改权限
  editRole,                   //更新用户
  deleteRole
} from '@/api/zulin'  
export default {
  data() {
    return {
      roleList: [],
      isCreateRoleDialogVisible: false,
      isEditRoleDialogVisible: false,
      permissionList: [],
      permissionList1:[],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      query: {
        length: 50,
        page: 1,
      },
      query1: {
        length: 50,
        page: 1,
      },
      userID: undefined,
      addForm: {
        roleDesc: '',
        roleName: ''
      },
      editingData: {}, // 当前正在编辑的角色数据
      rules: {
        roleName: [
          { max: 15, message: '最大长度为15个字符', trigger: 'blur' },
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ],
        roleDesc: [
          { max: 100, message: '最长为100个字符', trigger: 'blur' },
          {
            required: true,
            message: '请输入角色描述',
            trigger: 'blur'
          }
        ]
      },
      originPermissionData: [],
      originPermissionData1: []

    }
  },
  methods: {
    showEditRoleDialog(data) {
      this.isEditRoleDialogVisible = true
      this.getRoleDetail(data.id)
    },
    getThePermission(id) {
      return this.originPermissionData.filter(item => item.id === id)[0]
    },
    getThePermission1(id) {
      return this.originPermissionData1.filter(item => item.id === id)[0]
    },
    // 修改
    editRole(form) {
      // 首先获取当前用户选择的权限id，然后筛选一遍：如果用户仅仅选择了部分子节点，那么手动把父节点id也添加进来。
      // 为了客户那边添加角色时，树组件正常的显示
      const webPermission = this.$refs.editTree.getCheckedKeys()
      webPermission.forEach(id => {
        const temp = this.getThePermission(id)
        if (temp.parent && !webPermission.includes(temp.parent)) {
          // 如果权限id数组中没有该权限父权限的id，那么手动加进去
          webPermission.push(temp.parent)
        }
      })
      const backendPermission = this.$refs.editTree1.getCheckedKeys()
      backendPermission.forEach(id => {
        const temp = this.getThePermission1(id)
        if (temp.parent && !backendPermission.includes(temp.parent)) {
          // 如果权限id数组中没有该权限父权限的id，那么手动加进去
          backendPermission.push(temp.parent)
        }
      })
      editRole({
        webPermission,
        backendPermission,
        id: this.editingData.id,
        roleDesc: this.editingData.roleDesc,
        roleName: this.editingData.roleName
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
          this.isEditRoleDialogVisible = false
          this.getRoleList()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    getRoleDetail(id) {
      getRoleInfo(id).then(res => {
        console.log(res.data)
        const data = res.data
        this.editingData ={
          roleDesc:data.roleDesc,
          id:data.id,
          roleName:data.roleName
        }
        // 初始化前，手动去除所有的父节点
        // data.permissionList = data.webPermission.filter(item => item.parent)
        this.$refs.editTree.setCheckedNodes(data.webPermission)
        // data.backendPermission = data.backendPermission.filter(item => item.parent)
        this.$refs.editTree1.setCheckedNodes(data.backendPermission)
      })
    },
    deleteRole(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
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
                this.roleList = this.roleList.filter(item => item.id !== id)
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
                message: '删除失败!'
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
    getWebPermissionList() {
      getWebPermissionList().then(res => {
        const data = res.data
        if (data && data.length > 0) {
          this.originPermissionData = data
          this.computePermissionList(data)
        }
      })
    },
    // 功能权限表
    getBackendPermissionList(){
      getBackendPermissionList().then(res=>{
        const data = res.data
        const lengths = data.length
        for(var i = lengths-1;i>=0;i--){
          if(data[i].basicsFlag == 1){
            data.splice((data.indexOf(data[i])),1)
          }
        }
        if (data && data.length > 0) {
          this.originPermissionData1 = data
          this.computePermissionList1(data)
        }
      })
    },
    validate(form, cb) {
      /**
       * 函数式表单验证
       * @param form 表单ref引用名
       * @param cb 验证成功需要调用的函数名
       */
      this.$refs[form].validate(valid => {
        if (valid) {
          this[cb](form)
        } else {
          this.$message({
            type: 'error',
            message: '表单验证失败！'
          })
          return false
        }
      })
    },
    // 添加
    addRole() {
      // 首先获取当前用户选择的权限id，然后筛选一遍：如果用户仅仅选择了部分子节点，那么手动把父节点id也添加进来。
      // 为了客户那边添加角色时，树组件正常的显示
      const webPermission = this.$refs.tree.getCheckedKeys()
      webPermission.forEach(id => {
        const temp = this.getThePermission(id)
        if (temp.parent && !webPermission.includes(temp.parent)) {
          // 如果权限id数组中没有该权限父权限的id，那么手动加进去
          webPermission.push(temp.parent)
        }
      })
      const backendPermission = this.$refs.tree1.getCheckedKeys()
      backendPermission.forEach(id => {
        const temp = this.getThePermission1(id)
        if (temp.parent && !backendPermission.includes(temp.parent)) {
          // 如果权限id数组中没有该权限父权限的id，那么手动加进去
          backendPermission.push(temp.parent)
        }
      })
      const form = {
        webPermission,
        backendPermission,
        roleDesc: this.addForm.roleDesc,
        roleName: this.addForm.roleName
      }
      addRole(form)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.isCreateRoleDialogVisible = false
            this.getRoleList()
            // form.role.id = res.data
            // this.roleList.push({
            //   ...form.role,
            //   userCount: 0
            // })
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
            message: '添加失败'
          })
        })
    },
    computePermissionList1(data) {
      data = JSON.parse(JSON.stringify(data))
      const list = [
        {
          id: data[0].id,
          label: data[0].urlName,
          children: []
        }
      ]
      data.shift()
      data.forEach(item => {
        const parentIndex = list.findIndex(
          element => element.id === item.parent
        )
        if (parentIndex !== -1) {
          // 如果能找到父页面
          list[parentIndex].children.push({
            id: item.id,
            label: item.urlName
          })
          return
        }
        list.push({
          id: item.id,
          label: item.urlName,
          children: []
        })
      })
      this.permissionList1 = list
    },
    /**
     * 解析出合法的权限列表数据
     */
    computePermissionList(data) {
      data = JSON.parse(JSON.stringify(data))
      const list = [
        {
          id: data[0].id,
          label: data[0].authName,
          children: []
        }
      ]
      data.shift()
      data.forEach(item => {
        const parentIndex = list.findIndex(
          element => element.id === item.parent
        )
        if (parentIndex !== -1) {
          // 如果能找到父页面
          list[parentIndex].children.push({
            id: item.id,
            label: item.authName
          })
          return
        }
        list.push({
          id: item.id,
          label: item.authName,
          children: []
        })
      })
      this.permissionList = list
    },
    getRoleList() {
      getRoleList().then(res => {
        if (res.code === 200) {
          this.roleList = res.data
          // const length = res.data.length
          // this.listQuery.limit = length
          // this.listQuery.pageSizes = [length, length * 2, length * 3]
        }
      })
    }
  },
  created() {
    this.getRoleList()
    this.getWebPermissionList()
    this.getBackendPermissionList()
  }
}
</script>

<style lang="scss" scoped>
.el-dialog{
  width:90% !important;
}
.permission-list {
  background-color: #eee;
  border: 1px solid #ddd;
}
</style>
