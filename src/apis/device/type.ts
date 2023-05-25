import { Common } from "../Api";

export type IDeviceDto = {
    uuid: string;
    name: string;
    device_id: string;
    updated_at: string;
    created_at: string;
    connection: boolean,
    network: string,
    temperature: string,
    battery: string,
}

export type IAddDeviceDto = {
    id: number;
    uuid: string;
}

export interface ReadIotDevicesResponse extends Common {
    data: IDeviceDto[];
}

export interface AddDeviceResponse extends Common {
    data: IAddDeviceDto;
}