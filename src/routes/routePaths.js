const ROUTES = {
  ROOT: "/",

  USER: {
    ROOT: "/user",

    HOME: "/user/home",
    SIGNUP: "/user/signup",
    LOGIN: "/user/login",
    FORM: "/user/form",
    PROFILE:"/user/profile",

    DASHBOARD: "/user/dashboard",
    DASHBOARD_PENDING: "/user/dashboard/pending",
    DASHBOARD_RESOLVED: "/user/dashboard/resolved",
    DASHBOARD_ANALYTICS: "/user/dashboard/analytics",
    DASHBOARD_SETTINGS: "/user/dashboard/settings",
  },

  MAINTENANCE: {
    ROOT: "/maintenance",
    LOGIN: "/maintenance/login",
    DASHBOARD: "/maintenance/dashboard",
  },
};

export default ROUTES;
