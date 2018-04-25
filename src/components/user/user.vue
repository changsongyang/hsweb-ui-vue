<template>
  <div class="user-wrap">
    <!--添加用户页面-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" center>
      <el-form :model="addForm" ref="addForm">
        <el-form-item label="姓名：" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input v-model="addForm.username" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth">
          <el-input v-model="addForm.password" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="addForm.describe"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveUser">保存</el-button>
      </div>
    </el-dialog>

    <!--编辑页面-->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible" center>
      <el-form :model="editForm" ref="editForm">
        <el-form-item label="姓名：" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input v-model="editForm.username" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth">
          <el-input v-model="editForm.password" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="editForm.describe"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editUser">保存</el-button>
      </div>
    </el-dialog>

    <!--用户赋权页面-->
    <!--<el-dialog title="用户赋权-${name}" :visible.sync="dialogFormVisible" center>
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="菜单设置" name="first">
          <transfer-page :AuthorizedData="AuthorizedData"></transfer-page>
        </el-tab-pane>

        <el-tab-pane label="权限设置" name="second">
          <perm-editor></perm-editor>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveUserPermiss">保存</el-button>
      </div>
    </el-dialog>-->

    <breadcr :meName="meName"></breadcr>

    <el-form :inline="true" :model="searchForm">
      <el-form-item label="姓名">
        <el-input size="small" v-model="searchForm.name$LIKE"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input size="small" v-model="searchForm.username$LIKE"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="showAndUser">添加用户</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="users" highlight-current-row @current-change="currentChange" height="500" border
              style="width: 100%">
      <el-table-column sortable prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column sortable prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="status" label="是否启用" :formatter="formatterColumn" align="center"></el-table-column>
      <el-table-column prop="action" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="showEditUser(scope.$index,scope.row)" plain>编辑</el-button>
          <el-button size="mini" icon="el-icon-edit" type="info" plain @click="showAuthorized">用户赋权</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script type="text/ecmascript-6">
  import Breadcr from 'base/breadcr/breadcr'
  import { getUser, addUser, editUser, searchUser, getMenuList, getPermissionList } from 'api/user'
  import { statusCode } from 'common/js/config'
  import { encodeQueryParam, arrayToTreeArray } from 'common/js/utils'
  import TransferPage from 'components/transfer/transferPage'
  import PermEditor from 'components/permission/permEditor'

  export default{
    data () {
      return {
        AuthorizedData: [],
        AuthorizedFinalData: [],
        AuthorizedMenuData: [],
        AuthorizedPermissionData: [],
        AuthorizedchildrenData: [],
        meName: '用户管理',
        // 搜索数据
        searchForm: {
          name$LIKE: '',
          username$LIKE: ''
        },
        // 添加相关数据
        dialogFormVisible: false,  // 添加页面是否显示
        addForm: {
          name: '',
          username: '',
          password: '',
          describe: ''
        },
        addFormRules: {
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
          describe: [{required: true, message: '备注', trigger: 'blur'}]
        },

        // 编辑相关数据
        editFormVisible: false,   // 编辑页面是否显示
        editFormRules: {
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
          roles: [{required: true, message: '角色', trigger: 'blur'}],
          describe: [{required: true, message: '备注', trigger: 'blur'}]
        },
        editForm: {
          name: '',
          username: '',
          password: '',
          roles: [],
          describe: ''
        },
        users: [],
        formLabelWidth: '80px',
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        currentRow: null,
        activeName: 'first'
      }
    },
    created () {
      this._getUerList()
    },
    /* mounted () {
     this.search()
     }, */
    methods: {
      _getUerList () {
        getUser().then((res) => {
          if (res.status === statusCode) {
            console.log(res.result.data)
            this.users = res.result.data
          }
        })
      },
      showAndUser () {
        this.dialogFormVisible = true
        this.addForm = {
          name: '',
          username: '',
          password: '',
          describe: ''
        }
      },
      saveUser () {
        let that = this
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确定保存吗？', '提示', {}).then(() => {
              let userParams = Object.assign({}, this.addForm)
              addUser(userParams).then((res) => {
                if (res.status === statusCode) {
                  that.$message.success({
                    message: '添加用户成功',
                    duration: 2000
                  })
                  that.$refs['addForm'].resetFields()
                  that.dialogFormVisible = false
                  that.search()
                } else {
                  that.$message.error({
                    message: '添加用户失败',
                    duration: 2000
                  })
                }
              }).catch((error) => {
                console.log(error)
                that.$message.error({
                  showClose: true,
                  message: '请求出现异常',
                  duration: 2000
                })
              })
            })
          }
        })
      },
      showEditUser (index, row) {
        this.editFormVisible = true
        this.editForm = Object.assign(this.editForm, row)
      },
      editUser () {
        let that = this
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            let userParams = Object.assign({}, this.editForm)
            editUser(userParams.id, userParams).then((result) => {
              if (result.status === statusCode) {
                that.$message.success({
                  message: '修改成功',
                  duration: 2000
                })
                that.$refs['editForm'].resetFields()
                that.editFormVisible = false
              } else {
                that.$message.error({
                  message: '修改失败',
                  duration: 2000
                })
                this._getUerList()
              }
            }).catch((error) => {
              console.log(error)
              that.$message.error({
                message: '请求出现异常',
                duration: 2000
              })
            })
          }
        })
      },
      search () {
        this.total = 0
        this.pageIndex = 1
        this.searchUser()
      },
      searchUser () {
        let that = this
        let queryParams = {
          name: encodeQueryParam(that.searchForm)
        }
        let queryParamsPage = {
          pageIndex: that.pageIndex,
          pageSize: that.pageSize,
          sortField: '',
          sortOrder: ''
        }
        searchUser(queryParams.name, queryParamsPage).then((res) => {
          if (res.status === statusCode) {
            that.total = res.total
            this.users = res.result.data
            // this.users = that.data
          }
        }).catch((error) => {
          console.log(error)
          that.$message.error({
            message: '请求出现异常',
            duration: 2000
          })
        })
      },
      currentChange (val) {
        this.currentRow = val
      },
      // 状态显示转换
      formatterColumn (row, column) {
        return row.status === 1 ? '是' : '否'
      },
      // 保存用户赋权
      saveUserPermiss () {
      },
      showAuthorized () {
        this.dialogFormVisible = true
        getPermissionList().then((res) => {
          if (res.status === statusCode) {
            this.AuthorizedPermissionData = Array.from(res.result.data)
            console.log(this.AuthorizedPermissionData)
          }
        })
        getMenuList().then((res) => {
          if (res.status === statusCode) {
            this.AuthorizedMenuData = arrayToTreeArray(Array.from(res.result.data), '-1')
            console.log(this.AuthorizedMenuData)
          }
        })
        this.AuthorizedMenuData.forEach(item => {
          item.leaf = 'NO'
          item.level = '1'
          item.expand = false
          item.children.forEach(itemChild => {
            this.AuthorizedPermissionData.forEach(permissionItem => {
              if (itemChild.name === '综合设置') {
                if (permissionItem.name === '组织架构' || permissionItem.name === '部门管理' || permissionItem.name === '岗位管理' || permissionItem.name === '人员管理') {
                  itemChild.children = Array.from(permissionItem.actions)
                  itemChild.leaf = 'NO'
                  itemChild.level = '2'
                  itemChild.expand = false
                  itemChild.parent = item
                  permissionItem.parent = itemChild
                  this.AuthorizedFinalData.push(permissionItem)
                }
              }
              if (itemChild.name === '机构管理') {
                if (permissionItem.name === '组织架构') {
                  itemChild.children = Array.from(permissionItem.actions)
                  itemChild.leaf = 'NO'
                  itemChild.level = '2'
                  itemChild.expand = false
                  itemChild.parent = item
                  permissionItem.parent = itemChild
                  this.AuthorizedFinalData.push(permissionItem)
                }
              }
              if (itemChild.name === '权限管理') {
                if (permissionItem.name === '权限设置' || permissionItem.name === '权限管理') {
                  itemChild.children = Array.from(permissionItem.actions)
                  itemChild.leaf = 'NO'
                  itemChild.level = '2'
                  itemChild.expand = false
                  itemChild.parent = item
                  permissionItem.parent = itemChild
                  this.AuthorizedFinalData.push(permissionItem)
                }
              }
              if (itemChild.name === permissionItem.name && itemChild.name !== '权限管理') {
                itemChild.children = Array.from(permissionItem.actions)
                itemChild.leaf = 'NO'
                itemChild.level = '2'
                itemChild.expand = false
                itemChild.parent = item
                permissionItem.parent = itemChild
                this.AuthorizedFinalData.push(permissionItem)
                permissionItem.actions.forEach(action => {
                  action.name = action.describe
                  action.leaf = 'YES'
                  action.level = '3'
                  action.expand = false
                  action.parent = permissionItem
                  this.AuthorizedFinalData.push(action)
                })
              }
            })
            this.AuthorizedFinalData.push(itemChild)
          })
          item.children = Array.from(item.children)
          this.AuthorizedFinalData.push(item)
        })
        console.log(this.AuthorizedFinalData)
        this.AuthorizedData = this.AuthorizedMenuData
      }
    },
    components: {
      Breadcr,
      TransferPage,
      PermEditor
    }
  }
</script>

<style scoped lang="scss">

</style>
