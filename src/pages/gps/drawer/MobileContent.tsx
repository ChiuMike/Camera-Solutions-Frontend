import { useState, FC, useContext } from 'react';
import { MobileContentRoot, MobileDeviceCard } from '../style/MobileDrawer.styles';
import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { Search, SearchIconWrapper, StyledInputBase } from '../../../components/form';
import { useEventChange } from '../../../hooks/FormHooks';
import { Battery, Temperature } from '../../../components/icon';
import { StyledBadge } from '../style/DeviceDrawer.styles';
import { DeviceMapContext, IDeviceMapState } from '../provider/DeviceMapProvider';
import { IMapDevice, IPosition } from '../../../apis/geolocation';
import { setDeviceState } from './DeviceMapDrawer';
import { TransitionGroup } from 'react-transition-group';
import DeviceMapFilter from './DeviceMapFilter';

interface MobileDrawerContent {
    data: IMapDevice[];
}

const MobileContent: FC<MobileDrawerContent> = ({data}) => {

    const { selectedIndex, setSelectedIndex, filter, setSelectedPos } = useContext(DeviceMapContext) as IDeviceMapState;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [handleInputChange, inputFields, setInputFields] = useEventChange({ search: ''});

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSelect = (data: IPosition, index: number) => () => {

        const currentIndex = selectedIndex.indexOf(index);

        if(currentIndex === -1) {
            setSelectedIndex([index]);
            setSelectedPos(data);
        } else {
            setSelectedIndex([-1]);
            setSelectedPos({
                lat: '',
                lng: '',
                update_time: ''
            })
        }
    }

    return (
        <MobileContentRoot>
            <DeviceMapFilter anchorEl={anchorEl} open={Boolean(anchorEl)} setAnchorEl={setAnchorEl} />
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
                    <TransitionGroup>
                        {data
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
                            return device.device.name.toLowerCase().includes(inputFields.search)
                        })
                        .map((device, index) => 
                            <MUI.Collapse key={index}>
                                <MobileDeviceCard key={index} selected={index === selectedIndex[0]} onClick={handleSelect(device.geolocation[0], index)} >
                                    <MUI.Box className="device-avatar">
                                        <MUI.Avatar variant="rounded" src="/images/salute-removebg.png" />
                                    </MUI.Box>
                                    <MUI.Box className="device-info">
                                        <MUI.Typography className="title">
                                            {device.device.name}
                                        </MUI.Typography>
                                        <MUI.Typography className='subheader'>
                                            {device.geolocation[0].update_time}
                                        </MUI.Typography>
                                    </MUI.Box>
                                    <MUI.Box className="device-state">
                                        <MUI.Box className="battery">
                                            <MUI.Typography>Battery</MUI.Typography>
                                            <Battery level={Number(device.device.battery)}>
                                                <MUI.Box className="battery-level"></MUI.Box>
                                            </Battery>
                                        </MUI.Box>
                                        <MUI.Box className="gps">
                                            <MUI.Typography>GPS</MUI.Typography>
                                            <StyledBadge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                variant="dot"
                                            >
                                                <MuiIcons.GpsFixed className="gps-icon"/>
                                            </StyledBadge>
                                        </MUI.Box>
                                        <MUI.Box className="temp">
                                            <Temperature temp={device.device.temperature} />
                                        </MUI.Box>
                                    </MUI.Box>
                                    <MUI.Box className="device-remote">
                                        {setDeviceState(device.device.status)}
                                    </MUI.Box>
                                </MobileDeviceCard>
                            </MUI.Collapse>
                        )}
                    </TransitionGroup>
                </MUI.Box>
            </MUI.Box>
            <MUI.Box className="footer" />
        </MobileContentRoot>
    )
};

export default MobileContent;