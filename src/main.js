import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import {store} from './store'
import Vue from 'vue'

loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')

Vue.config.productionTip = false  

new Vue({
  store,
  render: h => h(App),
});