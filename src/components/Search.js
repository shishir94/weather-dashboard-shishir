import { FaSearch } from "react-icons/fa";
import Suggestions from "./Suggestions";

const Search = ({
  city,
  suggestions,
  onInputChange,
  onSearchClick,
  onSuggestionClick,
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={city}
        onChange={onInputChange}
        placeholder="Enter city"
        className="w-full pl-4 pr-10 py-2 rounded-full bg-[rgb(6,71,125)] text-[rgb(120,180,220)] placeholder:text-[rgb(120,180,220)]"
      />
      <FaSearch
        onClick={onSearchClick}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[rgb(120,180,220)] cursor-pointer"
      />
      <Suggestions suggestions={suggestions} onSelect={onSuggestionClick} />
    </div>
  );
};

export default Search;
