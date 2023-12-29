import { useState, FC, useContext } from "react";
import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { useEventChange } from "../../../hooks/FormHooks";
import { SideBarRoot, DeviceCard, StyledBadge } from "../style/DeviceDrawer.styles";
import { DeviceMapContext, IDeviceMapState } from "../provider/DeviceMapProvider";
import { Search, SearchIconWrapper, StyledInputBase } from "../../../components/form";
import { IMapDevice, IPosition } from "../../../apis/geolocation";
import { Battery, Temperature } from "../../../components/icon";
import DeviceMapFilter from "./DeviceMapFilter";
import { SubDrawer } from "../../../components/drawer";
import { List } from "../../../components/list";

interface DeviceMapDrawerBaseProps {
    drawerOpen: boolean;
    mapLoading: boolean;
    mapDevices: IMapDevice[];
}

export const setDeviceState = (status: string) => {

    switch (status) {
        case "READY" :
            return <MUI.Chip label="Ready" variant="outlined" size="small"/>;
        case "LIVE_RECORD" :
            return (
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <MuiIcons.VideocamOutlined sx={{transform: 'scale(1.1)',  objectFit: 'cover',}}/>
                </StyledBadge>
            )
        case "VIDEO_RECORD" :
            return (
                <MuiIcons.VideoFileOutlined />
            )
        case "DOCKING" :
            return (
                <MuiIcons.Unarchive />
            )
        default :
            return (
                <MuiIcons.CloudOff />
            )   
    }
} 

