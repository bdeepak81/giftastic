var animals = ["Tiger", "Lion", "Elephant", "Monkey"];

function displayAnimalInfo() {

    var animals = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animals + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      // Storing an array of results in the results variable
      var results = response.data;
      console.log(results);

      // Looping over every result item
      for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div with the class "item"
          var gifDiv = $("<div class='item'>");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);

          // Creating an image tag
          var personImage = $("<img>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          personImage.attr("src", results[i].images.fixed_height.url);
          personImage.attr("class", "gif-animate");
          personImage.attr("data-state","animate");
          personImage.attr("data-animate", results[i].images.fixed_height.url);
          personImage.attr("data-still", results[i].images.fixed_height_still.url);

          // Appending the paragraph and personImage we created to the "gifDiv" div we created
          gifDiv.append(p);
          gifDiv.append(personImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#image-display").prepend(gifDiv);
        }
      }
    });
}

function pauseGif(){
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
}

function renderButtons() {

  // Deletes the animals prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-list").empty();

  // Loops through the array of movies
  for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generates buttons for each animal in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of movie to our button
    a.addClass("animal");
    // Added a data-attribute
    a.attr("data-name", animals[i]);
    // Provided the initial button text
    a.text(animals[i]);
    // Added the button to the buttons-list div
    $("#buttons-list").append(a);
  }
}

  // This function handles events where the add movie button is clicked
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var animal = $("#animal-input").val().trim();

  // The movie from the textbox is then added to our array
  animals.push(animal);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();

});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".animal", displayAnimalInfo);
$(document).on("click", ".gif-animate", pauseGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();