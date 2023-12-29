import { FC } from "react";
import * as MUI from "@mui/material";
import { useLayoutState } from "../context/LayoutProvider";
import { useClientFiltersState } from "../context/ClientStateProvider";
import { SideBarRoot } from "../style/RemoteDrawer.styles";
import * as MuiIcons from "@mui/icons-material/";
import { List as ListComponent } from "../../../components/list";

const DrawerContent: FC = () => {

    const { handleCollapseOpen, collapseOpen } = useLayoutState();
    const { deviceFilters, handleDeviceFilters, statusFilter, handleStatusFilters } = useClientFiltersState();

    return (
        <SideBarRoot>
            <MUI.List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className="filter-list"
            >
                <MUI.ListItemButton onClick={() => handleCollapseOpen("device")}>
                    <MUI.ListItemIcon>
                        {collapseOpen.device ? <MuiIcons.Remove /> : <MuiIcons.Add />}
                    </MUI.ListItemIcon>
                    <MUI.ListItemText 
                        primary={
                            <span className="list-header">DEVICES</span>
                        }
                    />
                </MUI.ListItemButton>
                <MUI.Divider variant="middle"/>
                <MUI.Collapse in={collapseOpen.device} timeout="auto" unmountOnExit>
                    <MUI.List component="div" disablePadding dense={true} className="collapse-list" >
                        <ListComponent 
                            data={[ "all", "salute", "panther"]}
                            renderItem={
                                (item) => 
                                <MUI.ListItemButton key={item} onClick={() => handleDeviceFilters(item)} sx={{ pl: 4, pt: 0, pb: 0 }}>
                                    <MUI.ListItemIcon>
                                        <MUI.Checkbox
                                            edge="start"
                                            icon={<MuiIcons.CheckBoxOutlineBlank className="check"/>}
                                            checkedIcon={<MuiIcons.CheckBox className="checked" />}
                                            name={"select all"}
                                            checked={item === "all" ? deviceFilters.length === 2: deviceFilters.indexOf(item) > -1}
                                        />
                                    </MUI.ListItemIcon>
                                    <MUI.ListItemText className={item} primary={<span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>} />
                                </MUI.ListItemButton>
                            }
                        />
                    </MUI.List>
                </MUI.Collapse>
                <MUI.ListItemButton onClick={() => handleCollapseOpen("status")} sx={{marginTop: '10px'}}>
                    <MUI.ListItemIcon>
                        {collapseOpen.status ? <MuiIcons.Remove /> : <MuiIcons.Add />}
                    </MUI.ListItemIcon>
                    <MUI.ListItemText 
                        primary = {
                            <span className="list-header">STATUS</span>
                        } 
                    />
                </MUI.ListItemButton>
                <MUI.Divider variant="middle"/>
                <MUI.Collapse in={collapseOpen.status} timeout="auto" unmountOnExit className="collapse-list">
                    <MUI.List component="div" disablePadding dense={true}>
                        <ListComponent 
                            data={[ "All", "READY", "LIVE_RECORD", "VIDEO_RECORD", "SOS", "ARCHIVING"]}
                            renderItem={
                                (item) => 
                                <MUI.ListItemButton key={item} onClick={() => handleStatusFilters(item)} sx={{ pl: 4, pt: 0, pb: 0 }}>
                                    <MUI.ListItemIcon>
                                        <MUI.Checkbox
                                            edge="start"
                                            icon={<MuiIcons.CheckBoxOutlineBlank className="check"/>}
                                            checkedIcon={<MuiIcons.CheckBox className="checked" />}
                                            name={item}
                                            checked={item === "All" ? statusFilter.length === 5 : statusFilter.indexOf(item) > -1}
                                        />
                                    </MUI.ListItemIcon>
                                    <MUI.ListItemText className={item} primary={<span>{item.replace("_", " ")}</span>} />
                                </MUI.ListItemButton>
                            }
                        />
                    </MUI.List>
                </MUI.Collapse>
            </MUI.List>
        </SideBarRoot>
    )
};

export default DrawerContent;
