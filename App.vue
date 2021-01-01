<script>
	import { mapState, mapMutations } from 'vuex';
	import wxLogin from '@/lib/weixinlogin';
	export default {
		onShow() {
			wxLogin.call(this).then(()=>{
				this.$store.commit('fetchIconName')
			})
			// console.log(wxLogin.call(this))
		},
		methods: {
			...mapMutations(['changeisLogin']),
			...mapMutations(['fetchIconName'])
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "./static/iconfont/iconfont.css"
	/*每个页面公共css */
</style>
