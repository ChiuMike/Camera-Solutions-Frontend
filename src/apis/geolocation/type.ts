import { Common } from "../Api";
import { IDeviceDto } from "../device";

export interface IPosition {
    lng: string;
    lat: string;
    update_time: string;
}

export interface IHistoryPosition {
    lng: string;
    lat: string;
    update_time: string;
    standingTime: string;
}

export type IMapDevice = {
    device: IDeviceDto;
    geolocation: IPosition[];
};

export type IHistoryDevice = {
    device: string;
    geolocation: IHistoryPosition[];
}

export interface GetDevicesMapResponse extends Common {
    data: IMapDevice[]
}

export interface GetDeviceHistoryTrackResponse extends Common {
    data: IHistoryDevice
}