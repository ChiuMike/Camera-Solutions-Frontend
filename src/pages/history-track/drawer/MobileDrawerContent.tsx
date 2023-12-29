import { FC, useRef, useState, useContext, Dispatch, SetStateAction }  from "react";
import { HistoryTimelineRoot, MobileDrawerRoot } from "../style/MobileDrawerContent.styles";
import * as MUI from "@mui/material";
import { IDeviceDto } from "../../../apis/device";
import { GetDeviceHistoryTrackResponse, IHistoryDevice } from "../../../apis/geolocation";
import { AxiosRequestConfig } from "axios";
import * as MuiIcons from "@mui/icons-material/";
import { Search, StyledInputBase, SearchIconWrapper } from "../../../components/form";
import { HistoryDeviceCard } from "../style/HistoryDrawerContent.styles";
import { TransitionGroup } from "react-transition-group";
import { useEventChange } from "../../../hooks/FormHooks";
import { TrackStateContext, TrackState } from "../context/TrackStateProvider";
import DeviceFilter from "./deviceFilter";
import SearchTimeline from "./SearchTimeline";

export interface MobileDrawerContentBaseProps {
    data: IDeviceDto[];
    getHistoryTrack: (options?: AxiosRequestConfig | undefined) => Promise<void>;
    trackLoading: boolean;
    historyDevice?: IHistoryDevice;
    setHistoryData: Dispatch<SetStateAction<GetDeviceHistoryTrackResponse | undefined>>;
}

const MobileDrawerContent: FC<MobileDrawerContentBaseProps> = ({ data, getHistoryTrack, historyDevice, trackLoading, setHistoryData }) => {

    const containerRef = useRef(null);

    const { timelineOpen, handleSelectDevice, deviceFilter } = useContext(TrackStateContext) as TrackState;

    const [handleInputChange, inputFields, setInputFields] = useEventChange({ search: ''});
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
        <MUI.Slide direction="right" in={!timelineOpen} appear={false} container={containerRef.current}>
            <MobileDrawerRoot sx={{display: timelineOpen ? "none": 'grid'}}>
                <DeviceFilter 
                    anchorEl={anchorEl} 
                    setAnchorEl={setAnchorEl} 
                    open={Boolean(anchorEl)} 
                />
                <MUI.Box className="mobile-header">
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
                <MUI.Box className="mobile-content">
                    <MUI.Box className="content">
                        <TransitionGroup>
                            {data
                            .filter((device, index) => { 
                                return device.name.split("_").length === 2
                            })
                            .filter((device, index) => {
                                return device.name.toLocaleLowerCase().startsWith(deviceFilter)
                            })
                            .filter((device, index) => {
                                if(inputFields.search === "") return device;
                                return device.name.toLocaleLowerCase().includes(inputFields.search)
                            })
                            .map((device, index) => 
                                <MUI.Collapse key={index}>
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
                                                        <MUI.IconButton 
                                                            aria-label="settings"
                                                            onClick={() => handleSelectDevice(device.name, "car")}
                                                            sx={{color: "#02759F"}}
                                                        >
                                                            <MuiIcons.Route />
                                                        </MUI.IconButton>
                                                    </MUI.Stack>
                                                }
                                                title={device.name}
                                            />
                                        </MUI.Box>
                                    </HistoryDeviceCard>
                                </MUI.Collapse>
                            )}
                        </TransitionGroup>
                    </MUI.Box>
                </MUI.Box>
            </MobileDrawerRoot>
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
    )
};

export default MobileDrawerContent;