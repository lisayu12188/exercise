async function read() {
}


function delay(time) {
	return new Promise((resolve) => {
		console.log('start');
		setTimeout(() => {
			console.log('timeout:' + time);
			resolve('ok');
		}, time);
	});
}


/*
delay(1000).then(v => {
	console.log(1);
	return delay(800);
}).then(v2 => {
	console.log(2);
	return delay(600);
}).then(v3 => {
	console.log(3);
});
*/


/*
Promise.all([
	delay(1000),
	delay(800),
	delay(1200)
]).then(() => {
	console.log('ok')
});
*/


async function work() {
	const v1 = await delay(1000);
	console.log(v1)
	await delay(800);
	await delay(1200);
	await Promise.all([
		delay(500),
		delay(1200),
		delay(600)
	]);
	console.log('ok')
}

work().then(() => {
	console.log('done')
});

