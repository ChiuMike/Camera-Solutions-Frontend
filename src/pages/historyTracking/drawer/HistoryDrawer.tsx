import * as MUI from "@mui/material";
import React, { useEffect, FC, Dispatch, SetStateAction } from "react";
import { IDeviceDto } from "../../../apis/device";
import { DrawerHeader } from "../../../components/drawer/Drawer.styles";
import { SubDrawer } from "../../../components/drawer/SubDrawer.styles";
import { StyledTitle } from "../../../components/typography";
import { SideBarRoot } from "../style/HistoryDrawer.styles";

interface HistoryDrawerBaseProps {
    open: boolean;
    navDrawerOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    iotDevice: IDeviceDto[];
    setSelectedDevice: Dispatch<SetStateAction<string>>;
    selectedDevice: string;
    totalTime: string;
}

const HistoryDrawer: FC<HistoryDrawerBaseProps> = ({open, setOpen, navDrawerOpen, iotDevice, setSelectedDevice, selectedDevice, totalTime}) => {
    
    const mediaMatches = MUI.useMediaQuery('(max-width:575px)');

    const handleSelected = (data: string) => {
        setSelectedDevice(data);
    }

    useEffect(() => {
        if (navDrawerOpen && mediaMatches) {
            setOpen(false);
        }

    } ,[navDrawerOpen])

    return (
        <SubDrawer
            variant={ mediaMatches ? "persistent" : "permanent"} 
            open={ mediaMatches ? open : navDrawerOpen}
            anchor="left" 
            mediaMatches={mediaMatches}
        >
            <DrawerHeader />
            <SideBarRoot>
                <MUI.Box className="logs-title-box">
                    <StyledTitle>TRACKING</StyledTitle>
                </MUI.Box>
                <MUI.Divider />
                <MUI.List className="devices-list">
                    {
                        iotDevice.filter((item, index) => item.connection ).map((item, index) => 
                            <MUI.ListItem 
                                alignItems="flex-start" 
                                key={index} 
                            >
                                <MUI.ListItemButton 
                                    onClick={() => handleSelected(item.name)}
                                    selected={selectedDevice === item.name}
                                >
                                    <MUI.ListItemAvatar>
                                        <MUI.Avatar 
                                            src="/images/salute.jpeg"
                                        />
                                    </MUI.ListItemAvatar>
                                    <MUI.ListItemText
                                        primary={item.name}
                                    />
                                </MUI.ListItemButton>
                            </MUI.ListItem>
                        )
                    }
                </MUI.List>
            </SideBarRoot>
        </SubDrawer>
    )
};

export default HistoryDrawer;