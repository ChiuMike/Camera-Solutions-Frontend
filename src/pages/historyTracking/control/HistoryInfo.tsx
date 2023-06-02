import * as MUI from "@mui/material";
import { FC, useEffect } from "react";
import { IHistoryDevice } from "../../../apis/geolocation";
import L from "leaflet";
import * as MuiIcons from "@mui/icons-material/";
import { useMap } from "react-leaflet";
import Control from 'react-leaflet-custom-control';
import useClick from "../../../hooks/useClick";
import { MapButton } from "../../gps/style/MapControl.styles";
import HistoryInfoCollapse from "./HistoryInfoCollapse";

interface HistoryInfoBaseProps {
    totalDistance: string;
    totalTime: string;
    history?: IHistoryDevice;
}

const HistoryInfo: FC<HistoryInfoBaseProps> = ({history, totalDistance, totalTime}) => {

    const map = useMap();
    const [handleInfo, isOpenInfo, setOpenInfo] = useClick();

    useEffect(() => {

        const mapZoom = L.control.zoom({
            position: 'bottomright',
        }).addTo(map);

        if (!isOpenInfo) setOpenInfo(true);
        
        return () => {
            map.removeControl(mapZoom);
        }
        
    },[]);

    return (
        <Control 
            position="topright"
            style={{border: 'none', display: 'flex', marginTop: '50px' }}
        >   
            <HistoryInfoCollapse 
                isOpenInfo={isOpenInfo}
                history={history}
                totalDistance={totalDistance}
                totalTime={totalTime}
            />
            <MUI.Tooltip title="HISTORY" placement="left">
                <MapButton onClick={handleInfo} open={isOpenInfo} btnColor={"#02759F"}>
                    <MuiIcons.Timeline className="control-button"/>  
                </MapButton>
            </MUI.Tooltip>
        </Control>
    )
};

export default HistoryInfo;