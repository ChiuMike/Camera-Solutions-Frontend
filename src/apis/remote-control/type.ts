import { Common } from "../Api";

export interface RemoteControlResponse extends Common {
    data: {}
};

export type RemoteControlState = {
    status: string;
}

export type IDeviceState = {
    device_id: string;
    name: string;
    online: boolean;
    status: string;
    tenant_uuid: string;
    updated_at: string;
    uuid: string;
    battery_level: number;
}

export type ArchiveDeviceState = {
    uploadedFile: {
        filename: string;
        startTime: string;
        endTime: string;
    },
    totalFiles: number;
    archivedFiles: number;
    beginAt: string;
    endAt: string;
}

export type ToArchiving = {
    device: string;
    action: string;
    data: {
        beginAt: string;
        endAt: string;
    },
    tenantUuid: string;
}

export interface RemoteControlStateResponse extends Common {
    data: RemoteControlState;
}

export interface AllremoteDeviceStateResponse extends Common {
    data: IDeviceState[];
}

export interface GetArchiveDeviceStateResponse extends Common {
    data: ArchiveDeviceState;
}