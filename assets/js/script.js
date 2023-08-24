const dates = document.querySelectorAll(".date");
const temp = document.querySelectorAll(".temperature");
const forecast = document.querySelectorAll(".forecast");
const wind = document.querySelectorAll(".wind");

const search = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");

const API_KEY = "4b679ee52aa50222096240f7c9bdccdd";

let city = "mumbai";

window.addEventListener("load", () => fetchApi());

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const searchVal = search.value.trim();
  city = searchVal.toLowerCase();

  try {
    fetchApi();
  } catch (error) {
    console.error(error);
  }
})

const fetchApi = async () => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?&q=${city}&appid=${API_KEY}`;

  const response = await fetch(url);
  const { list } = await response.json();

  let currDay = 0, apiDay = 0;
  while(currDay < 5){
    dates[currDay].innerHTML = list[apiDay].dt_txt.substring(0, 11);
    temp[currDay].innerHTML = Number(Number(list[apiDay].main.temp_max).toFixed(2) - 273.15).toFixed(2);
    forecast[currDay].innerHTML = list[apiDay].weather[0].description;
    wind[currDay].innerHTML = `${list[apiDay].wind.speed} m/s`;

    currDay++;
    apiDay = apiDay + 8;
  }
}
