const Suggestions = ({ suggestions, onSelect }) => {
    if (!suggestions.length) return null;
  
    return (
      <ul className="absolute z-10 top-full mt-1 bg-white text-black w-full rounded shadow-lg">
        {suggestions.map((item, i) => (
          <li
            key={i}
            onClick={() => onSelect(item)}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  };
  
  export default Suggestions;
  