<template>
  <div class="agency-wrap">
    <!--添加用机构页面-->
    <el-dialog title="添加机构" :visible.sync="dialogFormVisible" center>
      <el-form :model="addForm" ref="addForm">
        <el-form-item label="机构名称：" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="机构全称：" :label-width="formLabelWidth">
          <el-input v-model="addForm.fullName" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="机构编码：" :label-width="formLabelWidth">
          <el-input v-model="addForm.code" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>

    <breadcr :meName="meName"></breadcr>

    <el-form :inline="true" :model="searchForm">
      <el-form-item label="关键字">
        <el-input size="small" v-model="searchForm.keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="showAdd">添加机构</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" @click="saveAll">保存全部</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="orgs" stripe height="500" border style="width: 100%">
      <el-table-column sortable prop="index" type="index" label="#" align="center" width="100"></el-table-column>
      <el-table-column sortable prop="name" label="机构名称" align="center"></el-table-column>
      <el-table-column sortable prop="fullName" label="机构全称" align="center"></el-table-column>
      <el-table-column prop="code" label="机构编码" align="center"></el-table-column>
      <el-table-column prop="action" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="showAdd">添加子结构</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import Breadcr from 'base/breadcr/breadcr'
  import { getOrg, addOrg, searchOrg, addAll } from 'api/organiz'
  import { statusCode } from 'common/js/config'
  import { queryParam } from 'common/js/utils'

  export default{
    data () {
      return {
        meName: '机构管理',
        // 搜索数据
        searchForm: {
          keyword: ''
        },
        // 添加相关数据
        dialogFormVisible: false,  // 添加页面是否显示
        addForm: {
          name: '',
          fullName: '',
          code: ''
        },
        addFormRules: {
          name: [{required: true, message: '请输入机构名称', trigger: 'blur'}],
          fullName: [{required: true, message: '请输入机构全名', trigger: 'blur'}],
          code: [{required: true, message: '请输入机构编码', trigger: 'blur'}]
        },
        formLabelWidth: '80',
        orgs: [],
        loading: true,
        total: 0,
        pageIndex: 1,
        pageSize: 10
      }
    },
    created () {
      this.getOrgList()
    },
    methods: {
      getOrgList () {
        getOrg().then((res) => {
          if (res.status === statusCode) {
            this.orgs = res.result.data
          }
        })
      },
      search () {
        this.total = 0
        this.pageIndex = 1
        this.searchOrg()
      },
      searchOrg () {
        let queryParams = queryParam(this.searchForm.keyword)
        let queryParamsPage = {
          paging: false,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          sortField: '',
          sortOrder: ''
        }
        searchOrg(queryParams, queryParamsPage).then((res) => {
          if (res.status === statusCode) {
            this.total = res.total
            this.orgs = res.result.data
          }
        }).catch((error) => {
          console.log(error)
          this.$message.error({
            message: '请求出现异常',
            duration: 2000
          })
        })
      },
      showAdd () {
        this.dialogFormVisible = true
        this.addForm = {
          name: '',
          fullName: '',
          code: ''
        }
      },
      save () {
        let that = this
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确定保存吗？', '提示', {}).then(() => {
              let params = Object.assign({}, this.addForm)
              addOrg(params).then((res) => {
                if (res.status === statusCode) {
                  that.$message.success({
                    message: '添加机构成功',
                    duration: 2000
                  })
                  that.$refs['addForm'].resetFields()
                  that.dialogFormVisible = false
                  that.search()
                } else {
                  that.$message.error({
                    message: '添加机构失败',
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
      saveAll () {
        this.$confirm('确认保存全部机构数据？', '提示', {}).then(() => {
          addAll(this.orgs).then((res) => {
            if (res.status === statusCode) {
              this.$message.success({
                message: '保存成功',
                duration: 2000
              })
            }
          })
        })
      }
    },
    components: {
      Breadcr
    }
  }
</script>

<style>

</style>
