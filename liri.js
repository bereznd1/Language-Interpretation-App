// Code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Requiring the necessary NPM packages & our local Keys.js file
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");

//Setting up variables to hold user input
var command = process.argv[2];
var fullTitle = process.argv.slice(3).join("%20");

//Creating user based authentication for each package based on the values in our local Keys.js file
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

//If the user doesn't enter any command, show default intro text
if (!command) {

    console.log("\nWelcome to LIRI, a command line node app that takes in parameters and gives you back data. \n\nTo retrieve last 20 tweets, use the command 'my-tweets'. \nTo retrieve information about a desired song, use the command 'spotify-this-song [song title]'. \nTo retrieve information about a desired movie, use the command 'movie-this [movie title]'. \nTo run 'spotify-this-song' feature using the info found in the local text file 'Random.txt', use the command 'do-what-it-says'. \n\n Enjoy!")

}


//Code for retrieving last 20 tweets
if (command === "my-tweets") {

    //Setting the parameters to equal the Twitter username we are retrieving tweets from
    var params = { screen_name: 'LiriDennisB' };

    //Send a request to the Twitter API
    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (error) {
            return console.log('Error occurred: ' + error);
        }

        console.log("\n");

        console.log("Last 20 Tweets:")

        console.log("\n");

        //If the specified Twitter username has less than 20 tweets, retrieve all of its tweets
        if (tweets.length < 20) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log("\nCreated: " + tweets[i].created_at + "\n\n");
            }
        }

        //If the specified Twitter username has more than 20 tweets, retrieve the latest 20
        else {
            for (i = 0; i < 20; i++) {
                console.log(tweets[i].text);
                console.log("\nCreated: " + tweets[i].created_at + "\n\n");
            }
        }
    });
}


//Code for retrieving info about a certain song
if (command === "spotify-this-song") {

    //If the user has entered a song title as input...
    if (fullTitle) {

        //Send a request to the Spotify API, using the song title the user has inputted as part of the query url
        spotify
            .request('https://api.spotify.com/v1/search?q=track:' + fullTitle + '&type=track')
            .then(function (data) {
                console.log("\nSong: " + JSON.stringify(data.tracks.items[0].name, null, 2));
                console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
                console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
                console.log("Spotify Link: " + JSON.stringify(data.tracks.items[0].artists[0].external_urls.spotify, null, 2));
            })

            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });
    }

    //If the user has NOT entered a song title as input...
    else {

        //Send a request to the Spotify API, using the default track "The Sign" by Ace of Base as part of the query url
        spotify
            .request('https://api.spotify.com/v1/search?q=track:the+sign&type=track')
            .then(function (data) {
                console.log("\nSong: " + JSON.stringify(data.tracks.items[12].name, null, 2));
                console.log("Artist: " + JSON.stringify(data.tracks.items[12].album.artists[0].name, null, 2));
                console.log("Album: " + JSON.stringify(data.tracks.items[12].album.name, null, 2));
                console.log("Spotify Link: " + JSON.stringify(data.tracks.items[12].artists[0].external_urls.spotify, null, 2));
            })

            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });
    }
}


//Code for retrieving info about a certain movie
if (command === "movie-this") {

    //If the user has entered a movie title as input...
    if (fullTitle) {

        //Sets up the queryUrl that will be sent to the OMDB API, using the movie title that the user typed in
        var queryUrl = "http://www.omdbapi.com/?t=" + fullTitle + "&y=&plot=short&apikey=trilogy";

        //Creates a request to the queryUrl
        request(queryUrl, function (error, response, body) {

            if (error) {
                return console.log('Error occurred: ' + error);
            }

            //If the request is successful...
            if (!error && response.statusCode === 200) {

                console.log("\n\nTitle: " + JSON.parse(body).Title);
                console.log("\nYear: " + JSON.parse(body).Year);
                console.log("\nActors: " + JSON.parse(body).Actors);
                console.log("\nPlot: " + JSON.parse(body).Plot);
                console.log("\nLanguage: " + JSON.parse(body).Language);
                console.log("\nCountry of Production: " + JSON.parse(body).Country);
                console.log("\nIMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);

            }
        });
    }

    //If the user has NOT entered a movie title as input...
    else {

        //Sets up the queryUrl that will be sent to the OMDB API, using the default movie title "Mr. Nobody"
        var queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";

        //Creates a request to the queryUrl
        request(queryUrl, function (error, response, body) {

            if (error) {
                return console.log('Error occurred: ' + error);
            }

            // If the request is successful...
            if (!error && response.statusCode === 200) {

                console.log("\n\nTitle: " + JSON.parse(body).Title);
                console.log("\nYear: " + JSON.parse(body).Year);
                console.log("\nActors: " + JSON.parse(body).Actors);
                console.log("\nPlot: " + JSON.parse(body).Plot);
                console.log("\nLanguage: " + JSON.parse(body).Language);
                console.log("\nCountry of Production: " + JSON.parse(body).Country);
                console.log("\nIMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);

            }
        });
    }
}


//Code for calling the Spotify-This-Song command using text from the "Random.txt" local file
if (command === "do-what-it-says") {

    //Use the file system package to read the text in the "Random.txt" local file
    fs.readFile("random.txt", "utf-8", function (err, data) {

        if (err) {
            return console.log(err);
        }

        //Create an array from the text in the "Random.txt" local file
        var dataArr = data.split(",");

        //Send a request to the Spotify API, using the song title retrieved from the text in the "Random.txt" local file
        spotify
            .request('https://api.spotify.com/v1/search?q=track:' + dataArr[1] + '&type=track')
            .then(function (data) {
                console.log("\nSong: " + JSON.stringify(data.tracks.items[0].name, null, 2));
                console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
                console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
                console.log("Spotify Link: " + JSON.stringify(data.tracks.items[0].artists[0].external_urls.spotify, null, 2));


            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });
    });
}