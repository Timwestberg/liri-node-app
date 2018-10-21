
require('dotenv').config();
let inquirer = require('inquirer');
let request = require('request');
let Spotify = require("node-spotify-api");



let search = process.argv[2];
let userSearch = process.argv.slice(3).join("+");

// if (!search) {
//   search = "conert-this";
// }

// if (!userSerach) {
//   term = "Yellow Card";
// }

// // Print whether searching for a show or actor, print the term as well
// if (search === "concert-this") {
//   console.log("Searching for Concerts");
//   type.concerts(userSearch);
// } else {
//   console.log("Searching for TV Actor");
// }

// 

let Liri = function (){

    this.concerts = function concertSearch(userSearch) {
      
      
  
      let artist = userSearch
  
      // for (var i = 2; i < userSearch.length; i++) {
  
      //     if (i > 2 && i < userSearch.length) {
        
      //       artist = artist + "+" + userSearch[i];
        
      //     }
        
      //     else {
        
      //       artist += userSearch[i];
        
      //     }
      //   }
  
  
      let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=9b27cbad35b19dd67ba11c1a35644795"
  
      console.log(queryURL);
  
     return request(queryURL, function (error, response, body) {
  
      body = JSON.parse(body,2)
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
  
      // var prettyDateEvent = moment(dateEvent).format("MM/DD/YY @ hh:mm a");
      let concertInfo = ["|| Venue: " + this.venue,
      "|| City " + this.city,
      "|| Date: " + this.dateEvent,
      "|| Lineup: " + this.lineUp,
      "|| Latitude: " + this.latitude,
      "|| Longitude: " + this.longitude]
      console.log("=======================================================================================================")
      console.log(concertInfo);
  
    }
  
   });
  
  };
    this.songs = function Songsearch(userSearch) {
      let keys = require("./keys")
      let spotify = new Spotify(keys.spotify);
      
      let song = userSearch;
    
    
    
      spotify.search({ type: 'track', query: song }, function(err, data) {
        this.result = data.tracks.items[0];
        this.artist = result.artists[0].name
        this.song = result.name
        this.album = result.album.name
        this.link = result.external_urls.spotify
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
    
        // console.log(result.artists)
      console.log(song); 
      console.log(artist);
      console.log(album)
      console.log(link)
      });
    
    
    
    };
    this.movies = function movieSearch(userSearch) {

      
      let movie = userSearch;
      
      
      
      // for (var i = 2; i < userSearch.length; i++) {
      
      //     if (i > 2 && i < userSearch.length) {
        
      //       movie = movie + "+" + userSearch[i];
        
      //     }
        
      //     else {
        
      //       movie += userSearch[i];
        
      //     }
      //   }
      
      let queryURL ="http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=ae1476de" 
      
      console.log(queryURL)
      
      request(queryURL, function(error, response, body) {
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
            
      
      
      
      
          movieInfo = ["|| The movie's title is: " + this.title,
          "|| " + this.title + "  was first released in: "  + this.year,
          "|| " + this.title + " was rated a: " + this.rating,
          "|| " + this.title + "  was given a rating of " + this.rottenTomato +  " by Rotten Tomatoes",
          "|| " + this.title + "  was produced in: " + this.country,
          "|| " + this.title+ " was produced in the following langauges: " + this.language,
          "|| " + this.title + " is about " + this.plot,
          "|| " + this.title +"'s talented cast includes: " + this.actors].join("\n \n")

          console.log(movieInfo);
        }
      })
      };
}

let type = new Liri()
if (!search) {
  search = "conert-this";
}

if (!userSearch) {
  term = console.log("Nothing to search");
}

// Print whether searching for a concert, song , movie
if (search === "concert-this") {
  console.log("Searching for Concerts");
  type.concerts(userSearch);
} else if(search === "song-this") {
  let userSearch = process.argv.slice(3).join(" ");
  console.log("Searching Through Songs");
  type.songs(userSearch)
}else if(search === "movie-this"){
  console.log("Searching for Movie");
  type.movies(userSearch)
}

// This function is used to search an artist
//  function concertSearch() {

//     var userSearch = process.argv;


//     let artist = ""

//     for (var i = 2; i < userSearch.length; i++) {

//         if (i > 2 && i < userSearch.length) {
      
//           artist = artist + "+" + userSearch[i];
      
//         }
      
//         else {
      
//           artist += userSearch[i];
      
//         }
//       }


//     let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=9b27cbad35b19dd67ba11c1a35644795"

//     console.log(queryURL);

//    return request(queryURL, function (error, response, body) {

