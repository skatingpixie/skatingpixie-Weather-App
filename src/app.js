//current temperature and city
function temp(response) {
  let temperature = Math.round(response.data.main.temp);
  let geoTemp = document.querySelector("#temp-live");

  let desc = document.querySelector("#skating-text");
  let weatherDesc = response.data.weather[0].main;
  desc.innerHTML = `Weather is currently: ${weatherDesc}`;

  let icon = document.querySelector("#weather-icon");
  let weatherIcon = response.data.weather[0].icon;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  geoTemp.innerHTML = `${temperature}°C in `;
  let city = response.data.name;
  let country = response.data.sys.country;
  let geoCity = document.querySelector("#hero-city");
  geoCity.innerHTML = `${city}, ${country}`;
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7d048e6e84d3235680d2c650732b34fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(temp);
}
navigator.geolocation.getCurrentPosition(showPosition);

//get temperature from City search
function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);

  let desc = document.querySelector("#skating-text");
  let weatherDesc = response.data.weather[0].main;
  desc.innerHTML = `Weather is currently: ${weatherDesc}`;

  let icon = document.querySelector("#weather-icon");
  let weatherIcon = response.data.weather[0].icon;

  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  document.querySelector("#temp-live").innerHTML = `${temperature}°C in `;
}

//search engine function
function submitSearch(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let city = input.value;
  let citySearch = document.querySelector("#hero-city");
  citySearch.innerHTML = `${city}`;
  apiKey = "7d048e6e84d3235680d2c650732b34fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", submitSearch);
