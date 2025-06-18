const Questioncard = () => {

    
    return (
      <div className="p-10 flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-b from-green-50 to-green-100">
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4 shadow-lg">
              <span className="text-3xl">🧠</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-green-600 mb-3">
            Learn to solve any DSA problem
          </h1>
          <p className="text-green-700 text-xl font-medium">Master algorithms and data structures with AI-powered guidance</p>
        </div>
        
        <div className="flex flex-col w-[80vh] h-[30vh] p-8 rounded-2xl bg-white shadow-xl border-4 border-green-300">
            <div className="flex flex-row items-center mb-4">
            <div className='bg-green-500 h-12 w-12 rounded-xl mr-4 shadow-md'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJhyOBkI9m73a63Ayf9uQFQdDrLA5aTSJahQ&s" className='h-full w-full object-cover rounded-xl' alt="avatar" />
          </div>

      
          <p className="text-green-700 font-semibold text-lg">Paste the DSA problem you wanna learn? 👇</p> 
            </div>

            <textarea
              className="rounded-xl p-4 w-full h-full resize-none text-gray-800 border-2 border-green-200 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-200 text-lg font-medium"
              placeholder="e.g. Given an array nums of n integers, return an array..."
            />
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-green-600 text-sm font-medium">Ready to level up your coding skills? 🚀</p>
        </div>
      </div>
    );
  };
  
  export default Questioncard;
  