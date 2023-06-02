import * as MUI from "@mui/material";

export const Container = MUI.styled(MUI.Box, {
    shouldForwardProp: (prop) => prop !=='open' && prop !== 'matches'})
    <{open: boolean, matches?:boolean}>
    (({ theme, open, matches}) => ({   
        position: 'relative',
        height: `calc(100vh - 64px)`,
        marginTop: 64,
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // ...(open && {
        //     transition: theme.transitions.create('width', {
        //         easing: theme.transitions.easing.sharp,
        //         duration: theme.transitions.duration.enteringScreen,
        //     }),
        //     width: 'calc(100vw - 210px)',
        //     marginRight: '210px',
        // }),
        // ...(!open && {
        //     transition: theme.transitions.create('width', {
        //         easing: theme.transitions.easing.sharp,
        //         duration: '300ms',
        //     }),
        //     marginLeft: '210px',
        //     width: 'calc(100vw - 277px)'
        // }),
}));
