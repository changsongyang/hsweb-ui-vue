<template>
  <div class="perm-info">
    <el-form :model="addForm" ref="addForm">
      <el-form-item label="权限标识(ID):" :label-width="formLabelWidth">
        <el-input v-model="addForm.id" placeholder="只能由字母数字下划线组成" auto-complete="off" style="width: 240px"></el-input>
      </el-form-item>
      <el-form-item label="权限名称:" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" placeholder="只能由字母数字下划线组成" auto-complete="off" style="width: 240px"></el-input>
      </el-form-item>
      <el-form-item label="备注：" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="addForm.describe"></el-input>
      </el-form-item>
      <el-form-item label="支持的数据权限控制方式:" :label-width="formLabelWidth">
        <el-select v-model="value" multiple placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" highlight-current-row @current-change="currentChange" height="500" border style="width: 100%">
      <el-table-column prop="action" label="操作类型" align="center"></el-table-column>
      <el-table-column prop="describe" label="描述" align="center"></el-table-column>
      <el-table-column prop="defaultCheck" label="默认选中" align="center"></el-table-column>
      <el-table-column prop="renderAction" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        options: [
          {
            value: '选项1',
            label: '禁止访问字段'
          },
          {
            value: '选项2',
            label: '仅限本人'
          },
          {
            value: '选项3',
            label: '仅限本人及下属'
          },
          {
            value: '选项4',
            label: '所在部门'
          },
          {
            value: '选项5',
            label: '所在机构'
          },
          {
            value: '选项6',
            label: '自定义设置-机构'
          },
          {
            value: '选项7',
            label: '自定义设置-部门'
          },
          {
            value: '选项8',
            label: '自定义设置-岗位'
          }
        ],
        tableData: [

        ],
        value: '',
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
