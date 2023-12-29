import * as MUI from "@mui/material";

export const PatrolInfoCard = MUI.styled(MUI.Card)<MUI.CardProps>(({theme}) => ({
    minWidth: '500px', 
    zIndex: 999,
    borderRadius: '15px',
    "& .MuiCardContent-root": {
        "& .current-status-title": {
            backgroundColor: theme.palette.mode === "light" ? '#f5f5f5': '#424242',
            padding: '12px',
            marginBottom: '8px',
            "& .MuiTypography-root": {
                fontWeight: 900,
                fontSize: '14px',
            }
        },
        "& .current-status": {
            margin: 'auto 0',
            "& .MuiListItem-root": {
                display: 'block',
                "& .MuiStack-root": {
                    marginBottom: '3px',
                    "& .MuiSvgIcon-root": {
                        color: theme.palette.background.primary,
                        marginRight: '3px'
                    },
                    "& .MuiTypography-root": {
                        fontWeight: 900,
                    }
                },
                "& .MuiTypography-secondary": {
                    marginLeft: '27px', 
                    color: '#9e9e9e', 
                    fontSize: '13px' 
                },
                " & .MuiTypography-secondary.completed" :{
                    color: theme.palette.mode === "light" ? "#02759F" : '#d7ffd9', 
                    fontWeight: 900,
                }
            }
        },
        "& .device-status": {
            "& .MuiListItem-root": {
                justifyContent: 'center',
            },
            "& .battery": {
                "& .MuiTypography-root": {
                    color: '#8bc34a', 
                    fontWeight: 900, 
                    marginLeft: '5px'
                },
                "& .MuiSvgIcon-root": {
                    color: '#8bc34a', 
                    transform: "rotate(90deg)"
                }
            },
            "& .temperature": {
                "& .MuiTypography-root": {
                    color: 'hsl(22, 89%, 46%)', 
                    fontWeight: 900, 
                    marginLeft: '5px'
                },
                "& .MuiSvgIcon-root": {
                    color: 'hsl(22, 89%, 46%)', 
                    transform: "rotate(90deg)"
                }
            }
        }
    }
}));

export const StyledBadge = MUI.styled(MUI.Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));