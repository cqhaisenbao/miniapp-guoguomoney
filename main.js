import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from "@/store"
import Toast from "./wxcomponents/vant-weapp/toast/toast"
Vue.use(uView);
Vue.prototype.$toast=Toast

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
