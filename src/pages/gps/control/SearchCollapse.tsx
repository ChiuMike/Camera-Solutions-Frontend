import * as React from 'react';
import * as MuiIcons from "@mui/icons-material/";
import * as MUI from "@mui/material";
import L from "leaflet";
import { SearchCollapseCard } from '../style/MapControl.styles';
import { Search, StyledInputBase, SearchButton } from '../../../components/form';
import { ListSelect } from '../../../components/list';
import { useEventChange } from '../../../hooks/FormHooks';
import { IMapDevice, IPosition } from '../../../apis/geolocation/type';
import { DeviceMapContext, IDeviceMapState } from '../provider/DeviceMapProvider';
import DeviceBattery from '../helper/DeviceBattery';

interface SearchCollapseBaseProps {
    isOpenSearch: boolean;
    mapDevices: IMapDevice[];
}

const SearchCollapse: React.FC<SearchCollapseBaseProps> = ({isOpenSearch, mapDevices}) => {

    const searchCardRef = React.useRef(null); 

    const { selectedIndex, setSelectedIndex, setSelectedPos } = React.useContext(DeviceMapContext) as IDeviceMapState;

    const [handleInputChange, inputFields] = useEventChange({ search: ''});

    const handleClick = (data: IPosition, index: number) => () => {

        const currentIndex = selectedIndex.indexOf(index);

        if( currentIndex === -1) {
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

    React.useEffect(() => {
        if(searchCardRef.current !== null)
            L.DomEvent.disableScrollPropagation(searchCardRef.current)
    }, [])
    
    return (
        <MUI.Collapse in={isOpenSearch}>
            <SearchCollapseCard ref={searchCardRef}>
                <MUI.CardHeader
                    title="Devices GPS"
                    subheader={
                        <MUI.Stack direction={"row"} sx={{mt: 1.5}}>
                            <Search component="form">
                                <StyledInputBase
                                    id="search"
                                    type="text"
                                    name='search'
                                    placeholder="Search device"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={inputFields.search}
                                    onChange={handleInputChange}
                                />   
                            </Search>
                            <SearchButton>
                                <MuiIcons.Search />
                            </SearchButton>
                        </MUI.Stack>
                    }
                />
                <MUI.CardContent>
                    <ListSelect>
                        {mapDevices.filter((item, index) => {
                            if(inputFields.search === '') {
                                return item;
                            }
                            return item.device.name.includes(inputFields.search)
                        }).map((item, index) =>
                            <MUI.Box key={index}>
                                <MUI.ListItem key={index} disablePadding>
                                    <MUI.ListItemButton onClick={handleClick(item.geolocation[0], index)}>
                                        <MUI.ListItemAvatar sx={{color: '#f5f5f5'}}>
                                            <MUI.Avatar 
                                                src="/images/salute.jpeg"
                                                sx={{ width: 40, height: 40,  }} 
                                            />
                                        </MUI.ListItemAvatar>
                                        <MUI.ListItemText
                                            primary={item.device.name} 
                                            secondary={
                                                <DeviceBattery batteryStatus={item.device.battery}/>
                                            } 
                                        />
                                        <MUI.ListItemIcon>
                                            <MUI.Checkbox
                                                edge="end"
                                                icon={<MuiIcons.LocationSearching className="locate" />}
                                                checkedIcon={<MuiIcons.MyLocation sx={{color: "#ff5722"}} />}
                                                name={"selectedDevice"}
                                                checked={selectedIndex.indexOf(index) !== -1}
                                            />
                                        </MUI.ListItemIcon>
                                    </MUI.ListItemButton>
                                </MUI.ListItem>
                                <MUI.Divider />
                            </MUI.Box>
                        )}
                    </ListSelect>
                </MUI.CardContent>
            </SearchCollapseCard>
        </MUI.Collapse>
    )
};

export default SearchCollapse;