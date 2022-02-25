import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
Vue.use(Router)

export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
        path: '/redirect/:path*',
        component: () =>
            import('@/views/redirect/index')
    }]
},
{
    path: '/login',
    component: () =>
        import('@/views/login/index_old'),
    hidden: true
},
{
    path: '/auth-redirect',
    component: () =>
        import('@/views/login/auth-redirect'),
    hidden: true
},
{
    path: '/404',
    component: () =>
        import('@/views/error-page/404'),
    hidden: true
},
{
    path: '/401',
    component: () =>
        import('@/views/error-page/401'),
    hidden: true
},
{
    path: '/Printing',
    component: () =>
        import('@/views/CardManagement/PrintLabel/components/Printing'),
    hidden: true
},
{
    path: '/Printings',
    component: () =>
        import('@/views/CardManagement/PrintLabel/components/Printings'),
    hidden: true
},
// {
//   path: '/checkhome',
//   component: () => import('@/views/demo/index'),
//   hidden: true
// },
{
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [{
        path: 'dashboard',
        component: () =>
            import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
},
{
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [{
        path: 'index',
        component: () =>
            import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
    }]
},
{
    path: '/TodoCenter',
    component: Layout,
    hidden: true,
    redirect: '/Todo/index',
    children: [{
        path: '/Todo/index',
        component: () =>
            import('@/views/Todo/index'),
        name: 'Todo',
        meta: { title: '待办中心', icon: '待办', noCache: true }
    }]
},
{
    path: '/CardManagement',
    component: Layout,
    redirect: '/Todo/index',
    meta: {
        title: '卡片管理',
        icon: '系统设置'
    },
    children: [{
        path: 'AssetCard/index',
        component: () =>
            import('@/views/CardManagement/AssetCard/index'),
        name: 'AssetCard',
        meta: { title: '资产台账', icon: '台账', noCache: true }
    }
        // {
        //   path: "PrintLabel/index",
        //   component: () => import("@/views/CardManagement/PrintLabel/index"),
        //   name: "PrintLabel",
        //   meta: { title: "打印标签", icon: "user", noCache: true }
        // },
    ]
},
{
    path: '/Purchase',
    component: Layout,
    redirect: '/TodoCenter/index',
    meta: {
        title: '验收入库',
        icon: '系统设置'
    },
    children: [{
        path: '/Purchase/index',
        component: () =>
            import('@/views/dailyManagement/Purchase/index'),
        name: 'Purchase',
        meta: { title: '验收入库', noCache: true, icon: '入库' }
    },
    {
        path: 'purchases',
        hidden: true,
        component: () =>
            import('@/views/dailyManagement/Purchase/components/purchases'),
        name: 'purchases',
        meta: { title: '固定资产入库单', noCache: true, icon: '入库' }
    },
    {
        path: 'handlePurchases',
        hidden: true,
        component: () =>
            import('@/views/dailyManagement/Purchase/components/handlePurchases'),
        name: 'handlePurchases',
        meta: { title: '固定资产入库单', noCache: true, icon: '入库' }
    }
        // {
        //   path: "PrintLabel/index",
        //   component: () => import("@/views/CardManagement/PrintLabel/index"),
        //   name: "PrintLabel",
        //   meta: { title: "打印标签", icon: "user", noCache: true }
        // },
    ]
},
{
    path: '/dailyManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'dailyManagement',
    // hidden: true,
    meta: {
        title: '日常管理',
        icon: '日常'
    },
    children: [
        // {
        //   path: "Purchase/index",
        //   component: () => import("@/views/dailyManagement/Purchase/index"),
        //   name: "Purchase",
        //   meta: { title: "购置验收", noCache: true, icon: "流程设计" }
        // },
        {
            path: '/Borrow/index',
            component: () =>
                import('@/views/dailyManagement/Borrow/index'),
            name: 'Borrow',
            meta: { title: '资产借还', noCache: true, icon: '借还' }
        },
        {
            path: '/borrows',
            hidden: true,
            component: () =>
                import('@/views/dailyManagement/Borrow/components/borrows'),
            name: '/borrows',
            meta: { title: '资产借还单', noCache: true, icon: '借还' }
        },
        {
            path: '/Repair/index',
            component: () =>
                import('@/views/dailyManagement/Repair/index'),
            name: 'Repair',
            meta: { title: '资产报修', noCache: true, icon: '报修' }
        },
        {
            path: '/repairs',
            hidden: true,
            component: () =>
                import('@/views/dailyManagement/Repair/components/repairs'),
            name: 'repairs',
            meta: { title: '资产报修单', noCache: true, icon: '报修' }
        },
        {
            path: '/Transfer/index',
            component: () =>
                import('@/views/dailyManagement/Transfer/index'),
            name: 'Transfer',
            meta: { title: '资产转移', noCache: true, icon: '转移' }
        },
        {
            path: '/transfers',
            hidden: true,
            component: () =>
                import('@/views/dailyManagement/Transfer/components/transfers'),
            name: 'transfers',
            meta: { title: '资产转移单', noCache: true, icon: '转移' }
        },
        {
            path: '/ChangeOriginal/index',
            component: () =>
                import('@/views/dailyManagement/ChangeOriginal/index'),
            name: 'ChangeOriginal',
            meta: { title: '原值变动', noCache: true, icon: '变动' }
        },
        {
            path: '/originals',
            hidden: true,
            component: () =>
                import('@/views/dailyManagement/ChangeOriginal/components/originals'),
            name: 'originals',
            meta: { title: '原值变动单', noCache: true, icon: '变动' }
        },
        {
            path: 'flow_node/index',
            hidden: true,
            component: () =>
                import('@/views/dailyManagement/Purchase/index'),
            name: 'flownode',
            meta: { title: '日期调整', noCache: true, icon: '日期' }
        },
        {
            path: 'PrintLabel/index',
            component: () =>
                import('@/views/CardManagement/PrintLabel/index'),
            name: 'PrintLabel',
            meta: { title: '打印标签', icon: '打印', noCache: true }
        }
    ]
},
{
    path: '/assetDisposal',
    component: Layout,
    redirect: '/assetDisposal/index',
    children: [{
        path: '/assetDisposal/index',
        component: () =>
            import('@/views/assetDisposal/index'),
        name: 'assetDisposal',
        meta: { title: '资产处置', icon: '处置', noCache: true }
    },
    {
        path: '/pendingDisposal',
        hidden: true,
        component: () =>
            import('@/views/assetDisposal/components/pendingDisposal'),
        name: 'pendingDisposal',
        meta: { title: '待处置库', icon: '处置', noCache: true }
    }
    ]
},
{
    path: '/inventory',
    component: Layout,
    // redirect: "/check/index",
    children: [{
        path: '/check',
        component: () =>
            import('@/views/check/index'),
        name: 'check',
        meta: { title: '清查盘点', icon: 'user', noCache: true }
    },
    {
        path: '/createCheck',
        hidden: true,
        component: () =>
            import('@/views/check/components/createInventory.vue'),
        name: 'createCheck',
        meta: { title: '创建盘点', icon: 'user', noCache: true }
    },
    {
        path: '/AssignTasks',
        hidden: true,
        component: () =>
            import('@/views/check/components/AssignTasks.vue'),
        name: 'AssignTasks',
        meta: { title: '分配任务', icon: 'user', noCache: true }
    },
    {
        path: 'checkInformationtest/index',
        component: () =>
            import('@/views/check/components/checkInformationtest.vue'),
        name: 'checkInformationtest',
        hidden: true,
        meta: { title: '盘点详情', icon: 'user', noCache: true }
    },
    {
        path: '/CheckContent',
        component: () =>
            import('@/views/check/components/CheckContent.vue'),
        name: 'CheckContent',
        hidden: true,
        meta: { title: '盘点报告', icon: 'user', noCache: true }
    }
        // {
        //   path: "profitLossDetailsEcharts/index",
        //   component: () => import("@/views/check/components/profitLossDetailsEcharts.vue"),
        //   name: "profitLossDetailsEcharts",
        //   hidden: fatruelse,
        //   meta: { title: "盘点详情条形图", icon: "user", noCache: true }
        // },
    ]
},
{
    path: '/RecordQuery',
    component: Layout,
    redirect: '/RecordQuery/index',
    meta: { title: '记录查询', icon: '统计', noCache: true },
    children: [{
        path: 'purchase/index',
        component: () =>
            import('@/views/RecordQuery/purchase/index'),
        name: 'purchaseindex',
        meta: { title: '入库查询', icon: '入库', noCache: true }
    },
    {
        path: 'RecordQuery/Borrow/index',
        component: () =>
            import('@/views/RecordQuery/Borrow/index'),
        name: 'Borrowindex',
        meta: { title: '借还查询', icon: '借还', noCache: true }
    },
    {
        path: 'RecordQuery/Repair/index',
        component: () =>
            import('@/views/RecordQuery/Repair/index'),
        name: 'Repairindex',
        meta: { title: '报修查询', icon: '报修', noCache: true }
    },
    {
        path: 'RecordQuery/Transfer/index',
        component: () =>
            import('@/views/RecordQuery/Transfer/index'),
        name: 'Transferindex',
        meta: { title: '转移查询', icon: '转移', noCache: true }
    },
    {
        path: 'ChangeOriginal/index',
        component: () =>
            import('@/views/RecordQuery/ChangeOriginal/index'),
        name: 'iChangeOriginalndex',
        meta: { title: '原值变动查询', icon: '变动', noCache: true }
    },
    {
        path: '/Disposal/index',
        component: () =>
            import('@/views/RecordQuery/Disposal/index'),
        name: 'Disposalindex',
        meta: { title: '处置查询', icon: '处置', noCache: true }
    }
    ]
},
{
    path: '/ReportManagement',
    component: Layout,
    redirect: '/ReportManagement/index',
    meta: { title: '报表管理', icon: '报表', noCache: true },
    children: [
        {
            path: '/Balance/index',
            component: () =>
                import('@/views/ReportManagement/Balance/index'),
            name: 'Balanceindex',
            meta: { title: '结存统计', icon: '报表', noCache: true }
        },
        {
            path: '/Balance/newIndex',
            component: () =>
                import('@/views/ReportManagement/Balance/newIndex'),
            name: 'Balanceindex',
            meta: { title: '新结存统计', icon: '报表', noCache: true }
        },
        {
            path: '/Increase/index',
            component: () =>
                import('@/views/ReportManagement/Increase/index'),
            name: 'Increaseindex',
            meta: { title: '增减统计', icon: '报表', noCache: true }
        },
        {
            path: '/Depreciation/index',
            component: () =>
                import('@/views/ReportManagement/Depreciation/index'),
            name: 'Depreciationindex',
            meta: { title: '折旧统计', icon: '报表', noCache: true }
        }
    ]
},
{
    path: '/WarningCenter',
    component: Layout,
    hidden: true,
    redirect: '/warning/index',
    meta: { title: '预警中心', icon: '预警1', noCache: true },
    children: [{
        path: '/abnormal/index',
        component: () =>
            import('@/views/warning/abnormal/index'),
        name: 'abnormalindex',
        meta: { title: '异常资产查询', icon: '预警1', noCache: true }
    },
    {
        path: '/Critical/index',
        component: () =>
            import('@/views/warning/critical/index'),
        name: 'Criticalindex',
        meta: { title: '临界到期查询', icon: '预警1', noCache: true }
    }
    ]
},
{
    path: '/finance',
    component: Layout,
    redirect: 'noRedirect',
    name: 'finance',
    meta: { title: '财务处理', icon: '财务', noCache: true },
    alwaysShow: true,
    children: [
        {
            path: '/depreciation',
            component: () =>
                import('@/views/depreciation/index1'),
            name: 'depreciation',
            meta: { title: '资产折旧', icon: '折旧', noCache: true }
        },
        {
            path: '/monthlySettlement',
            component: () =>
                import('@/views/monthlySettlement/index'),
            name: 'monthlySettlement',
            meta: { title: '月结帐', icon: '月结帐', noCache: true }
        },
        {
            path: '/assetsReport',
            component: () =>
                import('@/views/assetsReport/index'),
            name: 'assetsReport',
            meta: { title: '资产年报', icon: '资产年报', noCache: true }
        }
    ]
},
{
    path: '/dataCenter',
    component: Layout,
    redirect: 'noRedirect',
    name: 'dataCenter',
    meta: { title: '数据中心', icon: '数据中心', noCache: true },
    alwaysShow: true,
    children: [
        {
            path: '/SJKB',
            component: () =>
                import('@/views/dataCenter/SJKB/index'),
            name: 'SJKB',
            meta: { title: '数据看板', icon: '折旧', noCache: true }
        },
        {
            path: '/YWFX',
            component: () =>
                import('@/views/dataCenter/index'),
            name: 'YWFX',
            meta: { title: '运维分析', icon: '折旧', noCache: true }
        },
        {
            path: '/ZJFX',
            component: () =>
                import('@/views/dataCenter/index'),
            name: 'ZJFX',
            meta: { title: '增减分析', icon: '折旧', noCache: true }
        },
        {
            path: '/ZCST',
            component: () =>
                import('@/views/dataCenter/ZCST/index'),
            name: 'ZCST',
            meta: { title: '资产视图', icon: '折旧', noCache: true }
        }
    ]
},
// {
//     path: "/depreciation",
//     component: Layout,
//     redirect: "/depreciation/index",
//     children: [{
//         path: "depreciation",
//         component: () =>
//             import("@/views/depreciation/index"),
//         name: "depreciation",
//         meta: { title: "资产折旧", icon: "折旧", noCache: true }
//     }]
// },
{
    path: '/SystemSettings',
    component: Layout,
    redirect: 'noRedirect',
    name: 'SystemSettings',
    // hidden: true,
    meta: {
        title: '系统设置',
        icon: '设置'
    },
    children: [{
        path: 'flow_node/index',
        hidden: true,
        component: () =>
            import('@/views/flow_node/index'),
        name: 'flownode',
        meta: { title: '流程设计', noCache: true, icon: '流程设计' }
    },
    {
        path: 'flow_config/index',
        hidden: true,
        component: () =>
            import('@/views/flow_config/index'),
        name: 'flownode',
        meta: { title: '流程配置', noCache: true, icon: '流程配置' }
    },
    {
        path: 'SystemSettingsUsers',
        component: () =>
            import('@/views/SystemSettings/Users/index'),
        name: 'SystemSettingsUsers',
        meta: { title: '系统用户', noCache: true, icon: '系统用户' }
    },
    {
        path: 'SystemSettingsDepartment',
        component: () =>
            import('@/views/SystemSettings/Department/index'),
        name: 'SystemSettingsDepartment',
        meta: { title: '公司部门', noCache: true, icon: '部门设置' }
    },
    {
        path: 'SystemSettingsCategory',
        component: () =>
            import('@/views/SystemSettings/Category/index'),
        name: 'SystemSettingsCategory',
        meta: { title: '资产类别', noCache: true, icon: '类别' }
    }
    ]
}
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
    /**
     * 注意: 子菜单只在路由子菜单时出现。长度> = 1
     * 参考网址: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
     *
     * hidden: true                   如果设置为true，项目将不会显示在侧栏中(默认为false)
     * alwaysShow: true               如果设置为true，将始终显示根菜单
     *                                如果不设置alwaysShow, 当项目有多个子路由时，它将成为嵌套模式，否则不显示根菜单
     * redirect: noRedirect           如果设置noRedirect，则不会在面包屑中重定向
     * name:'router-name'             the name is used by <keep-alive> (must set!!!)
     * meta : {
        roles: ['admin','editor']    控制页面角色(可以设置多个角色)
        title: 'title'               名称显示在侧边栏和面包屑(推荐集)
        icon: 'svg-name'             图标显示在侧栏中
        breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中(默认为true)
        activeMenu: '/example/list'  如果设置路径，侧栏将突出显示您设置的路径
      }
     */

    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
    new Router({
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
