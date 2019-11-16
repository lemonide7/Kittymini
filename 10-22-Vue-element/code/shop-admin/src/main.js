// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/index.css'
import axios from "axios"
//vue原型里面的定义一个属性，全局Vue组件都可以使用
Vue.prototype.$http=axios
//将基接口简化
axios.defaults.baseURL="http://localhost:8888/api/private/v1";
//授权api
axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
Vue.config.productionTip = false
Vue.use(ElementUI)


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
