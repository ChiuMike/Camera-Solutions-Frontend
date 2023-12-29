import { useRef, useState, useContext, FC, Dispatch, SetStateAction } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Control from "react-leaflet-custom-control";
import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { IHistoryDevice } from "../../../apis/geolocation";
import { TrackStateContext, TrackState } from "../context/TrackStateProvider";
import { Container } from "../style/HistoryMap.styles";
import { MapStateButton } from "../../../components/button";
import { TimeLineContainer } from "../style/Timeline.styles";
import CarRoute from "./CarRoute";
import HistoryTimeline from "../timeline/HistoryTimeline";

interface HistoryMapBaseProps {
    navDrawerOpen: boolean;
    mobileOpen: boolean;
    setMobileOpen: Dispatch<SetStateAction<boolean>>;
    setTopOpen: Dispatch<SetStateAction<boolean>>;
    topOpen: boolean;
    historyDevice?: IHistoryDevice;
    trackLoading: boolean;
};

const HistoryMap: FC<HistoryMapBaseProps> = ({navDrawerOpen, mobileOpen, setMobileOpen, setTopOpen, topOpen, historyDevice, trackLoading}) => {

    const { timelineOpen, bottomOpen, timePeriod, selectedIndex, viewRoute, viewMarkers, play, mode, handleDisabled, disabled } = useContext(TrackStateContext) as TrackState;

    const containerRef = useRef(null);

    const [checked, setChecked] = useState(false);

    return (
        <Container 
            checked={checked} 
            open={mobileOpen} 
            navDrawerOpen={navDrawerOpen} 
            topOpen={topOpen} 
            timelineOpen={timelineOpen}
            ref={containerRef}
        >
            <MapContainer
                className="markercluster-map"
                style={{height:'100%'}}
                zoomControl={false}
                center={[20, 0]}
                zoom={2}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Control
                    position="topleft"
                    style={{border: 'none'}}
                >
                    {mode !== "" ? 
                        <MUI.Zoom in={mode !== ""}> 
                            <MapStateButton
                                label={mode.toUpperCase()}
                                icon={
                                    mode === "car" ?
                                    <MuiIcons.DirectionsCar />
                                    :
                                    <MuiIcons.DirectionsWalk />
                                }
                                sx={{marginLeft: '5px', marginTop: '8px'}}
                            />
                        </MUI.Zoom>  
                        :
                        null
                    }
                </Control>
                    {mode === "walk" ?
                        <></>
                        // <Route 
                        //     position={historyDevice.geolocation}
                        //     standingGeolocation={historyDevice.standingGeolocation}
                        //     trackLoading={trackLoading}
                        //     timePeriod={timePeriod}
                        //     selectedIndex={selectedIndex}
                        //     viewRoute={viewRoute}
                        //     viewMarkers={viewMarkers}
                        //     play={play}
                        // />
                        :
                        <CarRoute
                            position={historyDevice ? historyDevice.geolocation : []}
                            // standingGeolocation={historyDevice.standingGeolocation}
                            timePeriod={timePeriod}
                            selectedIndex={selectedIndex}
                            viewRoute={viewRoute}
                            viewMarkers={viewMarkers}
                            play={play}
                            handleDisabled={handleDisabled}
                            disabled={disabled}
                        />
                    }
            </MapContainer>
            <TimeLineContainer bottomOpen={bottomOpen} timelineOpen={timelineOpen}>
                <HistoryTimeline />
            </TimeLineContainer>
        </Container >
    )
};

export default HistoryMap;