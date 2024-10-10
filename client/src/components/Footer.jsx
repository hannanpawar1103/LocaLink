import React from 'react';

const Footer = () => {
  return (
    <div className="w-1/5 bg-gray-50 p-4">
      {/* Stories Section */}
      <div className="stories mb-6">
        <h3 className="text-xl font-semibold mb-4">Stories</h3>
        <div className="flex space-x-4"> {/* Increased space between story cards */}
          {/* Story 1 */}
          <div className="story w-24 h-32 bg-white shadow-md rounded-xl overflow-hidden flex flex-col items-center">
            <img
              className="w-full h-3/4 object-cover"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Anatoly Proty"
            />
            <p className="text-center text-sm mt-1">Anatoly Pro...</p>
          </div>

          {/* Story 2 */}
          <div className="story w-24 h-32 bg-white shadow-md rounded-xl overflow-hidden flex flex-col items-center">
            <img
              className="w-full h-3/4 object-cover"
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Lolita Earns"
            />
            <p className="text-center text-sm mt-1">Lolita Earns</p>
          </div>
        </div>
      </div>

      {/* Suggestions Section */}
      <div className="suggestions">
        <h3 className="text-xl font-semibold mb-4">Suggestions</h3>

        {/* Suggestion 1 */}
        <div className="suggestion flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Nick Shelburne"
            />
            <p>Nick Shelburne</p>
          </div>
          <button className="bg-black text-white py-1 px-4 rounded-lg text-sm hover:bg-black transition duration-200">
            Follow
          </button>
        </div>

        {/* Suggestion 2 */}
        <div className="suggestion flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://randomuser.me/api/portraits/women/50.jpg"
              alt="Brittni Lando"
            />
            <p>Brittni Lando</p>
          </div>
          <button className="bg-black text-white py-1 px-4 rounded-lg text-sm hover:bg-black transition duration-200">
            Follow
          </button>
        </div>

        {/* Suggestion 3 */}
        <div className="suggestion flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://randomuser.me/api/portraits/men/10.jpg"
              alt="Ivan Shevchenko"
            />
            <p>Ivan Shevchenko</p>
          </div>
          <button className="bg-black text-white py-1 px-4 rounded-lg text-sm hover:bg-black transition duration-200">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
