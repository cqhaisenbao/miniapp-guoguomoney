import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex);

const asyncFetch = async (commit, mutationName, colName, rule, field) => {
	const db = uniCloud.database();
	uni.showLoading({ title: '加载中' });
	try {
		let res = await db.collection(colName).where(rule).field(field).get()
		uni.hideLoading()
		const { result } = res
		commit(mutationName, result)
		return result
	} catch (err) {
		console.log(err)
		// uni.showToast({
		// 	title:err.message,
		// 	icon:'none'
		// })
	}
}

const store = new Vuex.Store({
	state: {
		recordList: [],
		iconName: [],
		isLogin: false
	},
	mutations: {
		changeIsLogin(state) {
			state.isLogin = true
		},
		fetchLocalIconName(state) {
			console.log('fetchLocalIconName')
			uni.getStorage({
				key: 'iconName',
				success: (res) => {
					state.iconName = res.data
				}
			})
		},
		async fetchIconName(state, result) {
			await uni.setStorage({
				key: 'iconName',
				data: result.data,
			});
			this._mutations.fetchLocalIconName[0]()
		},
		fetchLocalRecordList(state) {
			uni.getStorage({
				key: 'recordList',
				success: (res) => {
					state.recordList = res.data
				}
			})
		},
		async fetchRecordList(state, result) {
			// state.recordList = result.data
			await uni.setStorage({
				key: 'recordList',
				data: result.data,
			});
			this._mutations.fetchLocalRecordList[0]()
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
