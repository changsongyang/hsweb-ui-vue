<template>
  <div class="menu-wrap">
    <breadcr :meName="meName"></breadcr>

    <el-form :inline="true" :model="formInline">
      <el-form-item label="关键字">
        <el-input size="small" v-model="formInline.keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small">添加菜单</el-button>
      </el-form-item>
    </el-form>

    <parent-children :tableSoureData="tableSoureData"></parent-children>

    <!--<el-table stripe height="500" border style="width: 100%">
      <el-table-column sortable prop="num" label="#"></el-table-column>
      <el-table-column sortable prop="id" label="权限ID"></el-table-column>
      <el-table-column sortable prop="name" label="菜单名称"></el-table-column>
      <el-table-column prop="url" label="URL"></el-table-column>
      <el-table-column prop="isUse" label="是否启用"></el-table-column>
      <el-table-column prop="sortId" label="排序序号"></el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>-->
  </div>

</template>

<script type="text/ecmascript-6">
  import Breadcr from 'base/breadcr/breadcr'
  import {getMenuList} from 'api/menu'
  import {statusCode} from 'common/js/config'
  import ParentChildren from 'base/basetable/parent_children'

  export default{
    data () {
      return {
        meName: '菜单管理',
        formInline: {
          keyword: ''
        },
        tableSoureData: []
      }
    },
    created () {
      this._getMenuList()
    },
    methods: {
      _getMenuList () {
        getMenuList().then((res) => {
          // debugger
          if (res.status === statusCode) {
            this.tableSoureData = Array.from(res.result.data)
          }
        })
      },
      onSubmit () {
        console.log('submit!')
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
