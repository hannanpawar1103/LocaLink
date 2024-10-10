import React from "react";

const ShareBox = () => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 w-full max-w-3xl p-4 bg-white rounded-lg shadow-lg flex items-center justify-between">
      {/* Profile Icon and Input */}
      <div className="flex items-center space-x-2 flex-grow">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <input
          type="text"
          placeholder="Share something"
          className="bg-gray-100 rounded-full px-4 py-2 w-full outline-none"
        />
      </div>

      {/* Action Icons */}
      <div className="flex items-center space-x-4 ml-4">
        <button className="flex items-center space-x-1">
          <i className="fas fa-file-alt"></i>
          <span>File</span>
        </button>
        <button className="flex items-center space-x-1">
          <i className="fas fa-image"></i>
          <span>Image</span>
        </button>
        <button className="flex items-center space-x-1">
          <i className="fas fa-map-marker-alt"></i>
          <span>Location</span>
        </button>
        <button className="flex items-center space-x-1">
          <i className="fas fa-globe"></i>
          <span>Public</span>
        </button>
      </div>

      {/* Send Button */}
      <button className="bg-black text-white rounded-full px-4 py-2 ml-4">
        Send
      </button>
    </div>
  );
};

export default ShareBox;
