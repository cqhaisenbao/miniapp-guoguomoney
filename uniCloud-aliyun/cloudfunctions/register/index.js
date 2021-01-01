// 云函数register的代码
const uniID = require('uni-id') 
exports.main = async function(event,context) {
    const {
        username,
        password
    } = event
    // username、password验证是否合法的逻辑
    const res = await uniID.register({
        username,
        password
    })
    return res
}