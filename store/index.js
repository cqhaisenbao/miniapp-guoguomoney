import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		test: '123',
		recordList: [],
		isLogin: false,
		recordListChanged: false,
		// tagList: [],
		// currentTag: undefined,
		// currentRecord: undefined,
	},
	mutations: {
		changeisLogin(state, value) {
			state.isLogin = value
		},
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
	}
});

export default store;
