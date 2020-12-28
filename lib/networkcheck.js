function networkcheck() {
	const netcheck = (() => {
		uni.getNetworkType({
				success: (res) => {
					if (res.networkType === 'none') {
						this.networkType = false
						this.$toast('网络异常~')
					}
				}
			}),
			uni.onNetworkStatusChange((res) => {
				this.networkType = res.isConnected
			});
	})()
}

export default networkcheck
