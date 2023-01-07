let weatherDescription = [
  "Thunderstorm",
  "Drizzle",
  "Rain",
  "Snow",
  "Mist",
  "Smoke",
  "Haze",
  "Dust",
  "Ash",
  "Squall",
  "Tornado",
  "Clear",
  "Clouds",
];

let weatherDescriptionArray = [
  "thunderstorming",
  "drizzling",
  "raining",
  "snowing",
  "misty",
  "smoky",
  "hazy",
  "dusty",
  "ashy",
  "squalling",
  "tornadoes",
  "clear",
  "cloudy",
];

let imgSrc = [
  "/src/images/weather-app/weather-hero-img/thunderstorm.png",
  "/src/images/weather-app/weather-hero-img/drizzle.png",
  "/src/images/weather-app/weather-hero-img/rain.png",
  "/src/images/weather-app/weather-hero-img/snow.png",
  "/src/images/weather-app/weather-hero-img/mist.png",
  "/src/images/weather-app/weather-hero-img/smoke.png",
  "/src/images/weather-app/weather-hero-img/haze.png",
  "/src/images/weather-app/weather-hero-img/dust.png",
  "/src/images/weather-app/weather-hero-img/ash.png",
  "/src/images/weather-app/weather-hero-img/squall.png",
  "/src/images/weather-app/weather-hero-img/tornado.png",
  "/src/images/weather-app/weather-hero-img/clear.png",
  "/src/images/weather-app/weather-hero-img/clouds.png",
];

//formatting day

function formatDay(dt) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = new Date(dt * 1000);
  let day = days[date.getDay()];

  return day;
}

//current temperature, description, city & weather icon
function temp(response) {
  function arrayMatch(value) {
    return value === weatherDesc;
  }

  celsiusTempLocal = Math.round(response.data.main.temp);

  let geoTemp = document.querySelector("#temp-live");
  geoTemp.innerHTML = `${celsiusTempLocal}°C in `;
  let desc = document.querySelector("#skating-text");
  let weatherDesc = response.data.weather[0].main;
  let index = weatherDescription.findIndex(arrayMatch);

  let icon = document.querySelector("#weather-icon");
  let weatherIcon = response.data.weather[0].icon;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );

  let weatherImg = document.querySelector("#weather-hero-img");
  weatherImg.setAttribute("src", `${imgSrc[index]}`);

  let city = response.data.name;
  let country = response.data.sys.country;
  let geoCity = document.querySelector("#hero-city");
  geoCity.innerHTML = `${city}, ${country}`;

  desc.innerHTML = `It is currently ${weatherDescriptionArray[index]} in ${city}, ${country}.`;
  getForecast(response.data.coord);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "7d048e6e84d3235680d2c650732b34fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(temp);
}
navigator.geolocation.getCurrentPosition(showPosition);

//5 day weather forecast
function weatherForecast(response) {
  let forecastData = response.data.daily;
  let forecast = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-md-12 border border-2 rounded-3 p-1">
    <div class="day-wrapper">
      <ul>
        <li class="weather-icon-sm forecast-icon"><img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="daily-weather-icon" height=46px/></li>
        <div class="data-align">
          <li><span class="forecast-day">${formatDay(
            forecastDay.dt
          )}</span></li>
          <li><strong id="forecast-temp">${Math.round(
            forecastDay.temp.day
          )}°C</strong></li>
        </div>
      </ul>
    </div>
  </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "7d048e6e84d3235680d2c650732b34fb";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherForecast);
}

//get temperature from City search
function showTemp(response) {
  function arrayMatch(value) {
    return value === weatherDesc;
  }

  temperature = Math.round(response.data.main.temp);

  let city = response.data.name;
  let country = response.data.sys.country;

  let desc = document.querySelector("#skating-text");
  let weatherDesc = response.data.weather[0].main;
  let index = weatherDescription.findIndex(arrayMatch);

  let icon = document.querySelector("#weather-icon");
  let weatherIcon = response.data.weather[0].icon;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );

  let weatherImg = document.querySelector("#weather-hero-img");
  weatherImg.setAttribute("src", `${imgSrc[index]}`);

  document.querySelector("#temp-live").innerHTML = `${temperature}°C in `;
  desc.innerHTML = `It is currently ${weatherDescriptionArray[index]} in ${city}, ${country}.`;

  getForecast(response.data.coord);
}

//search engine function
function submitSearch(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let city = input.value;

  let citySearch = document.querySelector("#hero-city");
  citySearch.innerHTML = `${city}`;

  let apiKey = "7d048e6e84d3235680d2c650732b34fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let celsiusTemp = null;

let search = document.querySelector("#search-form");
search.addEventListener("submit", submitSearch);
