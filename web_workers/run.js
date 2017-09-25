var start = 0;
var end = 10000000;

var workers = 1;
// var workers = navigator.hardwareConcurrency;

function run(callback) {
	var result = 0;	
	var endedWorkers = 0;
	var subrangeLength = (end - start)/workers;
	var currentStart = start;

	Array.from('x'.repeat(workers)).map(function () {
		var worker = new Worker('worker.js');

		worker.addEventListener('message', function(e) {
			console.log('Worker said: ' + e.data);
			result += e.data;
			endedWorkers++;
			if (endedWorkers === workers) {
				callback(result);
			}
		}, false);

		worker.postMessage({
			from: currentStart,
			to: currentStart + subrangeLength
		});

		currentStart += subrangeLength;
	});
}


var startTime = Date.now();

run(function(result) {
	console.log((Date.now() - startTime)/1000 + 'sec');
	console.log(result);
});
