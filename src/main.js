import Vue from 'vue'
import App from './App.vue'

////element theme import
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import './assets/scss/element-variables.scss'
Vue.use(ElementUI, { locale });

//axios import
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/' : 'http://zelindm.fvds.ru/api/'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
