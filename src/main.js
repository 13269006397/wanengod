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
//  引入echarts
import echarts from 'echarts'
// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 注册富文本编辑器组件为全局组件
Vue.use(VueQuillEditor)

Vue.prototype.$echarts = echarts

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
