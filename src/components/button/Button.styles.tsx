import * as MUI from "@mui/material";
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

export const LoadingSpinerButton = MUI.styled(LoadingButton)<LoadingButtonProps>(({theme}) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#02759F' : '#80cbc4',
    "&:hover": {
      backgroundColor: theme.palette.mode === 'light' ? "#00bcd4" : "#69f0ae"
    },
    color: 'white',
    lineHeight: "2rem",
    borderRadius: '20px',
    minWidth: '120px',
    height: '40px',
    [theme.breakpoints.down('md')]: {
        width: "200px",
    },
    [theme.breakpoints.down('extraSmallMobile')]: {
        width: "150px",
    }
}));

export const SubmitButton = MUI.styled(MUI.Button, {
    shouldForwardProp: (prop) => prop !== 'rounded'})<{rounded: boolean}>
    (({ theme, rounded}) => ({
        backgroundColor: theme.palette.background.formButton,
        borderRadius: rounded ? '20px' : '5px',
        color: theme.palette.text.common,
        border: 'none',
        padding: '0.35rem 2.5rem',
        margin: '0.5rem',
        cursor: 'pointer',
        maxWidth: '400px',
        alignSelf: 'end',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            transition: 'all 0.3s linear',
            transform: 'translate(0px, 2px)',
            border: 0,
        },
        '&:disabled' : {
            color: theme.palette.text.common,
            opacity: 0.7
        },
        [theme.breakpoints.down("smallMobile")]: {
            alignSelf: 'center',
            maxWidth: '120px',
        }
}));