export type TimeRange = {
    start: number;
    end: number;
};

export type TimePeriod = {
    actionStart: string;
    actionEnd: string;
};

export interface IMapUpdate {
    interval_end: string,
    interval_start : string,
    interval: number
}