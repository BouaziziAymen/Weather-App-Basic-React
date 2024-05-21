import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    data: {},
    loading: false,
    error: false,
  });
  useEffect(() => {
    if (!input) return;
    const fetchData = () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`;
      axios
        .get(apiUrl)
        .then((res) => {
          console.log(res.data); // Use res.data to access the actual data
          setWeather({ loading: false, error: false, data: res.data });
        })
        .catch((e) => {
          console.error(e); // Handle errors here
          setWeather({ ...weather, loading: false, error: true });
        });
    };

    fetchData();
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setInput(e.target.value);
    }
  };

  return (
    <div className="App">
      <div className="input-container">
        <label className="input-label" htmlFor="city-input">
          City:
        </label>
        <input
          className="input-field"
          type="text"
          id="city-input"
          onKeyDown={handleKeyDown}
        ></input>
        {weather && weather.error && <p>There was an error!</p>}
        {weather && weather.data && (
          <p>
            {" "}
            <h3>Weather in {weather.data.name}</h3>
            <p>Temperature: {weather.data.main?.temp}°K</p>
            <p>Weather: {weather.data.weather[0]?.description}</p>
            <p>Humidity: {weather.data.main?.humidity}%</p>
            <p>Wind Speed: {weather.data.wind?.speed} m/s</p>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
