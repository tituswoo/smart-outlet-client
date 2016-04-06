'use strict';

let rpio = require('rpio');
let socket = require('socket.io-client')('http://c9514815.ngrok.io');

// Force pin 11 output to OFF:
rpio.open(11, rpio.OUTPUT, rpio.LOW);

// Listen for commands:
console.log('CONNECTING TO BOT SERVER');

socket.on('connect', () => {
	console.log('CONNECTED TO BOT SERVER');

	socket.on('TOGGLE_SWITCH', (payload) => {
		let newLightState = payload.data ? rpio.HIGH : rpio.LOW;
		let currLightState = !!rpio.read(11);
		if (newLightState !== currLightState) rpio.write(11, newLightState);
		console.log('TURNED THE LIGHT', newLightState ?  'ON' : 'OFF');
	});
	
	socket.on('disconnect', () => {
		console.log('DISCONNECTED FROM BOT SERVER');
	});
});

function pulse() {
	setInterval(() => {
		rpio.write(11, rpio.HIGH);
		console.log('setting 11 to HIGH');
		rpio.msleep(1000);
		rpio.write(11, rpio.LOW);
		console.log('setting 11 to LOW');
	}, 500);
}
