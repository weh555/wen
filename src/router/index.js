import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import { LayoutNew } from '@/layout_new/index';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/index',
    component: () => import('@/views/bus'),
  },
  {
    path: '/',
    redirect: '/stxf',
  },
  {
    path: '/stxf',
    component: LayoutNew,
    redirect: '/stxf/map',
    children: [
      {
        path: 'map',
        name: 'map',
        component: () => import('@/views/bus'),
        meta: { title: 'test', icon: 'test' }
      }, {
        path: 'ghgl',
        name: 'ghgl',
        component: () => import('@/views/bus/ghgl/index.vue'),
        meta: { title: 'test', icon: 'test' }
      }, {
        path: 'xmgl',
        name: 'xmgl',
        component: () => import('@/views/bus/xmgl/index.vue'),
        meta: { title: 'test', icon: 'test' }
      }, {
        path: 'ydzb',
        name: 'ydzb',
        component: () => import('@/views/bus/ydzb/index.vue'),
        meta: { title: 'test', icon: 'test' }
      }, {
        path: 'xmtb',
        name: 'xmtb',
        component: () => import('@/views/bus/xmtb/index.vue'),
        meta: { title: 'test', icon: 'test' }
      }, {
        path: 'zwfw',
        name: 'zwfw',
        component: () => import('@/views/bus/zwfw/index.vue'),
        meta: { title: 'test', icon: 'test' }
      }
    ]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: '主页', icon: 'dashboard' }
  //   }]
  // },
  // {
  //   path: '/project',
  //   component: Layout,
  //   redirect: '/project/unused',
  //   name: 'project',
  //   meta: { title: '项目库', icon: 'el-icon-folder' },
  //   children: [
  //     {
  //       path: 'unused',
  //       name: 'Unused',
  //       component: () => import('@/views/project/unused/index'),
  //       meta: { title: '储备项目', icon: 'el-icon-folder' }
  //     },
  //     {
  //       path: 'spatialposition',
  //       name: 'Spatialposition',
  //       component: () => import('@/views/project/spatialposition/index'),
  //       meta: { title: '储备项目空间分布', icon: 'el-icon-folder' }
  //     },
  //     {
  //       path: 'approval',
  //       name: 'Approval',
  //       component: () => import('@/views/project/approval/index'),
  //       meta: { title: '立项项目', icon: 'el-icon-folder' }
  //     }
  //   ]
  // },
  // {
  //   path: '/business',
  //   component: Layout,
  //   redirect: '/business/todo',
  //   name: 'business',
  //   meta: { title: '业务审批', icon: 'el-icon-folder' },
  //   children: [
  //     {
  //       path: 'todo',
  //       name: 'Todo',
  //       component: () => import('@/views/business/todo/index'),
  //       meta: { title: '待办案件', icon: 'el-icon-folder' }
  //     },
  //     {
  //       path: 'doing',
  //       name: 'Doing',
  //       component: () => import('@/views/business/doing/index'),
  //       meta: { title: '在办案件', icon: 'el-icon-folder' }
  //     },
  //     {
  //       path: 'done',
  //       name: 'Done',
  //       component: () => import('@/views/business/done/index'),
  //       meta: { title: '已办案件', icon: 'el-icon-folder' }
  //     }
  //   ]
  // },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
