import * as MuiIcons from "@mui/icons-material/";
import * as MUI from "@mui/material";
import { SetStateAction, Dispatch, FC } from 'react';
import { popupStyles } from "./Popup.styles";

interface SosBaseProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setSos: Dispatch<SetStateAction<boolean>>;
}

const SosPopup: FC<SosBaseProps> = ({open, setOpen, setSos}) => {

    const classes = popupStyles();

    const handleClose = () => {
        setOpen(false);
        setSos(false);
    };
   
    return (
        <MUI.Dialog
            open={open}
            onClose={()=> setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <MUI.Box className={classes.sosDialog}>
                <MuiIcons.WarningAmber fontSize="large"  sx={{transform: 'scale(1.5)', marginBottom: '10px'}}/>
                <MUI.Box component='form'> 
                    <MUI.Typography variant="h5" sx={{marginBottom: '10px'}}>EMERGENCY CALL</MUI.Typography>
                    <MUI.Typography variant="subtitle1">Camera_001</MUI.Typography>
                    <MUI.Typography variant="subtitle1">2023/5/19 21:36</MUI.Typography>
                    <MUI.Box className="form-btn">
                        <MUI.Button onClick={handleClose} className="btn">END CALL</MUI.Button>
                    </MUI.Box>
                </MUI.Box>
            </MUI.Box>
        </MUI.Dialog>
    )
};

export default SosPopup;
