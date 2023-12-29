import { useEffect, FC, useRef }  from "react";
import * as MUI from "@mui/material";
import L from "leaflet";
import { useMap } from "react-leaflet";
import * as MuiIcons from "@mui/icons-material/";
import { IPatrolDto } from "../../apis/patrol";
import { PatrolInfoCard, StyledBadge } from "./style/PatrolInfo.styles";

interface PatrolInfoBaseProps {
    checked: boolean;
    completed: boolean;
    patrolData: IPatrolDto;
}

const PatrolInfo: FC<PatrolInfoBaseProps> = ({patrolData, checked, completed}) => {

    const map = useMap();
    const infoCardRef = useRef(null);

    useEffect(() => {

        if(infoCardRef.current !== null)
            L.DomEvent.disableScrollPropagation(infoCardRef.current);

        const mapZoom = L.control.zoom({
            position: 'bottomright',
        }).addTo(map);
        
        return () => {
            map.removeControl(mapZoom);
        }
        
    },[]);

    return (
        <MUI.Grow 
            appear={false} 
            in={checked} 
            mountOnEnter 
            unmountOnExit
            {...(checked ? { timeout: 1000 } : {})}
            style={{
                transformOrigin: '0 0 0',
                position: 'absolute', 
                top: '80%', 
                left: '25%', 
                transform: 'translate(-50%, -50%)',
            }}
        >
            <PatrolInfoCard ref={infoCardRef}>
                <MUI.CardContent>
                    <MUI.CardHeader className="current-status-title" title="CURRENT STATUS"/> 
                    <MUI.Grid container>
                        <MUI.Grid className={"current-status"} item xs={4}>
                            <MUI.ListItem>
                                <MUI.Stack direction={"row"} alignItems={"center"}>
                                    <MuiIcons.EmojiPeople />
                                    <MUI.Typography>Patrolman</MUI.Typography>
                                </MUI.Stack>
                                <MUI.Typography className="MuiTypography-secondary">{patrolData.patrolman}</MUI.Typography>
                            </MUI.ListItem>
                        </MUI.Grid>
                        <MUI.Grid className={"current-status"} item xs={4}>
                            <MUI.ListItem>
                                <MUI.Stack direction={"row"} alignItems={"center"}>
                                    <MuiIcons.CameraRear sx={{pt: '2px'}} />
                                    <MUI.Typography>Device</MUI.Typography>
                                </MUI.Stack>
                                <MUI.Typography className="MuiTypography-secondary">{patrolData.deviceName}</MUI.Typography>
                            </MUI.ListItem>
                        </MUI.Grid>
                        <MUI.Grid className={"current-status"} item xs={4}>
                            <MUI.ListItem>
                                <MUI.Stack direction={"row"} alignItems={"center"}>
                                    <MuiIcons.Moving />
                                    <MUI.Typography>Status</MUI.Typography>
                                </MUI.Stack>
                                <MUI.Typography className="MuiTypography-secondary completed">
                                    {completed ? "Completed" : "Moving..."}
                                </MUI.Typography>
                            </MUI.ListItem>
                        </MUI.Grid>
                    </MUI.Grid>
                    <MUI.CardHeader className="current-status-title" title="DEVICE HEALTH" />
                    <MUI.Grid container className="device-status" columns={12}>
                        <MUI.Grid item xs={2.4}>
                            <MUI.ListItem>
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <MuiIcons.GpsFixed />
                                </StyledBadge>
                            </MUI.ListItem>
                        </MUI.Grid>
                        <MUI.Grid item xs={2.4}>
                            <MUI.ListItem>
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <MuiIcons.Wifi />
                                </StyledBadge>
                            </MUI.ListItem>
                        </MUI.Grid>
                        <MUI.Grid item xs={2.4}>
                            <MUI.ListItem>
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            backgroundColor: '#c24242',
                                            color: '#c24242',
                                        }
                                    }}
                                >
                                    <MuiIcons.Videocam />
                                </StyledBadge>
                            </MUI.ListItem>
                        </MUI.Grid>
                        <MUI.Grid item xs={2.4}>
                            <MUI.ListItem className="battery">
                                <MuiIcons.Battery80/>
                                <MUI.Typography>89%</MUI.Typography>
                            </MUI.ListItem>
                        </MUI.Grid>
                        <MUI.Grid item xs={2.4}>
                            <MUI.ListItem className="temperature">
                                <MuiIcons.DeviceThermostat/>
                                <MUI.Typography>42°C</MUI.Typography>
                            </MUI.ListItem>
                        </MUI.Grid>
                    </MUI.Grid> 
                </MUI.CardContent>
            </PatrolInfoCard>
        </MUI.Grow>
    )
};

export default PatrolInfo;