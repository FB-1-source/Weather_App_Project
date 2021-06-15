import React, { useState } from "react";
import Heading from "./Heading";

function About() {
  const [icon, setIcon] = useState("");
  const [desc, setDesc] = useState("");
  const [temp, setTemp] = useState("");
  const [coun, setCoun] = useState("");
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const d = new Date();
  const date = d.toDateString();

  const ApiGet = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.React_App_Secret_Key}&units=imperial`
    )
      .then((res) => {
        if (res.status === 400) {
          throw alert("Please enter a valid location");
        }

        if (res.status === 404) {
          throw alert("Please enter a valid location");
        }
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setTemp(Math.round(Math.floor(data.main.temp)) + "°F");
        setCoun(data.sys.country + ",");
        setDesc(data.weather[0].description);
        setIcon(
          "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        );
        setQuery("");
      });
  };

  function test(event) {
    const newval = event.target.value;
    return setQuery(newval);
  }

  return (
    <div className="comb">
      <Heading />
      <div className="par">
        <h1>Enter your City</h1>
        <input
          className="input"
          value={query}
          onChange={test}
          type="text"
          required
        ></input>
        <button type="submit" className="button" onClick={ApiGet}>
          Search
        </button>
        <div className="box">
          <h2>{date}</h2>
          <h2 value={query}>
            {weather.name} {coun}
          </h2>
          <h2>{temp}</h2>
          <img src={icon}></img>
          <h3>{desc}</h3>
        </div>
      </div>
    </div>
  );
}

export default About;
