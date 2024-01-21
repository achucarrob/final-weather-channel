function getCurrentWeather(response) {
  const tempElement = document.querySelector("#current-temperature");
  const tempResponse = response.data.temperature.current;
  const cityNameElement = document.querySelector("#current-city");
  const dateElement = document.querySelector("#current-date");
  const conditionElement = document.querySelector("#current-condition");
  const humidityElement = document.querySelector("#current-humidity");
  const windElement = document.querySelector("#current-wind");
  const date = new Date(response.data.time * 1000);

  tempElement.innerHTML = Math.round(tempResponse);
  cityNameElement.innerHTML = response.data.city;
  dateElement.innerHTML = formatDate(date);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  getForecast(response.data.city);
}

function formatDate(date) {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  /* Api call: recibe el nombre de una ciudad construye la url con el nombre y mi apikey y llama a la sig funcion */

  const apiKey = "381070c4bbet21eec6f3do8eb01a4a37";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getCurrentWeather);
}

function searchEngine(event) {
  /* searchEngine: recibe el nombre de una ciudad al clickar el boton "search" y cambia el contenido de la etiqueta h1 con el valor introducido */

  event.preventDefault(); // Prevenir la accion por defecto que es recargar la pagina.

  const searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function getForecast(city){
  let apikey = "381070c4bbet21eec6f3do8eb01a4a37";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`
  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000)
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return days[date.getDay()];
}

function displayForecast(response){
  let forecastHtml = ""; // variable vacia para crear permanencia in each loop
  let apiForecast = response.data.daily;
  
  apiForecast.forEach(
    function(day , index){ // index es una variable que aumenta su valor in each loop
      let maxTemperature = Math.round(day.temperature.maximum);
      let minTemperature = Math.round(day.temperature.minimum);
      if (index < 5){
        forecastHtml += 
        `<div>
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${maxTemperature}</strong>
          </div>
          <div class="weather-forecast-temperature">${minTemperature}</div>
        </div>
        </div>
        `
      };
    }
  );
  
  let forecastElement = document.querySelector("#forecast")
  forecastElement.innerHTML = forecastHtml;
};

const searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchEngine);

searchCity("Asunción");
