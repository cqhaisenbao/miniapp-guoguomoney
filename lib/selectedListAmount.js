import dayjs from 'dayjs'

async function selectedListAmount(selectedTime, selectedType) {
	this.currentAmount = 0
	// this.currentlist_pay = []
	// this.currentlist_income = []
	const list = this.recordList
	for (let i = 0; i < list.length; i++) {
		const time = dayjs(list[i].time).format('YYYY年MM月')
		const currentType = list[i].type
		if (time === selectedTime && currentType === selectedType) {
			// this.currentlist_pay.push(list[i])
			this.currentAmount += list[i].amount
		} 
	}
}

export default selectedListAmount
