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
    console.log(response.data);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML=response.data.name;
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML= Math.round(response.data.main.temp);
    let weatherElement=document.querySelector("#description");
    weatherElement.innerHTML=response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML= Math.round(response.data.wind.speed);
   let dateElement = document.querySelector("#date");
   dateElement.innerHTML = formatDate(response.data.dt * 1000); 
}

let apiKey="d4aba3dd194534017243141841b8b193";
let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=Melitopol&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);