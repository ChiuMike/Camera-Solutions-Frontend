import * as MUI from "@mui/material";

const mobileOpenMixin = (theme: MUI.Theme): MUI.CSSObject => ({
    transition: theme.transitions.create(['all'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    height: "calc(100vh - 520px)",
});

const mobileCloseMixin = (theme: MUI.Theme, checked: boolean): MUI.CSSObject => ({
    transition: theme.transitions.create(['all'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    height: checked ? "100vh" :"calc(100vh - 120px)"
});

export const Container = MUI.styled(MUI.Box, {
    shouldForwardProp: (prop) => prop !=='open' && prop !== 'matches' && prop !== "checked" && prop !== "mobileOpen"})
    <{open: boolean, checked: boolean, matches:boolean, mobileOpen: boolean}>
    (({ theme, open, matches, checked, mobileOpen}) => ({
        position: 'relative',
        height: `calc(100vh - 64px)`,
        marginTop: 64,
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            width: checked ? "100vw" :'calc(100vw - 210px)',
        }),
        ...(!open && {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: '300ms',
            }),
            marginLeft: checked ? "0px" :'473px',
            width: checked ? "calc(100vw - 65px)" : 'calc(100vw - 65px)'
        }),
        [theme.breakpoints.down(772)] : {
            marginLeft: '0px',
            width: '100vw',
            ...((mobileOpen && matches) && {
                ...mobileOpenMixin(theme),
            }),
            ...((!mobileOpen && matches) && {
                ...mobileCloseMixin(theme, checked),
            }),
        },
}));