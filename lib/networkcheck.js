function networkcheck() {
	const netcheck = (() => {
		uni.getNetworkType({
				success: (res) => {
					if (res.networkType === 'none') {
						this.networkType = false
						this.showToast('当前网络环境不佳，请稍后尝试')
					}
				}
			}),
			uni.onNetworkStatusChange((res) => {
				this.networkType = res.isConnected
			});
	})()
}

export default networkcheck
