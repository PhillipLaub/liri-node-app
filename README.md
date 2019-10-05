# liri-node-app

- OVERVIEW

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.


- AVAILABLE FUNCTIONS

-concert-this
(Example: node liri.js concert-this reel big fish)

This will show the following information about each event to your terminal/bash window:
Name of the Venue
Location of the Venue
Date of the Event

-spotify-this-song
(Example: node liri.js spotify-this-song clint eastwood)

This will show the following about the song in your terminal/bash window:
Artist(s)
Song Name
Album of the Song
Song Preview Link

-movie-this
(Example: node liri.js movie-this pulp fiction)

This will output the following information to your terminal/bash window:
Title of the Movie
Year the Movie was Released
The IMDB Rating
Country the Movie was made in
Language the Movie is in
Plot of the Movie
Actors in the Movie
The Rotten Tomatoes Rating

-do-what-it-says
(Example: node liri.js do-what-it-says)

The program will take the text inside of random.txt, and will use the first index as the action and the second index as the search input.
Currently in random.txt, the following text is there:
spotify-this-song,"I Want it That Way"
This would call the spotify-this-song function and use "I Want it That Way" as the input.

- TECHNOLOGIES USED

Javascript
Nodejs
Node packages:
Node-Spotify-API
Request
Moment
DotEnv

- APIs USED

Bands in Town
OMDB
Git
GitHub

- This app is created and maintained by Phillip Laub

![LIRI_concert-this](https://github.com/PhillipLaub/liri-node-app/blob/master/Screenshots/LIRI_concert-this.png)

![LIRI_movie-this](https://github.com/PhillipLaub/liri-node-app/blob/master/Screenshots/LIRI_movie-this.png)

![LIRI_spotify-this-song](https://github.com/PhillipLaub/liri-node-app/blob/master/Screenshots/LIRI_spotify-this-song.png)

![LIRI_default&do-what-it-says](https://github.com/PhillipLaub/liri-node-app/blob/master/Screenshots/LIRI_default&do-what-it-says.png)