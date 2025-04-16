"use client";
import { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

export default function ThemeSwitcher() {
  const [dark, setDark] = useState(false);

  return (
    <button
      className="cursor-pointer p-2 rounded-full aspect-square bg-white dark:bg-transparent dark:border dark:border-white/40 drop-shadow-2xl"
      onClick={() => {
        setDark(!dark);
        document.body.classList.toggle("dark");
      }}
    >
      {dark && <IoSunny color="white" />}
      {!dark && <IoMoon />}
    </button>
  );
}
