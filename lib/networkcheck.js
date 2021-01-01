function networkcheck() {
	const netcheck = (() => {
		uni.getNetworkType({
				success: (res) => {
					if (res.networkType === 'none') {
						this.networkType = false
						uni.showToast({
							title:'网络异常~',
							icon:'none'
						})
					}
				}
			}),
			uni.onNetworkStatusChange((res) => {
				this.networkType = res.isConnected
			});
	})()
}

export default networkcheck
