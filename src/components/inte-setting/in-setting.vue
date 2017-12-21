<template>
  <div class="wrap">
    <!--新建部门页面-->
    <el-dialog title="部门管理" :visible.sync="dialogFormVisible" center>
      <el-form :model="addForm" ref="addForm">
        <el-form-item label="部门名称：" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="所属机构：" :label-width="formLabelWidth">
          <!--<el-select v-model="value">
            <el-option v-for="item in options" :key="item.value"
                       :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>-->
          <el-input v-model="addForm.orgname" suffix-icon="el-icon-arrow-down" :disabled="true" style="width: 235px">
          </el-input>
        </el-form-item>
        <el-form-item label="上级部门：" :label-width="formLabelWidth">
          <!--<el-select v-model="value">
            <el-option v-for="item in options" :key="item.value"
                       :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>-->
          <el-input v-model="addForm.parentname" suffix-icon="el-icon-arrow-down" :disabled="true" style="width: 235px">
          </el-input>
        </el-form-item>
        <el-form-item label="部门编码：" :label-width="formLabelWidth">
          <el-input v-model="addForm.code" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="addForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveDepartment">保存</el-button>
      </div>
    </el-dialog>

    <el-container class="container">
      <el-aside class="aside" width="240px">
        <!--<el-table class="eltablecus":data="orgs" border style="width: 100%" @row-click="getDepartment($event.orgId)">
          <el-table-column type="index" label="#" align="center"></el-table-column>
          <el-table-column prop="name" label="机构" align="center"></el-table-column>
        </el-table>-->
        <tree-grid :columns="columns" :columntype="true" :tree-structure="true"
                   :treeType="false" :data-source="orgs"
                   @treeGridClick="getDepartment"></tree-grid>
      </el-aside>
      <el-main class="main">
        <div class="top">
          <div class="top-left">
            <div class="buttons">
              <el-button type="primary" @click="showAndDeps">新建职位</el-button>
              <el-button type="success">保存全部</el-button>
            </div>
            <!--<el-table :data="departments" ref="department" border style="width: 100%" @row-click="getPositions($event)">
              <el-table-column type="index" label="#" align="center"></el-table-column>
              <el-table-column prop="name" label="部门" align="center"></el-table-column>
              <el-table-column prop="action" label="操作" align="center">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="light" content="添加子部门" placement="bottom-start">
                    <el-button size="mini" type="primary" icon="el-icon-plus" @click="showAndDep(scope.row)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" content="编辑" placement="bottom-start">
                    <el-button size="mini" type="primary" icon="el-icon-edit-outline"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>-->
            <tree-grid :columns="columnsDep" :columntype="true" :tree-structure="true" :isadd="true" :iseditor="true"
                       :data-source="departments" @addMenu="showAndDep" :content="contentDep"
                       @treeGridClick="getPositions($event)"></tree-grid>
          </div>
          <div class="top-right">
            <div class="buttons">
              <el-button type="primary">新建部门</el-button>
              <el-button type="success">保存全部</el-button>
            </div>
            <!--<el-table :data="positions" border @row-click="getPerson($event.id)" style="width: 100%">
              <el-table-column type="index" label="#" align="center"></el-table-column>
              <el-table-column prop="name" label="职位" align="center"></el-table-column>
              <el-table-column prop="action" label="操作" align="center">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="light" content="添加子级岗位" placement="bottom-start">
                    <el-button size="mini" type="primary" icon="el-icon-plus"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" content="编辑" placement="bottom-start">
                    <el-button size="mini" type="primary" icon="el-icon-edit-outline"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>-->
            <tree-grid :columns="columnsPos" :columntype="true" :tree-structure="true" :isadd="true" :iseditor="true"
                       :data-source="positions" :content="contentPos"
                       @treeGridClick="getPerson($event)"></tree-grid>
          </div>
        </div>
        <div class="bottom">
          <div class="buttons">
            <el-button type="primary">新建人员</el-button>
          </div>
          <el-table :data="persons" border style="width: 100%">
            <el-table-column type="index" label="#" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="sex" label="性别" align="center"></el-table-column>
            <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
            <el-table-column prop="action" label="操作" align="center">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="light" content="编辑" placement="bottom-start">
                  <el-button size="mini" type="primary" icon="el-icon-edit-outline"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getOrgs, getDepartment, getPosition, getPerson, addDepartment} from 'api/in-setting'
  import { statusCode } from 'common/js/config'
  import { quParam, arrayToTreeArray } from 'common/js/utils'
  import TreeGrid from 'base/basetable/TreeGrid'

  export default {
    data () {
      return {
        orgs: [],
        departments: [],
        positions: [],
        persons: [],
        id: '',
        // 添加相关数据
        dialogFormVisible: false,  // 添加页面是否显示
        addForm: {
          name: '',
          parentname: '',
          orgname: '',
          code: '',
          parentId: '',
          orgId: '',
          remark: ''
        },
        addFormRules: {
          name: [{required: true, message: '请输入部门姓名', trigger: 'blur'}],
          code: [{required: true, message: '请输入部门编码', trigger: 'blur'}],
          remark: [{required: true, message: '备注', trigger: 'blur'}]
        },
        formLabelWidth: '120px',
        columns: [
          {
            text: '机构',
            dataIndex: 'name'
          }
        ],
        columnsDep: [
          {
            text: '部门',
            dataIndex: 'name'
          }
        ],
        columnsPos: [
          {
            text: '职位',
            dataIndex: 'name'
          }
        ],
        contentDep: '添加子部门',
        contentPos: '添加子岗位'
      }
    },
    created () {
      this.getOrgList()
    },
    methods: {
      getOrgList () {
        getOrgs().then((res) => {
          if (res.status === statusCode) {
//            console.log(res.result.data)
          //  this.orgs = res.result.data
            this.orgs = Array.from(arrayToTreeArray(res.result.data, '-1'))
          }
        })
      },
      getDepartment ($event) {
        let queryParams = quParam($event.orgId)
        let queryParamsPage = {
          paging: false
        }
        getDepartment(queryParams, queryParamsPage).then((res) => {
          if (res.status === statusCode) {
            this.departments = Array.from(arrayToTreeArray(res.result.data, '-1'))
          }
        })
      },
      getPositions ($event) {
        let queryParams = quParam($event.departmentId)
        let queryParamsPage = {
          paging: false
        }
        getPosition(queryParams, queryParamsPage).then((res) => {
          if (res.status === statusCode) {
            this.positions = Array.from(arrayToTreeArray(res.result.data, '-1'))
          }
        })
      },
      getPerson ($event) {
        getPerson($event.positionId).then((res) => {
          if (JSON.parse(res).status === statusCode) {
            this.persons = JSON.parse(res).result
          }
        })
      },
      showAndDep (index, row) {
        console.log(row)
        this.dialogFormVisible = true
        this.orgs.forEach(item => {
          if (item.orgId === row.orgId) {
            this.addForm.parentname = row.name
            this.addForm.orgname = item.name
            this.addForm.parentId = row.parentId
            this.addForm.orgId = row.orgId
          }
        })
      },
      showAndDeps () {
       // console.log(data)
        this.dialogFormVisible = true
        this.orgs.forEach(item => {
          this.addForm.parentname = item.name
          this.addForm.orgname = item.name
       //   this.addForm.parentId = item.parentId
          this.addForm.orgId = item.orgId
        })
      },
      saveDepartment () {
        let that = this
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确定保存吗？', '提示', {}).then(() => {
              let params = Object.assign({}, this.addForm)
              addDepartment(params).then((res) => {
                if (res.status === statusCode) {
                  that.$message.success({
                    message: '添加成功',
                    duration: 2000
                  })
                  that.$refs['addForm'].resetFields()
                  that.dialogFormVisible = false
                  that.search()
                } else {
                  that.$message.error({
                    message: '添加失败',
                    duration: 2000
                  })
                }
              }).catch((error) => {
                console.log(error)
                that.$message.error({
                  showClose: true,
                  message: '请求出现异常',
                  duration: 2000
                })
              })
            })
          }
        })
      }
    },
    components: {
      TreeGrid
    }
  }
