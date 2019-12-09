import Vue from 'vue'
import Vuex from 'vuex'
import storeData from './store.js'
import VueRouter from 'vue-router'
import routerData from './router.js'
import App from './src/App.vue'
import myMixin from './mixins.js'
import './node_modules/normalize.css/normalize.css'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import './node_modules/element-ui/lib/theme-chalk/index.css'
import moment from 'moment'
import { createCipher } from 'crypto'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI,{ locale })

/*
* Создаём хранилище vuex
*/

const store = new Vuex.Store(storeData);

/*
* Создаём роутер
*/

const router = new VueRouter(routerData)

//
//	Ианипуляции с LocalStorage подключаем как mixin
//

Vue.mixin(myMixin)

/*
**	Создаём экземпляр Vue и передаём ему корневой компонент App. Внутри App уже включаются другие компоненты.
*/

new Vue({
	store,
	router,
  	el: '#app',
  	components: {
    	App: App
  	},
  	template: `<App></App>`,
 	data: function () {
		return {
			
		}
	}
})
