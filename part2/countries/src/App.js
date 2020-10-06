import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetail = ({country}) => {
  return (
    <div key={country.name}>
      <div>
        <h3>{country.name}</h3>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
      </div>
      <div>
        <h3>Spoken Languages:</h3> 
        <ul>
          {
            country.languages.map(language => 
              <li key={language.name}>{language.name}</li>
            )
          }
        </ul>
      </div>
      <div>
        <img src={country.flag} alt={`${country.name}'s flag`} width='30%' height='30%'></img>
      </div>
      <div>
        <Weather country={country}/>
      </div>
    </div>
  )
}

const DisplayCountry = ({ countries, setSearch }) => {
  if (countries.length > 10) {
    return <div>Too many countries, specify another filter.</div>
  } else if (countries.length > 1) {
    return (countries.map(country => 
        <div key={country.name}>
          {country.name} 
          <button onClick={() => setSearch(country.name)}>See more</button>
        </div>
      ))
  } else if (countries.length === 1) {
    return <CountryDetail country={countries[0]}/>
  } else {
    // if there is no such filter, provide a message
    return <div>{countries}</div>
  }
}

const Weather = ({country}) => {
  const [weatherData,setWeatherData] = useState('');
  const [showWeather,setShowWeather] = useState(false);

  const hook = () => {
    const key = process.env.REACT_APP_API_KEY;
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${country.capital}`;
    axios
    .get(url)
    .then(response => {
      setWeatherData(response.data.current);
      setShowWeather(true);
    })
  }
  useEffect(hook, [country.capital])

  return(
    <div>
      {
        !showWeather
        ? (<p>Loading weather data...</p>)
        : (
          <div>
            <h3>Weather in {country.capital}</h3>
            <div>
              <img 
                src={weatherData.weather_icons} 
                alt={weatherData.weather_descriptions}
              />
            </div>
            <p>Temperature: {weatherData.temperature} degree Celsius</p>
            <p>Observation Time: {weatherData.observation_time}</p>
            <p>Weather Description: {weatherData.weather_descriptions}</p>
          </div>
        )
      }
    </div>
  )
}

const App = () => {
  const [countries,setCountries] = useState([]);
  const [search,setSearch] = useState('');

  const hook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data);
    });
  };

  useEffect(hook, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
 
  const countriesToShow = (search === '')
    ? (<p>No search filter yet</p>)
    : countries.filter(country => 
      country.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      <h2>Countries List</h2>
      find countries: <input value={search} onChange={handleSearch}/>
      <h2>Search result</h2>
      <DisplayCountry countries={countriesToShow} setSearch={setSearch}/>
    </div>
  )
}

export default App;
