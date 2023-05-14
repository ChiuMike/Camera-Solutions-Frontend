import * as MUI from "@mui/material";
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

const appBarHeight = 64

export const HomeMainBox = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) =>({ 
    display: 'flex',
    width: '100%',
    minHeight: `calc(100vh - ${appBarHeight}px)`,
}));

export const HomeLeftSide = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) =>({ 
    flex: '1 0 70%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
    background: 'url(/images/Coverbackground.png) no-repeat',
    backgroundColor: theme.palette.mode === 'light' ? '#01698F': '#121212',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    textAlign: 'center',
    '& img': {
        width: '100%',
        margin: '0 auto',
        minWidth: "25rem",
    },
    [theme.breakpoints.down('mediumDesktop')]: {
        flex: '1 0 65%',
    },
    [theme.breakpoints.down('xl')]: {
        flex: '1 0 60%',
    },
    [theme.breakpoints.down('lg')]: {
        flex: '1 0 55%',
    },
    [theme.breakpoints.down('md')]: {
        display: 'none'
    },
}));


export const HomeRightSide = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) =>({ 
    flex: '1 0 30%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
        alignItems: 'center',
        background: 'url(/images/Coverbackground.png) no-repeat',
        backgroundColor: theme.palette.mode === 'dark' ? '#121212': '#eff5f7',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
    },
}));

export const LoginBox = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) =>({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '20px 0px',
    [theme.breakpoints.down('md')]: {
        backgroundColor: 'rgba(255,255,255, 0.8)', 
        padding: '16px', 
        borderRadius: '30px',
    },
}));

export const LoginImg = MUI.styled('img')<any>(({theme}) => ({
    maxWidth: "20rem",
    marginBottom: '30px',
    [theme.breakpoints.down('xl')]: {
        maxWidth: "18rem",
    },
    [theme.breakpoints.down('lg')]: {
        maxWidth: "15rem",
    },
    [theme.breakpoints.down('md')]: {
        maxWidth: "26rem",
        marginBottom: '40px',
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: "20rem",
    },
    [theme.breakpoints.down('extraSmallMobile')]: {
        maxWidth: "20rem",
    }
}));

export const LanguageForm = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    [theme.breakpoints.down('md')]: {
        "& .MuiFormControl-root": {
            width: '120px',
            "& .MuiOutlinedInput-root": {
                borderRadius: '10px',
            },
            '& .MuiInputLabel-root': {
                color: '#02759F',
                fontWeight: 'bold',
                fontSize: '16px',
            },
        }
    },
    [theme.breakpoints.down('extraSmallMobile')]: {
        "& .MuiFormControl-root": {
            width: '100px',
            '& .MuiInputLabel-root': {
                fontSize: '14px',
            },
        }
    }
}));

export const LoginInputForm = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
    display: 'flex', 
    flexDirection: 'column',
    alignItem: "center", 
    justifyContent: "center", 
    "& .MuiOutlinedInput-root": {
        marginBottom: '35px',
        width: '350px', 
    },
    "& .MuiFormHelperText-root": {
        marginTop: '-25px',
    },
    "& .MuiFormHelperText-root: last-of-type" : {
        marginBottom: '20px'
    },
    "& .MuiButtonBase-root": {
        alignSelf: 'center',
    },
    [theme.breakpoints.down('xl')]: {
        '& .MuiOutlinedInput-root': {
            width: "300px",
        }
    },
    [theme.breakpoints.down('lg')]: {
        '& .MuiOutlinedInput-root': {
            width: "240px",
        }
    },
    [theme.breakpoints.down('md')]: {
        marginBottom: '15px',
        "& .MuiOutlinedInput-root": {
            width: '450px',
            "&.Mui-focused fieldset": {
                border: '3px solid #02759F',
            },
            "&.Mui-focused .MuiSvgIcon-root": {
                color: '#02759F',
                fontSize: '30px'
            },
        },
        "& .MuiFormHelperText-root": {
            marginTop: '-20px',
        },
        '.MuiOutlinedInput-notchedOutline': {
            borderRadius: '20px',
        },
        "& .MuiSvgIcon-root": {
            color: '#02759F',
            fontSize: '28px'
        },
        '& .MuiInputLabel-root': {
            color: '#02759F',
            fontWeight: 'bold',
            fontSize: '18px',

        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#02759F',
            fontSize: '20px',
        }
    },
    [theme.breakpoints.down('sm')]: {
        "& .MuiOutlinedInput-root": {
            width: '320px',
        },
    },
    [theme.breakpoints.down('smallMobile')]: {
        "& .MuiOutlinedInput-root": {
            width: '300px',
        },
    },
    [theme.breakpoints.down('extraSmallMobile')]: {
        marginBottom: '10px',
        "& .MuiOutlinedInput-root": {
            width: '200px',
        },
    }
}));