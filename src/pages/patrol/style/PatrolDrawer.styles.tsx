import * as MUI from "@mui/material";

export const SideBarRoot = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme})=> ({
    width: '100%',
    position: 'relative',
	height: 'calc(100vh - 64px)',
    display: "grid",
    gridTemplateRows: "minmax(auto, 120px) minmax(auto, auto)",
    backgroundColor: "#FFFFFF",
    "& .header": {
        width: '100%',
		height: '100%',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        gap: "24px",
        padding: "0px 24px",
        "& .search-input": {
            width: '100%',
            margin: "auto 0",
            "& .search-icon": {
                color: theme.palette.mode === "light" ? '#9e9e9e': '#8b9297', 
                transform: 'scale(1.2)',
            },
        },
        "& .MuiIconButton-root": {
            width: "40px",
            height: "40px",
            borderRadius: '5px', 
            border: 'none', 
            background: theme.palette.mode === "light" ? '#f5f5f5': "#212121",
            "& .MuiSvgIcon-root": {
                color: theme.palette.background.formButton, 
                transform: 'scale(1.05)'
            },
            "&:hover": {
                background: "#f1f1f1",
                "& .MuiSvgIcon-root": {
                    color: theme.palette.action.hover, 
                },
                transition: "300ms",
            },
            "img": {
                width: 25,
                height: 25,
            }
        }
    },
    "& .mission-list": {
        height: '100%',
    	width: '100%',
        padding: '0px 24px',
        overflowY: 'scroll',
        "& .inner": {
            width: '100%',
            '&:first-of-type': {
                marginTop: '0px',
            },
			'&:last-of-type': {
				marginBottom: "0px"
            },
        }
    },
}));

export const PatrolCard = MUI.styled(MUI.Box, {shouldForwardProp: (prop) => prop !== 'selected'})<{selected: boolean}>(({ theme, selected})=> ({
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    flexShrink: 1,
    padding: "0px 12px",
    borderRadius: "10px",
    border: selected ? "1px solid #02759F" : "1px solid rgba(238, 238, 238, 1)",
    boxShadow: "0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
    marginBottom: '24px',
    width: "100%",
    "& .card-header": {
        width: "100%",
        display: "flex",
        padding: "8px 10px 4px 10px",
        alignItems: 'center',
        "& .card-header-contnet": {
            width: "100%",
            display: "flex",
            alignItems: 'center',
            "& .MuiListItem-root": {
                padding: "8px 0px",
                "& .MuiListItemAvatar-root": {
                    minWidth: "40px",
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
        },
        "& .status": {
            display: 'flex',
            alignItems: 'center',
            justifyContent: "center",
            gap: "8px",
            "& .MuiChip-root": {
                background: "#0077C0",
                color: "#FFF",
                height: "28px",
            }
        }
    },
    "& .card-content": {
        display : "flex",
        padding: "12px 0px 8px 0px",
        alignItems: "center",
        alignSelf: "center",
        width: "100%",
        "& .MuiTimeline-root": {
            width: "100%",
            padding: 0,
            margin: 0,
            "& .MuiTimelineItem-root": {
                display: 'flex',
                "& .MuiTimelineOppositeContent-root": {
                    color: "#000000",
                    fontSize: "12px",
                    fontWeight: 400,
                    paddingTop: "8px",
                    flex: 1, 
                },
                "& .MuiTimelineSeparator-root":{
                    "& .MuiTimelineDot-root": {
                        "& .MuiBox-root": {
                            width: "6px",
                            height: "6px",
                            borderRadius: "100px",
                            background: "#FFF"
                        }
                    },
                    "& .Departure-dot": {
                        background: "#0077C0",
                    },
                    "& .Arrival-dot": {
                        background: "#212121",
                    },
                    "& .MuiTimelineConnector-root": {
                        height: "32px",
                    }
                },
                "& .MuiTimelineContent-root": {
                    flex: 1,
                    flexGrow: 2,
                    flexShrink: 1,
                    padding: "4px 16px",
                    "& .title": {
                        fontSize: "12px",
                        color: "#bdbdbd"
                    },
                    "& .content": {
                        color: "#212121",
                        fontSize: "12px",
                        textWrap: "wrap"
                    }
                }
            }
        }
    },
    "& .card-footer": {
        width: "100%",
        height: "100%",
        display : "flex",
        padding: "8px 10px",
        alignItems: "center",
        gap: "8px",
        flex: "1 0 0",
        "& .MuiListItem-root": {
            width: "100%",
            padding: "10px 0px",
            "& .MuiListItemAvatar-root": {
                minWidth: "50px",
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
        "& .card-btns": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            "& .MuiIconButton-root": {
                width: "40px",
                height: "40px",
                borderRadius: "5px",
                border: "1px solid #EEE",
                background: "#FFF",
                "& .MuiSvgIcon-root": {
                    color: "#0077C0"
                },
                "&:hover": {
                    backgroundColor: "#00bcd4",
                    "& .MuiSvgIcon-root": {
                        color: "#FFF"
                    },
                    transition: 'all 0.3s linear',
                }
            }
        }
    },
    [theme.breakpoints.down("md")]: {
        width: "400px",
    },
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        "& .patrol-type": {
            display: "none"
        }
    },
}));

export const MobileSideBarRoot = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme})=> ({
    position: "relative",
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateRows: "15% 85%",
    "& .header": {
        width: '100%',
		height: '100%',
        display: 'flex',
        justifyContent: "center",
        padding: "0px 26px",
        alignItems: "start",
        gap: "24px",
        "& .search-box": {
            width: '100%',
            "& .search-input": {
                width: '100%',
                margin: "auto 0",
                "& .search-icon": {
                    color: theme.palette.mode === "light" ? '#9e9e9e': '#8b9297', 
                    transform: 'scale(1.2)',
                },
            },
        },
        "& .MuiIconButton-root": {
            width: "40px",
            height: "40px",
            borderRadius: '5px', 
            border: 'none', 
            background: theme.palette.mode === "light" ? '#f5f5f5': "#212121",
            "& .MuiSvgIcon-root": {
                color: theme.palette.background.formButton, 
                transform: 'scale(1.05)'
            },
            "&:hover": {
                background: "#f1f1f1",
                "& .MuiSvgIcon-root": {
                    color: theme.palette.action.hover, 
                },
                transition: "300ms",
            },
            "img": {
                width: 25,
                height: 25,
            }
        }
    },
    "& .trips-list": {
        height: '100%',
    	width: '100%',
        padding: '0px 24px',
        overflowY: 'scroll',
        "& .content": {
            width: '100%',
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            '&:first-of-type': {
                marginTop: '0px',
            },
			'&:last-of-type': {
				marginBottom: "0px"
            },
        }
    },
}));