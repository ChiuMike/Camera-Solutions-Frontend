import { Common } from "../Api";

export type IPatrolDto = {
   patrolId: string;
   patrolType: string;
   distance: string;
   patrolman: string;
   deviceName: string;
   checkNums: string;
   gps: boolean;
   network: string;
   battery: string;
   temperature: string;
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