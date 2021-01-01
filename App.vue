<script>
	import { mapState, mapMutations,mapActions } from 'vuex';
	import wxLogin from '@/lib/weixinlogin';
	export default {
		onShow() {
			wxLogin.call(this).then(()=>{
				this.$store.dispatch('fetchIconName')
				this.$store.dispatch('fetchRecordList')
			})
			// console.log(wxLogin.call(this))
		},
		methods: {
			// ...mapActions(['fetchIconName'])
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "./static/iconfont/iconfont.css"
	/*每个页面公共css */
</style>
