import * as MUI from "@mui/material";

const subDrawerWidth = 220;

export const openedSubMixin = (theme: MUI.Theme): MUI.CSSObject => ({
    width: `${subDrawerWidth}px`,
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundImage: theme.palette.mode === "light" ? "linear-gradient(to right, #f6f8fc, #FFF)": "linear-gradient(to right, #212121, #121212)",
    borderRightWidth: '0px',
	boxShadow: '35px 0px 35px 0px rgb(0 0 0 / 25%)',
	[theme.breakpoints.down('lg')]: {
		width: "200px",
	},
	[theme.breakpoints.down('md')]: {
		width: "180px",
	},
    [theme.breakpoints.down('sm')]: {
		width: `${subDrawerWidth}px`,
      	boxSizing: 'border-box',
    },
})
  
export const closedSubMixin = (theme: MUI.Theme): MUI.CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: '300ms',
    }),
    overflowX: 'hidden',
    width: '0px',
    borderRightWidth: '0px',
});


export const SubDrawer = MUI.styled(MUI.Drawer, { shouldForwardProp: (prop) => prop !== 'open' && prop!= "mediaMatches" })<{open:boolean; mediaMatches: boolean;}>(
	({ theme, open, mediaMatches }) => ({
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		borderRight: '1px solid rgba(255, 255, 255, 0.12)',
		...((!open && !mediaMatches) && { // Navbar drawer close and media > sm
			...openedSubMixin(theme),
			'& .MuiDrawer-paper': openedSubMixin(theme),
		}),

		...((open && !mediaMatches) && { //navber drawer open and media > sm
			...closedSubMixin(theme),
			'& .MuiDrawer-paper': closedSubMixin(theme),
		}),

		[theme.breakpoints.down("sm")]: {
			...(!open && { //sub drawer close and media < sm
				'& .MuiDrawer-paper': {
					transition: theme.transitions.create('width', {
						easing: theme.transitions.easing.sharp,
						duration: '300ms',
					}),
					overflowX: 'hidden',
					width: '0px',
					borderRightWidth: '0px',
					visibility: 'visible !important',
					transform: "none !important",
				},
			}),
			...(open && { //sub drawer drawer open and media < sm
				'& .MuiDrawer-paper': {
					width: `100vw`,
					visibility: 'visible !important',
					transform: "none !important",
					marginLeft: `0px`,
					transition: theme.transitions.create('width', {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.enteringScreen,
					}),
					overflowX: 'hidden',
					backgroundImage: theme.palette.mode === "light" ? "linear-gradient(to right, #f6f8fc, #FFF)": "linear-gradient(to right, #212121, #121212)",
					borderRightWidth: '0px',
				},
			}),
			
		},
	}),
);

export const openedMobileSubMixin = (theme: MUI.Theme): MUI.CSSObject => ({
    width: `${subDrawerWidth}px`,
	visibility: 'visible',
	transform: "none !important",
    marginLeft: `0px`,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundImage: "linear-gradient(to right, #eff5f7, #FFF)",
    borderRightWidth: '0px',
});