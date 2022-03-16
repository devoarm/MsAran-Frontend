import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import { localize } from 'vee-validate' // validate พื้นที่ th
import router from './router'
import store from './store'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';

// Global Components
import './global-components'
import 'sweetalert2/dist/sweetalert2.min.css';

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'



Vue.use(VueSweetalert2);
//ภาษา validator message
localize("th")
// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)


// Composition API
Vue.use(VueCompositionAPI)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
