import * as MUI from "@mui/material";
import React, { useEffect, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import * as MuiIcons from "@mui/icons-material";
import { IIcon, ISidebarMenu, sidebarTop, gpsPtt, DeviceManagement, Setting } from "./sidebarList";
import { SidebarContainer, SidebarSubheader } from "./Sidebar.styles";
import { ApiUrl, ReadUserDetailResponse } from "../../apis/users";
import { useAxios } from "../../hooks/useAxios";
import { RequestMethod } from "../../apis/Api";
import useLocalStorage, { LocalStorage } from "../../hooks/useLocalStorage";

export interface SidebarBaseProps {
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleSignout: () => void;
}

export const SetSidebarIcon: FC<IIcon> = (props) => {
    const { name } = props;

    switch (name) {
		case "Dashboard": {   
			return <MuiIcons.Dashboard/>;
		}
        case "Group": {
            return <MuiIcons.Group />
        }
        case "Devices": {
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
        case "Event Log": {
			return <MuiIcons.EventNote />;
		}
        case "Remote Control": {
			return <MuiIcons.SettingsRemote />;
		}
        case "Settings": {
			return <MuiIcons.Settings />;
		}
        case "History Track" : {
            return <MuiIcons.TravelExplore />;
        }
        case "Patrol" : {
            return <MuiIcons.TransferWithinAStation />;
        }
        case "Channel" : {
            return <MuiIcons.InterpreterMode />;
        }
        case "Video Upload" : {
            return <MuiIcons.VideoFile />;
        }
        default :{
            return null
        }
    }
};

const SidebarMenu: FC<SidebarBaseProps> = ({drawerOpen: open, handleSignout}) => {

    const params = useLocation();

    const { value: uuid } = useLocalStorage(LocalStorage.UUID, "");

    const {makeRequest: readUserDetail, data: userDeatil, loading} = useAxios<ReadUserDetailResponse>();

    useEffect(() => {
        readUserDetail({
            url: ApiUrl.readUserDetail(uuid),
            method: RequestMethod.GET
        });
    }, []);

    return (
        <SidebarContainer>
            <MUI.Box className="sidebar-header">

            </MUI.Box>
            <MUI.Box className="header">
                <MUI.List
                    component="nav" 
                    aria-label="main sidebar"
                    className="sidebar-top-list"
                >
                    {sidebarTop.map((mainMenu: ISidebarMenu, i) => 
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
                    className="sidebar-gpsPtt"
                    subheader={<SidebarSubheader open={open}>{"GPS & Channel"}</SidebarSubheader>}
                >
                    {gpsPtt.map((mainMenu: ISidebarMenu, i) => 
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
                    className="sidebar-gpsPtt"
                    subheader={<SidebarSubheader open={open}>{"Device Management"}</SidebarSubheader>}
                >
                    {DeviceManagement.map((mainMenu: ISidebarMenu, i) => {
                        return (
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
                                    {mainMenu.submenu !== undefined &&
                                        <MuiIcons.ExpandLess/>
                                    }
                                </MUI.ListItemButton>
                            </MUI.Tooltip>
                            )
                        }
                    )}
                </MUI.List>
                <MUI.Divider sx={{mt: 2}} />
                <MUI.List
                    component="nav" 
                    aria-label="main sidebar"
                    className="sidebar-gpsPtt"
                >
                    {Setting.map((mainMenu: ISidebarMenu, i) => 
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
            </MUI.Box>
            <MUI.Box className="sidebar-footer">
                <MUI.List>
                    <MUI.ListItem>
                        <MUI.Tooltip title={userDeatil?.data.username} placement="right">
                            <MUI.ListItemAvatar>
                                <MUI.Avatar 
                                    alt={userDeatil?.data.username.toUpperCase()}
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ background: "#02759F", width: 30, height: 30}}
                                />
                            </MUI.ListItemAvatar>
                        </MUI.Tooltip>
                        <MUI.ListItemText
                            primary={userDeatil?.data.username}
                        />
                        <MUI.IconButton onClick={handleSignout}>
                            <MuiIcons.Logout />
                        </MUI.IconButton>
                    </MUI.ListItem>
                </MUI.List>
            </MUI.Box>
        </SidebarContainer>
    )
};

export default SidebarMenu;