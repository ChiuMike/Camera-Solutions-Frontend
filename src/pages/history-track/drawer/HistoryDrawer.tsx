import { AxiosRequestConfig } from "axios";
import { useEffect, useRef, useState, FC, SetStateAction, Dispatch, useContext } from "react";
import { IDeviceDto } from "../../../apis/device";
import * as MUI from "@mui/material";
import { GetDeviceHistoryTrackResponse, IHistoryDevice } from "../../../apis/geolocation";
import { useEventChange } from "../../../hooks/FormHooks";
import { TrackState, TrackStateContext } from "../context/TrackStateProvider";
import { HistoryDeviceCard, SideBarRoot } from "../style/HistoryDrawerContent.styles";
import { Search, SearchIconWrapper, StyledInputBase } from "../../../components/form";
import * as MuiIcons from "@mui/icons-material/";
import { HistoryTimelineRoot } from "../style/MobileDrawerContent.styles";
import SearchTimeline from "./SearchTimeline";
import { List } from "../../../components/list";
import { SubDrawer } from "../../../components/drawer";
import { DeviceFilter } from "../../../components/filter";

interface HistoryDrawerBaseProps {
    drawerOpen: boolean;
    navDrawerOpen: boolean;
    iotDevices: IDeviceDto[];
    getHistoryTrack: (options?: AxiosRequestConfig | undefined) => Promise<void>;
    trackLoading: boolean;
    historyDevice?: IHistoryDevice;
    setHistoryData: Dispatch<SetStateAction<GetDeviceHistoryTrackResponse | undefined>>
}

const HistoryDrawer: FC<HistoryDrawerBaseProps> = ({drawerOpen, navDrawerOpen, iotDevices, getHistoryTrack, historyDevice, trackLoading, setHistoryData }) => {

    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');

    const { timelineOpen, handleSelectDevice, deviceFilter, handleDeviceFilter } = useContext(TrackStateContext) as TrackState;
   
    const containerRef = useRef(null);
    
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [handleInputChange, inputFields, setInputFields] = useEventChange({ search: ''});

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        if(timelineOpen) return;
        setInputFields({
            search: ''
        })
    } ,[timelineOpen]);

    return (
        <>
        <DeviceFilter 
            anchorEl={anchorEl} 
            handleMenuClose={handleMenuClose} 
            open={Boolean(anchorEl)} 
            deviceFilter={deviceFilter}
            handleDeviceFilter={handleDeviceFilter}
        />
        <SubDrawer
            subDrawerWidth={300}
            subDrawerOpen={drawerOpen}
            navDrawerOpen={navDrawerOpen}
            mediaMatches={mediaMatches}
            subDrawerWidthTimeline={350}
            timelineOpen={timelineOpen}
            containerRef={containerRef}
            renderChildren={
                () => 
                <>
                <MUI.Slide direction="right" in={!timelineOpen} appear={false} container={containerRef.current}>
                    <SideBarRoot sx={{display: timelineOpen ? "none": 'grid'}}>
                        <MUI.Box className="header">
                            <MUI.Box />
                            <Search className="search-input">
                                <SearchIconWrapper>
                                    <MuiIcons.Search className="search-icon" />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    id="search"
                                    type="text"
                                    name='search'
                                    placeholder="Search Device"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={inputFields.search}
                                    onChange={handleInputChange}
                                />
                            </Search>
                            <MUI.Box className="search-btn">
                                <MUI.IconButton onClick={handleMenuOpen}>
                                    <MUI.Badge 
                                        color="success" 
                                        badgeContent={0} 
                                        invisible={false} 
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        {deviceFilter === "" ? 
                                            <MuiIcons.Tune /> 
                                            : 
                                            deviceFilter === "salute" ? 
                                                <img src="/images/salute-removebg.png" />
                                                    :
                                                <img src="/images/panther_bg.png" />
                                        }
                                    </MUI.Badge>
                                </MUI.IconButton>
                            </MUI.Box>
                        </MUI.Box>
                        <MUI.Box className="device-list">
                            <MUI.Box className="content">
                                <List 
                                    data={
                                        iotDevices
                                        .filter((device) => { 
                                            return device.name.split("_").length === 2
                                        })
                                        .filter((device) => {
                                            return device.name.toLocaleLowerCase().startsWith(deviceFilter)
                                        })
                                        .filter((device) => {
                                            if(inputFields.search === "") return device;
                                            return device.name.toLocaleLowerCase().includes(inputFields.search.toLocaleLowerCase())
                                        })
                                    }
                                    renderItem={
                                        (device, index) => 
                                            <HistoryDeviceCard
                                                variant="outlined" 
                                                key={index} 
                                                selected={false}
                                                isSalute={index % 2 === 0}
                                            >
                                                <MUI.Box className="card-action">
                                                    <MUI.CardHeader
                                                        avatar={
                                                            <>
                                                            {device.name.includes("Salute") ? 
                                                                <MUI.Avatar variant="rounded" src="/images/salute-removebg.png" />
                                                                :
                                                                <MUI.Avatar 
                                                                    variant="rounded" 
                                                                    src="/images/panther_bg.png"
                                                                    sx={{
                                                                        "img": {
                                                                            transform: 'scale(0.75)'
                                                                        }
                                                                    }}
                                                                />
                                                            }
                                                            </>
                                                        }
                                                        action={
                                                            <MUI.Stack direction="row" alignItems={"center"} gap={1}>
                                                                <MUI.Divider orientation="vertical" variant="middle" flexItem />
                                                                <MUI.Tooltip title="Car Track" placement="top">
                                                                    <MUI.IconButton 
                                                                        aria-label="settings"
                                                                        onClick={() => handleSelectDevice(device.name, "car")}
                                                                        sx={{color: "#02759F"}}
                                                                    >
                                                                        <MuiIcons.Route />
                                                                    </MUI.IconButton>
                                                                </MUI.Tooltip>
                                                            </MUI.Stack>
                                                        }
                                                        title={device.name}
                                                    />
                                                </MUI.Box>
                                            </HistoryDeviceCard>
                                    }
                                />
                            </MUI.Box>
                        </MUI.Box>
                    </SideBarRoot>
                </MUI.Slide>
                <MUI.Slide 
                    direction="left" 
                    in={timelineOpen} 
                    container={containerRef.current}
                    timeout={300}
                >
                    <HistoryTimelineRoot
                        show={timelineOpen}
                    >
                        <SearchTimeline 
                            getHistoryTrack={getHistoryTrack}
                            historyDevice={historyDevice}
                            trackLoading={trackLoading}
                            setHistoryData={setHistoryData}
                        />
                    </HistoryTimelineRoot>
                </MUI.Slide>
                </>
            }
        />
        </>
    )
};

export default HistoryDrawer;