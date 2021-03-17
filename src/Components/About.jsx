import React, {useState} from "react";


function About(){
 const [icon, setIcon]= useState("")
 const [desc, setDesc] = useState("")
 const [temp, setTemp] = useState('')
 const [coun, setCoun] = useState('')
 const [query, setQuery] = useState('')
 const [weather, setWeather] = useState("")
 const d = new Date();
 const date= d.toDateString()
 
 
 const ApiGet = () => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=57a64f358fa6ebadb36952d88ecd4342&units=imperial`)
   .then(response => response.json())
   .then (data => { 
     setWeather(data)
     setTemp(Math.round(Math.floor(data.main.temp)) + "°F")
     setCoun(data.sys.country + ",")
     setDesc(data.weather[0].description)
     setIcon("http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
     setQuery("") 
    });

   
  }

 function test(event) {
  const newval = event.target.value
 return setQuery(newval)

 }

 return (<div className="par">
 
  <h1>Enter your City</h1>
  <input className="input"value={query}onChange={test}type="text" required ></input>
  <button type= "submit"className="button"onClick={ApiGet}>Search</button>
  <div className="box">
  <h2>{date}</h2>
  <h2 value={query}>{weather.name} {coun}</h2>
  <h2>{temp}</h2>
  <img src={icon}></img>
  <h3>{desc}</h3>
  </div>
 </div>)


}


export default About;