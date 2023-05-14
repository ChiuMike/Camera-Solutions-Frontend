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

export const sidebarImages: ISidebarMenu[] = [
    {
        name: 'Map',
        uri: '/map',
    },
    {
        name: 'History Track',
        uri: '/history-track',
    },
    {
        name: 'Monitor',
        uri: '/monitor',
    },
    {
        name: 'Video Chat',
        uri: '/video-chat',
    },
];

export const sidebarDevices: ISidebarMenu[] = [
    {
        name: 'Devices',
        uri: '/devices',
    },
    {
        name: 'Remote Control',
        uri: '/remote-control',
    },
    {
        name: 'Event Logs',
        uri: '/logs',
    },
];