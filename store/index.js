import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex);

const asyncFetch = async (commit, mutationName, colName, rule, field) => {
	const db = uniCloud.database();
	uni.showLoading({ title: '加载中' });
	let res = await db.collection(colName).where(rule).field(field).get()
	uni.hideLoading()
	const { result } = res
	commit(mutationName, result)
	return result
}

const store = new Vuex.Store({
	state: {
		recordList: [],
		iconName: [],
	},
	mutations: {
		fetchLocalIconName(state){
			console.log('fetchLocalIconName')
			uni.getStorage({
				key: 'iconName',
				success: (res) => {
					state.iconName = res.data
				}
			})
		},
		async fetchIconName(state, result) {
			// state.iconName = result.data
			await uni.setStorage({
				key: 'iconName',
				data: result.data,
			});
			uni.getStorage({
				key: 'iconName',
				success: (res) => {
					state.iconName = res.data
				}
			})
		},
		fetchRecordList(state, result) {
			state.recordList = result.data
		}
	},
	actions: {
		fetchIconName({ commit }) {
			return asyncFetch(commit, 'fetchIconName', 'income', 'default=="true" || uid == $env.uid', '')
		},
		fetchRecordList({ commit }) {
			return asyncFetch(commit, 'fetchRecordList', 'recordList', 'uid==$env.uid', '')
		}
	}
});

export default store;
