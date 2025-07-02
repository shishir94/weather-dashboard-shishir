const Weather = ({ weather }) => {
    if (!weather) return null;
  
    return (
      <div className="bg-[rgb(6,71,125)] rounded-2xl p-4 flex gap-4 items-center shadow-md border-4 border-sky-400">
        <img
          src={`https://openweathermap.org/img/w/${weather.icon}.png`}
          alt="Weather"
          className="w-20 h-20"
        />
        <div className="flex flex-col justify-center text-white w-full">
          <p className="text-3xl font-bold justify-center">{weather.temp}</p>
          <p className="capitalize text-[rgb(180,220,255)]">{weather.description}</p>
          <p className="text-sm text-[rgb(180,220,255)] mt-1">Feels Like: {weather.feels_like}</p>
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
    );
  };
  
  export default Weather;
  