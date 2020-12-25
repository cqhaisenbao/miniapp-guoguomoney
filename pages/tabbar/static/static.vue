<template>
	<view>
		<tabs :data_source="recordTypeList" :value.sync="type"></tabs>
		<ol v-if="groupedList.length>0">
			<li class="li_" v-for="(group,index) in groupedList" :key="index">
				<h3 class="title">{{ group.title }} <span>￥{{ group.total }}</span></h3>
				<ol>
					<view v-for="item in group.items" :key="item._id" class="record">
						<!-- <Icon class="icon" :name="item.tags[0].name" /> -->
						<span>{{ item.tag }}</span>
						<span class="note">{{ item.notes }}</span>
						<span>￥{{ item.amount }} </span>
						<view>
				</ol>
			</li>
		</ol>
		<div class="noResult" v-else>目前没有相关记录</div>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import clone from '@/lib/clone';
	import dayjs from 'dayjs';
	export default {
		data() {
			return {
				recordList: [],
				type: "-",
				recordTypeList: [{ text: '支出', value: '-' }, { text: '收入', value: '+' }],
			}
		},
		watch:{
			recordListChanged(){
				this.fetchRecordList()
			}
		},
		computed: {
			...mapState(['recordListChanged']),
			groupedList() {
				const { recordList } = this;
				if (recordList.length === 0) { return; }
				const newList = clone(recordList)
					.filter(r => r.type === this.type)
					.sort((a, b) => dayjs(b.time).valueOf() - dayjs(a.time).valueOf());
				if (newList.length === 0) { return [] }
				const result = [{ title: dayjs(newList[0].time).format('YYYY-MM-DD'), items: [newList[0]] }];
				for (let i = 1; i < newList.length; i++) {
					const current = newList[i];
					const last = result[result.length - 1];
					if (dayjs(last.title).isSame(dayjs(current.time), 'day')) {
						last.items.push(current);
					} else {
						result.push({ title: dayjs(current.time).format('YYYY-MM-DD'), items: [current] });
					}
				}
				result.map(group => {
					group.total = group.items.reduce((sum, item) => {
						return sum + item.amount;
					}, 0);
				});
				return result;
			}
		},
		created() {
			this.fetchRecordList()
		},
		methods: {
			fetchRecordList() {
				const db = uniCloud.database();
				db.collection('recordList').where('uid==$env.uid').get().then(res => {
					console.log(res)
					this.recordList = res.result.data
				})
			}
		}
	}
</script>

<style lang="scss">
	%item {
		padding: 8px 16px;
		line-height: 24px;
		display: flex;
		justify-content: space-between;
		align-content: center;
	}

	.li_ {
		margin: 10px 5px 0;
		background: #FBFBFB;
		border-radius: 15px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

		.title {
			@extend %item;
			font-weight: 600;
			font-size: 16px;
		}

		.record {
			background: #FFFFFF;
			@extend %item;
			line-height: 35px;
			border-bottom: 1px solid #e6e6e6;
			display: flex;
			align-items: center;

			.note {
				margin-right: auto;
				margin-left: 16px;
				color: #999;
			}
		}
	}
</style>
