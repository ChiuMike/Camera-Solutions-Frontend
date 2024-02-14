import { useState, FC, useContext } from "react";
import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { SubDrawer } from "../../../../components/drawer";
import { SideBarRoot } from "../../style/MonitorDrawer.styles";
import useClick from "../../../../hooks/useClick";
import { Search, SearchIconWrapper, StyledInputBase } from "../../../../components/form";
import { eventType } from "../../../../hooks/FormHooks";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { useBoardData, useLayoutState } from "../../context/ClientProvider";
import PanelDeviceItem from "../../kanban/PanelDeviceItem";
import { DeviceFilter } from "../../../../components/filter";

interface MonitorDrawerBaseProps {
    drawerOpen: boolean;
    loading: boolean;
    inputFields: { search: string};
    handleInputChange: (event: eventType) => void;
}

const MonitorDrawer: FC<MonitorDrawerBaseProps> = ({drawerOpen: navDrawerOpen, inputFields, handleInputChange}) => {

    const { isOver, setNodeRef } = useDroppable({ id: "device" });

    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');

    const [handleSubDrawer, subDrawerOpen, setSubDrawerOpen] = useClick();

    const { boardData } = useBoardData();

    const { anchorEl, deviceFilter, handleDeviceFilter, handleMenuClose, handleMenuOpen } = useLayoutState();

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
            subDrawerWidth={260}
            subDrawerOpen={subDrawerOpen}
            navDrawerOpen={navDrawerOpen}
            mediaMatches={mediaMatches}
            renderChildren={() =>
                <SideBarRoot>
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
                        <SortableContext
                            items={[...boardData['device']]}
                            strategy={verticalListSortingStrategy}
                        >
                            <MUI.Box 
                                className={`content device`} 
                                ref={setNodeRef}
                                sx={{
                                    background: isOver ? "#E3FCEF" : "#FFF"
                                }}
                            >
                                {
                                    boardData["device"]
                                    .filter((device) => {
                                        if(inputFields.search === "") return device;
                                        return device.content.toLocaleLowerCase().includes(inputFields.search.toLocaleLowerCase())
                                    })
                                    .filter((device) => {
                                        return device.content.toLocaleLowerCase().startsWith(deviceFilter)
                                    })
                                    .map((panelItem, itemIndex) => 
                                        <PanelDeviceItem
                                            key={itemIndex}
                                            itemIndex={itemIndex}
                                            panelItem={panelItem} 
                                        />
                                    )
                                }
                            </MUI.Box>
                        </SortableContext>
                    </MUI.Box>
                </SideBarRoot>
            }
        />
        </>
    )
};

export default MonitorDrawer;