<template>
  <el-table :data='tableData' style='width: 100%' @expand='rowExpand'>
    <el-table-column type='expand'>
      <template slot-scope='props'>
        <el-table :data='props.row.children' style='width: 100%'>
          <el-table-column label='图标' prop='icon'>
          </el-table-column>
          <el-table-column label='权限ID' prop='permissionId'>
          </el-table-column>
          <el-table-column label='菜单名称' prop='name'>
          </el-table-column>
          <el-table-column label='URL' prop='url'>
          </el-table-column>
          <el-table-column label='是否启用' prop=''>
          </el-table-column>
          <el-table-column label='排序序号' prop='sortIndex'>
          </el-table-column>
          <el-table-column label='描述' prop='describe'>
          </el-table-column>
          <el-table-column label='操作' prop='action'>
          </el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column label='图标' prop='icon'>
    </el-table-column>
    <el-table-column label='权限ID' prop='permissionId'>
    </el-table-column>
    <el-table-column label='菜单名称' prop='name'>
    </el-table-column>
    <el-table-column label='URL' prop='url'>
    </el-table-column>
    <el-table-column label='是否启用' prop=''>
    </el-table-column>
    <el-table-column label='排序序号' prop='sortIndex'>
    </el-table-column>
    <el-table-column label='描述' prop='describe'>
    </el-table-column>
    <el-table-column label='操作' prop='action'>
    </el-table-column>
  </el-table>
</template>

<script type='text/ecmascript-6'>
  class TableSourePri {
    constructor ({describe, icon, id, name, parentId, path, permissionId, sortIndex, status, url}) {
      this.describe = describe
      this.icon = icon
      this.id = id
      this.name = name
      this.path = path
      this.parentId = parentId
      this.permissionId = permissionId
      this.sortIndex = sortIndex
      this.status = status
      this.url = url
    }
  }

  export default{
    props: {
      tableSoureData: Array
    },
    data () {
      return {
        tableData: [],
        child: {
          describe: '',
          icon: '',
          id: '',
          name: '',
          parentId: '',
          path: '',
          permissionId: '',
          sortIndex: '',
          status: '',
          url: '',
          children: []
        }
      }
    },
    watch: {
      tableSoureData () {
        for (let item of this.tableSoureData) {
          let tableSourcePri = new TableSourePri(item)
          if (tableSourcePri.sortIndex > 0 && tableSourcePri.sortIndex < 10) {
            this.child.describe = item.describe
            this.child.icon = item.icon
            this.child.id = item.id
            this.child.name = item.name
            this.child.parentId = item.parentId
            this.child.path = item.path
            this.child.permissionId = item.permissionId
            this.child.sortIndex = item.sortIndex
            this.child.status = item.status
            this.child.url = item.url
            for (let tableSource of this.tableSoureData) {
              let tableSourcePri1 = new TableSourePri(tableSource)
              if (tableSourcePri1.sortIndex > 10) {
                debugger
                if (tableSource.sortIndex.toString().startsWith(tableSourcePri.sortIndex.toString())) {
                  this.child.children.push(Object.assign({}, tableSource))
                }
              }
            }
            this.tableData.push(Object.assign({}, this.child))
            this.child = {
              describe: '',
              icon: '',
              id: '',
              name: '',
              parentId: '',
              path: '',
              permissionId: '',
              sortIndex: '',
              status: '',
              url: '',
              children: []
            }
          }
        }
      }
    },
    methods: {
      rowExpand: function (row) {
//        this.listChildren = row.children;
        //       console.log(row)
      }
    }
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
