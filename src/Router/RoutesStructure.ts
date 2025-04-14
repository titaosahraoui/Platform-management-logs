
import LogExplorer from "../Components/LogExplorer";
import LoginForm from "../Components/LoginForm";
import Layout from "../Layouts/Layout";
import Dashboard from "../pages/Dashboard";
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
  {
    path: '/login',
    component: LoginForm,
  },
  {
  parent: '/',
  path: '/Dashboard',
  component: Dashboard,
  },
  {
    parent: '/',
    path: '/logs',
    component: LogExplorer,
    },
];

export const parentRoutes: ParentRoute[] = [
  {
    path: '/',
    component: Layout,
  },
];
