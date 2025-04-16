"use client";
import SearchHistory from "@/components/SearchHistory";
import SearchInput from "@/components/SearchInput";
import SearchResults from "@/components/SearchResults";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { SEARCH_HISTORY_KEY } from "@/utils/localStateKey";
import React, { useEffect, useState } from "react";

export type LocationInfo = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  dateSearched: string;
};


export default function Home() {
  const [searchText, setSearchText] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<LocationInfo | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<LocationInfo[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  const success = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setCurrentSearch({
      name: "Current Location",
      lat: latitude,
      lon: longitude,
      country: "N/A",
      dateSearched: new Date().toUTCString(),
    });
  };

  function error() {
    console.log("Unable to retrieve your location");
  }

  useEffect(() => {
    const storedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (storedHistory && storedHistory !== JSON.stringify(searchHistory)) {
      setSearchHistory(JSON.parse(storedHistory) || []);
    }
  }, []);

  // Sync from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SEARCH_HISTORY_KEY && e.newValue) {
        const newHistory = JSON.parse(e.newValue);
        setSearchHistory(newHistory);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchOpen(true);
    }
  };

  const handleSearchButton = () => {
    setSearchOpen(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchSelect = (search: LocationInfo) => {
    setSearchText("");
    setCurrentSearch(search);
    const localHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    const curSearchHistory: Array<LocationInfo> = localHistory
      ? JSON.parse(localHistory)
      : [];

    //filter out any previous searches with the same name and country
    //add the new search to the end of the array
    const prevSearch = curSearchHistory.filter(
      (item) => !(item.name == search.name && item.country == search.country)
    );

    const updatedSearchHistory = [...prevSearch, search];

    localStorage.setItem(
      SEARCH_HISTORY_KEY,
      JSON.stringify(updatedSearchHistory)
    );
    setSearchHistory(updatedSearchHistory);
    setTimeout(() => {
      setSearchOpen(false);
    }, 500);
  };

  const handleHistorySearch = (location: LocationInfo) => {
    setCurrentSearch(location);
  };

  const handleHistoryDelete = (location: LocationInfo) => {
    const newHistory = searchHistory.filter(
      (item: LocationInfo) => item.dateSearched !== location.dateSearched
    );
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    setSearchHistory(newHistory);
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-start gap-4 pt-5 px-5 md:pt-6 md:px-6 relative overflow-hidden bg-[url(../assets/images/bg-light.png)] dark:bg-[url(../assets/images/bg-dark.png)] bg-image-cover">
      <div className="absolute bottom-5 right-5 z-90">
        <ThemeSwitcher />
      </div>
      <div className="max-w-[700px] h-full w-full flex flex-col items-center relative gap-[100px]">
        <SearchInput
          searchText={searchText}
          searchOpen={searchOpen}
          handleKeyDown={handleKeyDown}
          handleSearchChange={handleSearchChange}
          handleSearchSelect={handleSearchSelect}
          handleSearchButton={handleSearchButton}
        />

        <div className="w-full h-[calc(100%-140px)] relative flex flex-col items-start pt-6 md:pt-10 px-4 md:px-[48px] rounded-t-[24px] bg-white/20 dark:bg-dark-black/20 backdrop-blur-xl gap-5 box-border overflow-y-visible border-white/50 border dark:border-none">
          {currentSearch && (
            <SearchResults lat={currentSearch.lat} lon={currentSearch.lon} />
          )}
          <SearchHistory
            searchHistory={searchHistory}
            handleSearch={handleHistorySearch}
            handleDelete={handleHistoryDelete}
          />
        </div>
      </div>
    </div>
  );
}
