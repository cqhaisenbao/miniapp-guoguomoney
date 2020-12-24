<template>
	<view>
		<view @click="showdata" class="dateWrapper">
			{{ now }}
			<text class="text_">▼</text>
		</view>
		<u-calendar v-model="show" @change="change" :mode="mode" btn-type='success' active-bg-color='#3EB575'></u-calendar>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	export default {
		props:{
			now:{
				type:String
			}
		},
		data() {
			return {
				mode: 'date',
				show: false,
			};
		},
		methods: {
			showdata() {
				this.show = true
			},
			change(value) {
				this.$emit('timeupdate', value.result);
				this.$emit('nowchange', value.result);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dateWrapper {
		background: #e8e8e8;
		display: inline-block;
		padding: 3px 15px;
		border-radius: 20px;
		font-size: 13px;
		font-weight: 600;
		margin-right: 10px;

		.text_ {
			margin-left: 3px;
			color: #bfbdbd;
		}
	}
</style>
