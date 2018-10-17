
let dotenv = require('dotenv').config()
let inquirer = require('inquirer')

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



 function concertSearch() {

    var userSearch = process.argv;

    var request = require('request');

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

    console.log("\nVenue: " + venue);
    console.log("\nCity", city)
    console.log("\nDate: ", dateEvent)
    console.log("\nLineup: ", lineUp)
    console.log("\nLatitude: " + latitude);
    console.log("\nLongitude: " + longitude);
    console.log("--------------------------------------");
  }

 });

};

concertSearch();