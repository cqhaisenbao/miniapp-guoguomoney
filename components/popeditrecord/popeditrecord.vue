<template>
	<view v-if="popcurrentrecord.amount">
		<view class="topWrapper-record">
			<ul class="record-tabs">
				<li v-for="item in recordTypeList" :key="item.value" :class="{selected: item.value=== popcurrentrecord.type}" @click="select(item)" class="record-tabs-item">
					{{ item.text }}
				</li>
			</ul>
			<datapick @timeupdate="onUpdateTime" :now="now(popcurrentrecord.time)" />
		</view>
		<tags :addtagshow='false' @deletetag="deletetag" :type="popcurrentrecord.type" class="tag_content" :iconName='default_iconName' :selectedTag.sync="popcurrentrecord.tag" :tagName.sync="popcurrentrecord.tagName" :popshow.sync="tagpopshow"></tags>
		<notes :value.sync="popcurrentrecord.notes" field-name="备注" placeholder="请在这里输入备注" />
		<keybord :tag.sync="popcurrentrecord.tag" @update:value="onUpdateAmount" :popoutput="popcurrentrecord.amount" @submit="saveRecord"></keybord>
		<view v-if="tagpopshow">
			<u-popup v-model="tagpopshow" mode="bottom" border-radius="14" height="auto" safe-area-inset-bottom="true">
				<edittag :iconName='default_iconName' @savetag='savetag' :tagtype.sync="record.type"></edittag>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import { mapState, mapMutations, mapActions } from 'vuex';
	export default {
		data() {
			return {
				recordTypeList: [{ text: '支出', value: '-' }, { text: '收入', value: '+' }],
				income_iconName: [],
				tagpopshow: false,
			};
		},
		props: {
			currentrecord: {},
			popshow: {
				type: Boolean
			}
		},
		computed: {
			...mapState(['iconName']),
			popcurrentrecord() {
				return this.currentrecord
			},
		},
		methods: {
			savetag() {
				this.popshow = false
				this.$store.dispatch('fetchIconName')
			},
			select(item) {
				this.popcurrentrecord.type = item.value;
			},
			onUpdateAmount(value) {
				this.popcurrentrecord.amount = parseFloat(value);
			},
			onUpdateTime(value) {
				this.popcurrentrecord.time = dayjs(value).valueOf();
				this.now(value)
			},
			now(value) {
				return dayjs(value).format('MM月DD日')
			},
			saveRecord() {
				const docid = this.popcurrentrecord._id
				delete this.popcurrentrecord._id
				delete this.popcurrentrecord.uid
				const db = uniCloud.database();
				db.collection('recordList').doc(docid).update(this.popcurrentrecord).then(() => {
					this.$emit('updated', false);
					this.$store.dispatch('fetchRecordList')
				}).catch((err) => {
					console.log(err)
				}).finally(() => {
					if (this.networkType === false) {
						uni.showToast({
							title:'网络异常~'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.topWrapper-record {
		display: flex;
		padding: 20rpx 40rpx;
		margin-top: 80rpx;

		.record-tabs {
			flex-grow: 1;

			.record-tabs-item {
				display: inline-block;
				background: #e8e8e8;
				padding: 6rpx 30rpx;
				border-radius: 40rpx;
				font-size: 26rpx;
				font-weight: 600;
				margin-right: 20rpx;
				flex-grow: 1;

				&.selected {
					background: #2b2e4a;
					color: white;
				}
			}
		}
	}
</style>
