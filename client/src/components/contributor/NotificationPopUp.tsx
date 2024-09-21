"use client";
import instance from '@/utils/axios';
import {formatDateTime} from '@/utils/DateFormat';
import React, {useEffect, useState} from 'react';
import {IoCheckmarkDone} from 'react-icons/io5';

interface Notification {
  _id: string;
  senderImage: string;
  senderName: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface NotificationPopupProps {
  isOpen: boolean;
  togglePopup: () => void;
  ids: string[];
  setNoOfNotifications: any;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ( {isOpen, togglePopup, ids, setNoOfNotifications} ) => {
  const [notifications, setNotifications] = useState<Notification[]>( [] );
  const [isMarkingAll, setIsMarkingAll] = useState( false );

  const getAllNotifications = async () => {
    if ( !ids || ids?.length === 0 ) {
      console.log( "no ids available" );
      return;
    }
    try {
      const response = await instance.post( '/notification/my-all-notification', {ids} );
      console.log( "response after notification:", response );
      setNotifications( response.data.notifications.filter( ( noti: Notification ) => !noti.read ) ); 
    } catch ( error ) {
      console.log( "Error in getting notifications:", error );
    }
  };
  setNoOfNotifications( notifications.length );

  const markAsRead = async ( notificationId: string ) => {
    try {
      await instance.put( '/notification/update-notification', {notificationId, read: true} );
      setNotifications( prevNotifications =>
        prevNotifications.filter( noti => noti._id !== notificationId )
      );
    } catch ( error ) {
      console.log( "Error marking notification as read:", error );
    }
  };

  const markAllAsRead = async () => {
    setIsMarkingAll( true );
    try {
      for ( const noti of notifications ) {
        await markAsRead( noti._id );
      }
    } catch ( error ) {
      console.log( "Error marking all notifications as read:", error );
    } finally {
      setIsMarkingAll( false );
    }
  };

  useEffect( () => {
    getAllNotifications();
  }, [ids] );

  return (
    <>
      {isOpen && (
        <div className="absolute sm:right-7 right-0 top-16 w-96  bg-[#0A090F] border border-[#2F2D33] text-white shadow-lg rounded-lg z-50">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <p
              className={`text-sm flex items-center gap-0.5 ${isMarkingAll ? 'text-gray-500' : 'text-[#7B7A7F] cursor-pointer'}`}
              onClick={isMarkingAll ? undefined : markAllAsRead}
            >
              <IoCheckmarkDone className={`h-5 w-5 ${isMarkingAll ? 'text-gray-500' : 'text-blue-500'}`} />
              {isMarkingAll ? 'Marking...' : 'Mark All As Read'}
            </p>
            <img onClick={togglePopup} src="/asset/cross.svg" alt="" className='cursor-pointer' />
          </div>

          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            {notifications.length > 0 ? (
              notifications.map( ( noti: Notification ) => (
                <div key={noti._id} className="p-4 flex items-start border-b border-[#2F2D33]">
                  <img
                    src={noti.senderImage}
                    alt={noti.senderName}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div className="flex-grow">
                    <div className='flex flex-col'>
                      {/* <p className="text-sm font-semibold">{noti.senderName}</p> */}
                      <p className="text-sm text-[#CCCCCC]">{noti.message}</p>
                    </div>
                    <div className='flex justify-between'>

                      <span className="text-xs text-[#7B7A7F]">{formatDateTime( noti.createdAt )}</span>
                      <button title='Mark As Read'
                        className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 flex items-center"
                        onClick={() => markAsRead( noti._id )}
                      >
                        <IoCheckmarkDone className="mr-1" />
                        {/* Mark Read */}
                      </button>
                    </div>
                  </div>
                </div>
              ) )
            ) : (
              <div className="p-4 text-center text-[#7B7A7F]">No new notifications</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationPopup;