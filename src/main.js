import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
// 引入hover.css
import 'hover.css'

import App from './App'
import store from './store'
import router from './router'

// 导入icon
import '@/icons' // icon
import '@/permission' // permission control

// 导入css主题


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

// Font-Some
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons 导入三个免费的icon库 */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, fab, far)
Vue.component('font-awesome-icon', FontAwesomeIcon) /* add font awesome icon component */

// 导入arcgis js api @arcgis/core手段
// import esriConfig from "@arcgis/core/config";
// esriConfig.assetsPath = "./assets";
// import '@arcgis/core/assets/esri/themes/light/main.css';

// 导入arcgis js api esri-loader手段
import * as esriLoader from 'esri-loader';
esriLoader.setDefaultOptions({ version: '3.44' })


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
