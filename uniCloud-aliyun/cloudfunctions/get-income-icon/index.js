'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	const collection = db.collection('income')
	const res = await collection.where({
		type:event.type
	}).get()
	return {
		code: 200,
		msg: '数据请求成功',
		data: res.data
	}
};
