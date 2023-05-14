import * as MUI from "@mui/material";

const drawerWidth = 210;
const closeDrawerWidth = 57;
const subDrawerWidth = 220;

export const DrawerButton = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) =>({ 
    fontSize: '16px',
    lineHeight: 3.5,
    width: '60px',
    paddingLeft: '15px',
    height: '64px',
    borderBottomLeftRadius: '50px',
    borderTopLeftRadius: '50px',
    backgroundColor: theme.palette.background.appBar,
    "& .MuiIconButton-root": {
        marginRight: '0px',
    }
}));

export const DrawerHeader = MUI.styled(MUI.Box)<any>(({theme}) => ({
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export const openedMixin = (theme: MUI.Theme): MUI.CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.sidebarOpen,
    borderRightWidth: '0px',
    boxShadow: '0 35px 35px 0 rgb(0 0 0 / 25%)',
});

export const closedMixin = (theme: MUI.Theme): MUI.CSSObject => ({
  transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `${closeDrawerWidth + 8}px`,
  backgroundColor: theme.palette.background.sidebarClose, 
  borderRightWidth: '0px',
  [theme.breakpoints.down('sm')]: {
    width: `0px`,
  },
});

export const Drawer = MUI.styled(MUI.Drawer, { shouldForwardProp: (prop) => prop !== 'open'})<{open:boolean;}>(({ theme, open, }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      borderRight: '1px solid rgba(255, 255, 255, 0.12)',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
)