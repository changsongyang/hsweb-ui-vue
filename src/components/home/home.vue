<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="24" class="h-col">
          <!--<div class="topbar-logos" v-show="!collapsed">
            <a href="/"><img src="../assets/logo.png"></a>
          </div>-->
          <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
            {{collapsed ? '' : title}}
          </el-col>
          <el-col :span="10">
            <div class="tools" @click.prevent="collapse">
              <i class="el-icon-arrow-right"></i>
            </div>
          </el-col>

          <el-button plain type="danger" @click="open">API文档</el-button>

          <el-col :span="4" class="userinfo">
            <el-dropdown trigger="hover">
              <span class="el-dropdown-link userinfo-inner">{{userName}}<i class="el-icon-setting"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside class="aside" :class="{showSidebar:collapse}">
        <!--<div class="menu-toggle" @click.prevent="collapse">
          &lt;!&ndash;<i class="iconfont icon-icon-test" v-show="!collapsed"></i>
          <i class="iconfont icon-icon-zhangjai2" v-show="collapsed"></i>&ndash;&gt;
          <i class="el-icon-caret-left" v-show="!collapsed"></i>
          <i class="el-icon-caret-right" v-show="collapsed"></i>
        </div>-->
        <el-menu default-active="0" class="el-menu" ref="menuCollapsed" router :collapse="collapsed">
          <template v-for="(item,index) in $router.options.routes" v-if="item.name !== '登录'">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
              <el-menu-item v-for="child in item.children"
                            :index="child.path"
                            :key="child.path"
                            v-if="!child.menuShow"
                            :class="$route.path==child.path?'is-active':''"
              >{{child.name}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length"
                          :index="item.children[0].path"
                          :class="$route.path==item.children[0].path?'is-avtive':''">
              <i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>

      <el-main>
        <transition>
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import { logout } from 'api/login'

  export default {
    data () {
      return {
        title: '后台管理系统',
        userName: '',
        collapsed: false
      }
    },
    created () {
      this.$on('setUserName', (text) => {
        this.userName = text
      })
      this.$on('go', (url) => {
        if (url === '/') {
          localStorage.removeItem('access-user')
        }
        this.$router.push(url)
      })
    },
    mounted () {
      let user = localStorage.getItem('access-user')
      if (user) {
        user = JSON.parse(user)
        this.userName = user.username || ''
      }
    },
    methods: {
      open () {
        window.open('/api/swagger-ui.html')
      },
      // 折叠导航栏
      collapse () {
        this.collapsed = !this.collapsed
      },
      /* showMenu (i, status) {
       this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none'
       }, */
      logout () {
        let that = this
        this.$confirm('确认退出吗？', '提示', {
          confirmButtonClass: 'el-button--warning'
        }).then(() => {
          logout().then((res) => {
            localStorage.removeItem('access-user')
            that.$router.go('/')
          })
        }).catch((error) => {
          console.log(error)
          that.$message.error({
            message: '请求出现异常',
            duration: 2000
          })
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  /*@import "common/iconfont.css";*/

  .container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    border: 1px solid #eee;

    .header {
      background-color: cornflowerblue;
      height: 70px;
      padding: 0px;
      line-height: 70px;

      .logo {
        height: 60px;
        font-size: 22px;
        padding-left: 20px;
        border-color: rgba(238, 241, 146, 0.3);
        color: white;
        .topbar-btn {
          color: #fff;
        }
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
      }

      .logo-width {
        width: 230px;
      }

      .logo-collapse-width {
        width: 60px;
      }

      .tools {
        padding: 0px 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }

      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color: #fff;
        }
      }
    }

    .aside {
      min-width: 50px;
      flex: 0 0 230px;
      width: 230px;
      background-color: rgb(238, 241, 246);
      &::-webkit-scrollbar {
        display: none;
      }

      &.showSidebar {
        overflow-x: hidden;
        overflow-y: auto;
      }

      /*.menu-toggle {
        background: #4A5064;
        text-align: center;
        color: white;
        height: 26px;
        line-height: 30px;
      }*/
      .menu-collapsed {
        flex: 0 0 60px;
        width: 60px;
      }

      .menu-expanded {
        flex: 0 0 230px;
        width: 230px;
      }

      .el-menu {
        height: 100%;
        height: -moz-calc(100% - 80px);
        height: -webkit-calc(100% - 80px);
        height: calc(100% - 80px);
        border-radius: 0px;
        background-color: #eef1f6;
      }

      .el-submenu .el-menu-item {
        min-width: 60px;
      }
      .el-menu {
        width: 230px;
      }
      .el-menu--collapse {
        width: 60px;
      }

      .el-menu .el-menu-item, .el-submenu .el-submenu__title {
        height: 46px;
        line-height: 46px;
      }

      .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
        background-color: #7ed2df;
      }

    }
  }

</style>
