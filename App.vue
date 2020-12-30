<script>
	import { mapState, mapMutations } from 'vuex';
	import wxLogin from '@/lib/weixinlogin'
	export default {
		onShow() {
			wxLogin.call(this)
		},
		methods:{
			...mapMutations(['changeisLogin'])
		}
		// methods:{
		// 	checkLogin(){
		// 		const id = uni.getStorageSync('uni_id_token');
		// 		if(id){
		// 			this.$store.commit('changeisLogin', true);
		// 			return id
		// 		}else{
		// 			wxLogin()
		// 			this.$store.commit('changeisLogin', true);
		// 			console.log('没有登录')
		// 		}
		// 	}
		// }
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "./static/iconfont/iconfont.css"
	/*每个页面公共css */
</style>
