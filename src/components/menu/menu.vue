<template>
  <div class="menu-wrap">
    <breadcr :meName="meName"></breadcr>

    <el-form :inline="true" :model="searchForm">
      <el-form-item label="关键字">
        <el-input size="small" v-model="searchForm.keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small">添加菜单</el-button>
      </el-form-item>
    </el-form>

    <parent-children :tableSoureData="tableSoureData"></parent-children>
  </div>

</template>

<script type="text/ecmascript-6">
  import {getMenuList, searchMenu} from 'api/menu'
  import {statusCode} from 'common/js/config'
  import {encodeQueryParam} from 'common/js/utils'
  import Breadcr from 'base/breadcr/breadcr'
  import ParentChildren from 'base/basetable/parent_children'

  export default{
    data () {
      return {
        meName: '菜单管理',
        searchForm: {
          keyword: ''
        },
        tableSoureData: [],
        total: 0,
        pageIndex: 0,
        pageSize: 10
      }
    },
    created () {
      this._getMenuList()
    },
    methods: {
      _getMenuList () {
        getMenuList().then((res) => {
          if (res.status === statusCode) {
            this.tableSoureData = Array.from(res.result.data)
          }
        })
      },
      search () {
        this.total = 0
        this.pageIndex = 0
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
        searchMenu(queryParams.name, queryParamsPage).then((res) => {
          if (res.status === statusCode) {
            that.total = res.total
            that.data = res.result.data
          }
        }).catch((error) => {
          console.log(error)
          that.$message.error({
            message: '请求出现异常',
            duration: 2000
          })
        })
      }
    },
    components: {
      Breadcr,
      ParentChildren
    }
  }
</script>

<style>

</style>
