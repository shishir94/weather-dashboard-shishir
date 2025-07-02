const Forecast = ({ forecast }) => {
    if (!forecast.length) return null;
  
    return (
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
    );
  };
  
  export default Forecast;
  