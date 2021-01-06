<script>
	import { mapState, mapMutations, mapActions } from 'vuex';
	import wxLogin from '@/lib/weixinlogin';
	export default {
		onShow() {
			uni.checkSession({
				success: (res) => {
					console.log('success', res.errMsg)
					this.$store.dispatch('fetchIconName')
					this.$store.dispatch('fetchRecordList')
				},
				fail: (res) => {
					wxLogin.call(this)
				},
			})
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "./static/iconfont/iconfont.css"
	/*每个页面公共css */
</style>
