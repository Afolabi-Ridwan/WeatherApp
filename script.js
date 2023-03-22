const form = document.getElementById("form");
const input = document.getElementById("input");
const humidity = document.getElementById("humidity");
const feelsLike = document.getElementById("feels-like");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const visibility = document.getElementById("visibility");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");
const humidityP = humidity.querySelector("p"),
  feelsLikeP = feelsLike.querySelector("p"),
  sunriseP = sunrise.querySelector("p"),
  sunsetP = sunset.querySelector("p"),
  visibilityP = visibility.querySelector("p"),
  windSpeedP = windSpeed.querySelector("p"),
  pressureP = pressure.querySelector("p");
const clouds = document.querySelector("#cloud");
const temperature = document.querySelector("#temps");
const search = document.getElementById("search");
const state = document.getElementById("state");
const date = document.getElementById("date");
const icon = document.querySelector(".icon");
const spinner = document.querySelector("#spinner");
const spinner1 = document.querySelector(".spinner");
const container = document.querySelector(".container");
const body = document.querySelector("body");
const error = document.querySelector(".error");
const stateAndDate = document.querySelector(".stateNDate");

const background = () => {
  body.style.background = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
url(https://cdn.wallpapersafari.com/75/3/SOavUR.jpg)`;
};

container.style.display = "none";
// body.style.background = "none";
// body.style.background = "blue";

document.addEventListener("DOMContentLoaded", function () {
  loadDefault();
});

const loadDefault = () => {
  let inputValue = (input.value = "Ibadan");
  loadSearch(inputValue);
};

search.addEventListener("click", function (e) {
  e.preventDefault();
  // container.style.display = "none";
  // spinner.style.visibility = "visible";
  container.style.display = "none";
  spinner1.style.display = "block";
  loadSearch();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // container.style.display = "none";

  // spinner.style.visibility = "visible";
  container.style.display = "none";
  spinner1.style.display = "block";

  loadSearch();
});

async function loadSearch() {
  console.log(input.value);
  try {
    let url = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=
    ` +
        input.value +
        `&appid=a85164eefe20b1cd37b43129c33a2b51`
    );
    const res = await url;
    const data = await res.json();
    spinner1.style.display = "none";
    container.style.display = "block";
    return displayResult(data);
  } catch (err) {
    console.log("An error occured");
    // showError();
    //spinnerContainer.style.display = 'none'
    //appWrap.style.display = 'none';
  }
}

error.style.textTransform = "uppercase";

function displayResult(data) {
  if (input.value === "") {
    error.style.display = "block";
    stateAndDate.style.marginTop = "35px";
    data = "ibadan";
  } else {
    error.style.display = "none";
    stateAndDate.style.marginTop = "-10px";

    state.innerHTML = `
        <p>${data.name}, ${data.sys.country}</p>
    
    `;
    humidityP.innerHTML = `
      <p>${data.main.humidity}%</p>
      `;

    feelsLikeP.innerHTML = `
    <p>${Math.floor(data.main.feels_like - 273.15)}°C</p>
    
    `;

    visibilityP.innerHTML = `
    <p>${data.visibility}km</p>
    
    `;

    pressureP.innerHTML = `
    <p>${data.main.pressure}hPa</p>
    
    `;

    windSpeedP.innerHTML = `
    <p>${data.wind.speed}m/s</p>
    
    `;

    temperature.innerHTML = `
    <p>${Math.floor(data.main.temp - 273.15)}°C</p>
    
    `;

    clouds.innerHTML = `
    <p>${data.weather[0].description}</p>
    
    `;

    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );

    sunData(data);

    //initiate new date
    let now = new Date();
    console.log(now);

    date.textContent = `
      ${dateBuilder(now)}
      `;

    input.value = "";
  }
}

// container.style.display = "block";
// spinner.style.visibility = "hidden";

// } else {
//   console.log("please a city name");
// }

//Sunrise and Sunset data
const sunData = (data) => {
  let sunRise = data.sys.sunrise;
  let sunSet = data.sys.sunset;
  let sunriseDate = new Date(sunRise * 1000);
  let sunsetDate = new Date(sunSet * 1000);
  let formattedSunrise =
    ("0" + sunriseDate.getHours()).slice(-2) +
    ":" +
    ("0" + sunriseDate.getMinutes()).slice(-2);
  let formattedSunset =
    ("0" + sunsetDate.getHours()).slice(-2) +
    ":" +
    ("0" + sunsetDate.getMinutes()).slice(-2);
  sunriseP.textContent = `${formattedSunrise}`;
  sunsetP.textContent = `${formattedSunset}`;
};

const dateBuilder = (d) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[d.getDay()];
  console.log(d.getDay());
  const date = d.getDate();
  console.log(date);
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day},   ${month}  ${date},  ${year}.`;
};

// console.log(dateBuilder(now));
