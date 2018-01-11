<template>
  <div class="wrap">
    <!--添加子部门页面-->
    <el-dialog v-if="depChild" title="添加子部门" :visible.sync="dialogFormVisible" center>
      <el-form :model="addForm" ref="addForm">
        <el-form-item label="部门名称：" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="所属机构：" :label-width="formLabelWidth">
          <el-input v-model="addForm.orgname" suffix-icon="el-icon-arrow-down" :disabled="true" style="width: 235px">
          </el-input>
        </el-form-item>
        <el-form-item label="上级部门：" :label-width="formLabelWidth">
          <el-input v-model="addForm.parentname" suffix-icon="el-icon-arrow-down" :disabled="true" style="width: 235px">
          </el-input>
        </el-form-item>
        <!--<el-form-item label="上上级部门ID：" :label-width="formLabelWidth">
          <el-input v-model="addForm.parentId" suffix-icon="el-icon-arrow-down" :disabled="true" style="width: 235px">
          </el-input>
        </el-form-item>-->
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

    <!--编辑部门页面-->
    <el-dialog title="编辑部门" v-if="editDepChild" :visible.sync="editFormVisible" center>
      <el-form :model="editDepForm" ref="editDepForm">
        <el-form-item label="部门名称：" :label-width="formLabelWidth">
          <el-input v-model="editDepForm.departmentname" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="所属机构：" :label-width="formLabelWidth">
          <el-input v-model="editDepForm.orgname" suffix-icon="el-icon-arrow-down" :disabled="true" style="width: 235px">
          </el-input>
        </el-form-item>
        <el-form-item label="上级部门：" :label-width="formLabelWidth">
          <el-input v-model="editDepForm.parentId" suffix-icon="el-icon-arrow-down" :disabled="true" style="width: 235px">
          </el-input>
        </el-form-item>
        <el-form-item label="部门编码：" :label-width="formLabelWidth">
          <el-input v-model="editDepForm.code" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="editDepForm.remark"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editDep">保存</el-button>
      </div>
    </el-dialog>

    <!--添加子岗位页面-->
    <el-dialog v-if="posChild" title="添加子岗位" :visible.sync="dialogFormVisible" center>
      <el-form :model="posAddForm" ref="posAddForm">
        <el-form-item label="岗位名称：" :label-width="formLabelWidth">
          <el-input v-model="posAddForm.name" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="所在部门：" :label-width="formLabelWidth">
          <el-input v-model="posAddForm.departmentname" suffix-icon="el-icon-arrow-down" :disabled="true" style="width: 235px">
          </el-input>
        </el-form-item>
        <el-form-item label="上级岗位：" :label-width="formLabelWidth">
          <el-input v-model="posAddForm.positionname" suffix-icon="el-icon-arrow-down" :disabled="true" style="width: 235px">
          </el-input>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="posAddForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savePosi">保存</el-button>
      </div>
    </el-dialog>

    <!--编辑岗位页面-->
    <el-dialog  title="编辑岗位" v-if="editPosChild" :visible.sync="editFormVisible" center>
      <el-form :model="editPosForm" ref="editPosForm">
        <el-form-item label="岗位名称：" :label-width="formLabelWidth">
          <el-input v-model="editPosForm.positionname" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="所在部门：" :label-width="formLabelWidth">
          <el-input v-model="editPosForm.departmentname" suffix-icon="el-icon-arrow-down" :disabled="true" style="width: 235px">
          </el-input>
        </el-form-item>
        <el-form-item label="上级岗位：" :label-width="formLabelWidth">
          <el-input v-model="editPosForm.parentId" suffix-icon="el-icon-arrow-down" :disabled="true" style="width: 235px">
          </el-input>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="editPosForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editPos">保存</el-button>
      </div>
    </el-dialog>

    <!--编辑人员页面-->
    <el-dialog  title="编辑人员" v-if="editPerChild" :visible.sync="editFormVisible" center>
      <el-form :model="editPosForm" ref="editPosForm">
        <el-form-item label="岗位名称：" :label-width="formLabelWidth">
          <el-input v-model="editPosForm.positionname" auto-complete="off" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="所在部门：" :label-width="formLabelWidth">
          <el-input v-model="editPosForm.departmentname" suffix-icon="el-icon-arrow-down" :disabled="true" style="width: 235px">
          </el-input>
        </el-form-item>
        <el-form-item label="上级岗位：" :label-width="formLabelWidth">
          <el-input v-model="editPosForm.parentId" suffix-icon="el-icon-arrow-down" :disabled="true" style="width: 235px">
          </el-input>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="editPosForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editPer">保存</el-button>
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
              <el-button type="primary">新建职位</el-button>
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
                       :data-source="departments" @addMenu="showAndDep" @editorMenu="showEditorDep" :content="contentDep"
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
                       :data-source="positions" :content="contentPos" @addMenu="showAndPos" @editorMenu="showEditorPos"
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
                  <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditPer"></el-button>
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
  import { getOrgs, getDepartment, getPosition, getPerson, addDepartment, addPosition, editDep, editPos } from 'api/in-setting'
  import { statusCode } from 'common/js/config'
  import { quParam, arrayToTreeArray } from 'common/js/utils'
  import TreeGrid from 'base/basetable/TreeGrid'

  export default {
    data () {
      return {
        depChild: false,
        posChild: false,
        editDepChild: false,
        editPosChild: false,
        editPerChild: false,
        orgs: [],
        departments: [],
        positions: [],
        persons: [],
        id: '',
        // 添加相关数据
        dialogFormVisible: false,  // 添加页面是否显示
        // 添加子部门数据
        addForm: {
          name: '',
          parentname: '',
          orgname: '',
          code: '',
          parentId: '',
          orgId: '',
          remark: ''
        },
        // 添加子岗位数据
        posAddForm: {
          name: '',
          parentname: '',
          departmentname: '',
          positionname: '',
          parentId: '',
          departmentId: '',
          remark: ''
        },
        addFormRules: {
          name: [{required: true, message: '请输入部门姓名', trigger: 'blur'}],
          code: [{required: true, message: '请输入部门编码', trigger: 'blur'}],
          remark: [{required: true, message: '备注', trigger: 'blur'}]
        },
        // 编辑相关数据
        editFormVisible: false,   // 编辑页面是否显示
        // 编辑部门数据
        editDepForm: {
          id: '',
          departmentname: '',
          parentname: '',
          orgname: '',
          code: '',
          parentId: '',
          orgId: '',
          remark: ''
        },
        editFormRules: {
          name: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
          code: [{required: true, message: '请输入部门编码', trigger: 'blur'}],
          remark: [{required: true, message: '备注', trigger: 'blur'}]
        },
        // 编辑岗位数据
        editPosForm: {
          id: '',
          positionname: '',
          departmentname: '',
          parentId: '',
          orgId: '',
          remark: ''
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
       // console.log(row)
        this.dialogFormVisible = true
        this.posChild = false
        this.depChild = true
        this.orgs.forEach(item => {
          if (item.orgId === row.orgId) {
            this.addForm.parentname = row.name
            this.addForm.orgname = item.name
            this.addForm.parentId = row.id
            this.addForm.orgId = row.orgId
          }
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
                  let queryParams = quParam(this.addForm.orgId)
                  let queryParamsPage = {
                    paging: false
                  }
                  getDepartment(queryParams, queryParamsPage).then((res) => {
                    if (res.status === statusCode) {
                      this.departments = Array.from(arrayToTreeArray(res.result.data, '-1'))
                    }
                  })
                  that.dialogFormVisible = false
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
      },
      showEditorDep ($event) {
      //  console.log($event)
        this.editFormVisible = true
        this.editDepChild = true
        this.editPosChild = false
      //  this.editDepForm = Object.assign(this.editDepForm)
        this.orgs.forEach(item => {
          if (item.orgId === $event[1].orgId) {
            this.editDepForm.departmentname = $event[1].name
            this.editDepForm.orgname = item.name
            this.editDepForm.parentId = $event[1].parentId
            this.editDepForm.code = $event[1].code
            this.editDepForm.orgId = $event[1].orgId
            this.editDepForm.id = $event[1].id
          }
        })
      },
      editDep () {
        let that = this
        this.$refs.editDepForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.editDepForm)
          //  console.log(params)
            editDep(params.id, params).then((result) => {
              if (result.status === statusCode) {
                that.$message.success({
                  message: '修改成功',
                  duration: 2000
                })
                that.$refs['editDepForm'].resetFields()
                that.editFormVisible = false
              } else {
                that.$message.error({
                  message: '修改失败',
                  duration: 2000
                })
                this._getUerList()
              }
            }).catch((error) => {
              console.log(error)
              that.$message.error({
                message: '请求出现异常',
                duration: 2000
              })
            })
          }
        })
      },
      showEditorPos ($event) {
        console.log($event)
        this.editFormVisible = true
        this.editPosChild = true
        this.editDepChild = false
        //  this.editDepForm = Object.assign(this.editDepForm)
        this.departments.forEach(item => {
          if (item.departmentId === $event[1].departmentId) {
            this.editPosForm.departmentname = $event[1].name
            this.editPosForm.positionname = item.name
            this.editPosForm.parentId = $event[1].parentId
            this.editPosForm.id = $event[1].id
          }
        })
      },
      editPos () {
        let that = this
        this.$refs.editPosForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.editPosForm)
            console.log(params)
            editPos(params.id, params).then((result) => {
              if (result.status === statusCode) {
                that.$message.success({
                  message: '修改成功',
                  duration: 2000
                })
                that.$refs['editPosForm'].resetFields()
                that.editFormVisible = false
              } else {
                that.$message.error({
                  message: '修改失败',
                  duration: 2000
                })
                this._getUerList()
              }
            }).catch((error) => {
              console.log(error)
              that.$message.error({
                message: '请求出现异常',
                duration: 2000
              })
            })
          }
        })
      },
      showAndPos (index, row) {
        this.dialogFormVisible = true
        this.depChild = false
        this.posChild = true
        this.departments.forEach(item => {
          if (item.departmentId === row.departmentId) {
            this.posAddForm.positionname = row.name
            this.posAddForm.departmentname = item.name
            this.posAddForm.parentId = row.id
            this.posAddForm.departmentId = row.departmentId
          }
        })
      },
      savePosi () {
        let that = this
        this.$refs.posAddForm.validate((valid) => {
          if (valid) {
            this.$confirm('确定保存吗？', '提示', {}).then(() => {
              let params = Object.assign({}, this.posAddForm)
              addPosition(params).then((res) => {
                if (res.status === statusCode) {
                  that.$message.success({
                    message: '添加成功',
                    duration: 2000
                  })
                  that.dialogFormVisible = false
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
      },
      showEditPer () {
        this.dialogFormVisible = true
        this.depChild = false
        this.posChild = false
        this.editDepChild = true
      },
      editPer () {}
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

    .container {
      width: 100%;
      height: 100%;
      .eltablecus {
        background: #eff7ff
      }
      .aside {
        border: 3px solid #96c2f1;
        background: #eff7ff;
      }
    }

    .main {
      // background-color: cornflowerblue;

      .top {
        width: 100%;
        height: 50%;
        box-sizing: border-box;
        -moz-box-sizing: border-box; /* Firefox */
        -webkit-box-sizing: border-box; /* Safari */
        margin-left: 5px;
        //  border: 1px solid #429EFD;
        //  justify-content: space-between;

        .top-left {
          width: 50%;
          height: 100%;
          float: left;
          overflow: hidden;
          box-sizing: border-box;
          -moz-box-sizing: border-box; /* Firefox */
          -webkit-box-sizing: border-box; /* Safari */
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

          .buttons {
            height: 60px;
          }
        }
        .top-right {
          width: 50%;
          height: 100%;
          float: right;
          box-sizing: border-box;
          -moz-box-sizing: border-box; /* Firefox */
          -webkit-box-sizing: border-box; /* Safari */
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

          .buttons {
            height: 60px;
          }
        }
      }

      .bottom {
        width: 100%;
        height: 50%;
        box-sizing: border-box;
        -moz-box-sizing: border-box; /* Firefox */
        -webkit-box-sizing: border-box; /* Safari */
        border: 5px solid #96c2f1;
        padding: 8px 10px;
        margin-left: 5px;

        .buttons {
          height: 60px;
        }
      }
    }
  }
</style>
