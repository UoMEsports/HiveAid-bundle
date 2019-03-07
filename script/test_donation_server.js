'use strict';

const io = require('socket.io')(22341);
let totalInPence = 0;

generateAndEmitDonation();

function generateAndEmitDonation() {
	const rawAmountInPence = randomInt(100, 60000);
	totalInPence += rawAmountInPence;

	const data = {
		rawAmount: String(rawAmountInPence / 100),
		newTotal: String(totalInPence / 100)
	};

	io.emit('donation', data);
	console.log('Emitted donation:', data);

	setTimeout(generateAndEmitDonation, randomInt(100, 3000));
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}