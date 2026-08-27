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
    <div className="min-w-52 fixed bottom-32 left-1/2 -translate-x-1/2 w-[90%] bg-black opacity-80 p-4 rounded-xl font-sans">
      {showGenerate && (
        <button
          type="button"
          disabled={loading}
          onClick={onGenerate}
          className="w-full bg-green-700 text-white font-semibold py-2 mb-3 hover:bg-green-600 rounded-full hover:rounded-xl transition-colors disabled:cursor-not-allowed"
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
          className="flex-1 bg-neutral-900 text-green-400 placeholder-neutral-400 border border-green-700 p-3 focus:outline-none rounded-full focus:border-green-400 focus:rounded-2xl"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center bg-green-700 text-black hover:bg-green-600 rounded-full hover:rounded-2xl px-4 disabled:cursor-not-allowed"
        >
          <span className="text-3xl">&rarr;</span>
        </button>
      </form>
    </div>
  );
}

export default FloatingInput
