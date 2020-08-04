//Variables
const today = moment().format("dddd, MMMM Do, YYYY"); // Current day
const forecastDay1 = moment().add(1,'days').format("MMM Do"); // Forecast day 1
const forecastDay2 = moment().add(2,'days').format("MMM Do"); // Forecast day 2
const forecastDay3 = moment().add(3,'days').format("MMM Do"); // Forecast day 3
const forecastDay4 = moment().add(4,'days').format("MMM Do"); // Forecast day 4
const forecastDay5 = moment().add(5,'days').format("MMM Do"); // Forecast day 5

const search =  $("#search-btn"); // Search button
const newCityBtn = $("#city-button");
const cityName = document.getElementById("#city-input"); // City search
const temperature = document.getElementById("#temp"); // Current Temperature
const icon = document.getElementById("weather-icon"); // Current Weather Icon
const humidity = document.getElementById("hum"); // Current Humidity
const windSpeed = document.getElementById("#wind"); // Current Wind Speed
const uvIndex = document.getElementById("#uv"); // Current UV index

//________________________________________________________________

// API Variables

const apiKey = "&APPID=5accc33209d1c0dd9925ae90d4b60f93"; // API Key
const weatherApi = "http://api.openweathermap.org/data/2.5/weather?q=" // Current Weather URL (https://openweathermap.org/current#one)
const forecastApi = "http://api.openweathermap.org/data/2.5/forecast?q=" // 5-Day Forecast URL (https://openweathermap.org/forecast5#5days)
const uvApi =  "https://api.openweathermap.org/data/2.5/uvi?lat="; // UV Index URL (https://openweathermap.org/api/uvi#current)
const units =  "&units=imperial"; // Temperature conversion to Farenheit (https://openweathermap.org/current#data)
const iconApi = "http://openweathermap.org/img/wn/"; // Weather Image Icon URL (https://openweathermap.org/weather-conditions)
//__________________________________________________________________


$(document).ready(function() {
});

  // Retrieve weather info from previously rendered buttons in the search history.
  
if (localStorage.getItem("city") === null) {
  var cities = [];

} else {
  var cities = JSON.parse(localStorage.getItem("city"));
  renderCityButtons();
};

// Dates for Current Weather reading and 5 Day forecast.

$("#currentDay").append(today) // Adds current under the city name.
$("#day-1").append(forecastDay1) // -------------------------------
$("#day-2").append(forecastDay2) // 
$("#day-3").append(forecastDay3) //  Dates for 5 day foreecast.
$("#day-4").append(forecastDay4) // 
$("#day-5").append(forecastDay5) // --------------------------------


// Current weather request ____________________________

$(search).on("click", function(event) {
    event.preventDefault();

    let city = $("#city-input").val();
    let weatherQueryURL = weatherApi + city + units + apiKey;

  
    $.ajax({
        url: weatherQueryURL,
        method: "GET"
    }).then(function(response) {

      let roundTemp = Math.floor(response.main.temp); // Rounds down temperature to eliminate decimals.

      $("#city").html(response.name);
      $("#weather-icon").attr("src", iconApi + (response.weather[0].icon) + ".png");
      $("#temp").html(roundTemp + "º F");
      $("#hum").html(response.main.humidity + " %");
      $("#wind").html(response.wind.speed + " MPH");


      // Current UV Index request ____________________________

      let lat = response.coord.lat;
      let lon = response.coord.lon;
      let uvQueryURL = uvApi + lat + "&lon=" + lon + apiKey;

      $.ajax({
          url: uvQueryURL,
          method: "GET"
      }).then(function(response) {
      
      $("#uv").html(response.value);
      
         // UV Index Color Coding (https://en.wikipedia.org/wiki/Ultraviolet_index#Index_usage)
      
         let uvIndex = (response.value);

     
        if (uvIndex < 3) {
          $(".uv").addClass("uv-low");
          $(".uv").removeClass("uv-moderate");
          $(".uv").removeClass("uv-high");
          $(".uv").removeClass("uv-veryHigh");
          $(".uv").removeClass("uv-extreme");
        }
        else if (uvIndex < 6) {
          $(".uv").removeClass("uv-low");
          $(".uv").addClass("uv-moderate");
          $(".uv").removeClass("uv-high");
          $(".uv").removeClass("uv-veryHigh");
          $(".uv").removeClass("uv-extreme");

        } else if (uvIndex < 8) {
          $(".uv").removeClass("uv-low");
          $(".uv").removeClass("uv-moderate");
          $(".uv").addClass("uv-high");
          $(".uv").removeClass("uv-veryHigh");
          $(".uv").removeClass("uv-extreme");

        } else if (uvIndex < 11) {
          $(".uv").removeClass("uv-low");
          $(".uv").removeClass("uv-moderate");
          $(".uv").removeClass("uv-high");
          $(".uv").addClass("uv-veryHigh");
          $(".uv").removeClass("uv-extreme");

        } else {
          $(".uv").removeClass("uv-low");
          $(".uv").removeClass("uv-moderate");
          $(".uv").removeClass("uv-high");
          $(".uv").removeClass("uv-veryHigh");
          $(".uv").addClass("uv-extreme");
        
        };
      })
    });
  });


