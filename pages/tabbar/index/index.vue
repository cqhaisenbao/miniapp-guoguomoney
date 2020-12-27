<template>
	<view>
		<view class="content">
			<tabs :data_source="recordTypeList" :value.sync="record.type"></tabs>
			<van-toast id="van-toast" />
			<u-toast ref="uToast" />
			<tags v-if="record.type==='-'?true:false" class="tag_content" :iconName='pay_iconName' :selectedTag.sync="record.tag" :tagName.sync="record.tagName"></tags>
			<tags v-else class="tag_content" :iconName='income_iconName' :selectedTag.sync="record.tag" :tagName.sync="record.tagName"></tags>
			<notes :value.sync="record.notes" field-name="备注" placeholder="请在这里输入备注">
				<datapick @timeupdate="onUpdateTime" :now='now' @nowchange='nowchange'></datapick>
			</notes>
			<keybord :value.sync="record.amount" :tag.sync="record.tag" @submit="saveRecord"></keybord>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import networkcheck from '@/lib/networkcheck.js'
	import dayjs from 'dayjs'
	export default {
		computed: {
			...mapState(['recordList'])
		},
		computed: {
			...mapState(['isLogin'])
		},
		computed: {
			...mapState(['recordListChanged'])
		},
		data() {
			return {
				selected: false,
				networkType: true,
				pay_iconName: [],
				income_iconName: [],
				now: dayjs().format('MM月DD日'),
				title: '果果记账',
				recordTypeList: [{ text: '支出', value: '-' }, { text: '收入', value: '+' }],
				record: { tag: '', tagName: '', notes: '', type: '-', amount: '', time: 0 },
			};
		},

		created() {
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
		onShow() {
			networkcheck.call(this)
		},
		methods: {
			showToast(title) {
				this.$refs.uToast.show({
					title: title,
					type: 'error',
				})
			},
			onUpdateTime(value) {
				this.record.time = dayjs(value).valueOf();
			},
			nowchange(value) {
				this.now = dayjs(value).format('MM月DD日')
			},
			saveRecord() {
				const db = uniCloud.database();
				if (this.record.time === 0) {
					this.record.time = dayjs().valueOf()
				};
				db.collection('recordList').add(this.record).then((res) => {
					this.$toast.success('已记一笔')
					this.$store.commit('recordListChange');
					this.record.notes = '';
					this.record.tag = '';
					this.now = dayjs().format('MM月DD日')
				}).catch((err) => {
					console.log(err)
				}).finally(()=>{
					console.log('finally')
				})
				// this.$store.commit('createRecord', this.record);

			}
		},
	};
</script>

<style lang="scss">
	.content {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.tag_content {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			margin-bottom: 5px;
		}
	}
</style>
