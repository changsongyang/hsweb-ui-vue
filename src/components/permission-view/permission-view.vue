<template>
  <el-table :data="tableData" highlight-current-row @current-change="currentChange" height="500" border style="width: 100%">
    <el-table-column prop="name" label="字段" align="center"></el-table-column>
    <el-table-column prop="describe" label="描述" align="center"></el-table-column>
    <el-table-column prop="renderAction" label="操作" align="center">
      <template slot-scope="scope">
        <el-button size="mini" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      formData: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        tableData: [],
        currentRow: null
      }
    },
    methods: {
      currentChange (val) {
        this.currentRow = val
      }
    }
  }
</script>

<style>

</style>
