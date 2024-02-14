import { FC } from "react";
import { MobileContentRoot, MonitorDeviceCard } from "../../style/MonitorDrawer.styles";
import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { Search, StyledInputBase, SearchIconWrapper } from "../../../../components/form";
import { useEventChange } from "../../../../hooks/FormHooks";
import { TransitionGroup } from "react-transition-group";
import { useBoardData, useLayoutState } from "../../context/ClientProvider";
import { DeviceFilter } from "../../../../components/filter";

interface MobileDrawerContent {
    toggleSwipDrawer: ()=> void;
}

const MobileDrawerContent: FC<MobileDrawerContent> = ({toggleSwipDrawer}) => {

    const [handleInputChange, inputFields, setInputFields] = useEventChange({ search: ''});

    const { anchorEl, deviceFilter, handleDeviceFilter, handleMenuClose, handleMenuOpen } = useLayoutState();

    const { boardData, handleMobileDeviceClick } = useBoardData();

    return (
        <>
        <DeviceFilter 
            anchorEl={anchorEl} 
            handleMenuClose={handleMenuClose} 
            open={Boolean(anchorEl)} 
            deviceFilter={deviceFilter}
            handleDeviceFilter={handleDeviceFilter}
        />
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
                        {
                        boardData["device"]
                        .filter((device, index) => {
                            if(inputFields.search === "") return device;
                            return device.content.toLocaleLowerCase().includes(inputFields.search)
                        })
                        .filter((device) => {
                            return device.content.toLocaleLowerCase().startsWith(deviceFilter)
                        })
                        .map((device, index) => 
                            <MUI.Collapse key={index}>
                                <MonitorDeviceCard
                                    variant="outlined" 
                                    key={index} 
                                    isDraggable={false}
                                    isdragging={false}
                                    isSalute={index % 2 === 0}
                                >
                                    <MUI.Box className="card-action">
                                        <MUI.CardHeader
                                            avatar={
                                                <>
                                                {device.content.toLocaleLowerCase().includes("salute") ? 
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
                                                        onClick={() => handleMobileDeviceClick(index, device.content, toggleSwipDrawer)}
                                                        sx={{color: "#02759F"}}
                                                    >
                                                        <MuiIcons.Videocam />
                                                    </MUI.IconButton>
                                                </MUI.Stack>
                                            }
                                            title={device.content}
                                        />
                                    </MUI.Box>
                                </MonitorDeviceCard>
                            </MUI.Collapse>
                        )}
                    </TransitionGroup>
                </MUI.Box>
            </MUI.Box>
            <MUI.Box className="mobile-footer" />
        </MobileContentRoot>
        </>
    )
};

export default MobileDrawerContent;