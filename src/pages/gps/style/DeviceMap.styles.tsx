import * as MUI from "@mui/material";

const subDrawerWidth = 300;

const mobileOpenMixin = (theme: MUI.Theme): MUI.CSSObject => ({
    transition: theme.transitions.create(['all'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    height: "calc(100vh - 520px)",
});

const mobileCloseMixin = (theme: MUI.Theme): MUI.CSSObject => ({
    transition: theme.transitions.create(['all'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    height: "calc(100vh - 120px)"
});

export const Container = MUI.styled(MUI.Box, { shouldForwardProp: (prop) => prop !=='mobileOpen' && prop !== 'navDrawerOpen' && prop !== "mediaMatches"})
    <{mobileOpen: boolean, navDrawerOpen: boolean, mediaMatches: boolean}>
    (({ theme, mobileOpen, navDrawerOpen, mediaMatches}) => ({
        position: 'relative',
        height: `calc(100vh - 64px)`,
        marginTop: 64,
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...((navDrawerOpen && !mediaMatches) && {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            width: 'calc(100vw - 210px)',
        }),
        ...((!navDrawerOpen && !mediaMatches) && {
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: '300ms',
            }),
            marginLeft: '290px',
            width: 'calc(100vw - 355px)'
        }),
        [theme.breakpoints.down("md")] : {
            marginLeft: '0px',
            width: '100vw',
            ...((mobileOpen && mediaMatches) && {
                ...mobileOpenMixin(theme),
            }),
            ...((!mobileOpen && mediaMatches) && {
                ...mobileCloseMixin(theme),
            }),
        },
}));

export const MapButton =  MUI.styled(MUI.IconButton, {shouldForwardProp: (prop) => prop !== 'open' && prop !== 'btnColor' && prop !== 'sos'})
    <{open: boolean, btnColor: string, sos?: boolean}>
    (({ theme, open, btnColor, sos }) => ({
        border: '3px solid rgb(255, 255, 255)',
        backgroundColor: `${btnColor}`,
        height: '44px',
        width: '44px',
        margin: '0 5px',
        ...(!open && {
            '&:hover': {
                backgroundColor: `${btnColor}`,
                transition: 'all 0.3s linear',
                transform: 'scale(1.2)',
            },
        }),
        scale: open ? '1.3' : 1,
        "& .MuiSvgIcon-root": {
            color:"rgb(255, 255, 255)", 
            fontSize: '30px',
            animation: sos ? 'bell-ring 2s infinite': '',
        },
        animation: sos ? 'sos 1s alternate infinite ease-in-out': "",
        "@keyframes sos" : {
            '0%': {
                transform: "scale(1)"
            },
            '100%': {
                transform: "scale(1.2)"
            }
          
        },
        "@keyframes bell-ring" :{
            "0%": {
                transform: "",
            },
            "5%, 15%" :{
                transform: "rotate(25deg)",
            },
            "10%, 20%": {
                transform: "rotate(-25deg)"
            },
            "25%": {
                transform: "rotate(0deg)"
            },
            "100%": {
                transform: "rotate(0deg)"
            }
        }
}));

//DirectionsWalk
export const MarkerIcon =  MUI.styled('span', {shouldForwardProp: (prop) => prop !== 'color'})<{color: string}>
    (({ theme, color }) => ({
        backgroundColor: color,
        width: '40px',
        height: '40px',
        display: 'block',
        position: 'relative',
        borderRadius: '5px',
        textAlign: "center",
        "& .MuiSvgIcon-root": {
            color: "#FFF",
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: "translate(-50%, -50%)",
        },
        "& .triangle-people2": {
            position: 'absolute',
            height: "0px",
            width: "0px",
            borderLeft: '0.5em solid transparent',
            borderRight: '0.5em solid transparent',
            borderTop: `1em solid ${color}`,
            left: '50%',
            top: '100%',
            transform: "translate(-50%, 0%)",
            ziIndex: 999,
        },
}));

export const PatrolIcon =  MUI.styled('span', {shouldForwardProp: (prop) => prop !== 'color'})<{color: string}>
    (({ theme, color }) => ({
        backgroundColor: color,
        width: '30px',
        height: '30px',
        display: 'block',
        position: 'relative',
        borderRadius: '5px',
        textAlign: "center",
        "& .MuiSvgIcon-root": {
            color: "#FFF",
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: "translate(-50%, -50%)",
        },
        "& .triangle-people2": {
            position: 'absolute',
            height: "0px",
            width: "0px",
            borderLeft: '0.4em solid transparent',
            borderRight: '0.4em solid transparent',
            borderTop: `0.8em solid ${color}`,
            left: '50%',
            top: '100%',
            transform: "translate(-50%, 0%)",
            ziIndex: 999,
        },
}));

export const StyledIcon = MUI.styled('span', {
    shouldForwardProp: (prop) => prop !== 'color'})
    <{color: string; height?: number; width?: number, top?: string}>
    (({ theme, color, height, width, top }) => ({
        backgroundColor: `${color} !important`,
        width: '25px',
        height: '25px',
        display: 'block',
        // left: '1.5rem',
        top: top,
        position: 'relative',
        borderRadius: '3rem 3rem 0',
        transform: 'rotate(45deg)',
        border: color=== 'transparent' ? '1px solid transparent' : '1px solid #FFFFFF',
        
}));

export const HistoryIcon =  MUI.styled('span')<any>(({ theme }) => ({
        backgroundColor: '#0c2358',
        width: '25px',
        height: '25px',
        display: 'block',
        position: 'relative',
        borderRadius: '50px',
        textAlign: "center",
        border:'1px solid #FFF',
        "& .MuiTypography-root": {
            color: "#FFF",
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: "translate(-50%, -50%)",
            fontSize: '20px',
        },
}));