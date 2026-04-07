/* index.js Weather App */
import "./reset_styling.css";
import "./style.css";

(() => {
  console.log("Weather App");

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
})();
