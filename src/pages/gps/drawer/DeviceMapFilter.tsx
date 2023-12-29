import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { FC, Dispatch, SetStateAction, useContext } from "react";
import { DeviceMapContext, IDeviceFilter, IDeviceMapState } from "../provider/DeviceMapProvider";

interface DeviceFilterBaseProps {
    anchorEl: HTMLElement | null;
    setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
    open: boolean;
}

const DeviceMapFilter: FC<DeviceFilterBaseProps> = ({anchorEl, setAnchorEl, open}) => {

    const { filter, setFilter } = useContext(DeviceMapContext) as IDeviceMapState;

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleStateFilters = (state: string) => {

        const index = filter.state.indexOf(state);

        if(index === -1) {
            setFilter((prev) => {
                return {
                    ...prev,
                    state: [...prev.state, state]
                }
            });
        } 
        else {
            setFilter((prev) => {
                return {
                    ...prev,
                    state: [...prev.state.filter((item) => item !== state)]
                }
            });
        }
    }

    const handleCamFilters = (cam: string) => {

        const index = filter.camera.indexOf(cam);

        if(index === -1) {
            setFilter((prev) => {
                return {
                    ...prev,
                    camera: [...prev.camera, cam]
                }
            });
        } 
        else {
            setFilter((prev) => {
                return {
                    ...prev,
                    camera: [...prev.camera.filter((item) => item !== cam)]
                }
            });
        }
    }

    return (
        <MUI.Menu
            elevation={0}
            aria-labelledby="filter-menu-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            sx={{
                '& .MuiPaper-root': {
                    color: "rgb(55, 65, 81)",
                    boxShadow:
                      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                    "& .MuiList-root": {
                        padding: 0,
                        "& .MuiMenuItem-root": {
                            padding: "5px 12px 5px 12px",
                            "& .MuiFormControlLabel-root": {
                                margin: 0,
                                gap: 3.5,
                                width: "100%",
                                "& .MuiCheckbox-root": {
                                    padding: "5px 0px"
                                }
                            }
                        }
                    }
                },
            }}  
        >
            <MUI.MenuItem>
                <MUI.FormControlLabel
                    control={
                        <MUI.Checkbox
                            edge="end"
                            icon={<MuiIcons.Visibility className="check"/>}
                            checkedIcon={<MuiIcons.VisibilityOff className="checked" />}
                            name={"READY"}
                            checked={filter.state.includes("READY")}
                            onChange={() => handleStateFilters("READY")}
                        />
                    } 
                    label="Ready"
                />
            </MUI.MenuItem>
            <MUI.MenuItem>
                <MUI.FormControlLabel
                    control={
                        <MUI.Checkbox
                            edge="end"
                            icon={<MuiIcons.Visibility className="check"/>}
                            checkedIcon={<MuiIcons.VisibilityOff className="checked" />}
                            name={"LIVE_RECORDING"}
                            checked={filter.state.includes("LIVE_RECORDING")}
                            onChange={() => handleStateFilters("LIVE_RECORDING")}
                        />
                    } 
                    label="Live Recording"
                />
            </MUI.MenuItem>
            <MUI.MenuItem>
                <MUI.FormControlLabel 
                    control={
                        <MUI.Checkbox
                            edge="end"
                            icon={<MuiIcons.Visibility className="check"/>}
                            checkedIcon={<MuiIcons.VisibilityOff className="checked" />}
                            name={"VIDEO_RECORDING"}
                            onChange={() => handleStateFilters("VIDEO_RECORDING")}
                            checked={filter.state.includes("VIDEO_RECORDING")}
                        />
                    } 
                    label="Video Recording"
                />
            </MUI.MenuItem>
            <MUI.Divider sx={{ margin: "0px !important"}} />
            <MUI.MenuItem>
                <MUI.FormControlLabel 
                    control={
                        <MUI.Checkbox
                            edge="end"
                            icon={<MuiIcons.Visibility className="check"/>}
                            checkedIcon={<MuiIcons.VisibilityOff className="checked" />}
                            name={"salute"}
                            onChange={() => handleCamFilters("salute")}
                            checked={filter.camera.includes("salute")}
                        />
                    } 
                    label="Salute"
                />
            </MUI.MenuItem>
            <MUI.MenuItem>
                <MUI.FormControlLabel 
                    control={
                        <MUI.Checkbox
                            edge="end"
                            icon={<MuiIcons.Visibility className="check"/>}
                            checkedIcon={<MuiIcons.VisibilityOff className="checked" />}
                            name={"panther"}
                            onChange={() => handleCamFilters("panther")}
                            checked={filter.camera.includes("panther")}
                        />
                    } 
                    label="Panther"
                />
            </MUI.MenuItem>
        </MUI.Menu>
    )

};

export default DeviceMapFilter;