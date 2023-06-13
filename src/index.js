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

function displayTemperature(response) {
    let cityElement = document.querySelector("#city");
    let temperatureElement=document.querySelector("#temperature");
    let weatherElement=document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
   
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
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
search("Melitopol")

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);