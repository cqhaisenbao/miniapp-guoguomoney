function objArrtransArr(arr, oldname, oldnum) {
	var nameArr = [];
	var numArr = [];
	arr.forEach(item => {
		nameArr.push(item[oldname]);
		numArr.push(item[oldnum]);
	});
	return { nameArr, numArr };
}

export default objArrtransArr
