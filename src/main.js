import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import LedScreenSet from 'led-screen-set'
// import 'led-screen-set/dist/led-screen-set.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(LedScreenSet)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
