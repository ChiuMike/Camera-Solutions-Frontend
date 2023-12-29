import * as MuiIcons from "@mui/icons-material/";
import { FC } from "react";
import * as MUI from "@mui/material";
import { StyledBadge } from "../../../pages/gps/style/DeviceDrawer.styles";
import { IRowData } from "../types";
import { IDeviceDto } from "../../../apis/device";


interface ITableStatusBaseProps {
    data: IRowData;
}

export const setDeviceState = (status: string) => {

    switch (status) {
        case "READY" :
            return <MUI.Chip label="Ready" variant="outlined" size="small"/>;
        case "LIVE_RECORD" :
            return (
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <MuiIcons.VideocamOutlined sx={{transform: 'scale(1.1)',  objectFit: 'cover',}}/>
                </StyledBadge>
            )
        case "VIDEO_RECORD" :
            return (
                <MuiIcons.VideoFileOutlined />
            )
        case "SOS" :
            return (
                <MuiIcons.Sos />
            )
        default :
            return (
                <MuiIcons.CloudOff />
            )   
    }
} 

const TableStatus: FC<ITableStatusBaseProps> = ({data}) => {

    return (
        <MUI.Box className = "table-status"> 
            {setDeviceState((data as IDeviceDto).status)}
        </MUI.Box>
    )
};

export default TableStatus