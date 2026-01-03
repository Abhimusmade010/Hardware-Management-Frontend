import { useState } from "react";
import NotificationPanel from "./NotificationPanel";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative text-gray-300 hover:text-white"
      >
        🔔
        {/* Unread dot */}
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
      </button>

      {/* Panel */}
      {open && <NotificationPanel />}
    </div>
  );
};

export default NotificationBell;
