import { Common } from "../Api";
import { IDeviceDto } from "../device";


export interface IPosition {
    lng: string;
    lat: string;
    update_time: string;
}

export interface IStandingPosition {
    lng?: string;
    lat?: string;
    standingTimeStart?: string;
    standingTimeEnd?: string;
}

export type IMapDevice = {
    device: IDeviceDto;
    geolocation: IPosition[];
}

export interface GetDevicesMapResponse extends Common {
    data: IMapDevice[]
}

export interface GetDeviceHistoryTrackResponse extends Common {
    data: IMapDevice
}