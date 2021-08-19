import { createRouter, createWebHashHistory } from 'vue-router'
import { authenticationService } from '../services/authentication.service'
import { Role } from '../utils/enum'
import Dashboard from '../views/Dashboard/Dashboard'

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard',
      authorize: [Role.Admin, Role.Staff]
    },
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    meta: {
      title: 'Login',
      formScreen: true
    },
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login')
  },
  {
    meta: {
      title: 'Quản lý nhân viên',
      authorize: [Role.Admin]
    },
    path: '/staff',
    name: 'staff',
    component: () => import(/* webpackChunkName: "employees" */ '../views/Staff/Staff')
  },
  {
    meta: {
      title: 'Nhà tuyển dụng',
      authorize: [Role.Admin]
    },
    path: '/recruiter',
    name: 'recruiter',
    component: () => import(/* webpackChunkName: "recruiter" */ '../views/Recruiter/RecruiterTable.vue')
  },
  {
    meta: {
      title: 'Sinh viên',
      authorize: [Role.Admin]
    },
    path: '/student',
    name: 'student',
    component: () => import(/* webpackChunkName: "student" */ '../views/Student/StudentTable.vue')
  },
  {
    meta: {
      title: 'Duyệt công việc',
      authorize: [Role.Admin, Role.Staff]
    },
    path: '/job',
    name: 'job',
    component: () => import(/* webpackChunkName: "assignment" */ '../views/Job/Job')
  },
  {
    meta: {
      title: 'Banner',
      authorize: [Role.Admin, Role.Staff]
    },
    path: '/banner',
    name: 'banner',
    component: () => import(/* webpackChunkName: "banner" */ '../views/Banner/Banner')
  },
  {
    meta: {
      title: 'Ngành nghề',
      authorize: [Role.Admin, Role.Staff]
    },
    path: '/catagory',
    name: 'catagory',
    component: () => import(/* webpackChunkName: "banner" */ '../views/ManageJob/catagory')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta
  const currentUser = authenticationService.currentUserValue

  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({ path: '/login' })
    }

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // role not authorised so redirect to home page
      return next({ path: '/' })
    }
  }
  next()
})

export default router
