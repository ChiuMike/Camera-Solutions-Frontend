import * as MUI from "@mui/material";
import { useEffect, FC, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import * as MuiIcons from "@mui/icons-material/";
import { useMap } from "react-leaflet";
import Control from 'react-leaflet-custom-control';
import { MapButton } from "../style/MapControl.styles";
import useClick from "../../../hooks/useClick";
import SearchCollapse from "./SearchCollapse";
import UpdateTimeDrawer from "./UpdateTimeDrawer";
import { SosPopup } from "../../../components/popup";
import { IMapDevice } from "../../../apis/geolocation";

interface MapControlBaseProps {
    mapDevices: IMapDevice[];
}

const MapsControls: FC<MapControlBaseProps> = ({mapDevices}) => {

    const map = useMap();
    const [handleSearch, isOpenSearch, setOpenSearch] = useClick();
    const [handleUpdate, isOpenUpdate, setOpenUpdate] = useClick();
    const [handleSos, isOpenSos, setOpenSos] = useClick();
    const [sos, setSos] = useState(true);

    useEffect(() => {

        const mapZoom = L.control.zoom({
            position: 'bottomleft',
        }).addTo(map);

        if (!isOpenSearch) setOpenSearch(true);
        
        return () => {
            map.removeControl(mapZoom);
        }
        
    },[]);

    return (
        <>
        <UpdateTimeDrawer isOpenUpdate={isOpenUpdate} setOpenUpdate={setOpenUpdate}/>
        <SosPopup open={isOpenSos} setOpen={setOpenSos} setSos={setSos} />
        <Control 
            position="topright"
            style={{border: 'none', display: 'flex', }}
        >
            <SearchCollapse isOpenSearch={isOpenSearch} sos={sos} mapDevices={mapDevices} />
            <MUI.Box sx={{display: 'flex', flexDirection: "column", gap: "16px", marginTop: '50px'}}>
                <MUI.Tooltip title="SEARCH" placement="left">
                    <MapButton onClick={handleSearch} open={isOpenSearch} btnColor={"#00bcd4"}>
                        <MuiIcons.Search className="control-button"/>  
                    </MapButton>
                </MUI.Tooltip>
                <MUI.Tooltip title="Update frequency" placement="left">
                    <MapButton open={isOpenUpdate} onClick={handleUpdate} btnColor={'rgb(172, 171, 166)'}>
                        <MuiIcons.Update className="control-button"/>  
                    </MapButton>
                </MUI.Tooltip>
                <MUI.Tooltip title="SOS" placement="left">
                    <MapButton open={isOpenSos} onClick={handleSos} btnColor={"#c24242"} sos={sos} disabled={!sos}>
                        <MuiIcons.Sos className="control-button"/>  
                    </MapButton>
                </MUI.Tooltip>
                <MUI.Tooltip title="CALL" placement="left">
                    <MapButton open={false} btnColor={'#02759F'} >
                        <MuiIcons.Call className="control-button"/>  
                    </MapButton>
                </MUI.Tooltip>
            </MUI.Box>
        </Control>
        </>
    )

}

export default MapsControls;