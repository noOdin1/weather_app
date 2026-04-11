/* index.js Weather App */
import "./reset_styling.css";
import "./style.css";
import { getWeatherApiKey } from "./env.js";
import createElement from "./element_creator.js";
/**
 * NOTE:
 *  Need to import the image as a resource first. Or else
 *  after transpiling, the image location will not be
 *  recognized, and thus fails to load.
 */
import cloudy from "./cloudy01.gif";
import clear from "./clear01.gif";
import partly_cloudy from "./partly_cloudy01.gif";
import raining from "./raining01.gif";
import snow from "./snow01.gif";
import storm from "./storm01.gif";
import sunny from "./sunny01.gif";

(() => {
  console.log("Weather App");
  const apiKey = getWeatherApiKey();

  // convert Celcius to Fahrenheit
  const cTof = (cel) => {
    return cel * (9 / 5) + 32;
  };

  // convert Fahrenheit to Celcius
  const fToc = (fah) => {
    return (fah - 32) * (5 / 9);
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
    console.log("cName: ", cName);
    let query =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      cName +
      "?unitGroup=us" +
      "&include=current" +
      "&key=" +
      apiKey +
      "&contentType=json";

    // URL (required), options (optional)
    return fetch(query) // execute 'fetch' with 'query'
      .then(function (response) {
        // when the API query is successful
        // Successful response
        if (response.ok) {
          console.log("Successfully executed Visual Crossing query");
          // It is known that the response will be a json
          return response.json();
        } else {
          throw new Error("Network response from Visual crossing was not ok");
        }
      })
      .then(function (json) {
        // print out the result "json", convert it to string before console.log
        // console.log(JSON.stringify(json));
        // console.log(json);
        /**
         * NOTE:
         *  Items to group:
         *    Temperature group : Average Temp, Feels like, Dew Point
         *    Humidity          : Relative Humidity, Cloud Cover, Visibility
         *    Precipitation     : Precipitation, Precipitation chance, Percipitation type, Snowfall, Snow Depth
         *    Wind Pressure     : Wind Speed, Wind Gust, Wind Direction, Sea Level Pressure
         *    Conditions        : Conditions, Weather Icons
         *
         *  Translation
         *    VC site data           from query
         *    Average Temp         : temp        (degrees Farenheit)
         *    Feels like           : feelslike   (degrees Farenheit)
         *    Dew Point            : dew         (degrees Farenheit)
         *
         *    Relative Humidity    : humidity    (%)
         *    Cloud Cover          : cloudcover  (%)
         *    Visibility           : visibility  (miles)
         *
         *    Precipitation        : precip      (inches)
         *    Precipitation chance : precipprob  (%)
         *    Precipitation type   : preciptype  (inches)
         *    Snowfall             : snow        (inches)
         *    Snow Depth           : snowdepth   (inches)
         *
         *    Wind Speed           : windspeed   (miles per hour)
         *    Wind Gust            : windgust    (miles per hour)
         *    Wind Direction       : winddir     (degrees)
         *    Sea Level Pressure   : pressure    (milibar)
         *
         *    Conditions           : conditions
         *    Weather icon         : icon
         *
         *  Query is sent using US measurement units.
         */

        createInfoCards(json);
      })
      .catch(function (err) {
        // Error
        console.log("Query failed: ", err);
      });
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
