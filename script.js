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

let cities = [];

function renderCityButtons() {
    $("#city-button").empty();

    // Looping through the array of cities
    for (var i = 0; i < cities.length; i++) {

        // Generate buttons for each city in the array.
        var newCity = $("<li>");
        newCity.addClass("city");
        newCity.attr("data-name", cities[i]);
        newCity.text(cities[i]);
        
        $("#city-button").prepend(newCity);
      }
    }

    // Search button on click for new city search.
    $("#search-btn").on("click", function(event) {
      event.preventDefault();

      var city = $("#city-input").val().trim();
      cities.push(city);

      renderCityButtons();
    });

    // Retrieve weather info from previously rendered buttons in the search history.
    $("#city-button").on("click", function(event) {
        event.preventDefault();
  
        
      });
  