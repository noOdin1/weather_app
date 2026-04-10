/* index.js Weather App */
import "./reset_styling.css";
import "./style.css";
import { getWeatherApiKey } from "./env.js";
import {
  createP,
  createA,
  createDiv,
  createButton,
  createImg,
  createForm,
  createFieldset,
  createLegend,
  createLabel,
  createInput,
  createSelect,
  createOption,
  htmlOps,
} from "./element_creator.js";
import createElement from "./element_creator.js";

(() => {
  console.log("Weather App");
  const apiKey = getWeatherApiKey();

  // convert Celcius to Fahrenheit
  const cTof = (cel) => {
    return c * (9 / 5) + 32;
  };

  // convert Fahrenheit to Celcius
  const fToc = (fah) => {
    return (f - 32) * (5 / 9);
  };

  // convert mph to kmh
  const mphTokmh = (mph) => {
    return mph * 1.609344;
  };

  // convert mph to kmh
  const kmhTomph = (kmh) => {
    return kmh * 0.6213711922;
  };

  let searchInput = document.getElementById("searchCityBar");
  let searchBtn = document.getElementById("searchBtn");

  const vcQuery = (cName) => {
  };

  const textInputEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("[#-57] Search term: ", event.target.value);
      vcQuery(searchInput.value);
    }
  };

  const buttonClick = (event) => {
    console.log(
      "[#-62] Search button pressed, search term: ",
      searchInput.value,
    );
    vcQuery(searchInput.value);
  };

  // NOTE: Using callback function for Event Listeners
  searchInput.addEventListener("keydown", textInputEnter);
  searchBtn.addEventListener("click", buttonClick);

})();
