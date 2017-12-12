<template>
  <el-table
    :data="data"
    border
    style="width: 100%"
    :row-style="showTr">
    <el-table-column v-for="(column, index) in columns" :prop="column.dataIndex"
                     :label="column.text">
      <template scope="scope">
        <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space"></span>
        <button class="button is-outlined is-primary is-small" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-arrow-down" aria-hidden="true"></i>
          <i v-if="scope.row._expanded" class="el-icon-arrow-up" aria-hidden="true"></i>
        </button>
        <span v-else-if="index===0" class="ms-tree-space"></span>
        {{scope.row[column.dataIndex]}}
      </template>
    </el-table-column>
    <el-table-column label="操作" v-if="treeType === 'normal'" width="260">
      <template scope="scope">
        <el-tooltip class="item" effect="light" content="添加子菜单" placement="bottom-start">
          <el-button size="mini" type="primary" icon="el-icon-plus"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="删除菜单" placement="bottom-start">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="delMenu(scope.$index,scope.row)"></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>
<script type='text/ecmascript-6'>
  import Utils from 'common/js/treetable/index'
  import {delMenu} from 'api/menu'
  import {statusCode} from 'common/js/config'

  export default {
    name: 'tree-grid',
    props: {
// 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
      treeStructure: {
        type: Boolean,
        default: false
      },
// 这是相应的字段展示
      columns: {
        type: Array,
        default: []
      },
// 这是数据源
      dataSource: {
        type: Array,
        default: []
      },
// 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
      requestUrl: {
        type: String,
        default: ''
      },
// 这个是是否展示操作列
      treeType: {
        type: String,
        default: 'normal'
      },
// 是否默认展开所有树
      defaultExpandAll: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    computed: {
      // 格式化数据源
      data: function () {
        let me = this
        if (me.treeStructure) {
          let data = Utils.MSDataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll)
          return data
        }
        return me.dataSource
      }
    },
    methods: {
      // 显示行
      showTr: function (row, index) {
        let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
        row._show = show
        return show ? '' : 'display:none;'
      },
      // 展开下级
      toggle: function (trIndex) {
        let me = this
        let record = me.data[trIndex]
        record._expanded = !record._expanded
      },
      // 显示层级关系的空格和图标
      spaceIconShow (index) {
        let me = this
        if (me.treeStructure && index === 0) {
          return true
        }
        return false
      },
      // 点击展开和关闭的时候，图标的切换
      toggleIconShow (index, record) {
        let me = this
        if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
          return true
        }
        return false
      },
      delMenu (index, row) {
        let that = this
        this.$confirm('确定删除该菜单吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delMenu(row.id).then((res) => {
            if (res.status === statusCode) {
              that.$message.success({
                message: '删除成功',
                duration: 1500
              })
            }
          }).catch((error) => {
            console.log(error)
            that.$message.error({
              message: '请求出现异常',
              duration: 2000
            })
          })
        })
      }
    }
  }
</script>
<style scoped>
  .ms-tree-space{position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;}
  .ms-tree-space::before{content: ""}
  table td{
    line-height: 26px;
  }
</style>
