#About

Bot that tweets the bitcoin price from some source in a given interval 

#Usage
Make sure you have `npm` and `twit`(for nodejs) installed. If not, just 

```
sudo apt install npm
npm install twit
```


Just do the following (before doing it, please read below)

```
git clone https://github.com/lucaszanella/bitcoinTwitterPrice
cd bitcoinTwitterPrice
nano tokens.txt
nodejs index.js
```

You must have a file named tokens.txt with this configuration:

```
consumer_key = "your consumer key"
consumer_secret = "your consumer secret"
access_token = "your token"
access_token_secret = "your token secret"
```

PS: spaces and double quotes aren't necessary, they'll be ignored,
but you can keep them.
Remember that once you create the twitter app, it may be setted to 
no direct messages permission as default. Once you change that,
you need to renew the 'access token' and 'access token secret'.


