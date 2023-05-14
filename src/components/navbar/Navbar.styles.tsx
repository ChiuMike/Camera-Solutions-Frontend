import * as MUI from "@mui/material";

const drawerWidth = 210;
const closeDrawerWidth = 57;
const appBarHeight = 64
const subDrawerWidth = 220;

interface AppBarProps extends MUI.AppBarProps {
    open?: boolean;
};

export const AppBar = MUI.styled(MUI.AppBar,{ shouldForwardProp: (prop) => prop !== 'open' })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: '0px 0px 0px 0px',
    outline: 'none',
    border: 'none',
    borderColor: 'transparent',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.background.appBar,
    "& .MuiToolbar-root" : {
        paddingLeft: '0px'
    },
    ...(open && {
        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            width: "100%"
        },
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const HeaderImg = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) =>({ 
    display: 'flex',
    height: `${appBarHeight}px`,
    textAlign: 'center',
    width: '220px', // white space width
    padding: '0px 0px 0px 0px',
    alignItems: 'center',
    outlined: '0',
    backgroundColor: '#FFF',
    '& img': {
        width: '80%',
        height: '40%'
    },
    [theme.breakpoints.down('sm')]: {
        width: '150px', // white space width
        '& img': {
            padding: '0px 10px 0px 10px',
            width: '70%',
            height: '40%'
        },
    }
}));

export const Main = MUI.styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open: boolean;}>(({ theme, open }) => ({
	flexGrow: 1,
    overflowY: 'hidden',
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	...(open && {
		marginLeft: 0,
		width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down("sm")]: {
            marginLeft: `-${drawerWidth}px`,
        }
	}),
	...(!open && {
		marginLeft: 0,
		width: `calc(100% - ${closeDrawerWidth}px)`,
	}),
}));