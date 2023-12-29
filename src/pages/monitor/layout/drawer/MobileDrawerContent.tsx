import { FC } from "react";
import { IDeviceDto } from "../../../../apis/device";
import { MobileContentRoot, MonitorDeviceCard } from "../../style/MonitorDrawer.styles";
import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { Search, StyledInputBase, SearchIconWrapper } from "../../../../components/form";
import { useEventChange } from "../../../../hooks/FormHooks";
import { TransitionGroup } from "react-transition-group";

interface MobileDrawerContent {
    iotDevices: IDeviceDto[];
}

const MobileDrawerContent: FC<MobileDrawerContent> = ({iotDevices}) => {

    const [handleInputChange, inputFields, setInputFields] = useEventChange({ search: ''});

    return (
        <MobileContentRoot>
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
                    <MUI.IconButton>
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
            <MUI.Box className="mobile-content">
                <MUI.Box className="content">
                    <TransitionGroup>
                        {
                        iotDevices
                        .filter((device, index) => {
                            if(inputFields.search === "") return device;
                            return device.name.toLocaleLowerCase().includes(inputFields.search)
                        })
                        .map((device, index) => 
                            <MUI.Collapse key={index}>
                                <MonitorDeviceCard
                                    variant="outlined" 
                                    key={index} 
                                    isDraggable={true}
                                    isdragging={false}
                                    isSalute={index % 2 === 0}
                                >
                                    <MUI.Box className="card-action">
                                        <MUI.CardHeader
                                            avatar={
                                                <>
                                                {device.name.toLocaleLowerCase().includes("salute") ? 
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
                                                        // onClick={() => handleSelectDevice(device.name, "car")}
                                                        sx={{color: "#02759F"}}
                                                    >
                                                        <MuiIcons.Videocam />
                                                    </MUI.IconButton>
                                                </MUI.Stack>
                                            }
                                            title={device.name}
                                        />
                                    </MUI.Box>
                                </MonitorDeviceCard>
                            </MUI.Collapse>
                        )}
                    </TransitionGroup>
                </MUI.Box>
            </MUI.Box>
        </MobileContentRoot>
    )
};

export default MobileDrawerContent;