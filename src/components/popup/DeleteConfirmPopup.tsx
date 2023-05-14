import { SetStateAction, Dispatch } from 'react';
import { popupStyles, ConfirmButton, CancelButton} from './Popup.styles';
import * as MuiIcons from "@mui/icons-material/";
import * as MUI from "@mui/material";

export interface IConfirmPopup<T> {
    setConfirmOpen: Dispatch<SetStateAction<boolean>>
    confirmOpen: boolean;
    handleDelete: (dataSelected: T[]) => void;
    dataSelected: T[];
}

const DeleteConfirmPopup = <T extends unknown> (props: IConfirmPopup<T>) => {

    const { confirmOpen, setConfirmOpen, handleDelete, dataSelected } = props;

    const classes = popupStyles();

    const handleClose = () => {
        setConfirmOpen(false);
    };
    
    return (
        <MUI.Dialog
            open={confirmOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <MUI.Box className={classes.dialog}>
                <MUI.Box component='form'>
                    <MuiIcons.ErrorOutline fontSize="large"  sx={{transform: 'scale(1.5)', marginBottom: '5px'}}/>
                    <MUI.Typography variant="h5">Delete Confirm</MUI.Typography>
                    <p>Are you sure you want to delete?</p>
                    <MUI.Box className="form-btn">
                        <ConfirmButton onClick={()=>handleDelete(dataSelected)}>Yes</ConfirmButton>
                        <CancelButton onClick={handleClose}>Cancel</CancelButton>
                    </MUI.Box>
                </MUI.Box>
            </MUI.Box>
        </MUI.Dialog>
    );
}

export default DeleteConfirmPopup;
