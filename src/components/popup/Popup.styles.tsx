import * as MUI from "@mui/material";
import { makeStyles } from '@mui/styles';

export const popupStyles = makeStyles((theme: MUI.Theme) => ({
    dialog: {
        width: '25%',
        minWidth: '350px',
        maxWidth: '380px',
        backgroundColor: '#02759F',
        color:' #FFF',
        textAlign: 'center',
        padding: '30px 10px',
        [theme.breakpoints.down("smallMobile")]: {
            minWidth: '300px',
        }
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
        backgroundColor: theme.palette.background.red_2,
        borderRadius: '20px',
        color: '#FFF',
        border: '0',
        padding: '0.35rem 2.5rem',
        margin: '0.5rem',
        cursor: 'pointer',
    },
    sosDialog: {
        width: '25%',
        minWidth: '350px',
        maxWidth: '380px',
        backgroundColor: theme.palette.background.red_3,
        color:' #FFF',
        textAlign: 'center',
        padding: '30px 10px',
        "& .btn": {
            backgroundColor: theme.palette.background.red_2,
            borderRadius: '20px',
            color: '#FFF',
            padding: '0.35rem 2.5rem',
            margin: '1rem 0.5rem 0.5rem 0.5rem',
            cursor: 'pointer',
            maxWidth: '250px',
            '&:hover': {
                backgroundColor: theme.palette.background.red_1,
                transition: 'all 0.3s linear',
                transform: 'translate(0px, 2px)',
            }
        },
        [theme.breakpoints.down("smallMobile")]: {
            minWidth: '300px',
        }
    },
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
    backgroundColor: theme.palette.background.red_1,
    borderRadius: '20px',
    color: '#FFF',
    border: '0',
    padding: '0.35rem 2.5rem',
    margin: '0.5rem',
    cursor: 'pointer',
    maxWidth: '110px',
    '&:hover': {
        backgroundColor: theme.palette.background.red_2,
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



