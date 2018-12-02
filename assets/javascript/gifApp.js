$(document).ready(function () {
  //array of golden doodles
  var arrayCrash = ["Police Crash", "Bus Crash", "Skateboard Falls", "Bicycle Crash", "Car Crash", "Motorcycle Crash", "Truck Crash", "Ski Crash", "Train Crash", "Scooter Crash", "ATV Crash"];


  

  //Function for displaying arrayCrash Giphy 
  function displayGifInfo() {
    var crash = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=K5eSo5DJFXJ30reVokW1DTSx8zRja5oI&q="+ crash +"&limit=10&offset=0&rating=G&lang=en";


    //creating an Ajax call for golden doodles
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

        for (var i = 0; i < response.data.length; i++) {
      // create a div with a class
      var crashDiv = $("<div>");
      var p = $("<p>").text("Rating: " + response.data[i].rating);


      // Retrieving the URL for the image
      var gifImage = $("<img>");
      gifImage.attr("src",response.data[i].images.fixed_height.url);
      

      crashDiv.append(p);
      crashDiv.append(gifImage);

      console.log(gifImage);

        $("#crashGif-view").prepend(crashDiv);
        }
    });
  }
  

  // Function for displaying movie data
  function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < arrayCrash.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var x = $("<button>");
      // Adding a class of movie-btn to our button
      x.addClass("gif-btn");
      // Adding a data-attribute
      x.attr("data-name", arrayCrash[i]);
      // Providing the initial button text
      x.text(arrayCrash[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(x);
    }
  }
  // click on the gif to animate or pause funtion
  $("<img>").on("click", function() {
      // $(gifImage).attr(data-state);
      console.log(gifImage);

    var state = $(this).attr("data-state");
      console.log(state);
    

    if(state === "still") {
    
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");

    }
      else if(state === "animate") {
        
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

      }
      console.log(state);
   
  });
  //This function handles events where a movie button is clicked
  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var crash = $("#gif-input").val().trim();

    // Adding movie from the textbox to arrayCrash
    arrayCrash.push(crash);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });
  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".gif-btn", displayGifInfo);

  
  renderButtons();



});