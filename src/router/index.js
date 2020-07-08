import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Welcome from '../components/Welcome'
import UserManager from '../components/UserManager'
import SelfUserInfo from '../components/SelfUserInfo'
import Permission from '../components/Permission'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: Welcome
    },
    {
      path: '/userManager',
      component: UserManager
    },
    {
      path: '/selfUserInfo',
      component: SelfUserInfo
    },
    {
      path: '/permission',
      component: Permission
    }
    ]
  }
]

const router = new VueRouter({
  routes
})

//  挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从那个路径跳转而来
  // next 是一个函数，表示放行
  //    next() 放行    next('/') 强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = localStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
