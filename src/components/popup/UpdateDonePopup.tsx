import { FC } from 'react';
import * as MuiIcons from "@mui/icons-material/";
import * as MUI from "@mui/material";

export const UpdateSuccess = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
    width: '25%',
    minWidth: '250px',
    maxWidth: '320px',
    backgroundColor: '#FFF',
    color:'#02759F',
    textAlign: 'center',
    padding: '20px 12px',
}));

interface IUpdatePopup {
    updateOpen: boolean;
}

const UpdateDonePopup: FC<IUpdatePopup> = ({updateOpen}) => {

    return (
        <MUI.Dialog
            open={updateOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                style: { borderRadius: '20px' }
            }}
        >
            <UpdateSuccess>
                <MUI.Box component='form'>
                    <MuiIcons.CheckCircleOutlineOutlined fontSize="large" sx={{color: '#4fd4ca'}}/>
                    <MUI.Typography variant="h6" sx={{fontWeight: 'bold'}}>Success</MUI.Typography>
                </MUI.Box>
            </UpdateSuccess>
        </MUI.Dialog>
    )
}

export default UpdateDonePopup;