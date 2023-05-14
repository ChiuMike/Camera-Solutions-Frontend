import { Action, Column } from "@material-table/core";
import * as React from "react";
import { AxiosRequestConfig, Method } from "axios";
import * as MUI from "@mui/material";

export type ITableData = {
    checked: boolean;
    id: number;
    index: number;
    uuid: string;
}

export interface IRowData {
    [key: string]: string | number | null | boolean | ITableData | undefined;
    tableData?: ITableData;
}