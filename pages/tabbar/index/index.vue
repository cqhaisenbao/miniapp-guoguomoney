<template>
	<view>
		<van-dialog id="van-dialog" />
		<view class="content">
			<tabs :data_source="recordTypeList" :value.sync="record.type"></tabs>
			<van-toast id="van-toast" />
			<tags @deletetag="deletetag" :type="record.type" class="tag_content" :iconName='default_iconName' :selectedTag.sync="record.tag" :tagName.sync="record.tagName" :popshow.sync="popshow"></tags>
			<notes :value.sync="record.notes" field-name="备注" placeholder="请在这里输入备注">
				<datapick @timeupdate="onUpdateTime" :now='now'></datapick>
			</notes>
			<keybord @update:value="onUpdateAmount" :tag.sync="record.tag" @submit="saveRecord"></keybord>
		</view>
		<view v-if="popshow">
			<u-popup v-model="popshow" mode="bottom" border-radius="14" height="auto" safe-area-inset-bottom="true">
				<edittag :iconName='default_iconName' @savetag='savetag' :tagtype.sync="record.type"></edittag>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import networkcheck from '@/lib/networkcheck.js';
	import gettags from '@/lib/gettags.js';
	import dayjs from 'dayjs'
	export default {
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
				default_iconName: [],
				now: dayjs().format('MM月DD日'),
				title: '果果记账',
				popshow: false,
				recordTypeList: [{ text: '支出', value: '-' }, { text: '收入', value: '+' }],
				record: { tag: '', tagName: '', notes: '', type: '-', amount: '', time: 0 },
			};
		},
		created() {
			gettags.call(this)
		},
		onShow() {
			networkcheck.call(this)
		},
		methods: {
			savetag() {
				this.popshow = false
				gettags.call(this)
			},
			deletetag(){
				gettags.call(this)
			},
			onUpdateTime(value) {
				this.record.time = dayjs(value).valueOf();
				this.now = dayjs(value).format('MM月DD日')
			},
			onUpdateAmount(value) {
				this.record.amount = parseFloat(value);
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
					this.record.time = 0;
					this.now = dayjs().format('MM月DD日')
				}).catch((err) => {
					console.log(err)
				}).finally(() => {
					if (this.networkType === false) {
						this.$toast.fail('网络异常')
					}
				})
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
