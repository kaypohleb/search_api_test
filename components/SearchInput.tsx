import { LocationInfo } from "@/app/page";
import { FaSearch } from "react-icons/fa";
import LocationResults from "./LocationResults";

interface SearchInputProps {
  searchText: string;
  searchOpen: boolean
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSelect: (location: LocationInfo) => void;
  handleSearchButton: () => void;
}

export default function SearchInput({
  searchText,
  searchOpen,
  handleKeyDown,
  handleSearchChange,
  handleSearchSelect,
  handleSearchButton,
}: SearchInputProps) {
  return (
    <div className="w-full h-fit flex items-center gap-3 md:gap-5 relative">
      <div className="flex flex-col w-full h-full items-start justify-center pb-2 px-3 rounded-lg relative bg-white/20 dark:bg-dark-black/40">
        <label className="text-dark-black/40 dark:text-white/40 text-[8px] md:text-[10px]">
          Country/City
        </label>
        <input
          name="country"
          className=" text-[12px] outline-none w-full text-black dark:text-white md:text-[16px]"
          type="text"
          value={searchText}
          onKeyDown={handleKeyDown}
          onChange={handleSearchChange}
          placeholder="Search"
        />
      </div>

      <button
        id="searchButton"
        className="bg-purple dark:bg-dark-purple aspect-square p-2 rounded-lg cursor-pointer hover:scale-95"
        onClick={handleSearchButton}
      >
        <FaSearch color="white" className="h-6 w-6 md:h-8 md:w-8" />
      </button>

      <div className="absolute w-full left-0 top-full h-fit z-90 mt-2">
        {searchOpen && searchText && (
          <LocationResults
            searchText={searchText}
            onSelect={handleSearchSelect}
          />
        )}
      </div>
    </div>
  );
}
