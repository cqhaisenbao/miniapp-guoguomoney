function gettags() {
	const gettag = (() => {
		const db = uniCloud.database();
		uni.showLoading({ title: '加载中' });
		db.collection('income').where('default=="true"').get().then((res) => {
			uni.hideLoading()
			const { result } = res
			this.default_iconName = result.data
		});
		db.collection('income').where('uid == $env.uid').get().then((res) => {
			uni.hideLoading()
			const { result } = res
			this.user_iconName = result.data
		})
	})()
}

export default gettags
