import { FC, ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import * as MUI from "@mui/material";
import { Close } from './Popup.styles';

interface DialogBaseProps {
    open: boolean;
    handleOpen: () => void;
    renderChildren: () => ReactNode;
    disableEscapeKeyDown: boolean;
    maxWidth?: false | MUI.Breakpoint;
    fullWidth?: boolean;
}

const Dialog: FC<DialogBaseProps> = ({open, handleOpen, renderChildren, maxWidth, fullWidth, disableEscapeKeyDown}) => {

    return (
        <MUI.Dialog
            disableEscapeKeyDown={disableEscapeKeyDown}
            open={open}
            onClose={handleOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={fullWidth===undefined ? true: false}
            maxWidth={maxWidth}
        >
            <MUI.DialogContent>
                <MUI.Box className="close" sx={{ display:'flex', flexDirection:'row-reverse'}} >
                    <Close size="small" aria-label="delete" onClick={handleOpen}><CloseIcon  sx={{color:'background.formButton'}}/></Close>
                </MUI.Box>
                {renderChildren()}
            </MUI.DialogContent>
        </MUI.Dialog>
    )
};

export default Dialog;