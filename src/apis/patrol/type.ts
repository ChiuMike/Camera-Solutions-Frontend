import { Common } from "../Api";

export type IPatrolDto = {
   patrolId: string;
   patrolType: string;
   patrolman: string;
   deviceName: string;
   vehicleNumber: string;
   progress: number;
   created_at: string;
}

export type IPatrolGPSDto = {
    lat: string;
    lng: string;
}

export interface ReadAllPatrolsResponse extends Common {
    data: IPatrolDto[];
}

export interface GetPatrolResponse extends Common {
    data: IPatrolGPSDto[];
}