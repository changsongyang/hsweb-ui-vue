<template>
  <div class="agency-wrap">
    <breadcr :meName="meName"></breadcr>

    <el-form :inline="true" :model="formInline">
      <el-form-item label="关键字">
        <el-input size="small" v-model="formInline.keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small">添加机构</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small">保存全部</el-button>
      </el-form-item>
    </el-form>

    <el-table stripe height="500" border style="width: 100%">
      <el-table-column sortable prop="num" label="#" width="100"></el-table-column>
      <el-table-column sortable prop="name" label="机构名称"></el-table-column>
      <el-table-column sortable prop="longName" label="机构全称"></el-table-column>
      <el-table-column prop="agCode" label="机构编码"></el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button size="mini">添加子结构</el-button>
          <el-button size="mini">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import Breadcr from 'base/breadcr/breadcr'

  export default{
    data () {
      return {
        meName: '机构管理',
        formInline: {
          keyword: ''
        },
        loading: true
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    },
    components: {
      Breadcr
    }
  }
</script>

<style>

</style>
