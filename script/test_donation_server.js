'use strict';

const io = require('socket.io')(22341);
let totalInPence = 0;

generateAndEmitDonation();

function generateAndEmitDonation() {
	const rawAmountInPence = randomInt(100, 3000);
	totalInPence += rawAmountInPence;
	const names = ["Vanquish_big_boi_epic", "Fill_30", "Jon_Chia", "albiorix", "tme5", "theNUEL"];
	
	const data = {
		name: String(names[Math.floor(Math.random()*names.length)]),
		comment: String("hope you like my donation of " + rawAmountInPence + " pence"),
		rawAmount: String(rawAmountInPence / 100),
		newTotal: String(totalInPence / 100)

	};

	io.emit('donation', data);
	console.log('Emitted donation:', data);

	setTimeout(generateAndEmitDonation, 10000);
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}