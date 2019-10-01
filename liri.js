require("dotenv").config();
var keys = require("./keys");
var Spotify = require('node-spotify-api'); //Using the Spotify api and getting the key from keys.js
var spotify = new Spotify(keys.spotify);

// Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

// console.log(keys);
// console.log("\n");

var axios = require("axios");

// Store all of the arguments in an array
switch( process.argv[2] ){
    case "concert-this":
        console.log("concert thissss")
        break;
    case "spotify-this-song":
        runSpotify();
        break;
    case "movie-this":
        runOmdb();
        break;
    case "do-what-it-says":
        break;
    default:
        console.log("Please enter an argument dude")
        
}
//put API calls in functions, then call functions inside switch statements

function runOmdb() {
    var movieName = "";
    var nodeArgs = process.argv;
// Create an empty variable for holding the movie name
if (!process.argv[3]) {
    movieName = "Mr.Nobody";
}



// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  } else {
    movieName += nodeArgs[i];

  }
}

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
// console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("\n\n--------------------------OMDB--------------------------");
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("Ratings: " + response.data.Ratings[0].Source + ": " + response.data.Ratings[0].Value);
    console.log("Country where produced: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    console.log("--------------------------------------------------------\n\n");

 
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

}

function runSpotify() {
  
  var songName = "";
  var nodeArgs = process.argv;
// Create an empty variable for holding the movie name
if (!process.argv[3]) {
    songName = "The Sign";
}

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    songName = songName + "+" + nodeArgs[i];
  } else {
    songName += nodeArgs[i];

  }
}

  spotify
  .search({ type: 'track', query: songName })
  .then(function(response) {         
          console.log("\n\n-------------------------SPOTIFY----------------------------");
          console.log("Artist: " + response.tracks.items[0].artists[0].name);
          console.log("Song Name: " + response.tracks.items[0].name);
          console.log("Album Name: " + response.tracks.items[0].album.name);
          console.log("Preview Link: " + response.tracks.items[0].preview_url);
          console.log("------------------------------------------------------------\n\n");
      
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}