import * as MUI from "@mui/material";
import * as React from "react";
import { DrawerHeader } from "../../../components/drawer/Drawer.styles";
import { CancelButton, ConfirmButton } from "../../../components/popup/Popup.styles";
import { DrawerContent, DrawerFooter, UpdateDrawer } from "../style/MapControl.styles";

interface UpdateTimeDrawerBaseProps {
    isOpenUpdate: boolean;
    setOpenUpdate: (value: React.SetStateAction<boolean>) => void;
}

const UpdateTimeDrawer: React.FC<UpdateTimeDrawerBaseProps> = ({isOpenUpdate, setOpenUpdate}) => {

    const [interval, setInterval] = React.useState("60000");

    const handleSelectChange = (event: MUI.SelectChangeEvent) => {
        setInterval(event.target.value);
    }

    const toggleDrawer =
        (anchor: string, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setOpenUpdate(open);
    };

    return (
        <UpdateDrawer
            anchor={'right'}
            open={isOpenUpdate}
            hideBackdrop={true}
            variant="persistent"
        >
            <DrawerHeader />
            <DrawerContent>
                <MUI.Box sx={{display: 'flex' ,justifyContent: 'center'}}> 
                    <MUI.FormControl variant="standard" sx={{ marginTop: 5, minWidth: 220 }}>
                        <MUI.InputLabel>Update frequency</MUI.InputLabel>
                        <MUI.Select
                            labelId="single-select-label"
                            variant="standard"
                            value={interval}
                            onChange={handleSelectChange }
                            sx={{textIndent: '8px'}}
                        >
                            <MUI.MenuItem value={60000}>1 Minute</MUI.MenuItem>
                            <MUI.MenuItem value={300000}>5 Minutes</MUI.MenuItem>
                            <MUI.MenuItem value={900000}>15 Minutes</MUI.MenuItem>
                            <MUI.MenuItem value={3600000}>1 Hour</MUI.MenuItem>
                        </MUI.Select>
                    </MUI.FormControl>
                </MUI.Box>
                <MUI.Box sx={{flexGrow: 2}}></MUI.Box>
                <MUI.Divider />
                <DrawerFooter>
                    <CancelButton onClick={toggleDrawer('right', false)}>Cancel</CancelButton>
                    <ConfirmButton onClick={toggleDrawer('right', false)}>Confirm</ConfirmButton>
                </DrawerFooter>
            </DrawerContent>
        </UpdateDrawer>
    )
};

export default UpdateTimeDrawer;