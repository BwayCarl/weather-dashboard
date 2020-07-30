const today = moment().format("dddd, MMMM Do, YYYY"); // Current day

$(document).ready(function() {
});

$("#currentDay").append(today) // Adds curent day to the page.



$("#find-city").on("click", function(event) {
    event.preventDefault();

    let city = $("#city-input").val();
    let queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + city + "5accc33209d1c0dd9925ae90d4b60f93";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#city-view").text(JSON.stringify(response));
    });

});

//Render buttons for searched cities

let cities = ["New York City"];

function renderCityButtons() {
    $("#city-buttons-view").empty();

    // Looping through the array of cities
    for (var i = 0; i < cities.length; i++) {

        // Then dynamically generating buttons for each city in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var newCity = $("<button>");
        // Adding a class
        newCity.addClass("city");
        // Adding a data-attribute with a value of the city at index i
        newCity.attr("data-name", cities[i]);
        // Providing the button's text with a value of the city at index i
        newCity.text(cities[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(newCity);
      }
    }

    // This function handles events where one button is clicked
    $("#add-movie").on("click", function(event) {
      // event.preventDefault() prevents the form from trying to submit itself.
      // We're using a form so that the user can hit enter instead of clicking the button if they want
      event.preventDefault();

      // This line will grab the text from the input box
      var city = $("#city-input").val().trim();
      // The movie from the textbox is then added to our array
      cities.push(city);

      // calling renderButtons which handles the processing of our movie array
      renderButtons();
    });
