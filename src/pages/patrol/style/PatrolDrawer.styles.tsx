import * as MUI from "@mui/material";

export const SideBarRoot = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme})=> ({
    width: '100%',
    position: 'relative',
    marginTop: '64px',
    height: 'calc(100vh - 64px)',
    display: 'flex',
	flexDirection: 'column',
    justifyContent: 'space-between',
    '& .logs-title-box': {
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: '160px',
        'h1': {
            textAlign: 'center', 
            paddingTop: '24px',
            fontSize: '24px',
        },
        "& .search-bar": {
            marginTop: '10px',
            marginLeft: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            "& .MuiTypography-root": {
                fontSize: '16px',
                fontWeight: 800,
            },
            "& .MuiButtonBase-root": {
                width: '40px',
                height: '40px',
                borderRadius: '20px',
                backgroundColor: theme.palette.background.formButton,
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    transition: 'all 0.3s linear',
                    transform: 'translate(0px, 1px)',
                    border: 0,
                },
                "& .MuiSvgIcon-root": {
                    color: theme.palette.background.third
                },
            },
            "& .MuiButtonBase-root: last-of-type": {
                marginRight: '10px'
            }
        },
    },
    
    "& .mission-list": {
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'scroll',
        height: '100%',
        width: '100%',
        flexShrink: 1,
        flexGrow: 1,
        "& .inner": {
            width: '90%',
        }
    }
}));

export const PatrolCard = MUI.styled(MUI.Card, {shouldForwardProp: (prop) => prop !== 'selected'})<{selected: boolean}>(({ theme, selected})=> ({
    borderRadius: '8px',
    marginBottom: '20px',
    border: (selected && theme.palette.mode === "light") ? '1px solid #02759F': (selected && theme.palette.mode === "dark") ? "1px solid rgba(165, 214, 167)" : "none",
    boxShadow: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" : "none",
    "& .MuiCardActionArea-root": {
        "& .MuiCardHeader-subheader": {
            color: theme.palette.background.primary,
            fontWeight: 'bold'
        },
        "& .MuiListItemText-root": {
            "& .MuiTypography-body1": {
                color: theme.palette.mode === "light" ? '#121212': '#FFF',
                fontSize: '13px',
                fontWeight: 'bold'
            },
            "& .MuiTypography-body2": {
                fontSize: '12px',
                color: '#9e9e9e',
                fontWeight: 'bold'
            },
        },
    }, 
    "& .MuiCardActionArea-root: hover": {
        backgroundColor: theme.palette.action.hover,
        transition: 'all 0.1s linear',
        "& .MuiCardHeader-subheader": {
            color: '#FFF',
        },
        "& .MuiListItemText-root": {
            "& .MuiTypography-body1": {
                color: '#FFF',
                fontSize: '16px',
                fontWeight: 'bold',
            },
            "& .MuiTypography-body2": {
                color: '#fff',
                fontWeight: 500
            },
        },
    }  
}));