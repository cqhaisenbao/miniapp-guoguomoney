<template>
	<view>
		<view class="topWrapper-record">
			<ul class="record-tabs">
				<li v-for="item in recordTypeList" :key="item.value" :class="{selected: item.value=== popcurrentrecord.type}" @click="select(item)" class="record-tabs-item">
					{{ item.text }}
				</li>
			</ul>
			<datapick @timeupdate="onUpdateTime" :now="popnow" />
		</view>
		<van-toast id="van-toast" />
		<tags v-if="popcurrentrecord.type==='-'?true:false" class="tag_content" :iconName='pay_iconName' :selectedTag.sync="popcurrentrecord.tag" :tagName.sync="popcurrentrecord.tagName"></tags>
		<tags v-else class="tag_content" :iconName='income_iconName' :selectedTag.sync="popcurrentrecord.tag" :tagName.sync="popcurrentrecord.tagName"></tags>
		<notes :value.sync="popcurrentrecord.notes" field-name="备注" placeholder="请在这里输入备注" />
		<keybord v-if="popcurrentrecord.amount" :popoutput="popcurrentrecord.amount"></keybord>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				recordTypeList: [{ text: '支出', value: '-' }, { text: '收入', value: '+' }],
				pay_iconName: [],
				income_iconName: [],
			};
		},
		props: {
			currentrecord: {}
		},
		computed: {
			popcurrentrecord(){
				return this.currentrecord
			},
			popnow() {
				return dayjs(this.popcurrentrecord.time).format('MM月DD日')
			},
		},
		mounted() {
			const db = uniCloud.database();
			uni.showLoading({ title: '加载中' });
			db.collection('income').where('type=="-"').get().then((res) => {
				uni.hideLoading()
				const { result } = res
				this.pay_iconName = result.data
			});
			db.collection('income').where('type=="+"').get().then((res) => {
				uni.hideLoading()
				const { result } = res
				this.income_iconName = result.data
			})
		},
		methods: {
			select(item) {
				this.popcurrentrecord.type = item.value;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.topWrapper-record {
		display: flex;
		padding: 10px 20px;
		margin-top: 40px;

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
