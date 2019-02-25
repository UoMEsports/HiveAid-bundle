<template>
	<div>
		<h1 class="time">{{time}}</h1>
		<h2 class="nextTime">{{nextTime}}</h2>
		<h1 class="text">{{text}}</h1>
		<v-btn @click="toggleTimer" :color="startStopColour">{{startStopContent}}</v-btn>
		<v-btn @click="toggleHidden" :color="showHideColour">{{showHideContent}}</v-btn>
		<v-btn color="orange" nodecg-dialog="timer-dialog-to">Run to</v-btn>
		<v-btn color="orange" nodecg-dialog="timer-dialog-for">Run for</v-btn>
		<nodecg-text v-model="newText" dark replicantName="countdownNewText"></nodecg-text>
		<v-btn @click="setText" color="green">Update Text</v-btn>
	</div>
</template>

<script>
const countdownRep = nodecg.Replicant('countdown');
const running = nodecg.Replicant('countdownRunning');
const countdownNext = nodecg.Replicant('countdownNext');
const TimeUtils = require('../../../extension/lib/time');
const countdownText = nodecg.Replicant('countdownText');
export default {
	data() {
		return {
			time: "0:00",
			running: false,
			hidden: false,
			text: 'UP NEXT',
			newText: '',
			nextTime: null
		};
	},
	created() {
		NodeCG.waitForReplicants(countdownRep).then(this.listen);
	},
	methods: {
		toggleTimer() {
			if (running.value) {
				nodecg.sendMessage('stopCountdown', countdownNext.value);
			} else {
				nodecg.sendMessage('startCountdown', countdownNext.value);
			}
		},
		toggleHidden() {
			nodecg.sendMessage('showHideTimer');
		},
		setText() {
			countdownText.value = this.newText;
		},
		listen() {
			this.newText = countdownText.value;
			countdownRep.on('change', newVal => {
				this.time = newVal.formatted;
				this.hidden = newVal.hidden;
			});
			running.on('change', newVal => {
				this.running = newVal;
			});
			countdownText.on('change', newVal => {
				this.text = newVal;
			});	
			countdownNext.on('change', newVal => {
				let formattedNextTime = TimeUtils.createTimeStruct(newVal * 1000);
				this.nextTime = formattedNextTime.formatted;
			});
		}
	},
	computed: {
		startStopContent() {
			return this.running ? 'STOP' : 'START';
		},
		startStopColour() {
			return this.running ? 'red' : 'green';
		},
		showHideContent() {
			return this.hidden ? 'SHOW' : 'HIDE';
		},
		showHideColour() {
			return !this.hidden ? 'red' : 'green';
		}
	}
};
</script>

<style lang="scss" scoped>
.time {
	font-size: 70px;
}
.text {
	width: 100%;
	text-align: center;
}
</style>