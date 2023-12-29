export interface ISidebarMenu {
    name: string;
    uri: string;
    submenu?: {
      name: string;
      uri: string;
    }[]
};

export interface IIcon {
    name: string;
}

export const sidebarTop: ISidebarMenu[] = [
    {
        name: 'Dashboard',
        uri: '/dashboard',
    },
    {
        name: 'Users',
        uri: '/users',
    },
];

export const gpsPtt: ISidebarMenu[] = [
    {
        name: 'Map',
        uri: '/map',
    },
    {
        name: 'History Track',
        uri: '/history-track',
    },
    {
        name: 'Patrol',
        uri: '/patrol',
    },
    {
        name: 'Monitor',
        uri: '/monitor',
    },
    {
        name: 'Channel',
        uri: '/channel',
    },
];

export const DeviceManagement: ISidebarMenu[] = [
    {
        name: 'Devices',
        uri: '/devices',
    },
    {
        name: 'Remote Control',
        uri: '/remote-control',
    },
    {
        name: 'Video Upload',
        uri: '/video-upload',
    },
    {
        name: 'Event Log',
        uri: '/event-log',
    },
];

export const Setting: ISidebarMenu[] = [
    {
        name: 'Settings',
        uri: '/settings',
    },
];