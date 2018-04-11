require("dotenv").config();

//Requiring the necessary NPM packages & our local Keys.js file
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var keys = require("./keys.js");

//Setting up variables to hold user input
var command = process.argv[2];
var fullTitle = process.argv.slice(3).join("%20");

//Creating user based authentication for each package based on the values in our local Keys.js file
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);



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


    if (fullTitle) {

        spotify
            .request('https://api.spotify.com/v1/search?q=track:' + fullTitle + '&type=track')
            .then(function (data) {
                console.log("Song: " + JSON.stringify(data.tracks.items[0].name, null, 2));
                console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
                console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
                console.log("Spotify Link: " + JSON.stringify(data.tracks.items[0].artists[0].external_urls.spotify, null, 2));


            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });

    }


    else {
        spotify
            .request('https://api.spotify.com/v1/search?q=track:the+sign&type=track')
            .then(function (data) {
                console.log("Song: " + JSON.stringify(data.tracks.items[12].name, null, 2));
                console.log("Artist: " + JSON.stringify(data.tracks.items[12].album.artists[0].name, null, 2));
                console.log("Album: " + JSON.stringify(data.tracks.items[12].album.name, null, 2));
                console.log("Spotify Link: " + JSON.stringify(data.tracks.items[12].artists[0].external_urls.spotify, null, 2));




            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });

    }

}


if (command === "movie-this") {


    if (fullTitle) {

        //Runs a request to the OMDB API with the movie title that the user typed in
        var queryUrl = "http://www.omdbapi.com/?t=" + fullTitle + "&y=&plot=short&apikey=trilogy";


        //Creates a request to the queryUrl
        request(queryUrl, function (error, response, body) {

            if (error) {
                return console.log('Error occurred: ' + error);
            }

            // If the request is successful...
            if (!error && response.statusCode === 200) {

                console.log("\n");
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Country of Production: " + JSON.parse(body).Country);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);

            }

        });

    }


    else {

        //Runs a request to the OMDB API with the movie title that the user typed in
        var queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";


        //Creates a request to the queryUrl
        request(queryUrl, function (error, response, body) {


            if (error) {
                return console.log('Error occurred: ' + error);
            }

            // If the request is successful...
            if (!error && response.statusCode === 200) {

                console.log("\n");
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Country of Production: " + JSON.parse(body).Country);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);


            }

        });

    }


}

