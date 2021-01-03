import dayjs from 'dayjs'

function selectedListAmount(selectedTime, selectedType) {
	this.amount_pay = 0
	this.amount_income = 0
	this.currentlist_pay = []
	this.currentlist_income = []
	const list = this.recordList
	for (let i = 0; i < list.length; i++) {
		const time = dayjs(list[i].time).format('YYYY年MM月')
		const currentType = list[i].type
		if (time === selectedTime && currentType === selectedType) {
			this.currentlist_pay.push(list[i])
			this.amount_pay += list[i].amount
		} else if (time === selectedTime && currentType !== selectedType) {
			this.currentlist_income.push(list[i])
			this.amount_income += list[i].amount
		}
	}
}

export default selectedListAmount
