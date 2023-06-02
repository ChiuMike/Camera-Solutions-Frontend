import * as MUI from "@mui/material";

export const SideBarRoot = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
    width: '100%',
    position: 'relative',
    "& .sidebar-drawerBtn": {
        position: "absolute",
        top: 20, 
        right: 10, 
        backgroundColor: '#02759F',
        width: '30px', 
        height: '30px',
        "& .MuiSvgIcon-root": {
            color: '#FFF'
        }
    },
    '& .logs-title-box': {
        maxHeight: '120px',
        'h1': {
            textAlign: 'center', 
            paddingTop: '24px',
            fontSize: '24px',
            marginBottom: 8,
        },
    },
    "& .devices-list": {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        "& .MuiListItemButton-root": {
            padding: "0px 0px 0px 10px",
            borderRadius: '30px',
            "& .MuiAvatar-root": {
                border: '2px solid #8bc34a'
            },
            "& .MuiListItemText-primary": {
                padding: '13px 0px' 
            },
            "&:hover": {
                "& .MuiTypography-root": {
                    color: '#FFF'
                },
                "& .MuiAvatar-root": {
                    border: '2px solid #FFF'
                },
                "& .MuiListItemText-secondary": {
                    "& .MuiSvgIcon-root": {
                        color: '#FFF'
                    }
                }
            },
        },
        "& .MuiListItemButton-root.Mui-selected": {
            "& .MuiTypography-root": {
                color: '#FFF'
            },
            "& .MuiAvatar-root": {
                border: '2px solid #FFF'
            },
            "& .MuiListItemText-secondary": {
                "& .MuiSvgIcon-root": {
                    color: '#FFF'
                }
            }
        }
    }
}));