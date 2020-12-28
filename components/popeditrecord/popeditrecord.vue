<template>
	<view>
		{{popcurrentrecord.type}}
		<view class="topWrapper-record">
			<ul class="record-tabs">
				<li v-for="item in recordTypeList" :key="item.value" :class="{selected: item.value=== popcurrentrecord.type}" @click="select(item)" class="record-tabs-item">
					{{ item.text }}
				</li>
			</ul>
			<datapick @timeupdate="onUpdateTime" :now="popnow" />
		</view>
		<van-toast id="van-toast" />
		<!-- <tags v-if="record.type==='-'?true:false" class="tag_content" :iconName='pay_iconName' :selectedTag.sync="record.tag" :tagName.sync="record.tagName"></tags> -->
		<!-- <tags v-else class="tag_content" :iconName='income_iconName' :selectedTag.sync="record.tag" :tagName.sync="record.tagName"></tags> -->
		<!-- <notes :value.sync="record.notes" field-name="备注" placeholder="请在这里输入备注"> -->
		<!-- </notes> -->
		<!-- <keybord :value.sync="record.amount" :tag.sync="record.tag" @submit="saveRecord"></keybord> -->
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	export default {
		data() {
			return {
				recordTypeList: [{ text: '支出', value: '-' }, { text: '收入', value: '+' }],
			};
		},
		props: {
			currentrecord: {}
		},
		computed: {
			popcurrentrecord() {
				return this.currentrecord
			},
			popnow(){
				return dayjs(this.popcurrentrecord.time).format('MM月DD日')
			}
		},
		methods: {
			select(item) {
				this.popcurrentrecord.type = item.value;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.topWrapper-record {
		display: flex;
		padding: 10px 20px;

		.record-tabs {
			flex-grow: 1;

			.record-tabs-item {
				display: inline-block;
				background: #e8e8e8;
				padding: 3px 15px;
				border-radius: 20px;
				font-size: 13px;
				font-weight: 600;
				margin-right: 10px;
				flex-grow: 1;

				&.selected {
					background: #2b2e4a;
					color: white;
				}
			}
		}
	}
</style>
