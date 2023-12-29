import * as  MUI from "@mui/material";
import { FC, useState, useContext, SetStateAction, Dispatch, useEffect } from "react";
import * as MuiIcons from "@mui/icons-material/";
import moment from "moment";
import { AxiosRequestConfig } from "axios";
import { ApiUrl, GetDeviceHistoryTrackResponse, IHistoryDevice, IHistoryPosition, IPosition } from "../../../apis/geolocation";
import { TrackStateContext, TrackState } from "../context/TrackStateProvider";
import { RequestMethod } from "../../../apis/Api";
import { SkeletonListItem } from "../style/MobileDrawerContent.styles";
import { FixedSizeList } from 'react-window';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { List } from "../../../components/list";
import { DateInputWrapper } from "../../../components/form";

interface SearchTimelineBaseProps {
    getHistoryTrack: (options?: AxiosRequestConfig | undefined) => Promise<void>;
    trackLoading: boolean;
    setHistoryData: Dispatch<SetStateAction<GetDeviceHistoryTrackResponse | undefined>>;
    historyDevice?: IHistoryDevice;
};

const SearchTimeline: FC<SearchTimelineBaseProps> = ({getHistoryTrack, historyDevice, trackLoading, setHistoryData}) => {

    const mediaMatches = MUI.useMediaQuery("(max-width:770px)")

    const { selectedDate, selectedDevice, handleBottomOpen, backToDeviceList, setSelectedDate, timePeriod, setSelectedIndex, selectedIndex, timelineOpen, viewMarkers} = useContext(TrackStateContext) as TrackState;

    const [data, setData] = useState<IHistoryPosition[]>([]);
    const [collapseOpen, setCollapseOpen] = useState(false);

    const handleHistorySearch = () => {

        if(selectedDate !== null) {

            getHistoryTrack({
                url: ApiUrl.getDeviceHistoryGPS(),
                method: RequestMethod.POST,
                data: {
                    device: selectedDevice
                }
            });

            handleCollapseOpen();
            handleBottomOpen();
        }
    };

    const handleCollapseOpen = () => {
        setCollapseOpen((prev) => !prev)
    }
    
    const goBack = () => {
        backToDeviceList();
        setHistoryData(undefined);
    };

    const handleSelect = (index: number) => {
        if(selectedIndex === index) {
            setSelectedIndex(-1)
        } else {
            setSelectedIndex(index)
        }
    }

    useEffect(() => {
        if(historyDevice === undefined) return;

        const filterData =  historyDevice.geolocation.filter((location: IPosition, index) => {
            if(timePeriod.actionStart === "" && timePeriod.actionEnd === "") {
                return location
            }
            let format = 'hh:mm';
            let start = moment(timePeriod.actionStart, format);
            let end = moment(timePeriod.actionEnd, format);

            let startFlag = moment(location.update_time, format).isSame(start);
            let endFlag = moment(location.update_time, format).isSame(end);
            let isBetween = moment(location.update_time, format)
                            .isBetween(moment(timePeriod.actionStart, format), moment(timePeriod.actionEnd, format))

            return startFlag || endFlag || isBetween;
        })

        setData(filterData);

    }, [historyDevice, timePeriod.actionEnd, timePeriod.actionStart]);

    useEffect(() => {
        if(!timelineOpen) return;
        setData([]);
        return () => {
            setData([]);
        }
    }, [timelineOpen]);
    
    return (
        <>
            <MUI.Box className="timeline-header">
                <MUI.Box className="header">
                    <MUI.IconButton size="small" onClick={goBack}>
                        <MuiIcons.KeyboardArrowLeft />
                    </MUI.IconButton>
                    <MUI.Typography>
                        HISTORY
                    </MUI.Typography>
                    {selectedDevice.includes("salute") ? 
                        <MUI.Avatar alt="salute" src="/images/salute-removebg.png" />
                        :
                        <MUI.Avatar 
                            src="/images/panther_bg.png"
                            alt="panther"
                            sx={{
                                "img": {
                                    width: "80%",
                                    height: "80%",
                                }
                            }}
                        />
                    }
                </MUI.Box>
                <MUI.Collapse in={collapseOpen} collapsedSize={35}>
                    <MUI.Box className="datetime-pick">
                        <MUI.Box className="time-select-header">
                            <MUI.Stack direction="row" gap={1}>
                                <MUI.Typography>{selectedDate !==null ? moment(selectedDate).format("YYYY-MM-DD") : "Select Date"}</MUI.Typography>
                                {
                                    historyDevice !== undefined  ?
                                    <>
                                    <MUI.Divider orientation="vertical" flexItem/>
                                    <MUI.Typography className="data-result" >{data.length} results</MUI.Typography>
                                    </>
                                    :
                                    null
                                }
                            </MUI.Stack>
                            <MUI.IconButton size="small" onClick={handleCollapseOpen}>
                                {collapseOpen ? <MuiIcons.KeyboardArrowUp /> : <MuiIcons.KeyboardArrowDown /> }
                            </MUI.IconButton>
                        </MUI.Box>
                        <MUI.Box className="picker">
                            <DateInputWrapper>
                                <DatePicker 
                                    selected={selectedDate} 
                                    onChange={(date) => setSelectedDate(date)}
                                    maxDate={new Date()}
                                    wrapperClassName="datePicker" 
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Click and select date"
                                    required
                                />
                            </DateInputWrapper>
                            <MUI.IconButton className="search-btn" onClick={handleHistorySearch}>
                                <MuiIcons.TravelExplore />
                            </MUI.IconButton>
                        </MUI.Box>
                    </MUI.Box>
                </MUI.Collapse>
            </MUI.Box>
            <MUI.Box className="timeline">
                <MUI.Box className="content">
                    {
                        trackLoading ? 
                        <List 
                            data={[1,2,3,4,5,6,7,8]}
                            renderItem={
                                (index) => 
                                    <SkeletonListItem disablePadding alignItems="center" key={index}>
                                        <MUI.ListItemAvatar>
                                            <MUI.Skeleton variant="circular" width={28} height={28} />
                                        </MUI.ListItemAvatar>
                                        <MUI.Divider orientation="vertical" variant="middle" flexItem sx={{ml: -0.5, mr: 1.5}}/>
                                        <MUI.Stack direction="column" alignItems={"start"} className="info-stack">
                                            <MUI.Skeleton variant="text" sx={{ fontSize: '12px' }} />
                                            <MUI.Stack direction="row" alignItems={"center"} gap={.2} className="position">
                                                <MuiIcons.NearMe/>
                                                <MUI.Skeleton variant="text" sx={{ fontSize: '12px' }} />
                                            </MUI.Stack>
                                            <MUI.Stack direction="row" alignItems={"center"} gap={.2}>
                                                <MuiIcons.Hail/>
                                                <MUI.Skeleton variant="text" sx={{ fontSize: '12px' }} />
                                            </MUI.Stack> 
                                        </MUI.Stack>
                                        <MUI.Divider orientation="vertical" variant="middle" flexItem/>
                                        <MUI.Box className="locate">
                                            <MUI.Skeleton variant="circular" width={28} height={28} />
                                        </MUI.Box>
                                    </SkeletonListItem>
                            }
                        />
                        :
                        <>
                        <FixedSizeList
                            height={800}
                            width={mediaMatches ? "100%" : 300}
                            itemSize={85}
                            itemCount={data.length}
                            overscanCount={10}
                        >
                            {
                                ({index, style}) => {
                                    const device = data[index];
                                    return (
                                        <MUI.ListItem 
                                            className="track-list-item" 
                                            disablePadding 
                                            selected={false}
                                            style={style}
                                            key={index}
                                        >
                                            <MUI.ListItemAvatar>
                                                <MUI.Avatar>{index+1}</MUI.Avatar>
                                            </MUI.ListItemAvatar>
                                            <MUI.Box className="location-info">
                                                <MUI.Stack direction="row" alignItems={"center"} gap={1} className="latlng">
                                                    <MuiIcons.NearMe/>
                                                    <MUI.Typography className="secondary">{device.lat}, {device.lng}</MUI.Typography>
                                                </MUI.Stack>
                                                <MUI.Stack direction="row" alignItems={"center"} gap={1}>
                                                    <MuiIcons.AccessTime />
                                                    <MUI.Typography className="secondary">Update Time - {device.update_time}</MUI.Typography>
                                                </MUI.Stack> 
                                                <MUI.Stack direction="row" alignItems={"center"} gap={1}>
                                                    <MuiIcons.Hail/>
                                                    <MUI.Typography className="secondary">Dwell Time - {device.standingTime}</MUI.Typography>
                                                </MUI.Stack> 
                                            </MUI.Box>
                                            <MUI.Divider orientation="vertical" variant="middle" flexItem/>
                                            <MUI.Box className="locate">
                                                <MUI.IconButton onClick={() => handleSelect(index)} disabled={viewMarkers}>
                                                    {index === selectedIndex ? 
                                                        <MuiIcons.GpsFixed sx={{color: "#243B70"}}/>
                                                            :
                                                        <MuiIcons.GpsNotFixed />
                                                    }
                                                </MUI.IconButton>
                                            </MUI.Box>
                                        </MUI.ListItem>
                                    );
                                }
                            }
                        </FixedSizeList>  
                        </>
                    }
                </MUI.Box>
            </MUI.Box>
        </>
    )
};

export default SearchTimeline;