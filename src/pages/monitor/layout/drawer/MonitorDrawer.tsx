import { useState, FC, useContext } from "react";
import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { IDeviceDto } from "../../../../apis/device";
import { SubDrawer } from "../../../../components/drawer";
import { SideBarRoot } from "../../style/MonitorDrawer.styles";
import useClick from "../../../../hooks/useClick";
import { Search, SearchIconWrapper, StyledInputBase } from "../../../../components/form";
import { useEventChange } from "../../../../hooks/FormHooks";
import { MonitorBoardPanels } from "../../../video-upload/type/type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface MonitorDrawerBaseProps {
    drawerOpen: boolean;
    loading: boolean;
    iotDevices: IDeviceDto[];
    panelIndex: number;
    panel: MonitorBoardPanels;
    children: JSX.Element;
}

const MonitorDrawer: FC<MonitorDrawerBaseProps> = ({drawerOpen: navDrawerOpen, panelIndex, iotDevices, panel, children}) => {

    const {
        isDragging,
        over,
        isOver,
        setNodeRef,
        transition,
        transform,
      } = useSortable({
        id: panel.id,
        disabled: true
    });

    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');

    const [handleSubDrawer, subDrawerOpen, setSubDrawerOpen] = useClick();

    const [handleInputChange, inputFields, setInputFields] = useEventChange({ search: ''});

    return (
        <>
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
                    <MUI.Box className="device-list">
                        <MUI.Box 
                            className={`content ${panel.id}`}
                            key={panelIndex}
                            ref={setNodeRef}
                            sx={{
                                transform: CSS.Transform.toString(transform),
                                transition,
                                background: isOver ? "#E3FCEF" : "#FFF"
                            }}
                        >
                            {children}
                        </MUI.Box>
                    </MUI.Box>
                </SideBarRoot>
            }
        />
        </>
    )
};

export default MonitorDrawer;