import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		recordList: [],
		recordListChanged: false,
		iconName: []
	},
	mutations: {
		recordListChange(state, value) {
			state.recordListChanged = !state.recordListChanged
		},
		createRecord(state, record) {
			const record2 = clone(record);
			state.recordList.push(record2);
			store.commit('saveRecords');
		},
		saveRecords(state) {
			uni.setStorage({
				key: 'recordList',
				data: JSON.stringify(state.recordList)
			})
		},
		fetchIconName(state, result) {
			state.iconName = result.data
		},
		fetchRecordList(state, result) {
			state.recordList = result.data
			console.log('state.recordList', state.recordList)
		}
	},
	actions: {
		async fetchIconName({ commit }) {
			const db = uniCloud.database();
			uni.showLoading({ title: '加载中' });
			let res = await db.collection('income').where('default=="true" || uid == $env.uid').get()
			uni.hideLoading()
			const { result } = res
			commit('fetchIconName', result)
			return result
		},
		async fetchRecordList({ commit }) {
			const db = uniCloud.database();
			uni.showLoading({ title: '加载中' });
			let res = await db.collection('recordList').where('uid==$env.uid').get()
			uni.hideLoading()
			const { result } = res
			commit('fetchRecordList', result)
			return result

		},
	}
});

export default store;
