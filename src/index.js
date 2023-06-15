function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if(hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    let day = days[date.getDay()];
    return `${day}, ${hours}:${minutes}`
}
function displayWeatherForecast(){
    let forecastElement = document.querySelector("#forecast");

    let days = ["Thu", "Fri", "Sat", "Sun"];

    let forecastHTML = `<div class="row">`;
   days.forEach(function(day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2">
        <div class="weather-forecast-date">${day}</div>

        <img
          src="https://openweathermap.org/img/wn/10n@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">18°</span>
          <span class="weather-forecast-temperature-min">12° </span>
        </div>
      </div>
    `;
   } )
   
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
console.log(forecastHTML);
}
function displayTemperature(response) {
    let cityElement = document.querySelector("#city");
    let temperatureElement=document.querySelector("#temperature");
    let weatherElement=document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
   
    celsiusTemperature = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    weatherElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    cityElement.innerHTML = response.data.name;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description); 
}
let apiKey = "d4aba3dd194534017243141841b8b193";
let city = "Melitopol";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayTemperature);

function search(city){
 let apiKey = "d4aba3dd194534017243141841b8b193";
 
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
 
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);

}
function showFahrenheitTemperature(event){
    event.preventDefault;
    let temperatureElement = document.querySelector("#temperature");
    //remove the active class from the celsius-link
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function showCelsiusTemperature(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("Melitopol");
displayWeatherForecast();