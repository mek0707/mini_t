import {useRouter} from "next/router";
import React, {createContext, useEffect, useState} from "react";
import NextImage from "next/image.js";

export const LanguageContext = createContext();

export default function Layout({children}) {
  const [darkMode, setDarkMode] = useState(false);
  const [languageMode, setLanguageMode] = useState(false);

  const router = useRouter();
  const Image = NextImage.default;

  // Utility function for managing class changes
  const updateClass = (classToAdd, classesToRemove) => {
    document.documentElement.classList.remove(...classesToRemove);
    document.documentElement.classList.add(classToAdd);
  };

  // Initialize theme and language settings from localStorage
  useEffect(() => {
    const initializeSettings = () => {
      // Theme initialization
      const savedTheme = localStorage.getItem("theme") || "dark";
      setDarkMode(savedTheme === "dark");
      updateClass(savedTheme, ["dark", "light"]);

      // Language initialization
      const savedLanguage = localStorage.getItem("language") || "en";
      setLanguageMode(savedLanguage);
      updateClass(savedLanguage, ["en", "th"]);

      console.log("1");
    };

    initializeSettings();
  }, []);

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    updateClass(newTheme, ["dark", "light"]);
  };

  const toggleLanguage = () => {
    const newLanguage = languageMode === "en" ? "th" : "en";
    setLanguageMode(newLanguage);
    localStorage.setItem("language", newLanguage);

    document.documentElement.classList.remove("en", "th");
    document.documentElement.classList.add(newLanguage);
  };

  const openPDF = () => {
    // if (languageMode === "th") {
    const pdfUrl = "/CV THAI 2568.pdf";
    //   window.open(pdfUrl, "_blank");
    // }else{
    const pdfUrl_1 = "/CV ENGLISH 2025.pdf";
    window.open(pdfUrl, "_blank");
    window.open(pdfUrl_1, "_blank");
    // }
  };

  return (
    <div className="">
      <LanguageContext.Provider value={{languageMode, toggleLanguage}}>
        <div className="flex flex-col">
          {/* Header */}
          <header className="sticky top-0  bg-gray-500 z-50 md:flex justify-between gap-4 p-2 items-center  dark:text-white dark:bg-slate-600">
            <div className="md:flex items-center text-white dark:text-white">
              <div className="border-r border-r-gray-200 text-center text-[32px] md:text-[18px] px-4 font-extrabold cursor-not-allowed">
                Wongsatorn{" "}
              </div>
              <div className="text-[14px] md:text-[16px] ">
                <span onClick={() => router.push("/home/example_work")} className="p-2 px-3 hover:text-black dark:hover:text-gray-300 cursor-pointer">
                  ทดสอบ
                </span>
              </div>
            </div>

            <div className="">
              <div className="flex justify-center md:justify-start items-center gap-4">
                <span className="text-white">ข้อ 4 </span>
                <button onClick={toggleDarkMode} className="p-2 rounded hover:rounded-full hover:bg-stone-200 hover:dark:bg-slate-300">
                  {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
                      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow">{children}</main>

        </div>
      </LanguageContext.Provider>
    </div>
  );
}
