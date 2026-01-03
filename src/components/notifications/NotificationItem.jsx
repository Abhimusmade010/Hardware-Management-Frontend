const iconMap = {
  success: "✅",
  info: "ℹ️",
  warning: "⚠️",
};

const NotificationItem = ({ data }) => {
  return (
    <div className="flex gap-3 px-4 py-3 hover:bg-[#2a2e3b] transition cursor-pointer">
      
      {/* Icon */}
      <div className="text-lg">
        {iconMap[data.type]}
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm font-medium text-white">
          {data.title}
        </p>
        <p className="text-sm text-gray-400">
          {data.message}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {data.time}
        </p>
      </div>
    </div>
  );
};

export default NotificationItem;
