import * as MUI from "@mui/material";

export const SidebarSubheader = MUI.styled(MUI.ListSubheader, { shouldForwardProp: (prop) => prop !== 'open', })<{open:boolean}>(
    ({ theme, open }) => ({
        backgroundColor: open ? theme.palette.background.sidebarOpen : theme.palette.background.sidebarClose,
        visibility: open ? "visible" : "hidden",
        height: open ? "50px" : "16px",
        color: theme.palette.text.main,
        fontWeight: 800,
        transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
}));