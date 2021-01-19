import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//Шина для работы с соседними компонентами
export const busGetContacts = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
