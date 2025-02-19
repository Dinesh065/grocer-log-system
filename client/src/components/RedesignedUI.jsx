export default function Complete() {
    async function hit() {
      alert("Button got clicked");
    }
  
    return (
      <div className="flex w-screen h-screen overflow-hidden p-2 pr-6 space-x-2">
        <aside className="hidden md:flex flex-col w-full md:w-[20%] h-full p-2 bg-blue-300 border border-blue-50 rounded-lg space-y-5">
          <div className="p-3 bg-white border rounded-md">
            <h1 className="text-lg font-semibold">Ronak</h1>
          </div>
  
          <div className="flex-grow overflow-y-auto bg-slate-50 rounded-md border p-3 space-y-3">
            <button
              onClick={hit}
              aria-label="Open Dashboard"
              className="text-xl font-semibold flex items-center p-5 w-full border-b border-blue-50 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition"
            >
              Dashboard
            </button>
  
            <button
              onClick={() => alert("Clicked on Contact")}
              aria-label="Open Contact"
              className="text-xl font-semibold flex items-center p-5 w-full border-b border-gray-300 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition"
            >
              Contact
            </button>
          </div>
  
          <div className="p-2 bg-white border rounded-md flex items-center space-x-5">
            <div className="h-10 w-10 rounded-md bg-black"></div>
            <h1 className="text-lg font-semibold">Ronak</h1>
          </div>
        </aside>
  
        <div className="w-full md:w-[80%] h-full bg-white p-2 px-4 space-y-5 rounded-lg flex flex-col">
          <div className="h-14 rounded-lg text-left p-4 bg-white">Content</div>
  
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-48">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-blue-600 text-white rounded-xl p-6 flex justify-center items-center"
              >
                <h2 className="text-lg font-semibold">Ronak</h2>
              </div>
            ))}
          </section>
  
          <div className="flex flex-col h-full bg-slate-100 p-4 rounded-lg">
            <div className="grid grid-rows-10">
              <div className="row-span-2 rounded-md text-center p-4 bg-white w-full">
                <h1>Ronak</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  