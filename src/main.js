// 导入app根组件
import Vue from 'vue';

// 导入路由
import VueRouter from 'vue-router';

// 导入首页组件
import App from './App.vue'

// 引入组件
import index from './components/01.index.vue'

// 注册VueRouter  Vue.use()
Vue.use(VueRouter)

Vue.config.productionTip = false

// 定义路由规则
let router = new VueRouter({
  routes: [{
    path:'/',
    // 重定向 根目录
    redirect:'/index'
  },
    {
    path:'/index',
    component:index
  }]
})

// 实例化路由对象

// 挂载到Vue实例上

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

