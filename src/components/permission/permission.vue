<template>
  <div class="auth-wrap">
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
        <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-plus">添加权限</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="authoritys" highlight-current-row @current-change="currentChange" height="500" border style="width: 100%">
      <el-table-column type="index" align="center"></el-table-column>
      <el-table-column sortable prop="id" label="ID" align="center"></el-table-column>
      <el-table-column sortable prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center"></el-table-column>
      <el-table-column prop="describe" label="备注" align="center"></el-table-column>
      <el-table-column prop="action" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagin></pagin>
  </div>
</template>

<script type="text/ecmascript-6">
  import Pagin from 'base/pagin/pagin'
  import Breadcr from 'base/breadcr/breadcr'
  import { getPermissList } from 'api/permission'

  export default{
    data () {
      return {
        meName: '权限管理',
        searchForm: {
          id$LIKE: '',
          name$LIKE: '',
          describe$LIKE: ''
        },
        authoritys: [],
        currentRow: null
      }
    },
    mounted () {
      this._getPermissList()
    },
    computed: {
      renderStatus (e) {
        return e.value === 1 ? '正常' : '失败'
      }
    },
    methods: {
      _getPermissList () {
        getPermissList().then((res) => {
          if (res.status === 200) {
            this.authoritys = res.result.data
          }
        })
      },
      currentChange (val) {
        this.currentRow = val
      },
      onSubmit () {
        console.log('submit!')
      }
    },
    components: {
      Pagin,
      Breadcr
    }
  }
</script>

<style>

</style>
