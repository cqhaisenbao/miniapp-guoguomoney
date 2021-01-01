<template>
	<view class="tabsWrapper">
			<ul class="tabs">
				<li v-for="item in data_source " :key="item.value" class="tabs-item" :class="{selected: item.value=== value}"
				 @click="select(item)">
					{{ item.text }}
				</li>
			</ul>
	</view>
</template>

<script>
	export default {
		props: {
			//外部数据别用中划线
			data_source: {
				type: Array
			},
			value: {
				type: String
			}
		},
		methods: {
			select(item) {
				this.$emit('update:value', item.value);
				this.$emit('typechange', item.value);
			},
		}

	}
</script>

<style lang="scss">
	.tabsWrapper {
		width: 100vw;
		background: $main-color;
		height: 60px;
		display: flex;
		align-items: center;

		.tabs {
			display: flex;
			text-align: center;
			font-size: 20px;
			color: white;
			width: 40%;
			margin: 0 auto;
			border: 1px solid #303030;
			border-radius: 5px;
			border-collapse: collapse;

			li:first-of-type {
				width: 50%;
				height: 32px;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				border-radius: 4px 0 0 4px;
			}

			li:last-of-type {
				width: 50%;
				height: 32px;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				border-radius: 0 4px 4px 0;
			}

			& .selected {
				background: #303030;
				color: white;
			}
		}
	}
</style>
