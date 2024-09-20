"use client"
import { useState } from 'react';

const NotificationPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Notification Icon */}
      <button 
        onClick={togglePopup} 
        className="p-2 bg-gray-800 text-white rounded-full focus:outline-none"
      >
        {/* You can replace with an actual icon */}
        <i className="fas fa-bell"></i> 
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="absolute right-10 top-12 w-80 bg-gray-800 text-white shadow-lg rounded-lg">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button className="text-sm text-blue-500 hover:underline">Mark As Read</button>
          </div>

          {/* Notification List */}
          <div className="max-h-64 overflow-y-auto">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-4 flex items-start border-b border-gray-700">
                <img
                  src="https://via.placeholder.com/40" // replace with actual profile image
                  alt="User"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="text-sm font-semibold">Shivam</p>
                  <p className="text-sm text-gray-400">
                    - has approved your blog.
                  </p>
                  <span className="text-xs text-gray-500">2 hours ago | 11:10PM</span>
                </div>
                <span className="ml-auto mt-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </div>
            ))}
          </div>

          {/* All Notifications Button */}
          <div className="p-3 text-center border-t border-gray-700">
            <button className="text-sm text-gray-400 hover:underline">
              All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;
