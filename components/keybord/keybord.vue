<template>
	<view>
		<view class="numberPad">
			<view class="output">{{output}}</view>
			<view class="buttons">
				<button clsaa="mybutton" @click="inputContent" data-text="1">1</button>
				<button clsaa="mybutton" @click="inputContent" data-text="2">2</button>
				<button clsaa="mybutton" @click="inputContent" data-text="3">3</button>
				<button clsaa="mybutton" @click="remove">删除</button>
				<button clsaa="mybutton" @click="inputContent" data-text="4">4</button>
				<button clsaa="mybutton" @click="inputContent" data-text="5">5</button>
				<button clsaa="mybutton" @click="inputContent" data-text="6">6</button>
				<button clsaa="mybutton" @click="clear">清空</button>
				<button clsaa="mybutton" @click="inputContent" data-text="7">7</button>
				<button clsaa="mybutton" @click="inputContent" data-text="8">8</button>
				<button clsaa="mybutton" @click="inputContent" data-text="9">9</button>
				<button clsaa="mybutton" @click.stop="ok" class="ok" :class="{numChange:x}">OK</button>
				<button clsaa="mybutton" @click="inputContent" class="zero" data-text="0">0</button>
				<button clsaa="mybutton" @click="inputContent" data-text=".">.</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: String,
			},
			tag: {
				type: String
			},
			popoutput: {
				type: String
			}
		},
		data() {
			return {
				x: false,
				output: this.popoutput || '0'
			};
		},
		created() {
			if (this.popoutput) {
				this.x = true
			}
		},
		methods: {
			inputContent(e) {
				const input = e.target.dataset.text
				if (this.output.length >= 16) { return; }
				if (this.output === '0') {
					if ('0123456789'.indexOf(input) >= 0) {
						this.x = true;
						this.output = input;
					} else {
						this.output += input;
					}
					return;
				}
				if (this.output.indexOf('.') >= 0 && input === '.') { return; }
				this.x = true;
				this.output += input;
			},
			remove() {
				if (this.output.length === 1) {
					this.clear();
				} else {
					this.output = this.output.slice(0, -1);
				}
			},
			clear() {
				this.output = '0';
				this.x = false;
			},
			ok() {
				if(this.output === '0'){
					uni.showToast({
						title:'请输入一笔具体的金额',
						icon:'none'
					})
					return
				}else if (this.tag.length <= 0) {
					uni.showModal({
						title: '提醒',
						content: '请选择一个标签'
					})
					return
				} else {
					const number = parseFloat(this.output);
					this.$emit('update:value', number);
					this.$emit('submit', number);
					this.output = '0';
					this.x = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	$color-shadow: rgba(0, 0, 0, 0.25);

	%innerShadow {
		box-shadow: inset 0 -3px 3px -3px $color-shadow,
			inset 0 3px 3px -3px $color-shadow;
	}

	.numberPad {

		.output {
			@extend %innerShadow;
			font-size: 36px;
			font-family: Consolas, monospace;
			padding: 9px 16px;
			text-align: right;
			height: 60px;
		}

		.buttons {
			padding: 6px 5px;
			border: none;
			background-color: #f6f7f8;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-template-rows: auto;
			grid-gap: 6px;
			grid-template-areas:
				"one two three delete"
				"four five six empty"
				"seven eight nine ok"
				"zero zero dot ok";

			>button {
				width: 100%;
				background-color: #fff;
				font-size: 20px;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
				border-color: #fff;
				border-radius: 8px;
				display: flex;
				align-items: center;
				justify-content: center;

				&::after {
					border: none;
				}

				&:nth-child(1) {
					grid-area: one;
				}

				&:nth-child(2) {
					grid-area: two;
				}

				&:nth-child(3) {
					grid-area: three;
				}

				&:nth-child(4) {
					grid-area: delete;
				}

				&:nth-child(5) {
					grid-area: four;
				}

				&:nth-child(6) {
					grid-area: five;
				}

				&:nth-child(7) {
					grid-area: six;
				}

				&:nth-child(8) {
					grid-area: empty;
				}

				&:nth-child(9) {
					grid-area: seven;
				}

				&:nth-child(10) {
					grid-area: eight;
				}

				&:nth-child(11) {
					grid-area: nine;
				}

				&:nth-child(12) {
					grid-area: ok;
					color: #fff;
					background-color: lighten($main-color, 20%);

					&.numChange {
						background: $main-color;
					}
				}

				&:nth-child(13) {
					grid-area: zero;
				}

				&:nth-child(14) {
					grid-area: dot;
				}
			}
		}
	}
</style>
