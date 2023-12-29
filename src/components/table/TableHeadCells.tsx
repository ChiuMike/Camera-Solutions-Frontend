import { Column } from "@material-table/core";
import * as MUI from "@mui/material";
import { IUserDto } from "../../apis/users";
import { IRowData } from "./types";
import * as MuiIcons from "@mui/icons-material/";
import { IDeviceDto } from "../../apis/device";
import { Battery } from "../icon";
import TableStatus from "./helper/TableStatus";

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
    { title: "", field: "type", width: "30px" ,render: (row) => {
        const data = row as IDeviceDto;
        return (
            <>
            {
                data.name.toLowerCase().includes("salute") ?
                <MUI.Avatar 
                    src={"/images/salute-removebg.png"}
                    sx={{ 
                        backgroundColor: "#c4e7ff", 
                        width: 40, 
                        height: 40,
                        "img": {
                            transform: "scale(.8)"
                        }
                    }}
                />
                :
                <MUI.Avatar 
                    src={"/images/panther_bg.png"}
                    sx={{ 
                        backgroundColor: "#c4e7ff", 
                        width: 40, 
                        height: 40,
                        "img": {
                            transform: "scale(.7)"
                        }
                    }}
                />
            }
            </>
            
        )
    }},
    { title: "NAME", field: "name", width: '200px'},
    { title: "DEVICE ID", field: "device_id", width: '200px' },
    { title: "UPDATED TIME", field: "updated_at", width: '200px', },
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
    { title: "BATTERY", field: "battery", width: "100px",
        render: (row) => {
            if ((row as IDeviceDto).battery === "none") {
                return (
                    <MUI.Box sx={{width: '80px', display: 'flex', justifyContent: 'center'}}>
                        <MuiIcons.BatteryUnknown fontSize="large" sx={{color: 'hsl(54, 89%, 46%)'}}/>
                    </MUI.Box>
                )
            }
            return (
                <>
                <MUI.Box sx={{width: '80px', display: 'flex', justifyContent: 'center'}}>
                    <Battery level={Number((row as IDeviceDto).battery)}>
                        <MUI.Box className="battery-level"></MUI.Box>
                    </Battery>
                </MUI.Box>
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
                    <MUI.Box sx={{width: '90px', display: 'flex', justifyContent: 'center', color: '#9e9e9e'}}>
                        <MuiIcons.Wifi />
                    </MUI.Box>
                    :
                    <MUI.Box sx={{width: '90px', display: 'flex', justifyContent: 'center', color: '#9e9e9e'}}>
                        <MuiIcons.LteMobiledata fontSize="large"/>
                    </MUI.Box>
                }
                </>
            )
        },
    },
];

export const iotDeviceControlHeadCells: Column<IRowData>[] = [
    { title: "NAME", field: "name", },
    { title: "DEVICE ID", field: "device_id" },
    { title: "UPDATED TIME", field: "updated_at" },
    { title: "BATTERY", field: "battery",
        render: (data) => {
            return (
                <MUI.Box sx={{display: 'flex', justifyContent: 'start'}}>
                    <Battery level={Number((data as IDeviceDto).battery)}>
                        <MUI.Box className="battery-level"></MUI.Box>
                    </Battery>
                </MUI.Box>
            )
        }
    },
    { title: "STATUS", field: "status", 
        render: (data) => {
            return (
                <TableStatus data={data}/>
            )
        } 
    },
];