</script>

<style scoped lang="scss">
  .wrap {
    margin: 0 auto;
    padding: 0px;
    width: 100%;
    height: 100%;

    .container{
      width: 100%;
      height: 100%;
      .eltablecus{
        background:#eff7ff
      }
      .aside{
        border: 3px solid #96c2f1;
        background:#eff7ff;
      }
    }

    .main{
      // background-color: cornflowerblue;

      .top{
        width: 100%;
        height: 50%;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
        margin-left: 5px;
      //  border: 1px solid #429EFD;
      //  justify-content: space-between;

        .top-left{
          width: 50%;
          height: 100%;
          float: left;
          overflow: hidden;
          box-sizing:border-box;
          -moz-box-sizing:border-box; /* Firefox */
          -webkit-box-sizing:border-box; /* Safari */
         // border: 1px solid #429EFD;
          border-top-width: 5px;
          border-top-style: solid;
          border-top-color: #96c2f1;

          border-right-width: 5px;
          border-right-style: solid;
          border-right-color: #96c2f1;

          border-left-width: 5px;
          border-left-style: solid;
          border-left-color: #96c2f1;

          /*border-left: 0;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
          -moz-border-radius-topright: 2px;
          -moz-border-radius-bottomright: 2px;
          -webkit-border-top-right-radius: 2px;
          -webkit-border-bottom-right-radius: 2px;*/
          padding: 8px 10px;


          .buttons{
            height: 60px;
          }
        }
        .top-right{
          width: 50%;
          height: 100%;
          float: right;
          box-sizing:border-box;
          -moz-box-sizing:border-box; /* Firefox */
          -webkit-box-sizing:border-box; /* Safari */
       //   border: 1px solid #429EFD;
        //  border-left: 0;
          /*border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
          -moz-border-radius-topright: 2px;
          -moz-border-radius-bottomright: 2px;
          -webkit-border-top-right-radius: 2px;
          -webkit-border-bottom-right-radius: 2px;*/
          border-top-width: 5px;
          border-top-style: solid;
          border-top-color: #96c2f1;

          border-left-width: 5px;
          border-left-style: solid;
          border-left-color: #96c2f1;

          border-right-width: 5px;
          border-right-style: solid;
          border-right-color: #96c2f1;
          padding: 8px 10px;



          .buttons{
            height: 60px;
          }
        }
      }

      .bottom{
        width: 100%;
        height: 50%;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
        border: 5px solid #96c2f1;
        padding: 8px 10px;
        margin-left: 5px;

        .buttons{
          height: 60px;
        }
      }
    }
  }
</style>
