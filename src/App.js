import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const API_KEY = "ae03b5e45797b1e8b97bd6383448438a";

// "https://openweathermap.org/img/w/01d.png"  --> for icon
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

function App() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [forecasterror, setForecasterror] = useState("");

  const fetchWeather = async () => {
    const cityToSearch = city.trim() === "" ? "Agra" : city.trim();
    // console.log(cityToSearch);
    setError("");

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      // console.log(data);

      setWeather({
        temp: Math.round(data.main.temp) + "°",
        humidity: data.main.humidity + "%",
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        wind: data.wind.speed + "mph",
      });
    } catch (er) {
      setError("City not found");
      setWeather(null);
    }
  };

  const fetchForeCast = async () => {
    const cityToSearch = city.trim() === "" ? "Agra" : city.trim();
    setForecasterror("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityToSearch}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) {
        throw new Error("Unable to load Forecast");
      }

      const data = await res.json();
      // console.log(data);

      const filtered = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      const days = filtered.slice(0, 5).map((item) => ({
        day: new Date(item.dt_txt).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        temp: Math.round(item.main.temp) + "°",
        icon: item.weather[0].icon,
      }));

      setForecast(days);
    } catch (er) {
      setForecasterror("Unable to load Forecast");
      setForecast([]);
    }
  };

  const handleSearch = () => {
    setSearchedCity(city);
    fetchWeather();
    fetchForeCast();
  };

  useEffect(() => {
    fetchWeather();
    fetchForeCast();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#06234b] to-[#00c6ff] px-4 py-6">
  <div className="w-full max-w-[400px] h-[90vh] sm:h-[85vh] bg-[rgb(11,77,131)] rounded-3xl shadow-xl p-4 sm:p-6 text-white space-y-6 border-4 border-sky-400 overflow-y-auto">

        <div className="relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="w-full pl-4 pr-10 py-2 rounded-full bg-[rgb(6,71,125)] text-[rgb(120,180,220)] placeholder:text-[rgb(120,180,220)]"
          />
          <FaSearch
            onClick={handleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[rgb(120,180,220)] cursor-pointer"
          />
        </div>

        <div className="text-2xl font-serif font-bold pl-4">
          {searchedCity === "" ? "Agra" : searchedCity}
        </div>

        {/* error handling */}

        {error && (
          <div className="text-red-500 justify-center flex">{error}</div>
        )}

        {/* Current weather div by default for Agra */}
        {weather && (
          <div className="bg-[rgb(6,71,125)] rounded-2xl p-4 flex gap-4 items-center shadow-md border-4 border-sky-400">
            {/* Weather Icon */}
            <img
              src={`https://openweathermap.org/img/w/${weather.icon}.png`}
              alt="Weather"
              className="w-20 h-20"
            />

            <div className="flex flex-col justify-center text-white w-full">
              <p className="text-3xl font-bold justify-center">
                {weather.temp}
              </p>
              <p className="capitalize text-[rgb(180,220,255)]">
                {weather.description}
              </p>

              <div className="flex justify-between mt-3 text-[rgb(200,230,255)] text-sm">
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-white">Humidity</span>
                  <span>{weather.humidity}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-white">Wind</span>
                  <span>{weather.wind}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* forecast unable to load */}
        {forecasterror && (
          <div className="text-red-500 justify-center flex">
            {forecasterror}
          </div>
        )}

        {/* Forecast weather for 5 days */}
        {forecast.length > 0 && (
          <div className="bg-[rgb(6,71,125)] rounded-2xl p-4 text-center shadow-md border-4 border-sky-400">
            <p className="text-md font-semibold mb-2">5-Day Forecast</p>
            <div className="grid grid-cols-5 gap-2 text-sm">
              {forecast.map((day, i) => (
                <div key={i} className="flex flex-col items-center space-y-1">
                  <p>{day.day}</p>
                  <img
                    src={`https://openweathermap.org/img/w/${day.icon}.png`}
                    alt="icon"
                    className="w-8 h-8"
                  />
                  <p>{day.temp}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
