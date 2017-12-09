<template>
  <div class="add-form">
    <!--添加操作类型页面-->
    <el-dialog title="添加操作类型" :visible.sync="dialogFormVisible" center>
      <el-form :model="childAdd" ref="childAdd">
        <el-form-item label="操作类型：" :label-width="formLabelWidth">
          <el-input v-model="childAdd.action" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="默认选中：" :label-width="formLabelWidth">
          <el-input v-model="childAdd.defaultCheck" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="描述：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="childAdd.describe"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>

    <el-form :model='addForm'>
      <el-form-item label='权限标识(ID):' :label-width='formLabelWidth'>
        <el-input v-model='addForm.id' placeholder='只能由字母数字下划线组成' auto-complete='off' style='width: 240px'></el-input>
      </el-form-item>
      <el-form-item label='权限名称:' :label-width='formLabelWidth'>
        <el-input v-model='addForm.name' auto-complete='off' style='width: 240px'></el-input>
      </el-form-item>
      <el-form-item label='备注：' :label-width='formLabelWidth'>
        <el-input type='textarea' v-model='addForm.describe'></el-input>
      </el-form-item>
      <el-form-item label='支持的数据权限控制方式:' :label-width='formLabelWidth'>
        <el-select v-model='value' multiple placeholder='请选择'>
          <el-option v-for='item in options' :key='item.id' :label='item.label' :value='item.id'></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-table :data='tableData' highlight-current-row @current-change='currentChange' height='400' border style='width: 100%'>
      <el-table-column prop='action' label='操作类型' align='center'></el-table-column>
      <el-table-column prop='describe' label='描述' align='center'></el-table-column>
      <el-table-column prop='defaultCheck' label='默认选中' :class-name="showTrueFalse" align='center'></el-table-column>
      <el-table-column prop='renderAction' label='操作' align='center'>
        <template slot-scope='scope'>
          <el-tooltip class="item" effect="light" content="添加" placement="bottom-start">
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="add"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="删除" placement="bottom-start">
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="delete(scope.$index,scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type='text/ecmascript-6'>
 // import { addPermiss } from 'api/permission'

  export default{
    props: {
      formData: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        options: [
          {
            id: 'DENY_FIELDS',
            label: '禁止访问字段'
          },
          {
            id: 'ONLY_SELF',
            label: '仅限本人'
          },
          {
            id: 'POSITION_SCOPE',
            label: '仅限本人及下属'
          },
          {
            id: 'DEPARTMENT_SCOPE',
            label: '所在部门'
          },
          {
            id: 'ORG_SCOPE',
            label: '所在机构'
          },
          {
            id: 'CUSTOM_SCOPE_ORG_SCOPE_',
            label: '自定义设置-机构'
          },
          {
            id: 'CUSTOM_SCOPE_DEPARTMENT_SCOPE_',
            label: '自定义设置-部门'
          },
          {
            id: 'CUSTOM_SCOPE_POSITION_SCOPE_',
            label: '自定义设置-岗位'
          }
        ],
        addForm: {
          id: '',
          name: '',
          describe: ''
        },
        tableData: [
          {'action': 'query', 'describe': '查询列表', defaultCheck: true},
          {'action': 'get', 'describe': '查询明细', defaultCheck: true},
          {'action': 'add', 'describe': '新增', defaultCheck: true},
          {'action': 'update', 'describe': '修改', defaultCheck: true},
          {'action': 'delete', 'describe': '删除', defaultCheck: false}
        ],
        value: '',
        formLabelWidth: '182px',
        currentRow: null,
        // 添加相关数据
        dialogFormVisible: false,  // 添加页面是否显示
        childAdd: {
          action: '',
          describe: '',
          defaultCheck: ''
        },
        addFormRules: {
          action: [{required: true, message: '请输入操作类型', trigger: 'blur'}],
          describe: [{required: true, message: '备注', trigger: 'blur'}]
        },
        list: null
      }
    },
    methods: {
      currentChange (val) {
        this.currentRow = val
      },
      showTrueFalse (e) {
        return e.value ? '是' : '否'
      },
      add () {
        this.dialogFormVisible = true
        this.childAdd = {
          action: '',
          describe: '',
          defaultCheck: ''
        }
      },
      save () {
        let that = this
        let temp = []
        this.$refs.childAdd.validate((valid) => {
          if (valid) {
            let addData = that.childAdd
            temp = addData
            that.childAdd = temp
            that.$message.success({
              message: '保存成功',
              duration: 2000
            })
            that.$refs['childAdd'].resetFields()
            that.dialogFormVisible = false
          } else {
            that.$message.error({
              message: '保存失败',
              duration: 2000
            })
          }
        })
      },
      delete (index, row) {}
    }
  }
</script>

<style>

</style>
