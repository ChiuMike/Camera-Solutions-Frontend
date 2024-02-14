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

export const ListItemIcon = MUI.styled(MUI.ListItemIcon, { shouldForwardProp: (prop) => prop !== 'selected', })<{selected: boolean}>(
    ({ theme, selected }) => ({
        color: selected ? "#FFF" : '#616161'
}));

export const SidebarContainer = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'calc(100vh - 64px)',
    position: 'relative',
    "& .sidebar-header": {
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: '16px',
    },
    "& .header": {
        flexGrow: 2,
        overflowY: 'scroll',
    },
    "& .sidebar-footer": {
        flexGrow: .5,
        borderTop: '1px solid rgba(224, 224, 224, 1)',
        "& .MuiList-root": {
            
        },
    }
}));

export const SidebarDivider = MUI.styled(MUI.Divider)<MUI.DividerProps>(({theme}) => ({
    fontWeight: 600,
    fontSize: '1rem',
    letterSpacing: '1px',
    opacity: 1,
    textTransform: 'capitalize',
    color:'#02759F',
    padding: '5px 0px',
}));