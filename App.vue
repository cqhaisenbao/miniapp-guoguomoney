<script>
	import { mapState, mapMutations, mapActions } from 'vuex';
	import wxLogin from '@/lib/weixinlogin';
	export default {
		onLaunch() {
			this.$store.dispatch('fetchIconName')
			this.$store.dispatch('fetchRecordList')
		},
		onShow() {
			uni.checkSession({
				success: (res) => {
					console.log('success', res.errMsg)
					uni.getStorage({
						key: 'recordList',
						success:()=>{
							this.$store.commit('fetchLocalRecordList')
						},
						fail: () => {
							this.$store.dispatch('fetchRecordList')
						}
					})
				},
				fail: (res) => {
					uni.hideLoading()
					wxLogin.call(this)
				},
				complete: () => {
					uni.getStorage({
						key: 'iconName',
						success:()=>{
							this.$store.commit('fetchLocalIconName')
						},
						fail: () => {
							this.$store.dispatch('fetchIconName')
						}
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
