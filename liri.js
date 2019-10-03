require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var moment = require("moment");
moment().format();

var fs = require("fs");

let action = process.argv[2];
let input = process.argv[3];

// Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

// console.log(keys);
// console.log("\n");

var axios = require("axios");
UserInputs(action, input);

// Store all of the arguments in an array
function UserInputs(action, input) {
  switch (action) {
    case "concert-this":
      runBandsInTown(input);
      fs.appendFileSync("random.txt", ",");
      fs.appendFileSync("random.txt", action);
      fs.appendFileSync("random.txt", ",");
      fs.appendFileSync("random.txt", input);
      break;
    case "spotify-this-song":
      runSpotify(input);
      fs.appendFileSync("random.txt", ",");
      fs.appendFileSync("random.txt", action);
      fs.appendFileSync("random.txt", ",");
      fs.appendFileSync("random.txt", input);
      break;
    case "movie-this":
      runOmdb(input);
      fs.appendFileSync("random.txt", ",");
      fs.appendFileSync("random.txt", action);
      fs.appendFileSync("random.txt", ",");
      fs.appendFileSync("random.txt", input);
      break;
    case "do-what-it-says":
      runRandom(input);
      break;
    default:
      console.log("\n--------------------------------------------------------");
      console.log(
        "Please enter a valid argument, such as:\n\nnode liri.js movie-this [MOVIE TITLE]\n\nnode liri.js spotify-this-song [SONG TITLE]\n\nnode liri.js concert-this [ARTIST NAME]\n\nnode liri.js do-what-it-says"
      );
      console.log(
        "--------------------------------------------------------\n\n"
      );
  }
}
//put API calls in functions, then call functions inside switch statements

function runOmdb(input) {
  var movieName = "";
  var nodeArgs = process.argv;
  // Create an empty variable for holding the movie name

  if (!process.argv[3] && input == undefined) {
    input = "Mr.Nobody";
  }

  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
      input = movieName;
    } else {
      movieName += nodeArgs[i];
      input = movieName;
    }
  }

  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl =
    "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  // console.log(queryUrl);

  axios
    .get(queryUrl)
    .then(function(response) {
      if (input !== "Mr.Nobody") {
        console.log(
          "\n--------------------------OMDB--------------------------"
        );
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log(
          "Ratings: " +
            response.data.Ratings[0].Source +
            ": " +
            response.data.Ratings[0].Value
        );
        console.log("Country where produced: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log(
          "--------------------------------------------------------\n\n"
        );
      } else {
        console.log(
          "\n--------------------------------------------------------"
        );
        console.log(
          "\nIf you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/"
        );
        console.log("It's on Netflix!");

        console.log(
          "\n\n--------------------------OMDB--------------------------"
        );
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log(
          "Ratings: " +
            response.data.Ratings[0].Source +
            ": " +
            response.data.Ratings[0].Value
        );
        console.log("Country where produced: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log(
          "--------------------------------------------------------\n\n"
        );
      }
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

function runSpotify(input) {



//works with this section commented


  var songName = "";
  var nodeArgs = process.argv;

  if (!process.argv[3] && input == undefined) {
    input = "The Sign";
  }

  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      songName = songName + "+" + nodeArgs[i];
      input = songName;
    } else {
      songName += nodeArgs[i];
      input = songName;
    }
  }

  spotify
    .search({ type: "track", query: input })
    .then(function(response) {
      console.log(
        "\n\n-------------------------SPOTIFY----------------------------"
      );
      console.log("Artist: " + response.tracks.items[0].artists[0].name);
      console.log("Song Name: " + response.tracks.items[0].name);
      console.log("Album Name: " + response.tracks.items[0].album.name);
      console.log("Preview Link: " + response.tracks.items[0].preview_url);
      console.log(
        "------------------------------------------------------------\n\n"
      );
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

function runBandsInTown(input) {
  var artist = "";
  var nodeArgs = process.argv;

  if (!process.argv[3] && input == undefined) {
    input = "Eminem";
  }

  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      artist = artist + "+" + nodeArgs[i];
      input = artist;
    } else {
      artist += nodeArgs[i];
      input = artist;
    }
  }

  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    input +
    "/events?app_id=codingbootcamp";

  // This line is just to help us debug against the actual URL.
  // console.log(queryUrl);

  axios
    .get(queryUrl)
    .then(function(response) {
      if (response.data[0] != undefined) {
        var eventDate = moment(response.data[0].datetime);

        console.log(
          "\n\n---------------------BANDS IN TOWN--------------------------"
        );
        console.log("Artist: " + response.data[0].lineup);
        console.log("\nName of Venue: " + response.data[0].venue.name);
        console.log("\nCity: " + response.data[0].venue.city);
        console.log("Region: " + response.data[0].venue.region);
        console.log("Country: " + response.data[0].venue.country);
        console.log("\nLatitude: " + response.data[0].venue.latitude);
        console.log("Longitude: " + response.data[0].venue.longitude);
        console.log(
          "\nDate of Event: " + eventDate.format("dddd, MMMM Do YYYY")
        );
        console.log(
          "------------------------------------------------------------\n\n"
        );
      } else {
        console.log(
          "\n------------------------------------------------------------"
        );
        console.log("No Results Found! Please try another artist!");
        console.log(
          "------------------------------------------------------------"
        );
      }
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

function runRandom(input) {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");

    // action=dataArr[0];
    // input=dataArr[1];

    //build function for passing these into switch function
    UserInputs(dataArr[0], dataArr[1]);
  });
}
