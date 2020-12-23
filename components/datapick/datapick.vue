<template>
	<view>
		<text @click="showdata">选择时间</text>
		<u-calendar v-model="show" :mode="mode" btn-type='success' active-bg-color='#3EB575'></u-calendar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mode:'date',
				show: false
			};
		},
		methods:{
			showdata(){
				this.show = true
			}
		}
	}
</script>

<style>

</style>
