import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui'
// 导入全局样式表
import './assets/css/blobal.css'
// 引入阿里icon图标
import './assets/icon/iconfont.css'
import axios from 'axios'

// 请求头增加Token数据 调后台接口做对比
axios.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.getItem('access-token')
  return config
})

// 必须使用才能生效
Vue.use(ElementUI)
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
