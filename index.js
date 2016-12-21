//Modules
var fs = require('fs');
var Twit = require('twit')
var http = require('http');

//Opens 'tokens' file 
var tokens = {};
var tokensFile = fs.readFileSync('tokens.txt', 'utf8');
var tokensList = tokensFile.replace(/"/g, '').replace(/ /g, '').split(/\r?\n/); //Fix blank line in the end


//Iterates through each token name and value and saves it to tokens dict
tokensList.forEach(function(token) {
    tokenName = token.split("=")[0]
    tokenValue = token.split("=")[1]
        //console.log(currentToken);
    tokens[tokenName] = tokenValue;
});

//Opens the Twit object with token data
var T = new Twit({
    consumer_key: tokens["consumer_key"],
    consumer_secret: tokens["consumer_secret"],
    access_token: tokens["access_token"],
    access_token_secret: tokens["access_token_secret"],
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
})

//Main funtion

//Just some seconds arithmetic
var oneSec = 1000;
var oneMin = 60*oneSec;
var oneHour = 60*oneMin;
setInterval(getPrice, oneHour*1);//Change *1 to *5 for a 5 hour interval for example

//END of Main

//Tweets the price
function twittarPreco(preco) {
	T.post('statuses/update', {
	    status: '1 BTC = R$'+preco
	}, function(err, data, response) {
	    console.log(data)
	})
}


//Gets the price
function getPrice() {
    var options = {
        host: 'api.bitvalor.com',
        port: 80,
        path: '/v1/ticker.json'
    };

    http.get(options, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            var foxPrecoJson = JSON.parse(body);
	    var foxPreco = foxPrecoJson['ticker_1h']['exchanges']['FOX']['last']
	    twittarPreco(foxPreco);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}
