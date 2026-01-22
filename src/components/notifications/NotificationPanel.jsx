import NotificationItem from "./NotificationItem";

const notifications = [
  
];

const NotificationPanel = () => {
  return (
    <div className="absolute right-0 mt-3 w-96 bg-[#1f2230] border border-[#2f344a] rounded-xl shadow-xl z-50">

      {/* Header */}
      <div className="px-4 py-3 border-b border-[#2f344a] text-white font-semibold">
        Notifications
      </div>

      {/* List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((n) => (
          <NotificationItem key={n.id} data={n} />
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[#2f344a] text-center text-sm text-blue-400 hover:underline cursor-pointer">
        View all notifications
      </div>
    </div>
  );
};

export default NotificationPanel;
