import * as MUI from "@mui/material";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import * as MuiIcons from "@mui/icons-material";
import { IIcon, ISidebarMenu, sidebarImages, sidebarDevices } from "./sidebarList";
import ExpandableItem from "./ExpandableItem";
import { SidebarSubheader } from "./Sidebar.styles";

export interface SidebarBaseProps {
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SetSidebarIcon: React.FC<IIcon> = (props) => {
    const { name } = props;

    switch (name) {
		case "Dashboard": {   
			return <MuiIcons.Dashboard/>;
		}
        case "Devices": {
            return <MuiIcons.Devices />;
        }
        case "Group": {
            return <MuiIcons.Group />
        }
        case "Devices List": {
            return <MuiIcons.CameraRear />
        }
        case "Users": {
			return <MuiIcons.Person />;
		}
        case "Map": {
			return <MuiIcons.Map />;
		}
        case "Monitor": {
			return <MuiIcons.Monitor />;
		}
        case "Event Logs": {
			return <MuiIcons.EventNote />;
		}
        case "Remote Control": {
			return <MuiIcons.SettingsRemote />;
		}
        case "Settings": {
			return <MuiIcons.Settings />;
		}
        case "Video Chat": {
			return <MuiIcons.VideoChat />;
		}
        case "History Track" : {
            return <MuiIcons.TravelExplore />;
        }
        default :{
            return null
        }
    }
};

const SidebarMenu: React.FC<SidebarBaseProps> = ({drawerOpen: open, setDrawerOpen}) => {

    const params = useLocation();

    return (
        <MUI.Box sx={{pt: 3}}>
            <MUI.List 
                component="nav" 
                aria-label="main sidebar"
            >
                <MUI.Tooltip title={!open ? "Dashboard" : '' } aria-label={"Dashboard"} placement="right">
                    <MUI.ListItemButton
                        component={Link}
                        to={"/dashboard"}
                        selected={params.pathname.includes("/dashboard") }
                    >
                        <MUI.ListItemIcon>
                            <SetSidebarIcon name={"Dashboard"} />
                        </MUI.ListItemIcon>
                        <MUI.ListItemText>Dashboard</MUI.ListItemText>
                    </MUI.ListItemButton>
                </MUI.Tooltip>
                <MUI.Tooltip title={!open ? "Users" : '' } aria-label={"Users"} placement="right">
                    <MUI.ListItemButton
                        component={Link}
                        to={"/users"}
                        selected={params.pathname.includes("/users") }
                    >
                        <MUI.ListItemIcon>
                            <SetSidebarIcon name={"Users"} />
                        </MUI.ListItemIcon>
                        <MUI.ListItemText>Users</MUI.ListItemText>
                    </MUI.ListItemButton>
                </MUI.Tooltip>
            </MUI.List>
            <MUI.Divider sx={{mt: 2}} />
            <MUI.List 
                component="nav" 
                aria-label="main sidebar"
                subheader={<SidebarSubheader open={open}>{"GPS & LIVE"}</SidebarSubheader>}
            >
            {sidebarImages.map((mainMenu: ISidebarMenu, i) =>  
                <MUI.Tooltip title={!open ? mainMenu.name : '' } aria-label={mainMenu.name} placement="right" key={i}>
                    <MUI.ListItemButton
                        component={Link}
                        key={i}
                        to={mainMenu.uri}
                        selected={params.pathname.includes(mainMenu.uri) }
                    >
                        <MUI.ListItemIcon>
                            <SetSidebarIcon name={mainMenu.name} />
                        </MUI.ListItemIcon>
                        <MUI.ListItemText>{(mainMenu.name)}</MUI.ListItemText>
                    </MUI.ListItemButton>
                </MUI.Tooltip> 
            )}
            </MUI.List>
            <MUI.Divider sx={{mt: 2}} />
            <MUI.List 
                component="nav" 
                aria-label="main sidebar"
                subheader={<SidebarSubheader open={open}>{"DEVICE MANAGEMENT"}</SidebarSubheader>}
            >
                {sidebarDevices.map((mainMenu: ISidebarMenu, i) =>  
                    <MUI.Tooltip title={!open ? mainMenu.name : '' } aria-label={mainMenu.name} placement="right" key={i}>
                        <MUI.ListItemButton
                            component={Link}
                            key={i}
                            to={mainMenu.uri}
                            selected={params.pathname.includes(mainMenu.uri) }
                        >
                            <MUI.ListItemIcon>
                                <SetSidebarIcon name={mainMenu.name} />
                            </MUI.ListItemIcon>
                            <MUI.ListItemText>{(mainMenu.name)}</MUI.ListItemText>
                        </MUI.ListItemButton>
                    </MUI.Tooltip> 
                )}
            </MUI.List>
            <MUI.Divider sx={{mt: 2}} />
            <MUI.List component="nav" aria-label="main sidebar">
                <MUI.Tooltip title={!open ? "Settings" : '' } aria-label={"Settings"} placement="right">
                    <MUI.ListItemButton
                        component={Link}
                        to={"/settings"}
                        selected={params.pathname.includes("/settings") }
                    >
                        <MUI.ListItemIcon>
                            <SetSidebarIcon name={"Settings"} />
                        </MUI.ListItemIcon>
                        <MUI.ListItemText>Settings</MUI.ListItemText>
                    </MUI.ListItemButton>
                </MUI.Tooltip>
            </MUI.List>
            {/* {sidebarArray.map((mainMenu: ISidebarMenu, i) => {
                if (mainMenu.submenu && mainMenu.submenu.length > 0) {
                    return (
                        <ExpandableItem 
                            key={i}
                            sidebarArr={mainMenu}
                        />
                    )
                }
                return (
                    <MUI.List component="nav" aria-label="main sidebar" key={i}>
                        <MUI.Tooltip title={!open ? mainMenu.name : '' } aria-label={mainMenu.name} placement="right">
                            <MUI.ListItemButton
                                component={Link}
                                key={i}
                                to={mainMenu.uri}
                                selected={params.pathname.includes(mainMenu.uri) }
                            >
                                <MUI.ListItemIcon>
                                    <SetSidebarIcon name={mainMenu.name} />
                                </MUI.ListItemIcon>
                                <MUI.ListItemText>{(mainMenu.name)}</MUI.ListItemText>
                            </MUI.ListItemButton>
                        </MUI.Tooltip>
                    </MUI.List>
                )
            })} */}
        </MUI.Box>
    )
};

export default SidebarMenu;