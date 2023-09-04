[{
    "id": "1",
    "name": "入库管理",
    "children": [
        {
            "id": "1-1",
            "name": "快速入库",
            "path":"/inbound/action"
        },
        {
            "id": "1-2",
            "name": "还货入库",
            "path":"/inbound/return"
        },
        {
            "id": "1-3",
            "name": "入库单记录",
            "path":"/inbound/record"
        },
    ]
},
{
    "id": "2",
    "name": "出库管理",
    "children": [
        {
            "id": "2-1",
            "name": "快速出库",
            "path":"/outbound/action"
        },
        {
            "id": "2-2",
            "name": "出库记录",
            "path":"/outbound/record"
        },
        {
            "id": "2-3",
            "name": "出库单记录",
            "path":"/outbound/order"
        },
    ]
},
{
    "id": "3",
    "name": "库存管理",
    "children": [
        {
            "id": "3-1",
            "name": "在线货品管理",
            "path":"/inventory/manage"
        },
        {
            "id": "3-2",
            "name": "货品列表",
            "path":"/inventory/record"
        },

    ]
},
{
    "id": "4",
    "name": "财务管理",
    "children": [
        {
            "id": "4-1",
            "name": "供应商结账",
            "path":"/inventory/manage"
        },
        {
            "id": "4-2",
            "name": "出借客户结账",
            "path":"/inventory/record"
        },
        {
            "id": "4-3",
            "name": "卖手提成",
            "path":"/inventory/record"
        },
        {
            "id": "4-4",
            "name": "结算历史",
            "path":"/inventory/record"
        },

    ]
},
{
    "id": "5",
    "name": "销售管理",
    "children": [
        {
            "id": "5-1",
            "name": "未还货列表",
            "path":"/inventory/manage"
        },
        {
            "id": "5-2",
            "name": "已售列表",
            "path":"/inventory/record"
        },
        {
            "id": "5-3",
            "name": "退货列表",
            "path":"/inventory/record"
        },
        
    ]
},
{
    "id": "6",
    "name": "客户管理",
    "children": [
        {
            "id": "6-1",
            "name": "出借客户管理",
            "path":"/custom/custom"
        },
        {
            "id": "6-2",
            "name": "供应商管理",
            "path":"/custom/supplier"
        },
                {
            "id": "6-3",
            "name": "直播间管理",
            "path":"/custom/custom"
        },

    ]
},
{
    "id": "7",
    "name": "排班管理",
    "children": [
        {
            "id": "7-1",
            "name": "排班操作",
            "path":"/schedule"
        },
        {
            "id": "7-2",
            "name": "店铺管理",
            "path":"/store"
        },
        {
            "id": "7-3",
            "name": "基础配置",
            "path":"/inventory/record"
        },
    ]
},
{
    "id": "8",
    "name": "系统配置",
    "children": [
        {
            "id": "8-1",
            "name": "仓库配置",
            "path":"/schedule"
        },
        {
            "id": "8-2",
            "name": "品类管理",
            "path":"/store"
        },
        {
            "id": "8-3",
            "name": "基础配置",
            "path":"/inventory/record"
        },
    ]
},
{
    "id": "9",
    "name": "权限管理",
    "children": [
        {
            "id": "9-1",
            "name": "角色管理",
            "path":"/permission/role"
        },
        {
            "id": "9-2",
            "name": "用户管理",
            "path":"/permission/user"
        },
        {
            "id": "9-3",
            "name": "租户管理",
            "path":"/permission/tenant"
        },
    ]
},
]


