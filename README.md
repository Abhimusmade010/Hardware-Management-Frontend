# College Hardware Complaint Management System - Client

This is the frontend component of the College Hardware Complaint Management System. It is built using **React** and **Vite** to provide a fast, responsive, and robust user interface for students, faculty, maintenance staff, and administrators.

## 🚀 Technologies Used

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons:** React Feather & Material Icons
- **Data Fetching:** Axios
- **Charts/Visualization:** Recharts
- **Notifications:** React Hot Toast

## 📂 Project Structure

```
client/
├── public/          # Static assets (images, icons)
├── src/
│   ├── api/         # Axios API calls (auth, complaints)
│   ├── components/  # Reusable UI components (Layouts, Navbar, etc.)
│   ├── context/     # React Context for global state (AuthContext)
│   ├── pages/       # Route-level page components (User, Auth)
│   ├── routes/      # Routing logic and path definitions
│   ├── App.jsx      # Main application component
│   └── main.jsx     # React entry point
├── package.json     # Project dependencies and scripts
└── vite.config.js   # Vite configuration
```

## 🛠️ Features

- **Role-Based Dashboards:** Distinct views and features based on user roles (Users, Maintenance Managers, Administrators).
- **Authentication:** Secure login and registration.
- **Complaint Management:** Users can raise complaints, attach notes, and track statuses.
- **Data Visualization:** Real-time statistics and insights using Recharts.
- **Responsive Design:** Fully mobile-responsive interface powered by Tailwind CSS.
- **Pagination:** Efficient handling of large complaint datasets directly integrated with backend queries.

## 💻 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository and navigate to the client folder.
2. Install dependencies:

```bash
npm install
```

### Running Locally

Start the Vite development server:

```bash
npm run dev
```

The app will typically be running on `http://localhost:5173`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate the built assets in the `dist/` directory. You can preview the production build using:

```bash
npm run preview
```
