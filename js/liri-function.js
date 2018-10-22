// require('dotenv').config();

require('dotenv').config();


// let inquirer = require('inquirer'); didnt have enough time will look into improving this with inquirer later.

let moment = require('moment')

// request npm package for bandsintown and omdb
let request = require('request');

// handles 
let Spotify = require("node-spotify-api");

let fs = require("fs");

let divder = "==========================================================="

// let search = process.argv[2];


// let userSearch = process.argv.slice(3).join("+");



let Liri = function () {

    this.concerts = function concertSearch(userSearch) {
  
  
  
      let artist = userSearch
  
  
      let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=9b27cbad35b19dd67ba11c1a35644795"
  
      console.log(queryURL);
  
      return request(queryURL, function (error, response, body) {
  
        body = JSON.parse(body, 2)
  
  
        console.log('error:', error); // Print the error if one occurred
  
  
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  
  
        for (i = 0; i < body.length; i++) {
  
          this.venue = body[i].venue.name;
  
          this.city = body[i].venue.city;
  
          this.latitude = body[i].venue.latitude;
  
          this.longitude = body[i].venue.longitude;
          
          this.dateEvent = body[i].datetime;
  
          this.lineUp = body[i].lineup;
  
          // =====add moment js npm function here ======
  
          this.eventDate = moment(this.dateEvent).format("MM/DD/YYYY @ h:mm");
  
          this.concertInfo = ["|| Venue: " + this.venue,
  
          "|| City " + this.city,
  
          "|| Date: " + this.eventDate,
  
          "|| Lineup: " + this.lineUp,
  
          "|| Latitude: " + this.latitude,
  
          "|| Longitude: " + this.longitude].join("\n \n");
  
          fs.appendFile("log.txt",divder + "\n \n" + this.concertInfo + "\n \n" + divder, function(err) {

            if (err) throw err;
            
            });
  
  
          console.log(divder + "\n \n" + this.concertInfo + "\n \n" + divder);
  
        }
  
      });
  
    };
  
    this.songs = function Songsearch(userSearch) {
  
      this.keys = require("./keys")
  
      this.spotify = new Spotify(this.keys.spotify);
  
      let song = userSearch;
  
  
  
      this.spotify.search({ type: 'track', query: song }, function (err, data) {
  
        this.result = data.tracks.items[0];
  
        this.artist = result.artists[0].name
  
        this.song = result.name
  
        this.album = result.album.name
  
        this.link = result.external_urls.spotify
  
        if (err) {
  
          return console.log('Error occurred: ' + err);
  
        }
  
        this.songInfo = ["|| " + this.song + " is performed orignally by " + this.artist,
  
      " || " + this.song + " is from the album " + this.album,
  
      " || check it out for yourself! @ " +this.link].join("\n \n")
  
                // Append songInfo and the divider to log.txt, print songInfo to the console
                fs.appendFile("log.txt",divder +"\n "  + this.songInfo + "\n " +divder, function(err) {
                  if (err) throw err;
                  });
  
        console.log(divder +"\n "  + this.songInfo + "\n " +divder);
      });
  
  
  
    };
  
    this.movies = function movieSearch(userSearch) {
  
  
      let movie = userSearch;
  
  
  
      let queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=ae1476de"
  
      // console.log(queryURL)
  
      request(queryURL, function (error, response, body) {
  
        body = JSON.parse(body)
  
        this.title = body.Title
  
        this.year = body.Year
  
        this.rating = body.imdbRating
  
        this.rottenTomato = body.Ratings[1].Value
  
        this.language = body.Language
  
        this.plot = body.Plot
  
        this.actors = body.Actors
  
        this.country = body.Country
  
        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {
  
  
  
  
  // creating a variable to hold the output data for text file and to show user
  
          movieInfo = ["|| The movie's title is: " + this.title,
  
          "|| " + this.title + "  was first released in: " + this.year,
  
          "|| " + this.title + " was rated a: " + this.rating,
  
          "|| " + this.title + "  was given a rating of " + this.rottenTomato + " by Rotten Tomatoes",
  
          "|| " + this.title + "  was produced in: " + this.country,
  
          "|| " + this.title + " was produced in the following langauges: " + this.language,
  
          "|| " + this.title + " is about " + this.plot,
  
          "|| " + this.title + "'s talented cast includes: " + this.actors].join("\n \n")
  
            // Append movieInfo and the divider to log.txt, print movieInfo to the console
            fs.appendFile("log.txt",divder + "\n \n" + movieInfo + "\n \n" + divder, function(err) {
            if (err) throw err;
            });
  
          console.log(divder + "\n \n" + movieInfo + "\n \n" + divder);
  
        }
  
      })
  
    };
  
  }

  module.exports = Liri