const DeviceMapDrawer: FC<DeviceMapDrawerBaseProps> = ({drawerOpen: navDrawerOpen, mapLoading, mapDevices}) => {

    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');

    const { subDrawerOpen, selectedIndex, setSelectedIndex, filter, setSelectedPos } = useContext(DeviceMapContext) as IDeviceMapState;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [handleInputChange, inputFields, setInputFields] = useEventChange({ search: ''});

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClick = (data: IPosition, index: number) => () => {

        const currentIndex = selectedIndex.indexOf(index);

        if(currentIndex === -1) {
            setSelectedIndex([index])
            setSelectedPos(data)
        } else {
            setSelectedIndex([-1]);
            setSelectedPos({
                lat: '',
                lng: '',
                update_time: ''
            })
        }
    };

    return (
        <>
        <DeviceMapFilter anchorEl={anchorEl} open={Boolean(anchorEl)} setAnchorEl={setAnchorEl} />
        <SubDrawer
            subDrawerWidth={300}
            subDrawerOpen={subDrawerOpen}
            navDrawerOpen={navDrawerOpen}
            mediaMatches={mediaMatches}
            renderChildren={
                () => 
                <SideBarRoot>
                    <MUI.Box className="header">
                        <MUI.Box className="search-box">
                            <Search>
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
                        </MUI.Box>
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
                                    <MuiIcons.Tune />
                                </MUI.Badge>
                            </MUI.IconButton>
                        </MUI.Box>
                    </MUI.Box>
                    <MUI.Box className="device-list">
                        <MUI.Box className="content">
                            {mapLoading ? 
                                <>
                                <List 
                                    data={[1,2,3,4,5]}
                                    renderItem={
                                        (index) =>
                                        <DeviceCard 
                                            variant="outlined" 
                                            key={index} 
                                            selected={index === selectedIndex[0]}
                                        >
                                            <MUI.Box className="card-action">
                                                <MUI.CardHeader
                                                    avatar={
                                                        <MUI.Skeleton variant="circular" width={40} height={40} />
                                                    }
                                                    action={
                                                        <MUI.Skeleton variant="rectangular" width={50} height={15} sx={{borderRadius: '5px'}}/>
                                                    }
                                                    title={
                                                        <MUI.Skeleton variant="text" sx={{ fontSize: '15px', width: '50%' }} />
                                                    }
                                                    subheader={
                                                        <MUI.Skeleton variant="text" sx={{ fontSize: '12px', width: '60%'  }} />
                                                    }
                                                />
                                                <MUI.Divider variant="middle" />
                                                <MUI.CardContent>
                                                    <MUI.Stack direction="column" alignItems={"center"}>
                                                        <MUI.Skeleton variant="text" sx={{ fontSize: '12px', marginTop: '3px', width: '100%' }} />
                                                        <MUI.Skeleton variant="text" width={30} height={30} />
                                                    </MUI.Stack>
                                                    <MUI.Divider orientation="vertical" variant="middle" flexItem />
                                                    <MUI.Stack direction="column" alignItems={"center"}>
                                                        <MUI.Skeleton variant="text" sx={{ fontSize: '12px', marginTop: '3px', width: '100%' }} />
                                                        <MUI.Skeleton variant="text" width={30} height={30} />
                                                    </MUI.Stack>
                                                    <MUI.Divider orientation="vertical" variant="middle" flexItem />
                                                    <MUI.Skeleton variant="rectangular" width={30} height={30} sx={{alignSelf: 'center'}}/>
                                                </MUI.CardContent>
                                            </MUI.Box>  
                                        </DeviceCard>
                                    }
                                />
                                </>
                                :
                                <List
                                    data={
                                        mapDevices
                                        .filter((device) => {
                                            if(filter.state.length === 0) return device;
                                            return filter.state.includes(device.device.status)
                                        })
                                        .filter((device) => {
                                            if(filter.camera.length === 0) return device;
                                            return filter.camera.includes(device.device.name.split("_")[0].toLowerCase())
                                        })
                                        .filter((device) => {
                                            if(inputFields.search === "") return device;
                                            return device.device.name.toLocaleLowerCase().includes(inputFields.search)
                                        })
                                    }
                                    renderItem = {
                                        (device, index) =>
                                            <DeviceCard 
                                                variant="outlined"
                                                key={index} 
                                                selected={index === selectedIndex[0]}
                                            >
                                                <MUI.Box className="card-action">
                                                    <MUI.CardHeader
                                                        avatar={
                                                            <MUI.Avatar variant="rounded" src="/images/salute-removebg.png" />
                                                        }
                                                        action={
                                                            setDeviceState(device.device.status)
                                                        }
                                                        title={device.device.name}
                                                        subheader={device.geolocation[0].update_time}
                                                    />
                                                    <MUI.Divider variant="middle" />
                                                    <MUI.CardContent>
                                                        <MUI.Stack direction="column" alignItems={"center"} justifyContent={"center"} gap={1.5}>
                                                            <MUI.Typography >Battery</MUI.Typography>
                                                            {device.device.battery === null ?
                                                                <MuiIcons.BatteryUnknown className="battery-unknown" />
                                                                :
                                                                <Battery level={Number(device.device.battery)}>
                                                                    <MUI.Box className="battery-level"></MUI.Box>
                                                                </Battery>
                                                            }
                                                        </MUI.Stack>
                                                        <MUI.Divider orientation="vertical" variant="middle" flexItem />
                                                        <MUI.Stack direction="column" alignItems={"center"} justifyContent={"center"} gap={1}>
                                                            <MUI.Typography>GPS</MUI.Typography>
                                                            <StyledBadge
                                                                overlap="circular"
                                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                                variant="dot"
                                                            >
                                                                <MuiIcons.GpsFixed className="gps-icon"/>
                                                            </StyledBadge>
                                                        </MUI.Stack>
                                                        <MUI.Divider orientation="vertical" variant="middle" flexItem />
                                                        <Temperature temp={device.device.temperature} />
                                                        <MUI.Divider orientation="vertical" variant="middle" flexItem />
                                                        <MUI.Stack direction="row" alignItems={"center"} justifyContent={"center"} className="view">
                                                            <MUI.Box component="button" className="view-btn" onClick={handleClick(device.geolocation[0], index)}>
                                                                <MUI.Typography>
                                                                    VIEW
                                                                </MUI.Typography>
                                                            </MUI.Box>
                                                        </MUI.Stack>
                                                    </MUI.CardContent>
                                                </MUI.Box>
                                            </DeviceCard>
                                    }
                                />
                            }
                        </MUI.Box>
                    </MUI.Box>
                </SideBarRoot>
            }
        />
        </>
    )
};

export default DeviceMapDrawer;