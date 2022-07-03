<template>
  <el-menu
    default-active="2"
    active-text-color="#409EFF"
    text-color="#fff"
    class="el-menu"
    :collapse="collapsed"
  >
    <menu-item :menus="menus" />
  </el-menu>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import MenuItem from './MenuItem.vue'




defineProps({
  collapsed: {
    type: Boolean
  }
})

const menus = reactive([
  {
    path: '/',
    redirect: '/index',
    name: 'Index',
    meta: {
      title: '首页',
      icon: 'house'
    },
    children: [
      {
        path: 'index',
        name: 'Index',

        meta: {
          title: '首页',
          icon: 'house'

        }
      }
    ]
  },
  {
    path: '/user',
    redirect: '/user',
    name: 'User',
    meta: {
      title: '用户管理',
      affix: true,
      icon: 'UserFilled'
    },
    children: [
      {
        path: 'manger',
        name: 'UserManger',

        meta: {
          title: '用户管理',
          icon: 'UserFilled'

        }
      }
    ]
  }, {
    path: '/store',
    redirect: '/store',
    name: 'Store',
    meta: {
          title: '门店管理',
          icon: 'LocationInformation'

        },
    children: [
      {
        path: 'index',
        name: 'Index',

        meta: {
          title: '门店管理',
          icon: 'LocationInformation'

        }
      }
    ]
  },
  {
    path: '/order',
    name: 'Order',
    meta: {
      title: '订单管理',
      icon: 'Notebook',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'orderQuery',
        name: 'orderQuery',

        meta: {
          title: '订单查询',
          icon: 'Notification'
        }
      },
      {
        path: 'orderAction',
        name: 'orderAction',

        meta: {
          title: '订单处理',
          icon: 'Money'
        }
      }
    ]
  }, {
    path: '/good',
    name: 'good',

    meta: {
      title: '商品管理',
      icon: 'TakeawayBox'
    },
    children: [
      {
        path: 'category',
        name: 'category',

        meta: {
          title: '商品种类',
          icon: 'ShoppingBag'
        }
      },
      {
        path: 'goodQuery',
        name: 'goodQuery',

        meta: {
          title: '商品查询',
          icon: 'SoldOut'
        }
      }
    ]
  },

  {
    path: '/system',
    name: 'system',

    meta: {
      title: 'system',
      icon: 'Wallet',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'account',
        name: 'account',

        meta: {
          title: 'account',
          icon: 'User',
          roles: ['editor']
        }

      },
      {
        path: 'group',
        name: 'group',

        meta: {
          title: 'group',
          icon: 'Refrigerator',
          roles: ['admin']
        }
      }, {
        path: 'task',
        name: 'task',

        meta: {
          title: 'account',
          icon: 'Clock',
          roles: ['editor']
        }

      },
      {
        path: 'Setting',
        name: 'Setting',

        meta: {
          title: '系统设置',
          icon: 'Setting',
          roles: ['admin']
        }
      }
    ]

  }

])

</script>

<style lang="scss">
.el-menu {
  border: none;
  background-color: $menuBg;
  height: 100%;

}
</style>


<!-- <style lang="scss">
.el-menu {
  height: 100vh;
  width: 200px;
  min-height: 400px;
  background-color: $menuBg;
  overflow: hidden;
}
</style> -->