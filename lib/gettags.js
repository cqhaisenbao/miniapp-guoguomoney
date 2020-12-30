function gettags() {
	const gettag = (() => {
		const db = uniCloud.database();
		uni.showLoading({ title: '加载中' });
		db.collection('income').where('default=="true" || uid == $env.uid').get().then((res) => {
			uni.hideLoading()
			const { result } = res
			this.default_iconName = result.data
		});
	})()
}

export default gettags
