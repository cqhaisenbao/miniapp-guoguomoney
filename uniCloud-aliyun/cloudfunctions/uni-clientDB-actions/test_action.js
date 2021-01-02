// 开发文档：https://uniapp.dcloud.io/uniCloud/clientdb?id=action
module.exports = {
	before: async (state, event) => {
			// throw error
	},
	after: async (state, event, error, result) => {
		if (error) {
			throw error
		}
		return result
	}
}