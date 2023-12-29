import { FC } from "react";
import Channel from "../pages/channel/Channel";
import Dashboard from "../pages/dashboard/Dashboard";
import Device from "../pages/devices/Device";
import DeviceMap from "../pages/gps/DeviceMap";
import HistoryTrack from "../pages/history-track/HistoryTrack";
import Monitor from "../pages/monitor/Monitor";
import Patrol from "../pages/patrol/Patrol";
import RemoteControl from "../pages/remote-control/RemoteControl";
import Users from "../pages/users/Users";
import VideoUpload from "../pages/video-upload/VideoUpload";

export interface IRouteProps {
    title?: string[];
    name?: string;
}

export const routeGroup = [
    {path: '/dashboard', component: Dashboard},
    {path: '/users', component: Users},
    {path: '/devices', component: Device},
    {path: '/map', component: DeviceMap},
    {path: '/history-track', component: HistoryTrack},
    {path: '/patrol', component: Patrol},
    {path: "/video-upload", component: VideoUpload},
    {path: "/remote-control", component: RemoteControl},
    {path: "/channel", component: Channel},
    {path: "/monitor", component: Monitor}
]