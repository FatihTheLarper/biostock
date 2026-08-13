'use client'

const FloatingInput = () => {

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
  };

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-3/4 bg-black p-4 rounded-lg">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Recipes..."
          className="flex-1 bg-neutral-900 text-green-400 placeholder-neutral-400 border border-green-700 p-3 focus:outline-none focus:border-green-400"
        />
        <button
          type="submit"
          className="flex items-center h-full justify-center bg-green-700 text-black hover:bg-green-600 transition-colors"
        >
          <span className="text-3xl">&rarr;</span>
        </button>
      </form>
    </div>
  );
}

export default FloatingInput
