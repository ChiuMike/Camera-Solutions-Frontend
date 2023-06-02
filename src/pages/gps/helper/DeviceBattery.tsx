import * as MUI from "@mui/material";
import { FC } from "react";

interface DeviceBatteryBaseProps {
    batteryStatus: string;
}

interface IBatteryType {
    color: string;
    flex1: number;
    flex2: number;
    per: string
}

const setBatteryColor = (batteryStatus: string): IBatteryType => {
    switch(batteryStatus) {
        case "low":
            return {
                color: 'hsl(54, 89%, 46%)',
                flex1: 1,
                flex2: 2,
                per: '25%'
            };
        case "medium":
            return {
                color: '#118bee',
                flex1: 2,
                flex2: 1,
                per: '75%'
            };
        default: 
            return {
                color: 'hsl(22, 89%, 46%)',
                flex1: 1,
                flex2: 1,
                per: '50%'
            };
    }
}

const DeviceBattery: FC<DeviceBatteryBaseProps> = ({batteryStatus}) => {

    return (
        <span style={{width: '150px', display: 'flex', alignItems: 'center', gap: "8px"}}>
            <span
                style={{
                    display: 'flex',
                    flexBasis: "100px",
                    height: "12px",
                    backgroundColor: "#e4e4e4",
                    borderRadius: "30px",
                    overflow: "hidden",
                }}
            >
                <span
                    style={{
                        flex: `${setBatteryColor(batteryStatus).flex1}`,
                        backgroundColor: `${setBatteryColor(batteryStatus).color}`,
                        height: "100%",
                        transition: "width 0.5s ease",
                    }}
                >

                </span>
                <span
                    style={{
                        flex: `${setBatteryColor(batteryStatus).flex2}`,
                        backgroundColor: '#e4e4e4',
                        height: "100%",
                        transition: "width 0.5s ease",
                    }}
                ></span>
            </span>
            <MUI.Typography component={'span'} sx={{flex: 1, color: '#9e9e9e'}}>{setBatteryColor(batteryStatus).per}</MUI.Typography>
        </span>
    )
};

export default DeviceBattery;