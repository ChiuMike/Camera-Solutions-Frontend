import { useRef, FC, Dispatch, SetStateAction, useEffect } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Container } from "../style/DeviceMap.styles";
import "../style/map.css";
import * as MUI from "@mui/material";
import Marker from "../marker/Marker";
import { IMapDevice } from "../../../apis/geolocation";
import MapsControls from "../control/MapsControls";

interface MapBaseProps {
    mobileOpen: boolean;
    navDrawerOpen: boolean;
    mapDevices: IMapDevice[];
    mapLoading: boolean;
    toggleSwipDrawer: () => void;
    swipeOpen: boolean;
}

const Map: FC<MapBaseProps> = ({navDrawerOpen, mobileOpen, mapDevices, mapLoading, toggleSwipDrawer, swipeOpen}) => {

    const MarkerMountedRef = useRef(false);
    const previousViweRef = useRef<L.LatLngExpression>();
    const previousZoomRef = useRef<number>();
    const containerRef = useRef<HTMLElement>(null);
    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');

    useEffect(() => {
        if(mobileOpen) {
            setTimeout(() => {
                if(containerRef.current) {
                    containerRef.current.style.zIndex = "1000"
                }
            }, 500)
        } else {
            if(containerRef.current) {
                containerRef.current.style.zIndex = "999"
            }
        }
    } ,[mobileOpen])

    return (
        <Container navDrawerOpen={navDrawerOpen} mobileOpen={mobileOpen} mediaMatches={mediaMatches} ref={containerRef}>
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
                <MapsControls toggleSwipDrawer={toggleSwipDrawer} swipeOpen={swipeOpen} />
                <Marker 
                    mapDevices={mapDevices} 
                    previousViweRef={previousViweRef}
                    MarkerMountedRef={MarkerMountedRef}
                    previousZoomRef={previousZoomRef}
                    mapLoading={mapLoading}
                />
            </MapContainer>
        </Container>
    )
};

export default Map;