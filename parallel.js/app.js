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

var start = 0;
var end = 100000;

// var data = Array
//   .apply(null, Array(end - start))
//   .map(function (x, i) { return i + start; })

var data = [];
for(var i = start; i < end; i++) {
  data.push(i);
}


var p = new Parallel(data, { maxWorkers: 4 });

p.require(isPrime);
p.require(isPalindrome);

var startTime = Date.now();
p
  .map(n => isPrime(n) && isPalindrome(n) ? 1 : 0)
  .reduce(d => d[0] + d[1])
  .then(function(result) {
    console.log((Date.now() - startTime)/1000 + 'sec');
    console.log(result);
  });
