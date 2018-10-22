
// ====================================  calling the constructor ==============================================
let fs = require("fs");

let search = require('inquirer'); 

let Liri = require('./liri-function')

let liri = new Liri()


// ====================================  calling the constructor ==============================================


// definining search parameters and instances

search

  .prompt([

    {

      name: "searchWhat",

      type: "list",

      message: "What would you like to search?",

      choices: ["Concerts", "Songs", "Movies", "Do-what-it-says"]

    }

  ])

  .then(function (answer) {

    if (answer.searchWhat === "Concerts") {

      search

        .prompt([

          {

            type: "input",

            name: "userSearch",

            message: "Cool, which band are you looking to see?"

          }

        ])
        .then(function (res) {

          let userSearch = res.userSearch

          if (!userSearch) {

            userSearch = "Twenty One Pilots";
          }

          console.log("Searching for upcoming concerts");


          liri.concerts(userSearch);

        });


    }

    // ==========one thing at a time=====================

    if (answer.searchWhat === "Songs") {

      search

        .prompt([

          {

            type: "input",

            name: "userSearch",

            message: "Cool, which song would you like to listen to?"


          }

        ])
        .then(function (res) {

          // Grab the response from the user and sets it to a variable

          let userSearch = res.userSearch

          if (!userSearch) {

            userSearch = "The Sign";

          }




          console.log(userSearch)

          console.log("Searching Through our Songs");


          liri.songs(userSearch)



        });

    }

    // ==========one thing at a time=====================


    if (answer.searchWhat === "Movies") {

      search

        .prompt([

          {
            
            type: "input",

            name: "userSearch",

            message: "Cool, which movie are you interested in?"


          }

        ])

        .then(function (res) {

          let userSearch = res.userSearch

          if (!userSearch) {

            userSearch = "Mr.Nobody";

          }

          console.log("Searching for  your Movie");

          liri.movies(userSearch);

        });


    }

    if (answer.searchWhat === "Do-what-it-says") {

// had to write this alittle different to work right but i was able to get it to run;

      fs.readFile("random.txt", "utf8", function(err, data) {

        if (err) {

          return console.log(err);

        }
      
        // Break the string down by comma separation and store the contents into the output array.

        var output = data.split(",");

        let userSearch = output[1];


      liri.songs(userSearch)

      });
      
     



    }

  });

  // =============working code below dont delete till sure===

// if (!search) {

//   //  if now search type is entered it will start looking through concerts

//   search = "concert-this";
// }


// // Print whether searching for a concert, song , movie
// if (search === "concert-this") {



//   if (!userSearch) {

//     userSearch = "Twenty One Pilots";
//   }

//   console.log("Searching for upcoming concerts");


//   liri.concerts(userSearch);


// }

// if (search === "spotify-this-song") {

//   if (!userSearch) {
//     // This isnt working because of the slice but i dont quite understand the error it is throwing when you dont search a song
//     userSearch = "The Sign";
//   }

//   // This is the cause of the probembut, dont understand why slice isnt working when nothing is entered should work the same???
//   userSearch = process.argv.slice(3).join(" ");
//   console.log(userSearch)

//   console.log("Searching Through our Songs");


//   liri.songs(userSearch)

// }

// if (search === "movie-this") {
//   if (!userSearch) {

//     userSearch = "Mr.Nobody";
//   }

//   console.log("Searching for  your Movie");

//   liri.movies(userSearch);
// }




// =====================some  of the Old Code before switching to constrcutor & modulization=================================
// let Liri = function () {

//   this.concerts = function concertSearch(userSearch) {



//     let artist = userSearch


//     let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=9b27cbad35b19dd67ba11c1a35644795"

//     console.log(queryURL);

//     return request(queryURL, function (error, response, body) {

//       body = JSON.parse(body, 2)


//       console.log('error:', error); // Print the error if one occurred


//       console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received


//       for (i = 0; i < body.length; i++) {

//         this.venue = body[i].venue.name;

//         this.city = body[i].venue.city;

//         this.latitude = body[i].venue.latitude;

//         this.longitude = body[i].venue.longitude;

//         this.dateEvent = body[i].datetime;

//         this.lineUp = body[i].lineup;

//         // =====add moment js npm function here ======

//         this.eventDate = moment(this.dateEvent).format("MM/DD/YYYY @ h:mm");

//         this.concertInfo = ["|| Venue: " + this.venue,

//         "|| City " + this.city,

//         "|| Date: " + this.eventDate,

//         "|| Lineup: " + this.lineUp,

//         "|| Latitude: " + this.latitude,

//         "|| Longitude: " + this.longitude].join("\n \n");

//         fs.appendFile("log.txt",divder + "\n \n" + this.concertInfo + "\n \n" + divder, function(err) {
//           if (err) throw err;
//           });


//         console.log(divder + "\n \n" + this.concertInfo + "\n \n" + divder);

//       }

//     });

//   };

//   this.songs = function Songsearch(userSearch) {

//     let keys = require("./keys")

//     let spotify = new Spotify(keys.spotify);

//     let song = userSearch;



//     spotify.search({ type: 'track', query: song }, function (err, data) {

//       this.result = data.tracks.items[0];

//       this.artist = result.artists[0].name

//       this.song = result.name

//       this.album = result.album.name

//       this.link = result.external_urls.spotify

//       if (err) {

//         return console.log('Error occurred: ' + err);

//       }

//       this.songInfo = ["|| " + this.song + " is performed orignally by " + this.artist,

//     "|| " + this.song + " is from the album " + this.album,

//     "|| check it out for yourself! @ " +this.link].join("\n \n")

//               // Append songInfo and the divider to log.txt, print songInfo to the console
//               fs.appendFile("log.txt",divder +"\n "  + this.songInfo + "\n " +divder, function(err) {
//                 if (err) throw err;
//                 });

//       console.log(divder +"\n "  + this.songInfo + "\n " +divder);
//     });



//   };

//   this.movies = function movieSearch(userSearch) {


//     let movie = userSearch;



//     let queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=ae1476de"

//     console.log(queryURL)

//     request(queryURL, function (error, response, body) {

//       body = JSON.parse(body)

//       this.title = body.Title

//       this.year = body.Year

//       this.rating = body.imdbRating

//       this.rottenTomato = body.Ratings[1].Value

//       this.language = body.Language

//       this.plot = body.Plot

//       this.actors = body.Actors

//       this.country = body.Country

//       // If there were no errors and the response code was 200 (i.e. the request was successful)...
//       if (!error && response.statusCode === 200) {




// // creating a variable to hold the output data for text file and to show user

//         movieInfo = ["|| The movie's title is: " + this.title,

//         "|| " + this.title + "  was first released in: " + this.year,

//         "|| " + this.title + " was rated a: " + this.rating,

//         "|| " + this.title + "  was given a rating of " + this.rottenTomato + " by Rotten Tomatoes",

//         "|| " + this.title + "  was produced in: " + this.country,

//         "|| " + this.title + " was produced in the following langauges: " + this.language,

//         "|| " + this.title + " is about " + this.plot,

//         "|| " + this.title + "'s talented cast includes: " + this.actors].join("\n \n")

//           // Append movieInfo and the divider to log.txt, print movieInfo to the console
//           fs.appendFile("log.txt",divder + "\n \n" + movieInfo + "\n \n" + divder, function(err) {
//           if (err) throw err;
//           });

//         console.log(divder + "\n \n" + movieInfo + "\n \n" + divder);

//       }

//     })

//   };

// }

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

