<template>
	<view>
		<view class="content">
			<tabs @typechange='typechange' :data_source="recordTypeList" :value.sync="record.type"></tabs>
			<tags @deletetag="deletetag" :type="record.type" class="tag_content" :selectedTag.sync="record.tag" :tagName.sync="record.tagName" :popshow.sync="popshow"></tags>
			<notes :value.sync="record.notes" field-name="备注" placeholder="请在这里输入备注">
				<datapick @timeupdate="onUpdateTime" :now='now'></datapick>
			</notes>
			<keybord @update:value="onUpdateAmount" :tag.sync="record.tag" @submit="saveRecord"></keybord>
		</view>
		<view v-if="popshow">
			<u-popup v-model="popshow" mode="bottom" border-radius="14" height="auto" safe-area-inset-bottom="true">
				<edittag @close='close' @savetag='savetag' :tagtype.sync="record.type"></edittag>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapActions } from 'vuex';
	import networkcheck from '@/lib/networkcheck.js';
	import dayjs from 'dayjs'
	export default {
		computed: {
			...mapState(['isLogin']),
		},
		data() {
			return {
				// selected: false,
				networkType: true,
				// deleteTagRecordList: [],
				now: dayjs().format('MM月DD日'),
				title: '果果记账',
				popshow: false,
				recordTypeList: [{ text: '支出', value: '-' }, { text: '收入', value: '+' }],
				record: { tag: '交通', tagName: '', notes: '', type: '-', amount: '', time: 0 },
			};
		},
		onShow() {
			networkcheck.call(this)
		},
		// watch:{
		// 	this.record.type(nval){
		// 		if(nval==='+'){
		// 			console.log(1)
		// 		}
		// 	}
		// },
		methods: {
			typechange(value){
				if(value==='-' ){
					this.record.tag='交通'
				}else if(value==='+' ){
					this.record.tag='工资'
				}
			},
			savetag(value) {
				this.popshow = false
				this.record.tag = value
				this.record.tagName = "iconfont icon-zidingyi"
			},
			close() {
				this.popshow = false
			},
			deletetag(item) {
				const tagtype = item.type === '-' ? 'zhichu' : 'shouru'
				const tagname = item.type === '-' ? '其他支出' : '其他收入'
				const db = uniCloud.database();
				db.collection('recordList').where({
					uid: db.env.uid,
					tag: item.title,
					type: item.type
				}).update({
					tagName: "iconfont icon-qita" + tagtype,
					tag: tagname
				}).then(res => {
					this.$store.dispatch('fetchIconName')
				})
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
					uni.showToast({
						title:'已记一笔',
						icon:'none',
						duration: 2000
					})
					this.$store.dispatch('fetchRecordList')
					this.record.notes = '';
					this.record.tag = '';
					this.record.time = 0;
					this.now = dayjs().format('MM月DD日')
				}).catch((err) => {
					console.log(err)
				}).finally(() => {
					if (this.networkType === false) {
						uni.showToast({
							title:'网络异常~',
							icon:'none'
						})
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
