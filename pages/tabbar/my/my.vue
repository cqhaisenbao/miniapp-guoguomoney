<template>
	<view>
		<button open-type="getUserInfo" @click="login">获取用户信息</button>
		<view class="userinfo">
			<view class="userinfo-avatar">
				<open-data type="userAvatarUrl"></open-data>
			</view>
			<open-data type="userNickName"></open-data>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import wxLogin from '@/lib/weixinlogin'
	export default {
		data() {
			return {
			}
		},
		methods: {
			login() {
				wxLogin()
			},
		},
	}
</script>

<style lang="scss" scoped>
	.userinfo {
		position: relative;
		width: 750rpx;
		height: 320rpx;
		color: black;
		font-weight: 600;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.userinfo-avatar {
		overflow: hidden;
		display: block;
		width: 120rpx;
		height: 120rpx;
		margin: 20rpx;
		margin-top: 50rpx;
		border-radius: 50%;
		border: 2px solid #fff;
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
	}
</style>
