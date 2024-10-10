import { Link } from "react-router-dom";
import {  FaUsers, FaImages, FaCog, FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";

const Sidebar = () => {

  const [showNoFriendsPopup , setshowNoFriendsPopup] = useState(false)

  function handleClick (){
    setshowNoFriendsPopup(true)
  }
  const handleClosePopup = () => {
    setshowNoFriendsPopup(false);
  };
 
  return (
    <div className="w-1/5 bg-gray-100 px-12">

      <nav className="mt-6 space-y-4">
        {/* News Feed (active state) */}
        <Link
          className="flex items-center justify-between p-3 text-white bg-black rounded-lg"
          to="/"
        >
          <div className="flex items-center space-x-2">
            <FaHome className="text-xl" />
            <span>News Feed</span>
          </div>
        </Link>


        {/*Tweets */}
        <Link
          className="flex items-center justify-between p-3 text-white bg-black rounded-lg"
          to="/tweets"
        >
          <div className="flex items-center space-x-2">
            <FaHome className="text-xl" />
            <span>Tweets</span>
          </div>
        </Link>

        {/* Friends with notification badge */}
        <div
          className="flex items-center justify-between p-3 text-lg hover:bg-gray-200 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <FaUsers className="text-xl" />
            <span onClick={handleClick}>Friends</span>
          </div>
        </div>
        {showNoFriendsPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm opacity-100 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-medium mb-2">Looks like you haven't connected with any friends yet.</h3>
            <p className="text-gray-500">Grow your network and start building connections!</p>
            <div className="flex justify-end mt-4">
              <button className="btn-primary px-4 py-2" onClick={handleClosePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Media */}
        <Link
          className="flex items-center justify-between p-3 text-lg hover:bg-gray-200 rounded-lg"
          to="/media"
        >
          <div className="flex items-center space-x-2">
            <FaImages className="text-xl" />
            <span>Media</span>
          </div>
        </Link>

        {/* Settings */}
        <Link
          className="flex items-center justify-between p-3 text-lg hover:bg-gray-200 rounded-lg"
          to="/settings"
        >
          <div className="flex items-center space-x-2">
          <CgProfile className="text-xl" />
            <span>Profile</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
