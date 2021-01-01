// 云函数login-by-weixin代码
const uniID = require('uni-id')
exports.main = async function(event, context) {
	const res = await uniID.loginByWeixin({
		code: event.code
	})
	return res
}
