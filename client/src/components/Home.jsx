import React from 'react';
import ShareBox from './ShareBox.jsx';
import rest from '../img/colaba-social-6.jpg'

const Home = () => {
  return (
    <div className="w-3/5 p-6 bg-white min-h-screen flex flex-col justify-between">
      <div>
        {/* Post Content */}
        <div className="mb-6">
          <div className="post-header flex items-center mb-4">
            <img
              className="w-12 h-12 rounded-full mr-4"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
            />
            <div>
              <h3 className="text-lg font-semibold">George Lobko</h3>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            Hi everyone, today I Visited This Amazing restaurant , must visit ....
          </p>

          <div className="">
            <img
              className="w-full h-auto rounded-lg"
              src={rest}
              alt="Mountain"
            />
          </div>

          <div className="post-reactions flex items-center mt-2">
            <span className="mr-4">👍 6355</span>
            <button className="bg-pink-500 text-white py-1 px-4 rounded-lg mr-2">
              Like
            </button>
            <button className="bg-blue-500 text-white py-1 px-4 rounded-lg">
              Comment
            </button>
          </div>  
        </div>
      </div>

      {/* ShareBox Component */}
      <ShareBox />
    </div>
  );
};

export default Home;
