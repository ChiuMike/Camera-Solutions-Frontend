import { Column } from "@material-table/core";
import * as MUI from "@mui/material";
import { IUserDto } from "../../apis/users";
import { IRowData } from "./types";
import * as MuiIcons from "@mui/icons-material/";
import { IDeviceDto } from "../../apis/device";

export const UsersHeadCell: Column<IRowData>[] = [
    { title: "USERNAME", field: "username"},
    { title: "EMAIL", field: "email"},
    { title: "ROLE", field: "role", 
        render: (row) => {  
            return (
                <>
                {(row as IUserDto).role === "ADMIN" ?
                    <MUI.Tooltip title="ADMIN">
                        <MUI.Box>
                            <MuiIcons.AdminPanelSettings sx={{color: '#c24242'}}/>
                        </MUI.Box>
                    </MUI.Tooltip>
                    :
                    <MUI.Tooltip title="USER">
                        <MUI.Box>
                            <MuiIcons.Person sx={{color: '#02759F'}}/>
                        </MUI.Box>
                    </MUI.Tooltip>
                }
                </>
            )
        },
    },
    { title: "UPDATED TIME", field: "updated_at" },
    { title: "CREATED TIME", field: "created_at" },
];

export const iotDeviceHeadCells: Column<IRowData>[] = [
    { title: "NAME", field: "name"},
    { title: "DEVICE ID", field: "device_id" },
    { title: "UPDATED TIME", field: "updated_at" },
    { title: "CONNECTION", field: "connection", width: '100px',
        render: (row) => {  
            return (
                <>
                {(row as IDeviceDto).connection ?
                     <MUI.Box sx={{width: '100px', display: 'flex', justifyContent: 'center'}}>
                        <MuiIcons.CheckCircle sx={{color: '#8bc34a'}} />
                    </MUI.Box>
                    :
                    <MUI.Box sx={{width: '100px', display: 'flex', justifyContent: 'center'}}>
                        <MuiIcons.DoNotDisturbOn sx={{color: '#c24242'}}/>
                    </MUI.Box>
                }
                </>
            )
        },
    },
    { title: "NETWORK", field: "network", width: '100px',
        render: (row) => {  
            if ((row as IDeviceDto).network === "none") {
                return (
                    <MUI.Box sx={{width: '90px', display: 'flex', justifyContent: 'center'}}>
                        <MuiIcons.SignalCellularNodata sx={{color: '#c24242'}}/>
                    </MUI.Box>
                )
            }
            return (
                <>
                {(row as IDeviceDto).network === "wifi" ?
                    <MUI.Box sx={{width: '90px', display: 'flex', justifyContent: 'center'}}>
                        <MuiIcons.Wifi />
                    </MUI.Box>
                    :
                    <MUI.Box sx={{width: '90px', display: 'flex', justifyContent: 'center'}}>
                        <MuiIcons.LteMobiledata fontSize="large"/>
                    </MUI.Box>
                }
                </>
            )
        },
    },
    { title: "BATTERY", field: "battery", width: "100px",
        render: (row) => {
            if ((row as IDeviceDto).battery === "none") {
                return (
                    <MUI.Box sx={{width: '80px', display: 'flex', justifyContent: 'center'}}>
                        <MuiIcons.BatteryUnknown fontSize="large" sx={{color: '#c24242'}}/>
                    </MUI.Box>
                )
            }
            return (
                <>
                {(row as IDeviceDto).battery === "low" ?
                    <MUI.Box sx={{width: '80px', display: 'flex', justifyContent: 'center'}}>
                        <MuiIcons.Battery20 sx={{color: '#c24242'}} fontSize="large"/>
                    </MUI.Box>
                    :
                    <MUI.Box sx={{width: '80px', display: 'flex', justifyContent: 'center'}}>
                        <MuiIcons.Battery80 sx={{color: '#00bcd4'}} fontSize="large"/>
                    </MUI.Box>
                }
                </>
            )
        },
    },
    { title: "TEMPERATURE", field: "temperature"},
];