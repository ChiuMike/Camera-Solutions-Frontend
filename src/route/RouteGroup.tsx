import { FC } from "react";
import Dashboard from "../pages/dashboard/Dashboard";
import Device from "../pages/devices/Device";
import DeviceMap from "../pages/gps/DeviceMap";
import Users from "../pages/users/Users";

export interface IRouteProps {
    title?: string[];
    name?: string;
}

export const routeGroup = [
    {path: '/dashboard', component: Dashboard},
    {path: '/users', component: Users},
    {path: '/devices', component: Device},
    {path: '/map', component: DeviceMap},
]