import { useState, useEffect } from "react";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import Search from "./components/Search";
import NotFoundImg from "./assets/undraw_page-eaten_b2rt.svg";

const API_KEY = "ae03b5e45797b1e8b97bd6383448438a";

function App() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [forecasterror, setForecasterror] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const dummyCities = [
    "Agra",
    "Kanpur",
    "Bengaluru",
    "Lucknow",
    "Delhi",
    "London",
    "Paris",
  ];

  const fetchWeather = async () => {
    const cityToSearch =
      searchedCity.trim() === "" ? "Agra" : searchedCity.trim();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather({
        temp: Math.round(data.main.temp) + "°",
        humidity: data.main.humidity + "%",
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        wind: data.wind.speed + "mph",
        feels_like: Math.round(data.main.feels_like) + "°",
      });
    } catch {
      setError("City not found");
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchForecast = async () => {
    const cityToSearch =
      searchedCity.trim() === "" ? "Agra" : searchedCity.trim();
    setForecasterror("");
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityToSearch}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("Unable to load Forecast");

      const data = await res.json();
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
    } catch {
      setForecasterror("Unable to load Forecast");
      setForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (selected) => {
    setCity(selected);
    setSearchedCity(selected);
    setSuggestions([]);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    const filtered = dummyCities.filter((c) =>
      c.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSearchIconClick = () => {
    setSearchedCity(city);
    setSuggestions([]);
  };

  useEffect(() => {
    fetchWeather();
    fetchForecast();
  }, [searchedCity]);

  return (
    <div className="min-h-dvh flex justify-center items-center p-4 bg-gradient-to-br from-[#06234b] to-[#00c6ff]">
      <div className="w-full max-w-[400px] h-[90vh] sm:h-[85vh] bg-[rgb(11,77,131)] rounded-3xl shadow-xl p-4 sm:p-6 text-white space-y-6 border-4 border-sky-400 overflow-y-auto">
        {/* Search Input */}
        <Search
          city={city}
          suggestions={suggestions}
          onInputChange={handleInputChange}
          onSearchClick={handleSearchIconClick}
          onSuggestionClick={handleSuggestionClick}
        />

        {/* City Name */}
        <div className="text-2xl font-serif font-bold pl-4">
          {searchedCity === "" ? "Agra" : searchedCity}
        </div>

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center justify-center space-y-3">
            <img src={NotFoundImg} alt="Not Found" className="w-40 h-40" />
            <p className="text-red-300 font-semibold">
              Oops! We couldn't find that city.
            </p>
          </div>
        )}

        {/* Loader */}
        {isLoading && (
          <div className="h-[10vh] w-[100vw] flex justify-center">
            <div className="w-[68px] aspect-square grid border-[4px] border-t-transparent border-[#ccc] rounded-full animate-spin"></div>
          </div>
        )}

        {/* Weather */}
        {!isLoading && weather && <Weather weather={weather} />}

        {/* Forecast Error */}
        {weather && forecasterror && (
          <div className="text-red-500 justify-center flex">
            {forecasterror}
          </div>
        )}

        {/* Forecast */}
        {!isLoading && forecast.length > 0 && <Forecast forecast={forecast} />}
      </div>
    </div>
  );
}

export default App;