// 5-Day forecast request

$(search).on("click", function(event) {
  event.preventDefault();
  
  let city = $("#city-input").val();
  let forecastQueryURL = forecastApi + city + units + apiKey;

  $.ajax({
      url: forecastQueryURL,
      method: "GET"
  }).then(function(response) {
    
    // Math floor function to eliminate decimals in 5 Day forecast temperatures.
   let roundTemp1 = Math.floor(response.list[6].main.temp);
   let roundTemp2 = Math.floor(response.list[14].main.temp);
   let roundTemp3 = Math.floor(response.list[22].main.temp);
   let roundTemp4 = Math.floor(response.list[30].main.temp);
   let roundTemp5 = Math.floor(response.list[38].main.temp);

   // Day-1  
    $("#weather-icon-1").attr("src", iconApi + (response.list[6].weather[0].icon) + ".png");
    $("#temp-1").html(roundTemp1 + "º F");
    $("#hum-1").html(response.list[6].main.humidity + " %");

    // Day-2 
    $("#weather-icon-2").attr("src", iconApi + (response.list[14].weather[0].icon) + ".png");
    $("#temp-2").html(roundTemp2 + "º F");
    $("#hum-2").html(response.list[14].main.humidity + " %");

    // Day-3 
    $("#weather-icon-3").attr("src", iconApi + (response.list[22].weather[0].icon) + ".png");
    $("#temp-3").html(roundTemp3 + "º F");
    $("#hum-3").html(response.list[22].main.humidity + " %");

    // Day-4 
    $("#weather-icon-4").attr("src", iconApi + (response.list[30].weather[0].icon) + ".png");
    $("#temp-4").html(roundTemp4 + "º F");
    $("#hum-4").html(response.list[30].main.humidity + " %");

    // Day-5 
    $("#weather-icon-5").attr("src", iconApi + (response.list[38].weather[0].icon) + ".png");
    $("#temp-5").html(roundTemp5 + "º F");
    $("#hum-5").html(response.list[38].main.humidity + " %");

  });

});

//Create buttons for searched cities

function renderCityButtons() {
    $("#city-button").empty();

    // Looping through the array of cities
    for (var i = 0; i < cities.length; i++) {

      // Generate buttons for each city in the array.
        var newCity = $("<li>");
        newCity.addClass("list-group-item");
        newCity.attr("data-name", cities[i]);
        newCity.text(cities[i]);
        newCity.val("search-history");
        
        $("#city-button").prepend(newCity); //Most recent search lands on top of list.
      }
    }
    let city =[""]

    // Search button on click for new city search.

    $("#search-btn").on("click", function(event) {
      event.preventDefault();

      var city = $("#city-input").val().trim();
      cities.push(city);

      renderCityButtons();
      localStorage.setItem("city", JSON.stringify(cities));
      console.log(cities)
    });


     $(document).on("click", ".data-name", function (event) {
     event.preventDefault();
      console.log("run");
     
     });
     
     