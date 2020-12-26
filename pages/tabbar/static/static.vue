<template>
	<view>
		<tabs :data_source="recordTypeList" :value.sync="type"></tabs>
		<ol v-if="groupedList.length>0">
			<li class="li_" v-for="(group,index) in groupedList" :key="index">
				<h3 class="title">{{ beautify(group.title) }} <span>￥{{ group.total }}</span></h3>
				<ol>
					<view v-for="item in group.items" :key="item._id" class="record" @click="editRecord(item)">
						<icon :class="item.tagName" class="icon_" />
						<span>{{ item.tag }}</span>
						<span class="note">{{ item.notes }}</span>
						<span>￥{{ item.amount }} </span>
					</view>
				</ol>
			</li>
		</ol>
		<view v-else class="noResult">
			<u-empty text="目前没有相关记录"></u-empty>
		</view>
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
		watch: {
			recordListChanged() {
				this.fetchRecordList()
			},
			isLogin() {
				this.fetchRecordList()
			}
		},
		computed: {
			...mapState(['recordListChanged']),
			groupedList() {
				const { recordList } = this;
				if (recordList.length === 0) { return[]; }
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
			editRecord(item) {
				console.log(item)
				this.$u.route('pages/editrecord/editrecord', {
					recordid: item._id,
					// tag:item.tag,
					// tagname:item.tagName,
					// time:item.time,
					// type:item.type
				})
				// uni.navigateTo({
				// 	url:'pages/editrecord/editrecord'
				// })
			},
			fetchRecordList() {
				const db = uniCloud.database();
				db.collection('recordList').where('uid==$env.uid').get().then(res => {
					this.recordList = res.result.data
				})
			},
			beautify(string) {
			        const day = dayjs(string);
			        const now = dayjs();
			        if (day.isSame(now, 'day')) {
			            return '今天';
			        } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
			            return '昨天';
			        } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
			            return '前天';
			        } else if (day.isSame(now, 'year')) {
			            return day.format('M月D日');
			        } else {
			            return day.format('YYYY年M月D日');
			        }
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

	.noResult {
		margin-top: 30px;
		text-align: center;
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
			border-bottom: 1px solid #e6e6e6;
			display: flex;
			align-items: center;
			line-height: 35px;
			justify-content: center;

			.icon_ {
				width: 25px;
				color: #d68060;
				margin-right: 5px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 20px;
			}

			.note {
				margin-right: auto;
				margin-left: 16px;
				color: #999;
			}
		}
	}
</style>
