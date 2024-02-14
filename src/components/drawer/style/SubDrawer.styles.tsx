import * as MUI from "@mui/material";

export const openedSubMixin = (theme: MUI.Theme, subDrawerWidth: number, timelineOpen?: boolean, subDrawerWidthTimeline?: number, isRemote? : boolean): MUI.CSSObject => ({
    width: (timelineOpen !== undefined && timelineOpen) ? `${subDrawerWidthTimeline}px` : `${subDrawerWidth}px`,
    marginLeft: isRemote !== undefined ? 0 :`calc(${theme.spacing(7)} + 1px)`,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundImage: theme.palette.mode === "light" ? "linear-gradient(to right, #fafcff, #fff)": "linear-gradient(to right, #212121, #121212)",
    borderRightWidth: '.5px',
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

export const openedPatrolMixin = (theme: MUI.Theme, subDrawerWidth: number, isChecked: boolean): MUI.CSSObject => ({
    width: isChecked ? `0px` : `${subDrawerWidth}px`,
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
	borderRightWidth: isChecked ? "0px" :'.5px',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundImage: theme.palette.mode === "light" ? "linear-gradient(to right, #fafcff, #fff)": "linear-gradient(to right, #212121, #121212)",
    [theme.breakpoints.down('sm')]: {
		width: isChecked ? "0px" : `${subDrawerWidth}px`,
      	boxSizing: 'border-box',
    },
})

export const SubDrawerComponent = MUI.styled(MUI.Drawer, 
    {
        shouldForwardProp: (prop) => 
            prop !== 'open' && 
            prop !== "mediaMatches" && 
            prop !== "subDrawerWidth" && 
            prop !== "timelineOpen" && 
            prop !== "subDrawerWidthTimeline" &&
			prop !== "isRemote"
    })
	<{
        open: boolean; 
        mediaMatches: boolean; 
        subDrawerWidth: number; 
        timelineOpen?: boolean; 
        subDrawerWidthTimeline?: number;
		isRemote?: boolean
    }>
    (({ theme, open, mediaMatches, timelineOpen, subDrawerWidth, subDrawerWidthTimeline, isRemote}) => ({
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		borderRight: '1px solid rgba(255, 255, 255, 0.12)',
		...((!open && !mediaMatches) && { // Navbar drawer close and media > md
			...openedSubMixin(theme, subDrawerWidth, timelineOpen ,subDrawerWidthTimeline),
			'& .MuiDrawer-paper': openedSubMixin(theme, subDrawerWidth, timelineOpen ,subDrawerWidthTimeline),
		}),
		...((open && !mediaMatches) && { //navber drawer open and media > md
			...closedSubMixin(theme),
			'& .MuiDrawer-paper': closedSubMixin(theme),
		}),
		[theme.breakpoints.down("md")]: {
			...((!open && isRemote!== undefined) && { 
				...openedSubMixin(theme, subDrawerWidth, timelineOpen ,subDrawerWidthTimeline, isRemote),
				'& .MuiDrawer-paper': openedSubMixin(theme, subDrawerWidth, timelineOpen ,subDrawerWidthTimeline, isRemote),
			}),
			...((open && isRemote!== undefined) && { //navber drawer open and media > md
				...closedSubMixin(theme),
				'& .MuiDrawer-paper': closedSubMixin(theme),
			}),
		},
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

export const PatrolSubDrawer = MUI.styled(MUI.Drawer, 
    {
        shouldForwardProp: (prop) => 
            prop !== 'open' && 
            prop !== "mediaMatches" && 
            prop !== "subDrawerWidth" && 
			prop !== "isChecked"
    })
	<{
        open: boolean; 
        mediaMatches: boolean; 
        subDrawerWidth: number; 
		isChecked: boolean;
    }>
    (({ theme, open, mediaMatches, isChecked, subDrawerWidth}) => ({
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		borderRight: '1px solid rgba(255, 255, 255, 0.12)',
		...((!open && !mediaMatches) && { // Navbar drawer close and media > md
			...openedPatrolMixin(theme, subDrawerWidth, isChecked),
			'& .MuiDrawer-paper': openedPatrolMixin(theme, subDrawerWidth, isChecked),
		}),
		...((open && !mediaMatches) && { //navber drawer open and media > md
			...closedSubMixin(theme),
			'& .MuiDrawer-paper': closedSubMixin(theme),
		}),
		[theme.breakpoints.down("md")]: {
			...((!open) && { 
				...openedSubMixin(theme, subDrawerWidth, isChecked),
				'& .MuiDrawer-paper': openedSubMixin(theme, subDrawerWidth, isChecked),
			}),
			...((open) && { //navber drawer open and media > md
				...closedSubMixin(theme),
				'& .MuiDrawer-paper': closedSubMixin(theme),
			}),
		},
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