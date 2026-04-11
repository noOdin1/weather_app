/* index.js Weather App */
import "./reset_styling.css";
import "./style.css";
import { getWeatherApiKey } from "./env.js";
import createElement from "./element_creator.js";
import {
  removeAllChildElemById,
  removeAllchildElemByClass,
} from "./removeAllChildElem.js";
/**
 * NOTE:
 *  Need to import the image as a resource first. Or else
 *  after transpiling, the image location will not be
 *  recognized, and thus fails to load.
 */
import cloudy from "./cloudy02.gif";
import clear from "./clear01.gif";
import partly_cloudy from "./partly_cloudy01.gif";
import raining from "./raining01.gif";
import snow from "./snow01.gif";
import storm from "./storm01.gif";
import sunny from "./sunny01.gif";
import loadingImage from "./loading01.gif";

(() => {
  let day_to_image = {
    sunny: sunny,
    storm: storm,
    snow: snow,
    raining: raining,
    partly_cloudy: partly_cloudy,
    clear: clear,
    cloudy: cloudy,
  };

  console.log("Weather App");
  const apiKey = getWeatherApiKey();

  // convert Celcius to Fahrenheit
  const cTof = (cel, fixDecimalPnt = 2) => {
    return (cel * (9 / 5) + 32).toFixed(fixDecimalPnt);
  };

  // convert Fahrenheit to Celcius
  const fToc = (fah, fixDecimalPnt = 2) => {
    return ((fah - 32) * (5 / 9)).toFixed(fixDecimalPnt);
  };

  // convert mph to kmh
  const mphTokmh = (mph, fixDecimalPnt = 2) => {
    return (mph * 1.609344).toFixed(fixDecimalPnt);
  };

  // convert mph to kmh
  const kmhTomph = (kmh, fixDecimalPnt = 2) => {
    return (kmh * 0.6213711922).toFixed(fixDecimalPnt);
  };

  // convert miles to kilometer
  const mToK = (mi, fixDecimalPnt = 2) => {
    return (mi * 1.60934).toFixed(fixDecimalPnt);
  };

  // convert kilometer to miles
  const kToM = (ki, fixDecimalPnt = 2) => {
    return (ki * 0.621371).toFixed(fixDecimalPnt);
  };

  let searchInput = document.getElementById("searchCityBar");
  let searchBtn = document.getElementById("searchBtn");

  const createHumidityCloudsGrp = (info) => {
    let humidityCloudsGrpCard = createElement(
      "div",
      ["info", "group", "flip-card"],
      "humidityCloudsGrpCard",
    );
    let humidityCloudsGrpInnerCard = createElement(
      "div",
      ["info", "group", "flip-card-inner"],
      "humidityCloudsGrpInnerCard",
    );
    let humidityCloudsGrpFrontCard = createElement(
      "div",
      ["info", "group", "flip-card-front"],
      "humidityCloudsGrpFrontCard",
    );
    let humidityCloudsGrpBackCard = createElement(
      "div",
      ["info", "group", "flip-card-back"],
      "humidityCloudsGrpBackCard",
    );

    // US measurement
    let humidityInfoUS = createElement(
      "p",
      ["humidity", "percentage", "us"],
      "humidityPercentageInfoUS",
      "Humidity: " + info.currentConditions.humidity + "%",
    );
    let cloudCoverInfoUS = createElement(
      "p",
      ["cloudCover", "percentage", "us"],
      "cloudCoverPercentageInfoUS",
      "Cloud Cover: " + info.currentConditions.cloudcover + "%",
    );
    let visibilityInfoUS = createElement(
      "p",
      ["visibility", "distance", "us"],
      "visibilityInfoUS",
      "Visibility: " + info.currentConditions.dew + "mi",
    );

    // Metric
    let humidityInfoMetric = createElement(
      "p",
      ["humidity", "percentage", "metric"],
      "humidityPercentageInfoMetric",
      "Humidity: " + info.currentConditions.humidity + "%",
    );
    let cloudCoverInfoMetric = createElement(
      "p",
      ["cloudCover", "percentage", "metric"],
      "cloudCoverPercentageInfoMetric",
      "Cloud Cover: " + info.currentConditions.cloudcover + "%",
    );
    let visibilityInfoMetric = createElement(
      "p",
      ["visibility", "distance", "metric"],
      "visibilityInfoMetric",
      "Visibility: " + mToK(info.currentConditions.dew) + "km",
    );
    humidityCloudsGrpFrontCard.appendChild(humidityInfoUS);
    humidityCloudsGrpFrontCard.appendChild(cloudCoverInfoUS);
    humidityCloudsGrpFrontCard.appendChild(visibilityInfoUS);

    humidityCloudsGrpBackCard.appendChild(humidityInfoMetric);
    humidityCloudsGrpBackCard.appendChild(cloudCoverInfoMetric);
    humidityCloudsGrpBackCard.appendChild(visibilityInfoMetric);

    humidityCloudsGrpInnerCard.appendChild(humidityCloudsGrpFrontCard);
    humidityCloudsGrpInnerCard.appendChild(humidityCloudsGrpBackCard);
    humidityCloudsGrpCard.appendChild(humidityCloudsGrpInnerCard);

    return humidityCloudsGrpCard;
  };

  const createTempGroup = (info) => {
    let tempGrpCard = createElement(
      "div",
      ["info", "group", "flip-card"],
      "tempGrpCard",
    );
    let tempGrpInnerCard = createElement(
      "div",
      ["info", "group", "flip-card-inner"],
      "tempGrpInnerCard",
    );
    let tempGrpFrontCard = createElement(
      "div",
      ["info", "group", "flip-card-front"],
      "tempGrpFrontCard",
    );
    let tempGrpBackCard = createElement(
      "div",
      ["info", "group", "flip-card-back"],
      "tempGrpBackCard",
    );

    // US measurement
    let tempInfoFahrenheit = createElement(
      "p",
      ["fahrenheit", "temperature", "actual"],
      "tempInFahrenheit",
      "Temperature: " + info.currentConditions.temp + "°F",
    );
    let tempFeelsLikeFahrenheit = createElement(
      "p",
      ["fahrenheit", "temperature", "feelsLike"],
      "tempFeelsLikeFahrenheit",
      "Feels like: " + info.currentConditions.feelslike + "°F",
    );
    let tempDewPointFahrenheit = createElement(
      "p",
      ["fahrenheit", "temperature", "dewPoint"],
      "tempDewPointFahrenheit",
      "Dew Point: " + info.currentConditions.dew + "°F",
    );

    // Metric
    let tempInfoCelsius = createElement(
      "p",
      ["celsius", "temperature", "actual"],
      "tempInCelcius",
      "Temperature: " + fToc(info.currentConditions.temp) + "°C",
    );
    let tempFeelsLikeCelsius = createElement(
      "p",
      ["celsius", "temperature", "feelsLike"],
      "tempFeelsLikeFahrenheit",
      "Feels like: " + fToc(info.currentConditions.feelslike) + "°C",
    );
    let tempDewPointCelsius = createElement(
      "p",
      ["celsius", "temperature", "dewPoint"],
      "tempDewPointFahrenheit",
      "Dew Point: " + fToc(info.currentConditions.dew) + "°C",
    );

    tempGrpFrontCard.appendChild(tempInfoFahrenheit);
    tempGrpFrontCard.appendChild(tempFeelsLikeFahrenheit);
    tempGrpFrontCard.appendChild(tempDewPointFahrenheit);

    tempGrpBackCard.appendChild(tempInfoCelsius);
    tempGrpBackCard.appendChild(tempFeelsLikeCelsius);
    tempGrpBackCard.appendChild(tempDewPointCelsius);

    tempGrpInnerCard.appendChild(tempGrpFrontCard);
    tempGrpInnerCard.appendChild(tempGrpBackCard);

    tempGrpCard.appendChild(tempGrpInnerCard);

    return tempGrpCard;
  };

  const getWeatherIcons = (info) => {
    let tmpElem;
    switch (info.currentConditions.conditions) {
      case "Partially cloudy":
        tmpElem = createElement(
          "i",
          ["fa-solid", "fa-cloud-sun"],
          "weatherIcon",
        );
        break;
      case "partly_cloudy":
        tmpElem = createElement(
          "i",
          ["fa-solid", "fa-cloud-sun"],
          "weatherIcon",
        );
        break;
      case "Rain, Partially cloudy":
        tmpElem = createElement(
          "i",
          ["fa-solid", "fa-cloud-rain"],
          "weatherIcon",
        );
        break;
      case "Rain":
        tmpElem = createElement(
          "i",
          ["fa-solid", "fa-cloud-rain"],
          "weatherIcon",
        );
        break;
      case "storm":
        tmpElem = createElement(
          "i",
          ["fa-solid", "fa-cloud-showers-heavy"],
          "weatherIcon",
        );
        break;
      case "Snow, Partially cloudy":
        tmpElem = createElement(
          "i",
          ["fa-solid", "fa-snowflake"],
          "weatherIcon",
        );
        break;
      case "Snow":
        tmpElem = createElement(
          "i",
          ["fa-solid", "fa-snowflake"],
          "weatherIcon",
        );
        break;
      default:
        tmpElem = createElement("i", ["fa-solid", "fa-sun"], "weatherIcon");
    }
    return tmpElem;
  };

  const middleIconAndInfo = (info) => {
    let resultDiv = document.getElementById("resultsDiv");

    let summaryIcon = createElement(
      "div",
      ["information", "icons", "summary", "bracket"],
      "summaryIconDiv",
    );

    let weatherDesc = createElement(
      "p",
      ["description"],
      "weatherDesc",
      info.currentConditions.conditions,
    );

    let icon = getWeatherIcons(info);

    summaryIcon.appendChild(weatherDesc);
    summaryIcon.appendChild(icon);
    resultDiv.appendChild(summaryIcon);
  };

  const createInfoCards = (info) => {
    // function to create the information cards on this app
    // 'info' must be of json type
    let app = document.getElementById("resultsDiv");
    let infoBracket = createElement(
      "div",
      ["information", "bracket"],
      "infoBracket",
    );
    let tempGrp = createTempGroup(info);
    let humidityClouds = createHumidityCloudsGrp(info);

    infoBracket.appendChild(tempGrp);
    infoBracket.appendChild(humidityClouds);
    app.appendChild(infoBracket);
  };

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

  const eventResponse = (event) => {
    if (event.target.id == "searchCityBar") {
      if (event.key != "Enter") {
        return;
      }
      event.preventDefault();
    }
    let resultsDiv = document.getElementById("resultsDiv");
    if (resultsDiv.hasChildNodes()) {
      removeAllChildElemById(resultsDiv);
    }
    vcQuery(searchInput.value);
  };

  // NOTE: Using callback function for Event Listeners
  searchInput.addEventListener("keydown", eventResponse);
  searchBtn.addEventListener("click", eventResponse);
})();
