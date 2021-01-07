<script>
	import { mapState, mapMutations, mapActions } from 'vuex';
	import wxLogin from '@/lib/weixinlogin';
	export default {
		computed: {
			...mapState(['isLogin']),
		},
		onLaunch() {
			// this.$store.dispatch('fetchIconName')
			if (this.isLogin) {
				this.$store.dispatch('fetchRecordList')
			}
		},
		onShow() {
			uni.checkSession({
				success: (res) => {
					this.$store.commit('changeIsLogin')
					uni.getStorage({
						key: 'recordList',
						success: () => {
							this.$store.commit('fetchLocalRecordList')
						},
						fail: () => {
							this.$store.dispatch('fetchRecordList')
						}
					})
				},
				fail: (res) => {
					wxLogin.call(this)
				},
				complete: () => {
					uni.getStorage({
						key: 'iconName',
						success: () => {
							this.$store.commit('fetchLocalIconName')
						},
						// fail: () => {
						// 		this.$store.dispatch('fetchIconName')
						// }
					})
				}
			})
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "./static/iconfont/iconfont.css"
	/*每个页面公共css */
</style>
