import { LocationInfo } from "@/app/page";
import { useCallback } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";

interface SearchHistoryProps {
  /** searchHistory: array of previous searchs */
  searchHistory: Array<LocationInfo>;
  /** handleSearch - handle Search button */
  handleSearch: (location: LocationInfo) => void;
  /** handleDelete - handle Delete button */
  handleDelete: (location: LocationInfo) => void;
}

const SearchHistory = ({
  searchHistory,
  handleSearch,
  handleDelete,
}: SearchHistoryProps) => {
  const getDateTime = useCallback((dt: string): string => {
    //datetime in UTC
    //timezone shift in seconds from UTC
    const date = new Date(dt);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, "0");

    return `${day}-${month}-${year} ${formattedHours}:${minutes}${ampm}`;
  }, []);

  return searchHistory.length > 0 ? (
    <div className="bg-white/20 dark:bg-dark-black/20 w-full h-full rounded-t-2xl py-5 px-3 md:px-5 flex flex-col items-start justify-start gap-4 overflow-y-auto scroll-history">
      <h2 className="text-black dark:text-white">Search History</h2>
      <div className="flex flex-col w-full items-start justify-start gap-4 overflow-y-scroll p-1 scroll-history rounded-2xl">
        {searchHistory
          .sort(
            (a, b) =>
              new Date(b.dateSearched).getTime() -
              new Date(a.dateSearched).getTime()
          )
          .map((location: LocationInfo, index) => {
            return (
              <div
                key={index}
                className="w-full h-fit flex flex-row bg-white/40 dark:bg-dark-black/50 rounded-2xl text-[12px] gap-4 justify-between items-center p-3"
              >
                <div className="w-fit flex flex-col gap-1 ">
                  <h3 className="text-[14px] text-black dark:text-white md:text-[16px]">
                    {location.name}, {location.country}
                  </h3>
                  <span className="text-[10px] text-black dark:text-white/50 md:hidden">
                    {getDateTime(location.dateSearched)}
                  </span>
                </div>
                <div className="w-fit h-fit flex flex-row gap-2 items-center">
                  <span className="text-[14px] text-black dark:text-white/50 hidden md:inline-block">
                    {getDateTime(location.dateSearched)}
                  </span>
                  <button
                    className="p-3 rounded-full aspect-square bg-white dark:bg-transparent dark:border dark:border-white/40 cursor-pointer drop-shadow-2xl hover:scale-95"
                    onClick={() => {
                      handleSearch(location);
                    }}
                  >
                    <FaSearch
                      size={16}
                      className="opacity-50 dark:fill-white"
                    />
                  </button>
                  <button
                    className="p-3 rounded-full aspect-square bg-white dark:bg-transparent dark:border dark:border-white/40 cursor-pointer drop-shadow-2xl hover:scale-95"
                    onClick={() => {
                      handleDelete(location);
                    }}
                  >
                    <FaTrash size={16} className="opacity-50 dark:fill-white" />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  ) : null;
};

export default SearchHistory;
