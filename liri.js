var twitter= require("twitter");
var twitterJs= require("./keys.js");

var command=process.argv;
var fs= require("fs");

var twit = new twitter(twitterJs);
  
var spotify= require("node-spotify-api");
var spotifyJs= require("./spotify.js");
var spot= new spotify(spotifyJs);

var request= require("request")
var omdbJs= require("./omdb.js");

//node liri.js my-tweets
// function execute (command, song){
if(command[2] == "my-tweets"){
  	twit.get('statuses/user_timeline', function(error, tweets, response) {
  	for (var i = 0 ; i< 20; i++)
  	 console.log("Tweet: "+tweets[i].text+ " Created: " +tweets[i].created_at);	
  	})
 }

//node liri.js spotify-this-song

else if(command[2]== "spotify-this-song"){
	var input=""
	for (var i=3; i<command.length; i++){
		input= input + "+" + command[i];	
	};
 	spot.search({ type: 'track', query: input }, function(err, data) {
 		for (var i=0; i<data.tracks.items.length; i ++){
 			console.log();
    		console.log("Name: " + data.tracks.items[i].name);
    		console.log("Artist: " + data.tracks.items[i].artists[0].name);
    		console.log("Album: " + data.tracks.items[i].album.name);
		}
	});
 }

//node liri.js movie-this

 else if(command[2]== "movie-this"){
 	var input=""
	for (var i=3; i<command.length; i++){
		input= input + "+" + command[i];	
	};

	request("http://www.omdbapi.com/?t="+input+"&apikey=40e9cece", function(error, response, body) {
	console.log("Title: " + JSON.parse(body).Title);
	console.log("Release Year: " + JSON.parse(body).Year);
	console.log("The movie's rating is: " + JSON.parse(body).imdbRating);

	// console.log(JSON.parse(body).Ratings[1].Source + " Rating: " + JSON.parse(body).Ratings[1].Value);
	console.log("Country: " + JSON.parse(body).Country);
	console.log("Language: " + JSON.parse(body).Language);
	console.log("Plot: " + JSON.parse(body).Plot);
	console.log("Actors: " + JSON.parse(body).Actors);
	});
}
else if (command[2]== "do-what-it-says"){

	fs.readFile("random.txt", "utf8", function(err, data) {
		data = data.split(",");
		var newCommand = data[0];
		var newSong= data[1];
    	console.log(data);
    	if (newCommand == "spotify-this-song"){
   //  		var input=""
			// for (var i=3; i<command.length; i++){
			// input= input + "+" + command[i];	
			// };
 				spot.search({ type: 'track', query: newSong }, function(err, data) {
 					for (var i=0; i<data.tracks.items.length; i ++){
 					console.log();
    				console.log("Name: " + data.tracks.items[i].name);
    				console.log("Artist: " + data.tracks.items[i].artists[0].name);
    				console.log("Album: " + data.tracks.items[i].album.name);
					}
				});
    	}
});
}

// 