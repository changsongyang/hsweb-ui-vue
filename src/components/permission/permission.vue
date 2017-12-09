<template>
  <div class="auth-wrap">
    <!--添加权限页面-->
    <el-dialog title="添加权限" :visible.sync="dialogFormVisible" center>
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <permission-info :formData="addForm" ref="addForm"></permission-info>
        </el-tab-pane>

        <el-tab-pane label="数据视图" name="second">
          <permission-view :formData="addForm" ref="addForm"></permission-view>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savePermiss">保存</el-button>
      </div>
    </el-dialog>

    <breadcr :meName="meName"></breadcr>

    <el-form :inline="true" :model="searchForm">
      <el-form-item label="ID">
        <el-input size="small" v-model="searchForm.id$LIKE"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input size="small" v-model="searchForm.name$LIKE"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input size="small" v-model="searchForm.describe$LIKE"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="showAndPermiss">添加权限</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="permissions" highlight-current-row @current-change="currentChange" height="500" border style="width: 100%">
      <el-table-column type="index" align="center"></el-table-column>
      <el-table-column sortable prop="id" label="ID" align="center"></el-table-column>
      <el-table-column sortable prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center"></el-table-column>
      <el-table-column prop="describe" label="备注" align="center"></el-table-column>
      <el-table-column prop="action" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button size="mini" type="danger" @click="delPermiss(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagin></pagin>
  </div>
</template>

<script type="text/ecmascript-6">
  import Pagin from 'base/pagin/pagin'
  import Breadcr from 'base/breadcr/breadcr'
  import { getPermissList, searchPermiss, delPermiss } from 'api/permission'
  import { statusCode } from 'common/js/config'
  import {encodeQueryParam} from 'common/js/utils'
  import PermissionInfo from 'components/permission-info/permission-info'
  import PermissionView from 'components/permission-view/permission-view'

  export default{
    data () {
      return {
        meName: '权限管理',
        searchForm: {
          id$LIKE: '',
          name$LIKE: '',
          describe$LIKE: ''
        },
        permissions: [],
        // 添加相关数据
        dialogFormVisible: false,
        addForm: {
          id: '',
          name: '',
          describe: ''
        },
        addFormRules: {
          id: [{required: true, message: '请输入权限标识(ID)', trigger: 'blur'}],
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
          describe: [{required: true, message: '备注', trigger: 'blur'}]
        },
        currentRow: null,
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        value: '',
        formLabelWidth: '183px',
        activeName: 'first'
      }
    },
    mounted () {
      this._getPermissList()
    },
    computed: {
      renderStatus () {
        return this.status === 1 ? '正常' : '失败'
      }
    },
    methods: {
      _getPermissList () {
        getPermissList().then((res) => {
          if (res.status === 200) {
            this.permissions = res.result.data
          }
        })
      },
      search () {
        this.total = 0
        this.pageIndex = 1
        this.searchPermiss()
      },
      searchPermiss () {
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
        searchPermiss(queryParams.name, queryParamsPage).then((res) => {
          if (res.status === statusCode) {
            that.total = res.total
            this.permissions = res.result.data
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
      delPermiss (index, row) {
        let that = this
        this.$confirm('确定删除该权限？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delPermiss(row.id).then((res) => {
            if (res.status === statusCode) {
              that.$message.success({
                message: '删除成功',
                duration: 1500
              })
              that.search()
            }
          }).catch((error) => {
            console.log(error)
            that.$message.error({
              message: '请求出现异常',
              duration: 2000
            })
          })
        })
      },
      savePermiss () {
//        this.dialogFormVisible = true
//        this.addForm = {
//          id: '',
//          name: '',
//          describe: ''
//        }
      },
      showAndPermiss () {
        /* let that = this
        console.log(this.$refs.addForm)
       // debugger
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确定保存吗？', '提示', {}).then(() => {
              let userParams = Object.assign({}, this.addForm)
              addPermiss(userParams).then((res) => {
                if (res.status === statusCode) {
                  that.$message.success({
                    message: '添加用户成功',
                    duration: 2000
                  })
                  that.$refs['addForm'].resetFields()
                  that.dialogFormVisible = false
                } else {
                  that.$message.error({
                    message: '添加用户失败',
                    duration: 2000
                  })
                  this._getUerList()
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
        }) */
        this.dialogFormVisible = true
      }
    },
    components: {
      Pagin,
      Breadcr,
      PermissionInfo,
      PermissionView
    }
  }
</script>

<style>

</style>
