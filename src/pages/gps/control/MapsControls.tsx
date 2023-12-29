import * as MUI from "@mui/material";
import { useEffect, FC, useContext } from "react";
import L from "leaflet";
import * as MuiIcons from "@mui/icons-material/";
import { useMap } from "react-leaflet";
import Control from 'react-leaflet-custom-control';
import { MapButton, MapStateChip } from "../style/MapControl.styles";
import useClick from "../../../hooks/useClick";
import UpdateTimeDrawer from "./UpdateTimeDrawer";
import { IMapDevice } from "../../../apis/geolocation";
import { DeviceMapContext, IDeviceMapState } from "../provider/DeviceMapProvider";

interface MapControlBaseProps {
    toggleSwipDrawer: () => void;
    swipeOpen: boolean;
}

const MapsControls: FC<MapControlBaseProps> = ({toggleSwipDrawer, swipeOpen}) => {

    const map = useMap();
    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');
    const theme = MUI.useTheme();

    const { filter, setFilter } = useContext(DeviceMapContext) as IDeviceMapState;
    const [handleUpdate, isOpenUpdate, setOpenUpdate] = useClick();

    const handleDeleteCamChip = (cam: string) => {
        setFilter((prev) => {
            return {
                ...prev,
                camera: [...prev.camera.filter((item) => item !== cam)]
            }
        });
    };

    const handleDeleteStateChip = (state: string) => {
        setFilter((prev) => {
            return {
                ...prev,
                state: [...prev.state.filter((item) => item !== state)]
            }
        });
    };

    useEffect(() => {

        const mapZoom = L.control.zoom({
            position: 'bottomleft',
        }).addTo(map);
        
        return () => {
            map.removeControl(mapZoom);
        }
        
    },[]);

    return (
        <>
        <UpdateTimeDrawer isOpenUpdate={isOpenUpdate} setOpenUpdate={setOpenUpdate}/>
        <Control 
            position="topright"
            style={{border: 'none'}}
        >
            <MUI.Box sx={{display: 'flex', flexDirection: 'column', gap: .5}}>
                {!mediaMatches &&
                    <MUI.Tooltip title="Update frequency" placement="left">
                        <MapButton open={isOpenUpdate} onClick={handleUpdate}>
                            <MuiIcons.Update className="control-button"/>  
                        </MapButton>
                    </MUI.Tooltip>
                }
            </MUI.Box>
        </Control>
        <Control
            position="topleft"
            style={{
                border: 'none', 
                display: 'flex', 
                gap: "15px"
            }}
        >
            <MUI.Box
                sx={{
                    display: 'flex', 
                    gap: "15px",
                    "@media (max-width: 576px)": {
                        flexWrap: "wrap",
                    },
                }}
            >
                {filter.state.map((item ,index)=>
                    <MUI.Zoom key={index} in={true}> 
                        <MapStateChip
                            key={index}
                            label={item.replace("_", " ").toUpperCase()}
                            onDelete={() => handleDeleteStateChip(item)}
                        />
                    </MUI.Zoom>
                )}
                {filter.camera.map((item ,index)=>
                    <MUI.Zoom key={index} in={true}> 
                        <MapStateChip
                            key={index}
                            label={item.toUpperCase()}
                            onDelete={() => handleDeleteCamChip(item)}
                        />
                    </MUI.Zoom>
                )}
            </MUI.Box>
        </Control>
        </>
    )

}

export default MapsControls;