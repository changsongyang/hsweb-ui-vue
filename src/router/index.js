import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
import Menu from 'components/menu/menu'
import Permission from 'components/permission/permission'
import Role from 'components/role/role'
import User from 'components/user/user'
import Agency from 'components/agency/agency'
import InSetting from 'components/inte-setting/in-setting'
import Login from 'components/login/login'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      component: Login,
      hidden: true
    },
    {
      path: '/home',
      component: Home,
      name: '系统设置',
      iconCls: 'el-icon-setting',
      children: [
        {
          path: '/menu',
          name: '菜单管理',
          component: Menu
        },
        {
          path: '/permission',
          name: '权限管理',
          component: Permission
        },
        {
          path: '/role',
          name: '角色管理',
          component: Role
        },
        {
          path: '/user',
          name: '用户管理',
          component: User,
          children: [
            {path: ':id'}
          ]
        }
      ]
    },
    {
      path: '/home',
      component: Home,
      name: '组织架构',
      iconCls: 'el-icon-menu',
      children: [
        {
          path: '/agency',
          name: '机构管理',
          component: Agency
        },
        {
          path: '/setting',
          name: '综合设置',
          component: InSetting
        }

      ]
    }
  ]
})

/*
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.sessionStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.sessionStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})
*/

export default router
