'use strict';

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import * as TimeUtils from './lib/time';
import {Countdown} from '../types/schemas/countdown';
import {CountdownRunning} from '../types/schemas/countdownRunning';

const nodecg = nodecgApiContext.get();
const time = nodecg.Replicant<Countdown>('countdown', {
	defaultValue: TimeUtils.createTimeStruct(600 * 1000),
	persistent: false
});
const running = nodecg.Replicant<CountdownRunning>('countdownRunning', {
	defaultValue: false,
	persistent: false
});
let countdownTimer: TimeUtils.CountdownTimer;

nodecg.listenFor('startCountdown', start);
nodecg.listenFor('stopCountdown', stop);

/**
 * Starts the countdown at the specified startTime.
 * @param startTimeSeconds - Number of seconds to start the timer on.
 */
function start(startTimeSeconds: number): void {
	if (running.value) {
		return;
	}

	const durationMs = startTimeSeconds * 1000;
	if (durationMs <= 0) {
		return;
	}

	running.value = true;
	time.value = TimeUtils.createTimeStruct(durationMs);

	if (countdownTimer) {
		countdownTimer.stop();
		countdownTimer.removeAllListeners();
	}

	countdownTimer = new TimeUtils.CountdownTimer(Date.now() + durationMs, {tickRate: 10});
	countdownTimer.on('tick', remainingTimeStruct => {
		time.value = remainingTimeStruct;
	});
}

/**
 * Stops the countdown.
 */
function stop(): void {
	if (!running.value) {
		return;
	}

	running.value = false;
	if (countdownTimer) {
		countdownTimer.stop();
	}
}
time.on('change', newVal => {
	if (newVal.raw <= 0) running.value = false;
})