import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex);

const asyncFetch=async(commit,mutationName,colName,rule)=>{
	const db = uniCloud.database();
	uni.showLoading({ title: '加载中' });
	let res = await db.collection(colName).where(rule).get()
	uni.hideLoading()
	const { result } = res
	commit(mutationName, result)
	return result
}

const store = new Vuex.Store({
	state: {
		recordList: [],
		iconName: []
	},
	mutations: {
		// createRecord(state, record) {
		// 	const record2 = clone(record);
		// 	state.recordList.push(record2);
		// 	store.commit('saveRecords');
		// },
		// saveRecords(state) {
		// 	uni.setStorage({
		// 		key: 'recordList',
		// 		data: JSON.stringify(state.recordList)
		// 	})
		// },
		fetchIconName(state, result) {
			state.iconName = result.data
		},
		fetchRecordList(state, result) {
			state.recordList = result.data
			console.log('state.recordList', state.recordList)
		}
	},
	actions: {
		fetchIconName({commit}){
			return asyncFetch(commit,'fetchIconName','income','default=="true" || uid == $env.uid')
		},
		fetchRecordList({ commit }) {
			return asyncFetch(commit,'fetchRecordList','recordList','uid==$env.uid')
		},
	}
});

export default store;
