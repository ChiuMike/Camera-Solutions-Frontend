import * as MUI from "@mui/material";
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

export const PatrolInfoContainer = MUI.styled(MUI.Box, {shouldForwardProp: (prop) => prop !=='zoomOut'})<{zoomOut: boolean}>(({ theme, zoomOut}) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
    "& .btns": {
        width: "100%",
        display: 'flex',
        alignItems: "center",
        gap: "8px",
        justifyContent: "space-between" ,
        "& .MuiButton-root": {
            padding: "2px 8px",
            borderRadius: "5px",
            background: "#FFF",
            color: "#212121",
            fontSize: 12,
            fontWeight: 700,
            boxShadow: "0px 0px 0px 0px #FFF, 0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
            "&:hover": {
                background: "#00bcd4",
                color: "#FFF",
                transition: 'all 0.3s linear',
            }
        },
        "& .zoom-out": {
            visibility: "hidden"
        },
        [theme.breakpoints.down("md")]: {
            justifyContent: !zoomOut ? "flex-start" : "space-between",
            "& .zoom-out": {
                visibility: "visible"
            },
            "& .MuiButton-root": {
                "&:hover": {
                    background: "#FFF",
                    color: "#212121",
                    transition: 'all 0.3s linear',
                }
            },
        }
    },
    "& .info-card": {
        marginBottom: 16,
        width: "360px",
        height: "240px",
        padding: "0px 12px",
        boxShadow: "0px 0px 0px 0px #FFF, 0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
        display: 'flex',
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#FFF",
        borderRadius: "5px",
        "& .header": {
            padding: "8px 10px",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            "& .MuiListItem-root": {
                width: "100%",
                padding: "8px 0px",
                "& .MuiListItemAvatar-root": {
                    minWidth: "48px",
                    "& .MuiAvatar-root": {
                        width: "40px",
                        height: "40px",
                        borderRadius: "0px",
                        "img": {
                            width: "40px",
                            height: "40px",
                            objectFit: "contain"
                        }
                    },
                },
                "& .MuiListItemText-primary": {
                    color: "#121212",
                    fontSize: "14px",
                    fontWeight: 900,
                    lineHeight: "140%",
                },
                "& .MuiListItemText-secondary": {
                    color: "#BDBDBD",
                    fontSize: "12px",
                    fontWeight: 900,
                    lineHeight: "140%",
                }
            },
            "& .progress": {
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                width: "100%",
                gap: "8px",
                "& .MuiTypography-root": {
                    fontSize: 12,
                    color: '#212121',
                },
                "& .progress-circle": {
                    position: 'relative',
                    "& .percent-text": {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }
                }
            }
        },
        "& .content": {
            padding: "0px 16px 0px 10px",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: 'center',
            gap: 12,
            "& .MuiListItem-root": {
                width: "100%",
                padding: "8px 0px",
                "& .MuiListItemAvatar-root": {
                    minWidth: "48px",
                    "& .MuiAvatar-root": {
                        width: "40px",
                        height: "40px",
                        borderRadius: "0px",
                        "img": {
                            width: "40px",
                            height: "40px",
                            objectFit: "contain"
                        }
                    },
                },
                "& .MuiListItemText-primary": {
                    color: "#BDBDBD",
                    fontSize: "12px",
                    fontWeight: 900,
                    lineHeight: "140%",
                },
                "& .MuiListItemText-secondary": {
                    color: "#212121",
                    fontSize: "12px",
                    fontWeight: 900,
                    lineHeight: "140%",
                }
            },
            "& .last-update": {
                display: "flex",
                alignItems: 'center',
                justifyContent: "center",
                padding: "8px 4px",
                width: "90%",
                height: "32px",
                background: "#EDF7ED",
                "& .MuiTypography-root": {
                    fontSize: 12,
                    color: "#1E4620",
                }
            }
        },
        "& .footer": {
            padding: "0px 16px 0px 10px",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: 'center',
            "& .MuiListItem-root": {
                width: "100%",
                padding: "10px 0px",
                "& .MuiListItemAvatar-root": {
                    minWidth: "48px",
                    height: "40px",
                },
                "& .MuiAvatar-root": {
                    width: "40px",
                    height: "40px",
                    borderRadius: "0px",
                    "img": {
                        width: "40px",
                        height: "40px",
                        objectFit: "contain",
                        transform: "scale(.85)"
                    }
                },
                "& .MuiListItemText-root": {
                    width: "100%",
                    "& .primary": {
                        fontSize: 12,
                        color: "#121212",
                        width: "100%"
                    },
                    "& .state": {
                        display: 'flex',
                        alignItems: "center",
                        width: "100%",
                        gap: "6px",
                        "& .state-dot": {
                            background: "#0077C0",
                            width: "6px",
                            height: "6px",
                            borderRadius: "100%"
                        },
                        "& .MuiTypography-root": {
                            fontSize: "12px",
                            color: "#BDBDBD",
                            width: "100%",
                        }
                    }
                }
            },
        }
    },
    "& .timeline-container": {
        width: "360px",
        height: "360px",
        padding: "16px 16px",
        boxShadow: "0px 0px 0px 0px #FFF, 0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
        display: 'flex',
        flexDirection: "column",
        background: "#FFF",
        borderRadius: "5px",
        gap: 24,
        "& .header": {
            width: "100%",
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            "& .MuiTypography-root": {
                fontSize: "12px",
                color: "#212121",
                fontWeight: 900,
                width: "100%",
            },
            "& .MuiButton-root": {
                background: "#EEEEEE",
                padding: "2px 0px",
                borderRadius: "5px",
                color: "rgba(0, 0, 0, 0.54)",
                fontSize: 12,
                fontWeight: 700,
                width: "50%",
                height: "32px",
                boxShadow: "none",
                "&:hover": {
                    background: "#00bcd4",
                    color: "#FFF",
                    transition: 'all 0.3s linear',
                }
            }
        },
        "& .timeline-list": {
            height: '100%',
            width: '100%',
            overflowY: 'scroll',
            "& .content": {
                width: '100%',
            }
        },
        [theme.breakpoints.down("md")]: {
            height: "300px",
        }
    }
}));

export const PatrolTimelineItem = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
    display: "flex",
    gap: 32,
    marginBottom: "6px",
    "& .icon-time": {
        display: "flex",
        gap: 8,
        flex: "0 0",
        flexBasis: "88px",
        "& .icon-connector": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            "& .MuiSvgIcon-root": {
                color: "#0077C0"
            },
            "& .connector": {
                height: 16,
                background: "#0077C0",
                width: "1px",
            }
        },
        "& .update-time": {
            display: "flex",
            paddingTop: 6,
            width: "100%",
            "& .MuiTypography-root": {
                width: "100%",
                fontSize: "12px",
                color: "#BDBDBD",
                fontWeight: 900,
                lineHeight: "140%"
            },
        }
    },
    "& .text": {
        flexGrow: 2,
        flexShrink: 1,
        width: "100%",
        "& .title": {
            width: "100%",
            fontSize: "12px",
            color: "#212121",
        },
        "& .address": {
            width: "100%",
            fontSize: "12px",
            color: "#BDBDBD",
        },

    }
}));
  