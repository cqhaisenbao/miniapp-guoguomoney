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
		//     setCurrentTag(state, id) {
		//         state.currentTag = state.tagList.filter(t => t.id === id)[0];
		//     },
		//     setCurrentRecord(state, id) {
		//         state.currentRecord = state.recordList.filter(t => t.id === id)[0];
		//     },
		//     updateTag(state, payload: { id, name }) {
		//         const {id, name} = payload;
		//         const idList = state.tagList.map(item => item.id);
		//         if (idList.indexOf(id) >= 0) {
		//             const names = state.tagList.map(item => item.name);
		//             if (names.indexOf(name) >= 0) {
		//                 window.alert('标签名重复了');
		//             } else {
		//                 const tag = state.tagList.filter(item => item.id === id)[0];
		//                 tag.name = name;
		//                 store.commit('saveTags');
		//             }
		//         }
		//     },
		//     updateRecord(state, payload) {
		//         const {id} = payload;
		//         let record = state.recordList.filter(item => item.id === id)[0];
		//         record = payload;
		//         store.commit('saveRecords');
		//     },

		//     removeTag(state, id) {
		//         let index = -1;
		//         for (let i = 0; i < state.tagList.length; i++) {
		//             if (state.tagList[i].id === id) {
		//                 index = i;
		//                 break;
		//             }
		//         }
		//         if (index >= 0) {
		//             state.tagList.splice(index, 1);
		//             store.commit('saveTags');
		//             router.back();
		//         } else {
		//             window.alert('删除失败');
		//         }
		//     },
		//     removeRecord(state, id) {
		//         let index = -1;
		//         for (let i = 0; i < state.recordList.length; i++) {
		//             if (state.recordList[i].id === id) {
		//                 index = i;
		//                 break;
		//             }
		//         }
		//         if (index >= 0) {
		//             state.recordList.splice(index, 1);
		//             store.commit('saveRecords');
		//             router.back();
		//         } else {
		//             window.alert('删除失败');
		//         }
		//     },
		//     fetchRecords(state) {
		//         state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
		//     },

		//     fetchTags(state) {
		//         state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
		//     },

		//     createTag(state, name: string) {
		//         const names = state.tagList.map(item => item.name);
		//         if (names.indexOf(name) >= 0) {
		//             Dialog.alert({
		//                 title: '添加失败',
		//                 message: '标签名重复了',
		//             }).then(() => {
		//                 return;
		//             });
		//             return;
		//         } else {
		//             const id = createId().toString();
		//             state.tagList.push({id, name: name});
		//             store.commit('saveTags');
		//         }
		//     },
		//     saveTags(state) {
		//         window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
		//     },
	}
});

export default store;
