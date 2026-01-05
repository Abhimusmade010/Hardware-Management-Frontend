const Stats = () => {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {[
        { label: "Total Complaints", value: 128 },
        { label: "Pending", value: 34 },
        { label: "Resolved", value: 82 },
        { label: "High Priority", value: 12 },
      ].map((item) => (
        <div
          key={item.label}
          className="bg-[#020617] border border-[#1e293b]
            rounded-xl p-5"
        >
          <p className="text-sm text-gray-400">{item.label}</p>
          <p className="text-2xl font-semibold text-white mt-1">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
