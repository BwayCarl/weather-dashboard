//Variables
const today = moment().format("dddd, MMMM Do, YYYY"); // Current day

const cityName = document.getElementById("#city-input"); // City search
const search =  document.getElementById("#search-btn"); // Search button

const temperature = document.getElementById("#temp"); // Current Temperature
const humidity = document.getElementById("hum"); // Current Humidity
const windSpeed = document.getElementById("#wind"); // Current Wind Speed
const uvIndex = document.getElementById("#uv"); // Current UV index

const apiKey = "&APPID=5accc33209d1c0dd9925ae90d4b60f93"; // API Key



let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);


$(document).ready(function() {
});

$("#currentDay").append(today) // Adds curent day to the page.




$(search).on("click", function(event) {
    event.preventDefault();

    let city = $("#city-input").val();
    let queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#city-input").text(JSON.stringify(response));
    });
console.log(city)
});

//Create buttons for searched cities

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
        
        $("#city-button").prepend(newCity); //Most recent search lands on top of list.
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
  