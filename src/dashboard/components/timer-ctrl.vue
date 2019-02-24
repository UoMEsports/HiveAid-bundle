<template>
	<div>
		<h1 class="time">{{time}}</h1>
		<h1 class="text">{{text}}</h1>
		<v-btn @click="toggleTimer" :color="startStopColour">{{startStopContent}}</v-btn>
		<v-btn @click="toggleHidden" :color="showHideColour">{{showHideContent}}</v-btn>
		<v-btn color="orange" nodecg-dialog="timer-dialog-to">Run to</v-btn>
		<v-btn color="orange" nodecg-dialog="timer-dialog-for">Run for</v-btn>
		
		<v-text-field
			label="New Text"
			v-model="newText"
			dark
		></v-text-field>
		<v-btn @click="setText" color="green">Update Text</v-btn>
	</div>
</template>

<script>
const countdownRep = nodecg.Replicant('countdown');
const running = nodecg.Replicant('countdownRunning');
const countdownNext = nodenodecg.Replicant('countdownNext');
export default {
	data() {
		return {
			time: "0:00",
			running: false,
			hidden: false,
			text: 'UP NEXT',
			newText: ''
		};
	},
	created() {
		NodeCG.waitForReplicants(countdownRep).then(this.listen);
	},
	methods: {
		toggleTimer() {
			if (running.value) {
				nodecg.sendMessage('stopCountdown', countdownNext);
			} else {
				nodecg.sendMessage('startCountdown', countdownNext);
			}
		},
		toggleHidden() {
			nodecg.sendMessage('showHideTimer');
		},
		setText() {
			countdownRep.value
			timerRep.value.text = this.newText;
		},
		listen() {
			this.newText = timerRep.value.text;
			timerRep.on('change', newVal => {
				this.time = newVal.formatted;
				this.hidden = newVal.hidden;
				this.text = newVal.text;
			});
			running.on('change', newVal => {
				this.running = newVal.value;
			})
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
	font-size: 96px;
}
.text {
	width: 100%;
	text-align: center;
}
</style>