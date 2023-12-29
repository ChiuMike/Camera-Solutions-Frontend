import * as MUI from "@mui/material";

const subDrawerTimeline = 350;
const subDrawerWidth = 300;

const checkedMixin = (theme: MUI.Theme): MUI.CSSObject => ({
    transition: theme.transitions.create(['all'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    gap: '0px'
});

const notCheckedMixin = (theme: MUI.Theme): MUI.CSSObject => ({
    transition: theme.transitions.create(['all'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
});

export const Container = MUI.styled(MUI.Box, {
    shouldForwardProp: (prop) => prop !=='open' && prop !== 'navDrawerOpen' && prop !== "topOpen" && prop !== "checked" && prop !== "timelineOpen"})
    <{open: boolean, navDrawerOpen: boolean, topOpen: boolean, checked: boolean, timelineOpen: boolean}>
    (({ theme, open, navDrawerOpen, topOpen, checked, timelineOpen}) => ({
        position: 'relative',
        height: `calc(100vh - 64px)`,
        marginTop: 64,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...(navDrawerOpen && {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            width: 'calc(100vw - 210px)',
        }),
        ...(!navDrawerOpen && {
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: '300ms',
            }),
            marginLeft: timelineOpen ? `calc(${subDrawerTimeline}px - 10px)` : `calc(${subDrawerWidth}px - 10px)`,
            width: timelineOpen ? 'calc(100vw - 405px)' : 'calc(100vw - 355px)'
        }),
        ...(checked && {
            ...checkedMixin(theme),
        }),
        ...(!checked && {
            ...notCheckedMixin(theme),
        }),
        [theme.breakpoints.down("md")] : {
            marginLeft: '0px',
            width: 'calc(100vw)',
            height: 'calc(100vh - 60px)',
            marginTop: 0,
            ...(topOpen && {
                ...openedTopMixin(theme)
            }),
            ...(!topOpen && {
                ...closedMixin(theme),
            })
        }
}));

const openedTopMixin = (theme: MUI.Theme): MUI.CSSObject => ({
    transition: theme.transitions.create(['margin', "height"], {
        easing: theme.transitions.easing.sharp,
        duration: "300ms",
    }),
    height: 'calc(100vh - 216px)',
    marginTop: '160px'
});


const closedMixin = (theme: MUI.Theme): MUI.CSSObject => ({
	transition: theme.transitions.create(['margin', "height"], {
        easing: theme.transitions.easing.sharp,
        duration: "300ms",
    }),
    marginLeft: '0px',
    width: 'calc(100vw)',
    height: 'calc(100vh - 60px)',
    marginTop: 0,
});

export const HistoryMapButton =  MUI.styled(MUI.IconButton, {shouldForwardProp: (prop) => prop !== 'isOpen'})
    <{isOpen: boolean}>
    (({ theme, isOpen }) => ({
        border: '3px solid #F5f5f5',
        backgroundColor: !isOpen ? "#02759F" : "#00bcd4",
        height: '35px',
        width: '35px',
        margin: '0 0px',
        "& .MuiSvgIcon-root": {
            color: "rgb(255, 255, 255)", 
            fontSize: '20px',
        },
        "&:hover": {
            backgroundColor: `#00bcd4`,
            transition: 'all 0.3s linear',
        },
        "&:disabled": {
            backgroundColor: `#dddddd`,
        }
}));
