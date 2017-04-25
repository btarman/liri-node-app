var fs = require('fs');
var Twitter = require('twitter');
var request = require('request');
var operand = process.argv[2]
var dataInput = process.argv[3]
var keys = require('./keys.js');
var client = new Twitter(keys.twitterKeys);
var params = {screen_name: 'btarman75', count: 20};

switch (operand) {
    case 'my-tweets':
        tweets();
        break;
    case 'spotify-this-song':
        spotify(dataInput);
        break;
    case 'movie-this':
        omdb(dataInput);
        break;
    case 'do-what-it-says':
        random();
        break;
}

// function for returning tweets

function tweets(){
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error && response.statusCode === 200) {
  			for(var i = 0; i < tweets.length; i++) {
  				console.log(tweets[i].created_at)
  				console.log(tweets[i].text)
  			};
  		};
	});
};

// function for returning spotify data

function spotify(dataInput){
	if(dataInput === null) {
		dataInput = 'The Sign';
	}
	request('https://api.spotify.com/v1/search?q=' + dataInput + '&type=track', function(error, response, body) {
		if(!error && response.statusCode === 200) {
			dataJson = JSON.parse(body)
			console.log('*===============*')
			console.log('Artist: ' + dataJson.tracks.items[0].artists[0].name);
			console.log('Song: ' + dataJson.tracks.items[0].name);
            console.log('Preview Link: ' + dataJson.tracks.items[0].preview_url);
            console.log('Album: ' + dataJson.tracks.items[0].album.name);
			console.log('*===============*')
		};
	});
};

// function for returning omdb data

function omdb(dataInput) {
	request('http://www.omdbapi.com/?t=' + dataInput + '&tomatoes=true&r=json', function(error, response, body) {
		if(!error && response.statusCode === 200) {
			dataJson = JSON.parse(body)
			console.log('*===============*')
			console.log('Title: ' + dataJson.Title);
            console.log('Year: ' + dataJson.Year);
            console.log('IMDb Rating: ' + dataJson.imdbRating);
            console.log('Country: ' + dataJson.Country);
            console.log('Language: ' + dataJson.Language);
            console.log('Plot: ' + dataJson.Plot);
            console.log('Actors: ' + dataJson.Actors);
            console.log('Rotten Tomatoes URL: ' + dataJson.tomatoURL);
			console.log('*===============*')
		};
		if(dataInput === "") {
		dataInput = 'Mr. Nobody'
		};
	});
};

// function to return info from random.txt

function random() {
	fs.readFile('random.txt', 'utf-8', function(error, data) {
		if(error) {
			console.log(error)
		} else {
			var dataArr = data.split(',')
			spotify(dataArr[1]);
		}
	})
}













