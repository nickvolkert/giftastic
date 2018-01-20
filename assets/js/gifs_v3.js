

var wweWrestlers = ["stone cold steve austin", "HHH", "The Dudley Boys", "Undertaker", "CM Punk", "ultimate warrior", "Bill Goldberg", "Macho Man Randy Savage"];
//var wweWrestlers = "stone cold steve austin";
$( document ).ready(function() {
  function wrestlerBuilder() {
    //console.log(gameArray[0].question);
    //console.log(gameArray[0].answers);
    //builds the question and radios in this div
    var glassbreaks = $("#buttonHouse");
    //sets tab index for radio buttons
    var number = 0;
    var tabIndexSet = 1;
    //builds the answer radio buttons
    var wrestlerArray = wweWrestlers;
    //builds the for loop inside html
    glassbreaks.html('');
    //for loop
    for (var i = 0; i < wrestlerArray.length; i++) {
      glassbreaks.append('<button data-person="' + wrestlerArray[i] + '"tabindex="' + tabIndexSet++ + '">' + wrestlerArray[i] + '</button>');
      console.log("wrestler button builder is working");
      }
  }
  wrestlerBuilder();

function apiBuilder(){
  $("#squaredCircle").html('');
  // In this case, the "this" keyword refers to the button that was clicked
  var person = $("button").attr("data-person");
  // Constructing a URL to search Giphy for the name of the person who said the quote
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=" + "bx6GCebgZFn3m2iZqfE2l2LOke09FssU" + "&limit=10";

  // Performing our AJAX GET request
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After the data comes back from the API
    .then(function(response) {
      // Storing an array of results in the results variable
      var results = response.data;
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
            var wrestlerImage = $("<img class='gif'>");
            var buttonGenerator = $("<button>")
            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            wrestlerImage.attr("src", results[i].images.fixed_height_still.url);
            wrestlerImage.attr("data-still", results[i].images.fixed_height_still.url);
            wrestlerImage.attr("data-animate", results[i].images.fixed_height.url);
            wrestlerImage.attr("data-state", "still");
            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(wrestlerImage);
            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#squaredCircle").prepend(gifDiv);
        }
      }
    });
}

  $("#submitBtn").on("click", function(e){
        e.preventDefault();
        var newChallenger = $("#wrestlerInput").val().trim();
        wweWrestlers.push(newChallenger);
        wrestlerBuilder();
        apiBuilder();
  });
  // Event listener for all button elements
  $("button").on("click", function() {
        apiBuilder();

        $(".gif").on("click", function() {
          var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
  });
});
