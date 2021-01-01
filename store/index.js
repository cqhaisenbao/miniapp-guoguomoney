import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		recordList: [],
		isLogin: false,
		recordListChanged: false,
		iconName:[]
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
		fetchIconName(state){
			const db = uniCloud.database();
			uni.showLoading({ title: '加载中' });
			db.collection('income').where('default=="true" || uid == $env.uid').get().then((res) => {
				uni.hideLoading()
				const { result } = res
				state.iconName = result.data
				console.log('state.iconName',state.iconName)
			});
		}
	}
});

export default store;
