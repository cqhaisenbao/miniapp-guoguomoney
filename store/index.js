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
			console.log('state.iconName', state.iconName)
		},
		fetchRecordList(state) {}
	},
	actions: {
		fetchIconName({ commit }) {
			const db = uniCloud.database();
			uni.showLoading({ title: '加载中' });
			db.collection('income').where('default=="true" || uid == $env.uid').get().then((res) => {
				uni.hideLoading()
				const { result } = res
				commit('fetchIconName',result)
			});
		}
	}
});

export default store;
