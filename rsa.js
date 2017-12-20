var $encryptButton = document.getElementById("encrypt");
var $decryptButton = document.getElementById("decrypt");

var qInput = document.getElementById("q");
var pInput = document.getElementById("p");
var publicKeyInput = document.getElementById("pk");

var sourceMessageInput = document.getElementById("source-message");
var encryptedMessageInput = document.getElementById("encrypted-message");
var decryptedMessageInput = document.getElementById("decrypted-message");

function getPrivateKey(publicKey, pfi) {
		for (var result = 2; result < pfi * pfi; result++) {
			if((result * publicKey) % pfi == 1){
				return result;
			}
		}
		return NaN;
}

function encrypt(message, ko, n) {
	var result = [];
	for (var i = 0; i < message.length; i++) {
		result.push(Math.pow(message[i], ko) % n);
	}
	return result;
}

function decrypt(message, ks, n) {
	var result = [];
	for (var i = 0; i < message.length; i++) {
		result.push(Math.pow(message[i], ks) % n);
	}	
	return result;
}

$encryptButton.addEventListener("click", function(e){
	// console.log("encrypt button clicked");
	var q = parseInt(qInput.value);
	var p = parseInt(pInput.value);
	var phi = (p - 1) * (q - 1);
	var publicKey = parseInt(publicKeyInput.value);
	var message = sourceMessageInput.value;
	var n = q * p;

	var privateKey = getPrivateKey(publicKey, phi);

	asciiRepr = [];
	// console.log(message)

	for (var i = 0; i < message.length; i++) {
		// console.log(message[i])
		 asciiRepr.push(message[i].charCodeAt(0));
	}

	var encrypredAsciiRepr = encrypt(asciiRepr, publicKey, n);
	// console.log(encrypredAsciiRepr);
	// console.log(encrypredAsciiRepr)

	val = "";

	for (var i = 0; i < encrypredAsciiRepr.length; i++) {
		val += String.fromCharCode(encrypredAsciiRepr[i]);
	}

	encryptedMessageInput.value = val;
});

$decryptButton.addEventListener("click", function(e){
	// console.log("decrypt button clicked");
	var q = parseInt(qInput.value);
	var p = parseInt(pInput.value);
	var phi = (p - 1) * (q - 1);
	var publicKey = parseInt(publicKeyInput.value);
	var message = encryptedMessageInput.value;
	var n = q * p;

	var privateKey = getPrivateKey(publicKey, phi);

	asciiRepr = [];
	// console.log(message)

	for (var i = 0; i < message.length; i++) {
		// console.log(message[i])
		 asciiRepr.push(message[i].charCodeAt(0));
	}

	var decrypredAsciiRepr = decrypt(asciiRepr, privateKey, n);
	// console.log(encrypredAsciiRepr);
	// console.log(encrypredAsciiRepr)

	console.log(decrypredAsciiRepr);

	val = "";

	for (var i = 0; i < decrypredAsciiRepr.length; i++) {
		val += String.fromCharCode(decrypredAsciiRepr[i]);
	}

	decryptedMessageInput.value = val;
});

// console.log("oj");