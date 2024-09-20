import React from 'react';
import { IoCheckmarkDone } from 'react-icons/io5';

interface NotificationPopupProps {
  isOpen: boolean;
  togglePopup: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ isOpen, togglePopup }) => {
  return (
    <>
      {isOpen && (
        <div className="absolute sm:right-7 right-0 top-16 w-96  bg-[#000000] border border-[#2F2D33] text-white shadow-lg rounded-lg z-50">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <p className="text-sm  flex items-center gap-0.5 text-[#7B7A7F]">
               <IoCheckmarkDone className='text-blue-500 h-5 w-5' />
                Mark As Read
            </p>
            
            <img onClick={togglePopup} src="/asset/cross.svg" alt="" 
             className='cursor-pointer'
             />
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-4 flex items-start border-b border-[#2F2D33]">
                <img
                  src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp" 
                  alt="User"
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                    <div className='flex'>
                  <p className="text-sm font-semibold">Shivam</p>
                  <p className="text-sm text-[#CCCCCC]">
                    - has approved your blog.
                  </p>
                  </div>
                  <span className="text-xs text-[#7B7A7F]">2 hours ago | 11:10PM</span>
                </div>
                <span className="ml-auto mt-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </div>
            ))}
          </div>

          {/* All Notifications Button */}
          {/* <div className="p-3 text-center border-t border-gray-700">
            <button className="text-sm text-gray-400 hover:underline">
              All Notifications
            </button>
          </div> */}
        </div>
      )}
    </>
  );
};

export default NotificationPopup;
