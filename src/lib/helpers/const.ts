const PAGE_ROUTES = {
  main: "/",
  blog: "/blog",
  about: "/about",
  contact: "/contact",
  admin: "/admin",
  login: "/login",
  register: "/register",
  profile: "/profile",
} as const;

const PROVIDERS = ["google", "github"];

export { PAGE_ROUTES, PROVIDERS };
