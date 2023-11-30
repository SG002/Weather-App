const api = {
  key: "2fa73590fd8b5a4c6e68098ad5625395",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

// Added a click event listener for the search box
searchbox.addEventListener("click", () => {
  if (searchbox.value) {
    getResults(searchbox.value);
  } else {
    alert("Please enter a location!");
  }
});

function setQuery(evt) {
  if (evt.keyCode == 13) {
    if (searchbox.value) {
      getResults(searchbox.value);
    } else {
      alert("Please enter a location!");
    }
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults)
    .catch(() => {
      alert("Location not found. Please try again!");
    });
}

function displayResults(weather) {
  console.log(weather);
  const city = document.querySelector(".location .city");
  const date = document.querySelector(".location .date");
  const temp = document.querySelector(".current .temp");
  const weather_el = document.querySelector(".current .weather");
  const hilow = document.querySelector(".hi-low");

  // Apply fade-out animation by toggling classes
  city.classList.remove("fade-in");
  date.classList.remove("fade-in");
  temp.classList.remove("fade-in");
  weather_el.classList.remove("fade-in");
  hilow.classList.remove("fade-in");

  // Adding a slight delay before applying the new data
  setTimeout(() => {
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    date.innerText = dateBuilder(new Date());
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    weather_el.innerText = weather.weather[0].main;
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
      weather.main.temp_max
    )}°C`;

    // Apply fade-in animation by toggling classes after a short delay
    city.classList.add("fade-in");
    date.classList.add("fade-in");
    temp.classList.add("fade-in");
    weather_el.classList.add("fade-in");
    hilow.classList.add("fade-in");
  }, 200);
}


function dateBuilder(d) {
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
    "December"
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}
