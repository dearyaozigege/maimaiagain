// 导入app根组件
import Vue from 'vue';

// 导入路由
import VueRouter from 'vue-router';

// 导入首页组件
import App from './App.vue'

// 引入index.vue页面组件
import index from './components/01.index.vue'
// 引入02.productdetail页面组件
import detail from './components/02.productdetail.vue'

// 注册VueRouter  Vue.use()
Vue.use(VueRouter)

// 引入轮播图组件element
import ElementUI from 'element-ui';
import '../node_modules/element-ui/lib/theme-chalk/index.css';
// 在Vue中调用
Vue.use(ElementUI);

// 图片懒加载设置 github里的文档
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: require('./assets/lib/images/lazyload.gif'),
  attempt: 1
})

// 设置全局的过滤器
// 先导入moment 
import moment from 'moment'
// 设置全局的过滤器
Vue.filter('capitalize',function(value){
  return moment(value).format('YYYY年MM月DD日');
})

// 导入iview 运用吸顶
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

// 抽取axios,作为全局
import axios from 'axios'
// 同时设置基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899'
// 设置全局的axios
Vue.prototype.$axios = axios


// 导入放大镜 vue zoomer
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

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
  },
  {
    path:'/productdetal/:id',
    component:detail
  }
]
})

// 实例化路由对象

// 挂载到Vue实例上

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

