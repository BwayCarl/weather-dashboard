//Variables
const today = moment().format("dddd, MMMM Do, YYYY"); // Current day
const forecastDay1 = moment().add(1,'days').format("MMM Do"); // Forecast day 1
const forecastDay2 = moment().add(2,'days').format("MMM Do"); // Forecast day 2
const forecastDay3 = moment().add(3,'days').format("MMM Do"); // Forecast day 3
const forecastDay4 = moment().add(4,'days').format("MMM Do"); // Forecast day 4
const forecastDay5 = moment().add(5,'days').format("MMM Do"); // Forecast day 5

const cityName = document.getElementById("#city-input"); // City search
const search =  document.getElementById("#search-btn"); // Search button

const temperature = document.getElementById("#temp"); // Current Temperature
const humidity = document.getElementById("hum"); // Current Humidity
const windSpeed = document.getElementById("#wind"); // Current Wind Speed
const uvIndex = document.getElementById("#uv"); // Current UV index
//________________________________________________________________

// API Variables
const weatherApi = "http://api.openweathermap.org/data/2.5/weather?q=" // Current Weather URL (https://openweathermap.org/current#one)
const forecastApi = "http://api.openweathermap.org/data/2.5/forecast?q=" // 5-Day Forecast URL (https://openweathermap.org/forecast5#5days)
const units =  "&units=imperial"; // Temperature conversion to Farenheit (https://openweathermap.org/current#data)
const uvApi =  "https://api.openweathermap.org/data/2.5/uvi?lat="; // UV Index request (https://openweathermap.org/api/uvi#current)

const apiKey = "&APPID=5accc33209d1c0dd9925ae90d4b60f93"; // API Key
//__________________________________________________________________


$(document).ready(function() {
});

// Dates for Current Weather reading and 5 Day forecast.

$("#currentDay").append(today) // Adds current under the city name.
$("#day-1").append(forecastDay1) // ______________________________
$("#day-2").append(forecastDay2) // 
$("#day-3").append(forecastDay3) //  Dates for 5 day foreecast.
$("#day-4").append(forecastDay4) // 
$("#day-5").append(forecastDay5) //________________________________ 


// (https://openweathermap.org/current#current_JSON)

// Current weather request

$(search).on("click", function(event) {
    event.preventDefault();
    
    let city = $("#city-input").val();
    let weatherQueryURL = weatherAPI + cityName + apiKey;

    $.ajax({
        url: weatherQueryURL,
        method: "GET"
    }).then(function(response) {
      console.log(response)
        $("#city-input").text(JSON.stringify(response));
    });
console.log(city)
});

// 5-Day forecast request

$(search).on("click", function(event) {
  event.preventDefault();
  
  let city = $("#city-input").val();
  let forecastQueryURL = forecastAPI + cityName + apiKey;

  $.ajax({
      url: forecastQueryURL,
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
      localStorage.setItem(cityName, JSON.stringify(city));
    });


  
      $(city).val(localStorage.getItem("#city-button"));
    

    // Retrieve weather info from previously rendered buttons in the search history.
    $("#city-button").on("click", function(event) {
        event.preventDefault();
  
        
      });
