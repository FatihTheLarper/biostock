'use client'

import { useState } from "react";

interface FloatingInputProps {
  onSearch: (query: string) => void;
  onGenerate: () => void;
  showGenerate: boolean;
  loading: boolean;
}

const FloatingInput = ({ onSearch, onGenerate, showGenerate, loading }: FloatingInputProps) => {

  const [input, setInput] = useState("")

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(input.trim());
    setInput("");
  };

  return (
    <div className="min-w-52 z-20 fixed bottom-20 left-1/2 -translate-x-1/2 w-[92%] max-w-xl bg-gray-200 dark:bg-gray-800 p-3 rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700 font-sans">
      {showGenerate && (
        <button
          type="button"
          disabled={loading}
          onClick={onGenerate}
          className="w-full bg-green-700 dark:bg-green-800 text-white font-semibold py-2.5 mb-2.5 rounded-lg hover:bg-green-800 dark:hover:bg-green-900 hover:shadow-md transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          Generate Recipes
        </button>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="Enter Ingredients..."
          className="flex-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 p-2.5 focus:outline-none rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          aria-label="Search"
          className="flex items-center justify-center bg-green-700 dark:bg-green-800 text-white hover:bg-green-800 dark:hover:bg-green-900 rounded-lg px-4 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        >
          <span className="text-xl">&rarr;</span>
        </button>
      </form>
    </div>
  );
}

export default FloatingInput
