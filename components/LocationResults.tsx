import { LocationInfo } from "@/app/page";
import useSWR from "swr";

interface LocationResultsProps {
  /** The search text */
  searchText: string;
  /** The callback function to be called when a location is selected */
  onSelect: (location: LocationInfo) => void;
}

export type LocationResultsData = Array<LocationResultData>;

export type LocationResultData = {
  name: string;
  local_names: { [key: string]: string };
  lat: number;
  lon: number;
  country: string;
  state: string;
};

const locationFetcher = async (
  searchText: string
): Promise<LocationResultsData> => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=${process.env.OPENWEATHER_API_KEY}`
  );
  return response.json();
};

export default function LocationResults({
  searchText,
  onSelect,
}: LocationResultsProps) {
  const { data, isLoading, error } = useSWR(
    ["/api/location/", searchText],
    ([_, searchText]) => locationFetcher(searchText)
  );
  if (error) return <div>Error: {error}</div>;
  if (isLoading) return <div className="w-full text-black dark:text-white">Loading...</div>;
  if (data && data.length === 0) return <div className="w-full p-2 bg-white dark:bg-dark-black/50 rounded-lg text-black dark:text-white drop-shadow-2xl">No results found</div>;
  return (
    data && (
      <div className="w-full h-fit p-2 flex flex-col gap-2 bg-white rounded-[8px] ">
        {data.map((location: LocationResultData, index) => {
          return (
            <div
              role="button"
              key={index}
              className="flex flex-col text-black dark:text-black hover:bg-purple hover:text-white dark:hover:bg-dark-black/50 rounded-[4px] text-[12px] cursor-pointer"
              onClick={() => {
                const submitLocation: LocationInfo = {
                  name: location.name,
                  lat: location.lat,
                  lon: location.lon,
                  country: location.country,
                  dateSearched: new Date().toUTCString(),
                };
                onSelect(submitLocation);
              }}
            >
              <div className="p-2">
                <span className="">{location.name},</span>
                <span> </span>
                <span className="">{location.country}</span>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
}
