// Event listener for all button elements
$("button").on("click", function() {
  // In this case, the "this" keyword refers to the button that was clicked
  var person = $(this).attr("data-person");

  // Constructing a URL to search Giphy for the name of the person who said the quote
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "bx6GCebgZFn3m2iZqfE2l2LOke09FssU";
    //y0landa!j
  // Performing our AJAX GET request
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After the data comes back from the API
    .then(function(response) {
      // Storing an array of results in the results variable
      var wweWrestlers = ["stone cold steve austin", "HHH", "The Dudley Boys", "Kane", "Undertaker", "Sting", "ultimate warrior"];

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
          var wrestlerImage = $("<img>");

          var buttonGenerator = $("<button>")
          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          personImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and personImage we created to the "gifDiv" div we created
          gifDiv.append(p);
          gifDiv.append(wrestlerImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#squaredCircle").prepend(gifDiv);
        }
      }
      var number = 0;
      var tabIndexSet = 1;
      //builds the answer radio buttons
      var wrestlerArray = wweWrestlers[number];


      function radioBuilder() {
        //console.log(gameArray[0].question);
        //console.log(gameArray[0].answers);
        //builds the question and radios in this div
        var result = $("#buttonHouse");
        //sets tab index for radio buttons
        //builds the for loop inside html
        result.html('');
        //for loop
        for (var i = 0; i < questionListing.length; i++) {
          result.append('<button data-person="' + wrestlerArray [i] + '"tabindex="' + tabIndexSet++ + '" />');
          console.log("wrestler button builder is working");
          }
      }
      radioBuilder();
    });
});
