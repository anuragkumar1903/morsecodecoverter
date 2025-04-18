"use client";
import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import { textToMorse, morseToText } from "./utils/morseConverter";

const MorseConverter: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [text, setText] = useState("");
    const [morse, setMorse] = useState("");
    const [convertedText, setConvertedText] = useState("");
    const [convertedMorse, setConvertedMorse] = useState("");
  const [textError, setTextError] = useState(null);
  const [morseError, setMorseError] = useState(null);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

    const showToast = (message: string) => {
        const toastElement = document.createElement("div");
        toastElement.textContent = message;
        toastElement.className =
            "fixed bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-md";
        document.body.appendChild(toastElement);
        setTimeout(() => {
            document.body.removeChild(toastElement);
        }, 3000);
    };

  const copyToClipboard = (text: string) => {
    try {
        navigator.clipboard.writeText(text);
        showToast("Text copied to clipboard!");

    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };
    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
  };

  const handleConvertText = (): void => {
    setTextError(null);
    try {
        const result = textToMorse(text);
        setConvertedMorse(result);
    } catch (error: any) {
        setTextError(error.message);
        setConvertedMorse("");
    }
  };

  const handleConvertMorse = (): void => {
    setMorseError(null);
    try {
      const result = morseToText(morse);
      setConvertedText(result);
    } catch (error: any) {
      setMorseError(error.message);
      setConvertedText("");
    }
  };

  const handleMorseChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMorse(e.target.value);
};
   useEffect(() => {
    document.documentElement.classList.remove("dark");
   }, []);
  
  return (
        <>
        <div className="min-h-screen bg-white dark:bg-gray-800 flex flex-col items-center justify-center p-4">
            <button
                className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-md shadow-md text-black dark:text-white"
                onClick={toggleDarkMode}
            >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Morse Code Converter</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Text to Morse</h2>

                    <textarea
                        className="w-full h-32 p-2 border border-gray-300 rounded-md mb-2 resize-none text-black dark:text-white"
                        placeholder="Enter text here"
                         value={text}
                        onChange={handleTextChange}
                    />
                     {textError && <div className="text-red-500 mb-2">{textError}</div>}

                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 ${text.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        onClick={handleConvertText}
                        disabled={text.trim() === ""}
                        >
                        Convert to Morse
                    </button>
                    <div className="flex items-center">
                        <textarea

                            className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                            value={convertedMorse}
                            readOnly
                        />
                         <button
                            className="ml-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-md shadow-md text-black dark:text-white"
                            onClick={() => copyToClipboard(convertedMorse)}
                            >                           
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.03.117-.06.234-.09.351a14.005 14.005 0 01-.2 2.056v.441m0 0v.01v.01h.01H12m5 0h.01h.01m0 0h3.75h.001M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                   
                </div>
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">

                    <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Morse to Text</h2>
                    <textarea
                        className="w-full h-32 p-2 border border-gray-300 rounded-md mb-2 resize-none text-black dark:text-white"
                        placeholder="Enter Morse code here"
                        value={morse}
                        onChange={handleMorseChange}
                    />
                    {morseError && <div className="text-red-500 mb-2">{morseError}</div>}
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 ${morse.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        onClick={handleConvertMorse}
                        disabled={morse.trim() === ""}
                    >
                        Convert to Text
                    </button>
                     <div className="flex items-center">
                         <textarea
                                className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                                value={convertedText}
                                readOnly
                            />
                             <button
                                className="ml-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-md shadow-md text-black dark:text-white"
                                onClick={() => copyToClipboard(convertedText)}
                                >                            
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.03.117-.06.234-.09.351a14.005 14.005 0 01-.2 2.056v.441m0 0v.01v.01h.01H12m5 0h.01h.01m0 0h3.75h.001M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                           </button>
                    </div>
                </div>
            </div>
        </div></>
      
    );
};

export default MorseConverter;