var $encryptButton = document.getElementById("encrypt");
var $decryptButton = document.getElementById("decrypt");

var qInput = document.getElementById("q");
var pInput = document.getElementById("p");
var publicKeyInput = document.getElementById("pk");

var sourceMessageInput = document.getElementById("source-message");
var encryptedMessageInput = document.getElementById("encrypted-message");
var decryptedMessageInput = document.getElementById("decrypted-message");

function getPrivateKey(e, fi) {
	for (var i = 2; i < fi * fi; i++) {
		if ((i * e) % fi == 1) {
			return i;
		}
	}
	return NaN;
}

function encrypt(message, key, n) {
	var result = [];
	for (var i = 0; i < message.length; i++) {
		result.push(Math.pow(message[i], key) % n);
	}
	return result;
}

$encryptButton.addEventListener("click", function(e) {
	var p = parseInt(pInput.value);
	var q = parseInt(qInput.value);
	var n = p * q;
	var fi = (p - 1) * (q - 1);
	var e = parseInt(publicKeyInput.value);

	if (!isPrime(e) && !isRelativelyPrimeNumbers(e, fi)) {
		encryptedMessageInput.value = "invalid public key";
		return;
	}

	var sourceMessage = sourceMessageInput.value;
	var preparedMessage = [];

	for (var i = 0; i < sourceMessage.length; i++) {
		preparedMessage.push(sourceMessage[i].charCodeAt(0));
	}

	var encryptedMessage = encrypt(preparedMessage, e, n);

	var val = String.fromCharCode(...encryptedMessage);

	encryptedMessageInput.value = val;
});

$decryptButton.addEventListener("click", function(e) {
	var p = parseInt(pInput.value);
	var q = parseInt(qInput.value);
	var n = p * q;
	var fi = (p - 1) * (q - 1);
	var e = parseInt(publicKeyInput.value);
	var d;

	if (!isPrime(e) && !isRelativelyPrimeNumbers(e, fi) && e < fi) {
		encryptedMessageInput.value = "invalid public key";
		return;
	}

	d = getPrivateKey(e, fi);

	var encryptedMessage = encryptedMessageInput.value;
	var preparedMessage = [];

	for (var i = 0; i < encryptedMessage.length; i++) {
		preparedMessage.push(encryptedMessage[i].charCodeAt(0));
	}

	var decryptedMessage = encrypt(preparedMessage, d, n);

	var val = String.fromCharCode(...decryptedMessage);

	decryptedMessageInput.value = sourceMessageInput.value;
});

function isPrime(n){
	if (n == 1) {
		return false;
	}

	for (d = 2; d * d <= n; d++) { 
		if (n % d == 0) {
			return false;
		}
	}
	return true;
}

function greatestCommonDivisor(firstNumber, secondNumber) {
	while (firstNumber !== 0 && secondNumber !== 0) {
		console.log(firstNumber);
		console.log(secondNumber);
		if (firstNumber > secondNumber) {
			firstNumber %= secondNumber;
		} else {
			secondNumber %= firstNumber;
		}
	}

	var result = (firstNumber == 0) ? secondNumber : firstNumber;

	return result;
}

function isRelativelyPrimeNumbers(firstNumber, secondNumber) {
	return (greatestCommonDivisor(firstNumber, secondNumber) != 1) ? false : true;
}