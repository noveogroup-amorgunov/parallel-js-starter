function isPrime(num) {
  for(var i = 2, s = Math.sqrt(num); i <= s; i++) {
    if(num % i === 0) {
      return false; 
    }
  }
  return num !== 1;
}

function isPalindrome(str) {
	var reversedString = str
    .toString()
		.split('')
		.reverse()
		.join('');
	return reversedString === str.toString();
}

function process(start, end) {
	var count = 0;
	for(var i = start; i < end; i++) {
		if (isPalindrome(i) && isPrime(i)) {
			count++;
		}
	}
	return count;
}

self.addEventListener('message', function(e) {
  var data = e.data;
  console.log(JSON.stringify(data));
  var count = process(data.from, data.to);
  self.postMessage(count);
  self.close();
}, false);