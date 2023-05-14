import * as MUI from "@mui/material";
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';

export const popupStyles = makeStyles((theme: MUI.Theme) => ({
    dialog: {
        width: '25%',
        minWidth: '350px',
        maxWidth: '380px',
        backgroundColor: '#02759F',
        color:' #FFF',
        textAlign: 'center',
        padding: '30px 10px',
    },
    confirm: {
        backgroundColor: '#00bcd4',
        borderRadius: '20px',
        color: '#FFF',
        border: '0',
        padding: '0.35rem 2.5rem',
        margin: '0.5rem',
        cursor: 'pointer',
    },
    cancel: {
        backgroundColor: '#ff5252',
        borderRadius: '20px',
        color: '#FFF',
        border: '0',
        padding: '0.35rem 2.5rem',
        margin: '0.5rem',
        cursor: 'pointer',
    }
}))

export const ConfirmButton = MUI.styled(MUI.Button)<MUI.ButtonProps>(({theme}) => ({
    backgroundColor: theme.palette.background.confirmButton,
    borderRadius: '20px',
    color: theme.palette.text.common,
    border: '0',
    padding: '0.35rem 2.5rem',
    margin: '0.5rem',
    cursor: 'pointer',
    maxWidth: '110px',
    '&:hover': {
        backgroundColor: theme.palette.action.confirmButtonHover,
        transition: 'all 0.3s linear',
        transform: 'translate(0px, 2px)',
    }
}));

export const CancelButton = MUI.styled(MUI.Button)<MUI.ButtonProps>(({theme}) => ({
    backgroundColor: '#c24242',
    borderRadius: '20px',
    color: '#FFF',
    border: '0',
    padding: '0.35rem 2.5rem',
    margin: '0.5rem',
    cursor: 'pointer',
    maxWidth: '110px',
    '&:hover': {
        backgroundColor: '#ff5252',
        transition: 'all 0.3s linear',
        transform: 'translate(0px, 2px)',
    }
}));

export const Close = MUI.styled(MUI.IconButton)<MUI.ButtonProps>(({theme}) => ({
    cursor: 'pointer',
    padding: '0px',
    '&:hover': {
        transition: 'all 0.3s linear',
        transform: 'translate(0px, 2px)',
    }
}));



