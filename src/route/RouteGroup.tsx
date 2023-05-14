import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";

export interface IRouteProps {
    title?: string[];
    name?: string;
}

export const routeGroup = [
    {path: '/dashboard', component: Dashboard},
    {path: '/users', component: Users},
]