const inboundRoute=[
    //入库路由
  {
    name: 'inbound',
    path: '/inbound',
    meta: {
      keepAlive: true,
      title: "入库管理",
      icon: "Printer"
    },
    children: [
      {
        name: 'inboundaction',
        path: 'action',
        component: () => import('@/views/inbound/action'),
        meta: {
          keepAlive: true,
          title: "快速入库"
        }
      },
      {
        name: 'inboundreturn',
        path: 'return',
        component: () => import('@/views/inbound/return'),
        meta: {
          keepAlive: true,
          title: "还货入库"
        }
      },
      {
        name: 'inboundrecord',
        path: 'record',
        component: () => import('@/views/inbound/record'),
        meta: {
          keepAlive: true,
          title: "入库单列表"
        }
      },
    ],
  },

  //出库路由
  {
    name: 'outbound',
    path: '/outbound',

    meta: {
      keepAlive: true,
      title: "出库操作",
      icon: "IconMenu",
    },
    children: [
      {
        name: 'outboundaction',
        path: 'action',
        component: () => import('@/views/outbound/outbound'),
        meta: {
          keepAlive: true,
          title: "出库操作"
        },
      },
      {
        name: 'outboundrecord',
        path: 'record',
        component: () => import('@/views/outbound/record'),
        meta: {
          keepAlive: true,
          title: "出库货品列表"
        }
      },
      {
        name: 'outboundorder',
        path: 'order',
        component: () => import('@/views/outbound/order'),
        meta: {
          keepAlive: true,
          title: "出库单列表"
        }
      },
    ]
  },


  //销售路由
  {
    name: 'sale',
    path: '/sale',

    meta: {
      keepAlive: true,
      title: "销售管理",
      icon: "CreditCard"
    },
    children: [
      {
        name: 'lend',
        path: 'lend',
        component: () => import('@/views/sale/lend'),
        meta: {
          keepAlive: true,
          title: "未还列表"
        }
      },
      {
        name: 'return',
        path: 'return',
        component: () => import('@/views/sale/return'),
        meta: {
          keepAlive: true,
          title: "还货列表"
        }
      },
      {
        name: 'saled',
        path: 'saled',
        component: () => import('@/views/sale/saled'),
        meta: {
          keepAlive: true,
          title: "已售列表"
        }
      },
    ],

  },

  //库存路由
  {
    name: 'inventory',
    path: '/inventory',

    meta: {
      keepAlive: true,
      title: "库存管理",
      icon: "Box"
    },
    children: [
      {
        name: 'inventorymanage',
        path: 'manage',
        component: () => import('@/views/inventory/manage'),
        meta: {
          keepAlive: true,
          title: "在线货物管理"
        },
      },
      {
        name: 'inventoryrecord',
        path: 'record',
        component: () => import('@/views/inventory/record'),
        meta: {
          keepAlive: true,
          title: "货品列表"
        }
      },
    ]
  },

  //排班路由
  {
    name: 'pb',
    path: '/pb',

    meta: {
      keepAlive: true,
      title: "排班管理",
      icon: "Timer"
    },
    children: [
      {
        name: 'store',
        path: 'store',
        component: () => import('@/views/schedule/store'),
        meta: {
          keepAlive: true,
          title: "排班操作"
        }
      },
      {
        name: 'schedule',
        path: 'schedule',
        component: () => import('@/views/schedule/schedule'),
        meta: {
          keepAlive: true,
          title: "直播间管理"
        },
      },
    ]
  },


  //客户路由
  {
    name: 'custom',
    path: '/custom',

    meta: {
      keepAlive: true,
      title: "客户管理",
      icon: "User"
    },
    children: [
      {
        name: 'supplier',
        path: 'supplier',
        component: () => import('@/views/user/supplier'),
        meta: {
          keepAlive: true,
          title: "供应商管理"
        },
      },
      {
        name: 'custom',
        path: 'custom',
        component: () => import('@/views/user/custom'),
        meta: {
          keepAlive: true,
          title: "出借客户管理"
        }
      },
    ]
  },


  //角色控制路由
  {
    name: 'permission',
    path: '/permission',

    meta: {
      keepAlive: true,
      title: "权限管理",
      icon: "UserFilled"
    },
    children: [
      {
        name: 'role',
        path: 'role',
        component: () => import('@/views/role/role'),
        meta: {
          keepAlive: true,
          title: "角色管理"
        },
      },
      {
        name: 'user',
        path: 'user',
        component: () => import('@/views/role/user'),
        meta: {
          keepAlive: true,
          title: "用户管理"
        }
      },
      {
        name: 'tenant',
        path: 'tenant',
        component: () => import('@/views/role/tenant'),
        meta: {
          keepAlive: true,
          title: "租户管理"
        }
      },
    ]
  },

]