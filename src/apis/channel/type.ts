import { Common } from "../Api";

export type ListChannels = {
    uuid: string;
    name: string;
    updated_at: string;
    created_at: string;
}

export type ChannelDevice = {
    uuid: string;
    name: string;
    updated_at: string;
    created_at: string;
    lat: string;
    lng: string;
    update_time: string;
}

export interface ListChannelResponse extends Common {
    data: ListChannels[]
}

export interface ListChannelDeviceResponse extends Common {
    data: ChannelDevice[]
}