import * as MUI from "@mui/material";
import { FC, Dispatch, SetStateAction, useContext } from "react";
import { TrackState, TrackStateContext } from "../context/TrackStateProvider";

interface DeviceFilterBaseProps {
    anchorEl: HTMLElement | null;
    setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
    open: boolean;
};

const DeviceFilter: FC<DeviceFilterBaseProps> = ({anchorEl, setAnchorEl, open}) => {

    const { deviceFilter, handleDeviceFilter } = useContext(TrackStateContext) as TrackState;

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSelectMenu = (filter: string) => {
        handleDeviceFilter(filter);
        handleMenuClose();
    }

    return (
        <MUI.Menu
            elevation={0}
            aria-labelledby="filter-menu-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    borderRadius: '5px',
                  },
                  "& .panther": {
                      "img": {
                          transform: 'scale(0.85)'
                      }
                  },
                },
            }}
        >
            <MUI.MenuItem className="salute" onClick={() => handleSelectMenu("salute")} selected={deviceFilter==="salute"}>
                <MUI.Avatar src="/images/salute-removebg.png"/>
                <MUI.Typography>Salute</MUI.Typography>
            </MUI.MenuItem>
            <MUI.MenuItem onClick={() => handleSelectMenu("panther")} selected={deviceFilter==="panther"}>
                <MUI.Avatar className="panther" src="/images/panther_bg.png"/>
                <MUI.Typography>Panther</MUI.Typography>
            </MUI.MenuItem>
        </MUI.Menu>
    )
};

export default DeviceFilter;