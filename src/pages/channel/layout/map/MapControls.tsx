import * as MUI from "@mui/material";
import { useEffect, Dispatch, SetStateAction, MutableRefObject } from "react";
import { useMap } from "react-leaflet";
import Control from "react-leaflet-custom-control";
import { UpdateDonePopup } from "../../../../components/popup";
import useClick from "../../../../hooks/useClick";
import { IMapUpdate } from "../../../../types/web";
import UpdateTimeDrawer from "../../../gps/control/UpdateTimeDrawer";
import * as MuiIcons from "@mui/icons-material/";
import { MapButton } from "../../../gps/style/MapControl.styles";
import L from "leaflet";
import { useClientChannelsState } from "../../context/ClientStateProvider";

interface MpaControlBaseProps {
    controlMountedRef: MutableRefObject<boolean>;
    setTimeCheck: Dispatch<SetStateAction<IMapUpdate>>;
};

const MapControls = ({controlMountedRef, setTimeCheck}: MpaControlBaseProps) => {

    const map = useMap();
    const mapZoom = new L.Control.Zoom({ position: 'bottomleft' });
    const mediaMatches = MUI.useMediaQuery('(max-width:993px)');
    const mobileMatches = MUI.useMediaQuery('(max-width:770px)');

    const { expand, handleExpand } = useClientChannelsState();

    const [handleOpen, open] = useClick();
    const [handleDone, isDone] = useClick();

    useEffect(() => {
        if(controlMountedRef && controlMountedRef.current === false) {
            mapZoom.addTo(map);
            controlMountedRef.current = true;
        }
    }, []);

    return (
        <>
        <UpdateTimeDrawer
            isOpenUpdate={open} 
            setOpenUpdate={handleOpen}
        />
        <UpdateDonePopup updateOpen={isDone} />
        <Control position="topleft" style={{border: 'none'}}>
            <MUI.Tooltip title="Update frequency" placement="top">
                <MapButton onClick={handleOpen} open={open}>
                    <MuiIcons.Update className="control-button"/>  
                </MapButton>
            </MUI.Tooltip>
            {(mediaMatches && !mobileMatches) &&
                <MUI.Tooltip title="Expand" placement="top">
                    <MapButton onClick={handleExpand} open={expand} sx={{ml: 1}}>
                        <MuiIcons.AspectRatio className="control-button"/>  
                    </MapButton>
                </MUI.Tooltip>
            }
        </Control>
        </>
    )
};

export default MapControls;