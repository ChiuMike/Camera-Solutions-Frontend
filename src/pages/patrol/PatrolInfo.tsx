import { useEffect, FC, useRef, Dispatch, SetStateAction, useState }  from "react";
import * as MUI from "@mui/material";
import L from "leaflet";
import { useMap } from "react-leaflet";
import * as MuiIcons from "@mui/icons-material/";
import { IPatrolDto } from "../../apis/patrol";
import { PatrolInfoContainer, PatrolTimelineItem } from "./style/PatrolInfo.styles";
import Control from 'react-leaflet-custom-control';
import { Battery } from "../../components/icon";

interface PatrolInfoBaseProps {
    checked: boolean;
    patrolData: IPatrolDto;
    setChecked: Dispatch<SetStateAction<boolean>>;
    setSelectedPatrol: Dispatch<SetStateAction<string>>
}

const PatrolInfo: FC<PatrolInfoBaseProps> = ({patrolData, checked, setSelectedPatrol, setChecked}) => {

    const map = useMap();
    const divContainer = useRef<HTMLDivElement>(null);
    const mediaMatches = MUI.useMediaQuery('(max-width:771px)');

    const [zoomOut, setZoomOut] = useState(false);

    const handleChecked = () => {
        setChecked((prev) => !prev);
        setSelectedPatrol("");
        if(mediaMatches && zoomOut) {
            handleCollapse();
        }
    };

    const handleCollapse = () => {
        setZoomOut((prev) => !prev);
    }

    useEffect(() => {

        if(divContainer && divContainer.current !== null) {
            L.DomEvent.disableScrollPropagation(divContainer.current as HTMLDivElement);
        }

        const mapZoom = L.control.zoom({
            position: 'bottomright',
        }).addTo(map);
        
        return () => {
            map.removeControl(mapZoom);
        }
        
    }, []);

    useEffect(() => {
        if(checked) return;
        map.setView([10, 0], 2);
        
    }, [checked]);

    return (
        <>
        {
        checked ?
        <Control 
            position="topleft"
            style={{border: 'none'}}
        >
            <PatrolInfoContainer ref={divContainer} zoomOut={zoomOut}>
                <MUI.Box className="btns">
                    <MUI.Button 
                        variant="contained" 
                        startIcon={<MuiIcons.KeyboardBackspace />}
                        onClick={handleChecked}
                    >
                        BACK
                    </MUI.Button>
                    <MUI.Button 
                        className="zoom-out"
                        variant="contained" 
                        startIcon={
                            !zoomOut ? 
                            <MuiIcons.ArrowDropUp />
                            :
                            <MuiIcons.ArrowDropDown />
                        }
                        onClick={handleCollapse}
                    >
                        {
                            !zoomOut ? "Expand" : "Collapse"
                        }
                    </MUI.Button>
                </MUI.Box>
                <MUI.Collapse in={mediaMatches ? zoomOut: true}>
                    <MUI.Box className="info-card">
                        <MUI.Box className="header">
                            <MUI.ListItem>
                                <MUI.ListItemAvatar>
                                    <MUI.Avatar 
                                        alt="police" 
                                        src="/images/police.jpg"
                                    />
                                </MUI.ListItemAvatar>
                                <MUI.ListItemText primary={patrolData.patrolman} secondary={patrolData.patrolId} />
                            </MUI.ListItem>
                            <MUI.Box className="progress">
                                <MUI.Typography>
                                    Patrol Progress
                                </MUI.Typography>
                                <MUI.Box className="progress-circle">
                                    <MUI.CircularProgress
                                        variant="determinate"
                                        sx={{ color: "#EEEEEE"}}
                                        size={48}
                                        thickness={4}
                                        value={100}
                                    />
                                    <MUI.CircularProgress
                                        variant="determinate"
                                        sx={{
                                            color: "#0077C0",
                                            position: "absolute",
                                            left: 0,
                                        }}
                                        size={48}
                                        thickness={4}
                                        value={Number(patrolData.progress)}
                                    />
                                    <MUI.Box className="percent-text">
                                        <MUI.Typography
                                            variant="caption"
                                            component="div"
                                            color="text.secondary"
                                            sx={{fontSize: 12, lineHeight: "140%"}}
                                        >
                                            {`${patrolData.progress}%`}
                                        </MUI.Typography>
                                    </MUI.Box>
                                </MUI.Box>
                            </MUI.Box>
                        </MUI.Box>
                        <MUI.Divider orientation="horizontal" variant="middle" flexItem />
                        <MUI.Box className="content">
                            <MUI.ListItem>
                                <MUI.ListItemAvatar>
                                    {
                                        patrolData.patrolType.includes("Bike patrol") ?
                                            <MUI.Avatar 
                                                alt="police" 
                                                src="/images/bike.png"
                                            />
                                            :
                                            <MUI.Avatar 
                                                alt="police" 
                                                src="/images/PoliceCar.jpg"
                                            />
                                    }
                                    
                                </MUI.ListItemAvatar>
                                <MUI.ListItemText primary="Vehicle" secondary={patrolData.vehicleNumber} />
                            </MUI.ListItem>
                            <MUI.Box className="last-update">
                                <MUI.Typography>
                                    Last Update 13:48 PM
                                </MUI.Typography>
                            </MUI.Box>
                        </MUI.Box>
                        <MUI.Divider orientation="horizontal" variant="middle" flexItem />
                        <MUI.Box className="footer">
                            <MUI.ListItem>
                                <MUI.ListItemAvatar>
                                    {patrolData.deviceName.includes("Salute") ? 
                                        <MUI.Avatar variant="rounded" src="/images/salute-removebg.png" />
                                        :
                                        <MUI.Avatar 
                                            variant="rounded" 
                                            src="/images/panther_bg.png"
                                            sx={{
                                                "img": {
                                                    transform: 'scale(0.85)'
                                                }
                                            }}
                                        />
                                    }
                                </MUI.ListItemAvatar>
                                <MUI.Box className="MuiListItemText-root">
                                    <MUI.Typography className="primary">{patrolData.deviceName}</MUI.Typography>
                                    <MUI.Box className="state">
                                        <MUI.Box className="state-dot"/>
                                        <MUI.Typography>
                                            On Patrol
                                        </MUI.Typography>
                                    </MUI.Box>
                                </MUI.Box>
                            </MUI.ListItem>
                            <Battery level={65}>
                                <MUI.Box className="battery-level"></MUI.Box>
                            </Battery>
                        </MUI.Box>
                    </MUI.Box>
                    <MUI.Box className="timeline-container">
                        <MUI.Box className="header">
                            <MUI.Typography>
                                Patrol Timeline
                            </MUI.Typography>
                            <MUI.Button 
                                variant="contained" 
                                startIcon={<MuiIcons.Refresh />}
                                size="small"
                            >
                                Refresh
                            </MUI.Button>
                        </MUI.Box>
                        <MUI.Box className="timeline-list">
                            <MUI.Box className="content">
                                <PatrolTimelineItem>
                                    <MUI.Box className="icon-time">
                                        <MUI.Box className="icon-connector">
                                            <MuiIcons.LocalPolice />
                                            <MUI.Box className="connector" />
                                        </MUI.Box>
                                        <MUI.Box className="update-time">
                                            <MUI.Typography>
                                                10:00 AM
                                            </MUI.Typography>
                                        </MUI.Box>
                                    </MUI.Box>
                                    <MUI.Box className="text">
                                        <MUI.Typography className="title">
                                            Start from Neihu Police Station
                                        </MUI.Typography>
                                        <MUI.Typography className="address">
                                            No. 261, Sec. 2, Neihu Rd., Neihu Dist., Taipei City
                                        </MUI.Typography>
                                    </MUI.Box>
                                </PatrolTimelineItem>
                                <PatrolTimelineItem>
                                    <MUI.Box className="icon-time">
                                        <MUI.Box className="icon-connector">
                                            <MuiIcons.NearMe />
                                            <MUI.Box className="connector" />
                                        </MUI.Box>
                                        <MUI.Box className="update-time">
                                            <MUI.Typography>
                                                10:10 AM
                                            </MUI.Typography>
                                        </MUI.Box>
                                    </MUI.Box>
                                    <MUI.Box className="text">
                                        <MUI.Typography className="title">
                                            Start driving to patrol
                                        </MUI.Typography>
                                        <MUI.Typography className="address">
                                            No. 262, Sec. 2, Neihu Rd., Neihu Dist., Taipei City
                                        </MUI.Typography>
                                    </MUI.Box>
                                </PatrolTimelineItem>
                                <PatrolTimelineItem>
                                    <MUI.Box className="icon-time">
                                        <MUI.Box className="icon-connector">
                                            <MuiIcons.DirectionsCar />
                                            <MUI.Box className="connector" />
                                        </MUI.Box>
                                        <MUI.Box className="update-time">
                                            <MUI.Typography>
                                                10:46 AM
                                            </MUI.Typography>
                                        </MUI.Box>
                                    </MUI.Box>
                                    <MUI.Box className="text">
                                        <MUI.Typography className="title">
                                            Driving
                                        </MUI.Typography>
                                        <MUI.Typography className="address">
                                            No. 11, Sec. 3, Neihu Rd., Neihu Dist., Taipei City
                                        </MUI.Typography>
                                    </MUI.Box>
                                </PatrolTimelineItem>
                                <PatrolTimelineItem>
                                    <MUI.Box className="icon-time">
                                        <MUI.Box className="icon-connector">
                                            <MuiIcons.PauseCircle />
                                            <MUI.Box className="connector" />
                                        </MUI.Box>
                                        <MUI.Box className="update-time">
                                            <MUI.Typography>
                                                11:28 AM
                                            </MUI.Typography>
                                        </MUI.Box>
                                    </MUI.Box>
                                    <MUI.Box className="text">
                                        <MUI.Typography className="title">
                                            Stopped
                                        </MUI.Typography>
                                        <MUI.Typography className="address">
                                            At Check Point,  No. 111, Sec. 5, Wenhu Rd., Neihu Dist., Taipei City
                                        </MUI.Typography>
                                    </MUI.Box>
                                </PatrolTimelineItem>
                                <PatrolTimelineItem>
                                    <MUI.Box className="icon-time">
                                        <MUI.Box className="icon-connector">
                                            <MuiIcons.DirectionsCar />
                                            <MUI.Box className="connector" />
                                        </MUI.Box>
                                        <MUI.Box className="update-time">
                                            <MUI.Typography>
                                                11:38 AM
                                            </MUI.Typography>
                                        </MUI.Box>
                                    </MUI.Box>
                                    <MUI.Box className="text">
                                        <MUI.Typography className="title">
                                            Driving
                                        </MUI.Typography>
                                        <MUI.Typography className="address">
                                            No. 114, Sec. 5, Wenhu Rd., Neihu Dist., Taipei City
                                        </MUI.Typography>
                                    </MUI.Box>
                                </PatrolTimelineItem>
                                <PatrolTimelineItem>
                                    <MUI.Box className="icon-time">
                                        <MUI.Box className="icon-connector">
                                            <MuiIcons.DirectionsCar />
                                            <MUI.Box className="connector" />
                                        </MUI.Box>
                                        <MUI.Box className="update-time">
                                            <MUI.Typography>
                                                12:34 PM
                                            </MUI.Typography>
                                        </MUI.Box>
                                    </MUI.Box>
                                    <MUI.Box className="text">
                                        <MUI.Typography className="title">
                                            Driving to checked point
                                        </MUI.Typography>
                                        <MUI.Typography className="address">
                                            No. 261, Sec. 2, Neihu Rd., Neihu Dist., Taipei City
                                        </MUI.Typography>
                                    </MUI.Box>
                                </PatrolTimelineItem>
                                <PatrolTimelineItem>
                                    <MUI.Box className="icon-time">
                                        <MUI.Box className="icon-connector">
                                            <MuiIcons.PauseCircle />
                                            <MUI.Box className="connector" />
                                        </MUI.Box>
                                        <MUI.Box className="update-time">
                                            <MUI.Typography>
                                                13:04 PM
                                            </MUI.Typography>
                                        </MUI.Box>
                                    </MUI.Box>
                                    <MUI.Box className="text">
                                        <MUI.Typography className="title">
                                            Stopped
                                        </MUI.Typography>
                                        <MUI.Typography className="address">
                                            At Check Point, Bei'an Rd., Zhongshan Dist., Taipei City
                                        </MUI.Typography>
                                    </MUI.Box>
                                </PatrolTimelineItem>
                            </MUI.Box>
                        </MUI.Box>
                    </MUI.Box>
                </MUI.Collapse>
            </PatrolInfoContainer>
        </Control>
        :
        null
        }
        </>
    )
};

export default PatrolInfo;