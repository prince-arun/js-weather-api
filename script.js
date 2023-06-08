let apiKey = `3265874a2c77ae4a04bb96236a642d2f`;
let searchForm = document.querySelector("#searchForm");
let citySearch = document.querySelector("#citySearch");
let weatherContainer = document.querySelector("#weatherContainer");

let getWeatherData = function (city) {
  weatherContainer.innerHTML = "<h2>Loading...</h2>";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayWeatherData(data);
    })
    .catch(function (error) {
      console.log(error);
      weatherContainer.innerHTML = "<h2>City Not Found</h2>";
    });
};

let displayWeatherData = function (data) {
  let weatherHtml = "";
  if (data.cod === "404") {
    weatherHtml += "<h2>City Not Found</h2>";
  } else {
    let iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    let temperature = data.main.temp;
    let weatherDescription = data.weather[0].main;
    weatherHtml += `
      <div>
        <img src="${iconUrl}" alt="">
      </div>
      <div>
        <h2>${temperature} ℃</h2>
        <h4>${weatherDescription}</h4>
      </div>
    `;
  }
  weatherContainer.innerHTML = weatherHtml;
};

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let city = citySearch.value;
  getWeatherData(city);
});
