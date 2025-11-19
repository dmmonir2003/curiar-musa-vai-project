import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useNavigate } from 'react-router-dom';

const NotificationDropdown = () => {
  const { listenForNotifications, socket } = useSocket();
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for general notifications (e.g., chat)
    const unsubscribeNotifications = listenForNotifications((notification) => {
      setNotifications((prev) => [notification, ...prev]);
      // Removed automatic navigation here
    });

    // Listen specifically for job accepted notifications
    const handleJobAcceptedNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      // Removed automatic navigation here
    };

    socket?.on('jobAccepted', handleJobAcceptedNotification);

    return () => {
      unsubscribeNotifications();
      socket?.off('jobAccepted', handleJobAcceptedNotification);
    };
  }, [listenForNotifications, socket]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true })) // Mark all as read when opened
    );
  };

  // Handle click on each notification to navigate accordingly
  const handleNotificationClick = (notification) => {
    if (notification.type === 'NEW_MESSAGE') {
      navigate('/chat');
    } else if (notification.type === 'JOB_ACCEPTED') {
      navigate('/my-requests');
    }
    // Mark clicked notification as read (optional)
    setNotifications((prev) =>
      prev.map((n) =>
        n === notification ? { ...n, read: true } : n
      )
    );
    setDropdownOpen(false); // Optionally close dropdown on click
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="rounded-full p-2 px-4 bg-white text-xs flex items-center gap-3 shadow-sm cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>Notifications</span>
        <span className="relative">
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.55 11.175C14.15 12.3 14.75 12.75 14.75 12.75H1.25C1.25 12.75 3.5 11.25 3.5 6C3.5 3.525 5.525 1.5 8 1.5C8.525 1.5 8.975 1.575 9.425 1.725M6.72504 15.75C6.85057 15.9783 7.03512 16.1688 7.2594 16.3014C7.48369 16.434 7.73947 16.504 8.00004 16.504C8.2606 16.504 8.51639 16.434 8.74067 16.3014C8.96495 16.1688 9.1495 15.9783 9.27504 15.75M14.75 6C14.75 7.24264 13.7426 8.25 12.5 8.25C11.2574 8.25 10.25 7.24264 10.25 6C10.25 4.75736 11.2574 3.75 12.5 3.75C13.7426 3.75 14.75 4.75736 14.75 6Z"
              stroke="#85E211"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </span>
      </div>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md z-50 max-h-96 overflow-y-auto">
          <div className="p-3 font-semibold border-b">Notifications</div>
          {notifications.length === 0 ? (
            <div className="p-4 text-[12px] text-red-500 text-center">No notifications yet.</div>
          ) : (
            <ul className="divide-y">
              {notifications.map((notification, idx) => (
                <li
                  key={idx}
                  className={`p-3 text-sm hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'font-bold' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  {notification.message || 'You have a new notification.'}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
