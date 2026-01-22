
📊 Complaint Statistics – UI & API Integration
🔹 Overview

This update introduces a dashboard statistics section that displays real-time complaint data for the logged-in user.
The stats are computed on the backend using MongoDB aggregation and consumed by the frontend using a single optimized API call.

🖥️ Recent UI Changes (Frontend)
✅ Added Statistics Cards

A new Stats component has been added to the dashboard showing:

Total Complaints

Pending Complaints

Resolved Complaints

In Progress Complaints

✅ Responsive Layout

Uses Tailwind CSS Grid

Adapts automatically for:

Mobile (1 column)

Tablet (2 columns)

Desktop (4 columns)

✅ Loading State

Displays -- while data is loading

Prevents UI flicker and broken renders

✅ Component Used
src/components/Dashboard/Stats.jsx

🔗 Backend–Frontend Connection (Stats)
📌 Backend Implementation
Aggregation Logic

Complaints are grouped by status

Counts are calculated using MongoDB aggregation

Data is converted into a clean object format

{
  total: Number,
  pending: Number,
  resolved: Number,
  inProgress: Number
}

API Endpoint
GET /user/stats


Protected route

User ID is extracted from JWT token

Returns stats only for the logged-in user

Response Example
{
  "total": 12,
  "pending": 4,
  "resolved": 6,
  "inProgress": 2
}

📌 Frontend API Integration
API Function
export const complaintStatistics = () => {
  return apiClient.get("user/stats");
};


Uses Axios instance with JWT token attached

No request body required

Data Fetching

Data is fetched once on component mount using useEffect

Response is stored directly in component state

setStats(res.data);

🔄 Data Flow Summary
User Login (JWT)
      ↓
Backend Middleware extracts userId
      ↓
MongoDB Aggregation (group by status)
      ↓
Backend returns stats object
      ↓
Axios (res.data)
      ↓
React useState (stats)
      ↓
Stats Cards Render

🧠 Key Design Decisions

✅ Single API call for better performance

✅ Aggregation on backend (not frontend)

✅ Flat JSON response (no nesting)

✅ Case-consistent keys (inProgress)

✅ Scalable design (easy to add priority-based stats)

🚀 Result

Faster dashboard load

Cleaner API contract

Production-ready stats implementation

Easily extendable for charts and analytic