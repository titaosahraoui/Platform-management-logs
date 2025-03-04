
import Layout from "../Layouts/Layout";
import HomePage from "../pages/HomePage";

interface Route {
  path: string;
  component: React.ComponentType;
  parent?: string;
  isAdminRoute?: boolean;
}

interface ParentRoute {
  path: string;
  component: React.ComponentType;
}

export const routes: Route[] = [
  {
    parent: '/',
    path: '/',
    component: HomePage,
  },
];

export const parentRoutes: ParentRoute[] = [
  {
    path: '/',
    component: Layout,
  },
];
