
let dotenv = require('dotenv').config();
let inquirer = require('inquirer');
var request = require('request');

// Spotify should be first



// 

// let Liri = function (concerts, songs, movies, command){
//     this.concerts = function (artist) {

//      var request = require('request');
//     request("https://rest.bandsintown.com/artists/" + "Pierce the viel" + "/events?app_id=9b27cbad35b19dd67ba11c1a35644795", function (error, response, body) {
//     console.log('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', JSON.stringify(body),null, 2) + "\n"; // Print the HTML for the Google homepage.
// });

//     };
//     this.songs = songs;
//     this.movies = movies;
//     this.command = command;
// }


// This function is used to search an artist
 function concertSearch() {

    var userSearch = process.argv;


    let artist = ""

    for (var i = 2; i < userSearch.length; i++) {

        if (i > 2 && i < userSearch.length) {
      
          artist = artist + "+" + userSearch[i];
      
        }
      
        else {
      
          artist += userSearch[i];
      
        }
      }


    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=9b27cbad35b19dd67ba11c1a35644795"

    console.log(queryURL);

   return request(queryURL, function (error, response, body) {

    body = JSON.parse(body,2)
   console.log('error:', error); // Print the error if one occurred
   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
   console.log('body:', body) // Print the HTML for the Google homepage.
  
   for (i = 0; i < body.length; i++) {
    //console log venue, city, lat and long)
    console.log(body[i]);
    let venue = body[i].venue.name;
    let city = body[i].venue.city;
    let latitude = body[i].venue.latitude;
    let longitude = body[i].venue.longitude;
    let dateEvent = body[i].datetime;
    let lineUp = body[i].lineup;

    // =====add moment js npm function here ======

    // var prettyDateEvent = moment(dateEvent).format("MM/DD/YY @ hh:mm a");

    console.log("=======================================================================================================")

    console.log("\n || Venue: " + venue);
    console.log("\n || City", city)
    console.log("\n || Date: ", dateEvent)
    console.log("\n || Lineup: ", lineUp)
    console.log("\n || Latitude: " + latitude);
    console.log("\n || Longitude: " + longitude);
    console.log("--------------------------------------");
  }

 });

};

// concertSearch();

// This is the start of the program for searching Movie information
function movieSearch() {

var userSearch = process.argv;

let movie = "";



for (var i = 2; i < userSearch.length; i++) {

    if (i > 2 && i < userSearch.length) {
  
      movie = movie + "+" + userSearch[i];
  
    }
  
    else {
  
      movie += userSearch[i];
  
    }
  }

let queryURL ="http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=ae1476de" 

console.log(queryURL)

request(queryURL, function(error, response, body) {
    body = JSON.parse(body)

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {
      

    // Then we print out the imdbRating

    console.log(body)


    // * Title of the movie.
    console.log("\n || The movie's title is: " + body.Title)
    // * Year the movie came out.
    console.log("\n || " +body.Title+ "  was first released in: " + body.Year)
    // * IMDB Rating of the movie.
    console.log("\n || " +body.Title+ " was rated a: " + body.imdbRating);
    // * Rotten Tomatoes Rating of the movie.
    console.log("\n || " +body.Title+ "  was given a rating of " + body.Ratings[1].Source+" BIG FUCK YOU PROBLEM" + " by Rotten Tomatoes") // Having issues getting the Rotten Tomatoes rating out of the Object ||
    // * Country where the movie was produced.
    console.log("\n || " +body.Title+ "  was produced in: " + body.Country)
    // * Language of the movie.
    console.log("\n || " +body.Title+ " was produced in the following langauges: " +body.Language)
    // * Plot of the movie.
    console.log("\n || " +body.Title+ " is about " + body.Plot)
    // * Actors in the movie.
    console.log("\n || " +body.Title+"'s talented cast includes: " + body.Actors)
  }
})
};

// movieSearch();