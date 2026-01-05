const DashboardContent = ({ filters }) => {
  const complaints = [
    { id: 1, status: "Pending", category: "Hardware", priority: "High" },
    { id: 2, status: "Resolved", category: "Network", priority: "Low" },
  ];

  const filteredData = complaints.filter((item) => {
    return (
      (filters.status === "All" || item.status === filters.status) &&
      (filters.category === "All" || item.category === filters.category) &&
      (filters.priority === "All" || item.priority === filters.priority)
    );
  });

  return (
    <main className="flex-1 p-6">
      <h1 className="text-xl font-semibold mb-4">Complaints</h1>

      {filteredData.map((item) => (
        <div key={item.id} className="bg-gray-50 p-4 rounded mb-2 shadow">
          <p>Status: {item.status}</p>
          <p>Category: {item.category}</p>
          <p>Priority: {item.priority}</p>
        </div>
      ))}
    </main>
  );
};

export default DashboardContent;
