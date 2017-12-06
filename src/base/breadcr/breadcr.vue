<template>
  <div class="breadcr-wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>{{meName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      meName: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style>

</style>
