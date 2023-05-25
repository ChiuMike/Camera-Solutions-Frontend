import * as React from 'react';
import * as MuiIcons from "@mui/icons-material/";
import * as MUI from "@mui/material";
import { SearchCard } from '../style/MapControl.styles';
import { StyledForm, Search, StyledInputBase, SearchButton } from '../../../components/form';
import { ListSelect } from '../../../components/list';
import { useEventChange } from '../../../hooks/FormHooks';
import { IMapDevice, IPosition } from '../../../apis/geolocation/type';
import { DeviceMapContext, IDeviceMapState } from '../provider/DeviceMapProvider';

interface SearchCollapseBaseProps {
    isOpenSearch: boolean;
    sos: boolean;
    mapDevices: IMapDevice[];
}

const SearchCollapse: React.FC<SearchCollapseBaseProps> = ({isOpenSearch, sos, mapDevices}) => {

    const { selectedIndex, setSelectedIndex, setSelectedPos } = React.useContext(DeviceMapContext) as IDeviceMapState;

    const [handleInputChange, inputFields] = useEventChange({ search: ''});
    const [searchDevice, setSearchDevice] = React.useState<string | null>();

    const handleChange = (e: MUI.SelectChangeEvent) => {
        e.preventDefault();
        setSearchDevice(e.target.value);
    };  

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
    
    return (
        <MUI.Collapse in={isOpenSearch}>
            <SearchCard>
                <StyledForm>
                    <MUI.Box sx={{display: 'flex'}}>
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
                    </MUI.Box>
                    <ListSelect sx={{height: '300px'}}>
                        {mapDevices.filter((item, index) => {
                            if(inputFields.search === '') {
                                return item;
                            }
                            return item.device.name.includes(inputFields.search)
                        }).map((item, index) =>
                            <MUI.Box key={index}>
                                <MUI.ListItem key={index} disablePadding>
                                    <MUI.ListItemButton 
                                        onClick={handleClick(item.geolocation[0], index)}
                                        sx={{
                                            "&:hover": {
                                                background: '#f5f5f5'
                                            }
                                        }}
                                    >
                                        <MUI.ListItemAvatar sx={{color: '#f5f5f5'}}>
                                            <MUI.Avatar sx={{ width: 36, height: 36,  }}>
                                                <MuiIcons.CameraRear fontSize='small'/>
                                            </MUI.Avatar>
                                        </MUI.ListItemAvatar>
                                        <MUI.ListItemText
                                            primary={item.device.name} 
                                            secondary={
                                                <React.Fragment>
                                                    <MuiIcons.CheckCircle sx={{color: '#8bc34a', mr: 1}} fontSize="small" />
                                                    {item.device.network === "wifi" ?
                                                        <MuiIcons.Wifi fontSize="small" sx={{mr: 1}} />
                                                        :
                                                        <MuiIcons.LteMobiledata fontSize="small" sx={{mr: 1}} />
                                                    }
                                                    {item.device.battery === "low" ?
                                                        <MuiIcons.Battery20 sx={{color: '#c24242', mr: 1}} fontSize="small"/>
                                                        :
                                                        <MuiIcons.Battery80 sx={{color: '#00bcd4', mr: 1}} fontSize="small"/>
                                                    }
                                                </React.Fragment>
                                            } 
                                        />
                                        <MUI.ListItemIcon>
                                            <MUI.Checkbox
                                                edge="end"
                                                icon={<MuiIcons.FmdGoodOutlined />}
                                                checkedIcon={<MuiIcons.FmdGood sx={{color: "#ff5722"}} />}
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
                </StyledForm>
            </SearchCard>
        </MUI.Collapse>
    )
};

export default SearchCollapse;