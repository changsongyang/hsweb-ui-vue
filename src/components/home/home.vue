<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="24" class="h-col">
          <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
            {{collapsed ? '' : title}}
          </el-col>
          <el-col :span="10">
            <div class="tools" @click.prevent="collapse"></div>
          </el-col>

          <el-col :span="4" class="userinfo">
            <el-dropdown trigger="hover">
              <span class="userinfo-inner">
                {{userName}}<i class="el-icon-setting setting" style="margin-right: 15px"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside class="aside" :class="{showSidebar:!collapsed}">
        <div class="menu-toggle" @click.prevent="collapse">
          <!--<i class="iconfont icon-icon-test" v-show="!collapsed"></i>
          <i class="iconfont icon-icon-zhangjai2" v-show="collapsed"></i>-->
          <i class="el-icon-caret-left" v-show="!collapsed"></i>
          <i class="el-icon-caret-right" v-show="collapsed"></i>
        </div>
        <el-menu default-active="0" class="el-menu" router :collapse="collapsed">
          <template v-for="(item,index) in $router.options.routes" v-if="!item.menuShow">
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
  export default {
    data () {
      return {
        title: '后台管理系统',
        userName: '',
        collapsed: false
      }
    },
    created () {
      this.$on('setUsername', (text) => {
        this.username = text
      })
    },
    methods: {
      // 折叠导航栏
      collapse () {
        this.collapsed = !this.collapsed
      }
    }
  }
</script>

<style scoped lang="scss">
  /*@import "common/iconfont.css";*/

  .container{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    border: 1px solid #eee;

    .header{
      background-color: cornflowerblue;
      height: 70px;
      padding: 0px;
      line-height: 70px;

      .logo{
        height: 60px;
        font-size: 22px;
        padding-left: 20px;
        border-color: rgba(238,241,146,0.3);
        color: white;

        img{
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
      }

      .logo-width{
        width: 230px;
      }

      .logo-collapse-width{
        width: 60px;
      }

      .tools{
        padding: 0px 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }

      .userinfo{
        bottom: 60px;
        text-align: right;
        padding-right: 35px;
        float: right;

        .userinfo-inner{
          cursor: pointer;

          img{
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
            border: 1px solid black;
          }
        }
      }
    }

    .aside{
      min-width: 50px;
      background-color: rgb(238, 241, 246);
      &::-webkit-scrollbar {
        display: none;
      }

      &.showSidebar{
        overflow-x: hidden;
        overflow-y: auto;
      }

      .menu-toggle {
        background: #4A5064;
        text-align: center;
        color: white;
        height: 26px;
        line-height: 30px;
      }

     /* .menu-collapsed{
        width: 60px;
      }

      .menu-expanded{
        width: 230px;
      }
*/
      .el-menu{
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
        width: 180px;
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
  /*.container .header {
    background-color: cornflowerblue;
    height: 70px;
    padding: 0px;
    line-height: 70px;
  }*/
  /*.container .header .logo{
    height: 60px;
    font-size: 22px;
    padding-left: 20px;
    border-color: rgba(238,241,146,0.3);
    !*border-right-width: 1px;*!
    !*border-right-style: solid;*!
    color: white;
  }*/
  /*.container .header .logo img{
    width: 40px;
    float: left;
    margin: 10px 10px 10px 18px;
  }*/
  /*.container .header .logo-width{
    width: 230px;
  }*/
  /*.container .header .logo-collapse-width{
    width: 60px;
  }*/
  /*.container .header .tools{
    padding: 0px 23px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
  }*/
  /*.container .header .userinfo{
    bottom: 60px;
    text-align: right;
    padding-right: 35px;
    float: right;
  }*/
  /*.container .header .userinfo .userinfo-inner{
    cursor: pointer;
  }
  .container .header .userinfo .userinfo-inner img{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    float: right;
    border: 1px solid black;
  }*/

  /*.container .aside{
    width: 230px;
    background-color: rgb(238, 241, 246);
    overflow: hidden;
  }*/
  /*.container .aside .el-menu{
    height: 100%;
  }
*/
  /*.container .aside .menu-collapsed{
    !*flex: 0 0 60px;*!
    width: 60px;
  }
  .container .aside .menu-expanded{
    !*flex:0 0 230px;*!
    width: 230px;
  }
  .container .aside .el-menu{
    height: 100%;
    background-color: #eef1f6;
  }*/

</style>
