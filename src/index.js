function displayTemperature(response) {
    console.log(response.data);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML=response.data.name;
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML= Math.round(response.data.main.temp);
    let weatherElement=document.querySelector("#description");
    weatherElement.innerHTML=response.data.weather[0].description;
}

let apiKey="d4aba3dd194534017243141841b8b193";
let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=Melitopol&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);