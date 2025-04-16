"use client";

import { useCallback, useMemo } from "react";
import useSWR from "swr";
import Image from "next/image";

interface SearchResultsProps {
  lat: number;
  lon: number;
}

type SearchResultsData = {
  coord: {
    lat: number;
    lon: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

const weatherFetcher = async (
  lat: number,
  lon: number
): Promise<SearchResultsData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
  );
  return response.json();
};

export default function SearchResults({ lat, lon }: SearchResultsProps) {
  const { data, isLoading, error } = useSWR(
    [`/api/search`, lat, lon],
    ([_, lat, lon]) => weatherFetcher(lat, lon)
  );

  const getDateTime = useCallback((dt: number, timezone: number): string => {
    //datetime in UTC
    //timezone shift in seconds from UTC
    const date = new Date((dt + timezone) * 1000);

    const pad = (n: number) => n.toString().padStart(2, "0");

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const day = pad(date.getUTCDate());
    const month = pad(date.getUTCMonth() + 1);
    const year = date.getUTCFullYear();

    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;

    const formatted = `${day}-${month}-${year} ${pad(hours)}:${pad(
      minutes
    )}${ampm}`;

    return formatted;
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    data && (
      <div className="w-full flex flex-row items-end justify-between animate-fadeEnter text-black dark:text-white text-[14px] md:[16px]">
        <Image
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt="weather_icon"
          width={150}
          height={150}
          sizes="(min-width: 768px) 300px, 300px"
          className="absolute top-0 right-5 -translate-y-2/5 animate-slightEnterUp w-[160px] md:w-[300px] z-80"
        />
        <div className="flex flex-col items-start justify-center gap-1">
          <h2 className="">Today's Weather</h2>
          <h1
            className="font-bold text-[50px] text-purple dark:text-white md:text-[80px]"
            style={{
              lineHeight: "1",
            }}
          >
            {Math.round(data.main.temp)}°
          </h1>

          <p className="flex flex-row items-center justify-start gap-2">
            <span>H: {Math.round(data.main.temp_max)}°</span>
            <span>L: {Math.round(data.main.temp_min)}°</span>
          </p>
          <p className="font-bold">
            {data.name}, {data.sys.country}
          </p>
        </div>
        <div>
          <div className="flex flex-col items-end justify-center">
            <div>{data.weather[0].main}</div>
            <div>Humidity: {data.main.humidity}%</div>
            <div>{getDateTime(data.dt, data.timezone)}</div>
          </div>
        </div>
      </div>
    )
  );
}
