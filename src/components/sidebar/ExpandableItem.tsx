import * as React from "react";
import { ISidebarMenu } from "./sidebarList";
import * as MuiIcons from "@mui/icons-material/";
import * as MUI from "@mui/material";
import { SetSidebarIcon } from "./SidebarMenu";

interface ExpandableItemBaseProps {
    sidebarArr: ISidebarMenu;
}

const ExpandableItem: React.FC<ExpandableItemBaseProps> = ({sidebarArr}) => {

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    }

    return (
        <>
            <MUI.ListItemButton onClick={handleClick}>
                <MUI.ListItemIcon>
                    <SetSidebarIcon name={sidebarArr.name} />
                </MUI.ListItemIcon>
                <MUI.ListItemText primary={sidebarArr.name} />
                {open ? <MuiIcons.ExpandLess /> : <MuiIcons.ExpandMore />}
            </MUI.ListItemButton>
            <MUI.Collapse in={open} timeout={350} unmountOnExit>
                <MUI.List component="div" disablePadding>
                    {(sidebarArr.submenu !== undefined && sidebarArr.submenu.length > 0) && 
                        sidebarArr.submenu.map((subMenu, index) => 
                            <MUI.ListItemButton sx={{ pl: 4 }} key={index}>
                                <MUI.ListItemIcon>
                                    <SetSidebarIcon name={subMenu.name} />
                                </MUI.ListItemIcon>
                                <MUI.ListItemText primary={subMenu.name} />
                            </MUI.ListItemButton>
                        )
                    }
                </MUI.List>
            </MUI.Collapse>
        </>
    )
};

export default ExpandableItem;