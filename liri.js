require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var command = process.argv[2];
var fullTitle = process.argv.slice(3).join("%20");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


if (command === "my-tweets") {


    var params = { screen_name: 'LiriDennisB' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }

        console.log("\n");

        console.log("Last 20 Tweets:")

        console.log("\n");

        if (tweets.length < 20) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log("\n");
                console.log("Created: " + tweets[i].created_at);
                console.log("\n");
                console.log("\n");
            }
        }

        else {
            for (i = 0; i < 19; i++) {


                console.log(tweets[i].text);
                console.log("\n");
                console.log("Created: " + tweets[i].created_at);
                console.log("\n");
                console.log("\n");
            }

        }


    });


}



if (command === "spotify-this-song") {

    spotify
    .request('https://api.spotify.com/v1/search?q=track:' + fullTitle + '&type=track')
    .then(function(data) {
      console.log(data); 
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });

    // spotify.search({ type: 'track', query: fullTitle }, function(err, data) {
    //     if (err) {
    //       return console.log('Error occurred: ' + err);
    //     }
       
    //   console.log(data); 


    //   });

}