//     body = JSON.parse(body,2)
//    console.log('error:', error); // Print the error if one occurred
//    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//    console.log('body:', body) // Print the HTML for the Google homepage.
  
//    for (i = 0; i < body.length; i++) {

//     this.venue = body[i].venue.name;
//     this.city = body[i].venue.city;
//     this.latitude = body[i].venue.latitude;
//     this.longitude = body[i].venue.longitude;
//     this.dateEvent = body[i].datetime;
//     this.lineUp = body[i].lineup;

//     // =====add moment js npm function here ======

//     // var prettyDateEvent = moment(dateEvent).format("MM/DD/YY @ hh:mm a");
//     let concertInfo = ["|| Venue: " + venue,
//     "|| City " + city,
//     "|| Date: " + dateEvent,
//     "|| Lineup: " + lineUp,
//     "|| Latitude: " + latitude,
//     "|| Longitude: " + longitude]
//     console.log("=======================================================================================================")
//     console.log(concertInfo);

//   }

//  });

// };



// This is the start of the program for searching Movie information
// function movieSearch() {

// let userSearch = process.argv;

// let movie = "";



// for (var i = 2; i < userSearch.length; i++) {

//     if (i > 2 && i < userSearch.length) {
  
//       movie = movie + "+" + userSearch[i];
  
//     }
  
//     else {
  
//       movie += userSearch[i];
  
//     }
//   }

// let queryURL ="http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=ae1476de" 

// console.log(queryURL)

// request(queryURL, function(error, response, body) {
//     body = JSON.parse(body)
//     this.title = body.title
//     this.year = body.year
//     this.rating = body.imdbRating
//     this.rottenTomato = body.Ratings[1].Value
//     this.language = body.Language
//     this.plot = body.Plot
//     this.actors = body.Actors

//   // If there were no errors and the response code was 200 (i.e. the request was successful)...
//   if (!error && response.statusCode === 200) {
      


//     console.log(body)

//     movieInfo = ["|| The movie's title is: " + this.title,
//     "|| " + this.title + "  was first released in: "  + this.year,
//     "|| " + this.title + " was rated a: " + this.rating,
//     "|| " + this.title + "  was given a rating of " + this.rottenTomato +  " by Rotten Tomatoes",
//     "|| " + this.title + "  was produced in: " + this.Country,
//     "|| " + this.title+ " was produced in the following langauges: " + this.language,
//     "|| " + this.title + " is about " + this.plot,
//     "|| " + this.title +"'s talented cast includes: " + this.actors].join("\n \n")
//     // // * Title of the movie.
//     // console.log("\n || The movie's title is: " + body.Title)
//     // // * Year the movie came out.
//     // console.log("\n || " +body.Title+ "  was first released in: " + body.Year)
//     // // * IMDB Rating of the movie.
//     // console.log("\n || " +body.Title+ " was rated a: " + body.imdbRating);
//     // // * Rotten Tomatoes Rating of the movie.
//     // console.log("\n || " +body.Title+ "  was given a rating of " + body.Ratings[1].Value +  " by Rotten Tomatoes") // Having issues getting the Rotten Tomatoes rating out of the Object ||
//     // // * Country where the movie was produced.
//     // console.log("\n || " +body.Title+ "  was produced in: " + body.Country)
//     // // * Language of the movie.
//     // console.log("\n || " +body.Title+ " was produced in the following langauges: " +body.Language)
//     // // * Plot of the movie.
//     // console.log("\n || " +body.Title+ " is about " + body.Plot)
//     // // * Actors in the movie.
//     // console.log("\n || " +body.Title+"'s talented cast includes: " + body.Actors)
//     console.log(movieInfo);
//   }
// })
// };



// function Songsearch() {
//   let keys = require("./keys")
//   let spotify = new Spotify(keys.spotify);
//   let userSearch = process.argv;
//   let song = "";

//   for (var i = 2; i < userSearch.length; i++) {

//     if (i > 2 && i < userSearch.length) {
  
//       song = song + " " + userSearch[i];
  
//     }
  
//     else {
  
//       song += userSearch[i];
  
//     }
//   }



//   spotify.search({ type: 'track', query: song }, function(err, data) {
//     this.result = data.tracks.items[0];
//     this.artist = result.artists[0].name
//     this.song = result.name
//     this.album = result.album.name
//     this.link = result.external_urls.spotify
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   

//     // console.log(result.artists)
//   console.log(song); 
//   console.log(artist);
//   console.log(album)
//   console.log(link)
//   });



// }

// Songsearch();

