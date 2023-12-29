import * as MUI from "@mui/material";

export const SideBarRoot = MUI.styled(MUI.Box)<MUI.BoxProps>(({ theme }) => ({
    width: '100%',
    position: 'relative',
	height: 'calc(100vh - 64px)',
    display: 'grid',
    gridTemplateRows: "minmax(auto, 120px) minmax(auto, auto)",
    backgroundColor: "#FFF",
    "& .header": {
        width: '100%',
		height: '100%',
        display: "grid",
        gridTemplateColumns: ".2fr 4fr 1fr",
        "& .search-input": {
            width: '98%',
            margin: "auto 0",
            "& .search-icon": {
                color: theme.palette.mode === "light" ? '#9e9e9e': '#8b9297', 
                transform: 'scale(1.2)',
            },
        },
        "& .search-btn": {
            margin: "auto auto",
            "& .MuiIconButton-root": {
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
        }
    },
    "& .device-list": {
        height: '100%',
    	width: '100%',
        padding: '0px 8px',
        overflowY: 'scroll',
        "& .content": {
			width: '100%',
            "& .monitor-device": {
                marginBottom: "2px",
            },
			'&:first-of-type': {
                marginTop: '0px',
				borderTop: "none",
            },
			'&:last-of-type': {
                marginBottom: "0px",
				borderBottom: theme.palette.mode === "light" ? ".5px solid rgba(224, 224, 224, 1)": "1px soild #8b9297",
            },
		},
    },
}));

export const MobileContentRoot = MUI.styled(MUI.Box)<MUI.BoxProps>(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: "grid",
    gridTemplateRows: "minmax(auto, 80px) minmax(auto, auto)",
    "& .mobile-header": {
        display: 'grid',
        width: '100%',
		height: '100%',
        gridTemplateColumns: ".2fr 4fr 1fr",
        gridTemplateRows: "auto",
        padding: '0px 0px',
        "& .search-input": {
            width: '100%',
            margin: "auto 0",
            "& .search-icon": {
                color: theme.palette.mode === "light" ? '#9e9e9e': '#8b9297', 
                transform: 'scale(1.2)',
            },
        },
        "& .search-btn": {
            margin: "auto auto",
            "& .MuiIconButton-root": {
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
        }
    },
    "& .mobile-content": {
        width: '100%',
		height: '100%',
        overflowY: 'scroll',
        padding: '0px 16px',
        "& .content": {
			width: '100%'
		},
    }
}));

export const MonitorDeviceCard = MUI.styled(MUI.Card, {shouldForwardProp: (prop) => prop !== 'isdragging' && prop !== 'isDraggable' && prop !== "isSalute"})<{isdragging: boolean; isDraggable: boolean; isSalute: boolean}>(({ theme, isdragging, isDraggable, isSalute}) => ({
    borderRadius: '0px',
	border: "none",
	marginLeft: '5px',
	borderBottom: theme.palette.mode === "light" ? ".5px solid rgba(224, 224, 224, .5)": "1px soild #8b9297",
	borderTop: theme.palette.mode === "light" ? ".5px solid rgba(224, 224, 224, .5)": "1px soild #8b9297",
    ...(!isdragging && {
        background: isSalute ? "#F5F5F5": "#FFF",
    }),
    ...(isdragging && {
        background: "#fafafa",
    }),
    opacity : isdragging ? 0.4 : 1,
    transformOrigin: "50% 50%",
    boxShadow: isdragging ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px" : "none",
	"& .card-action": {
		"& .MuiCardHeader-root": {
			padding: "8px 8px",
			position: "relative",
			"& .MuiCardHeader-avatar" :{
				marginRight: "12px",
				"& .MuiAvatar-root": {
					width: "45px", 
					height: "45px",
					borderRadius: "5px",
					backgroundColor: isSalute ? "#F5f5f5" : "#FFF",
					"img": {
						width: "80%",
						height: "80%",
					}
				},
			},
			"& .MuiCardHeader-action": {
				position: 'absolute',
				right: 16,
				top: 15,
                "& .MuiIconButton-root": {
                    borderRadius: "5px",
                    cursor: isdragging ? "grabbing" : "grab",
                    "&:hover": {
                        backgroundColor: "#00bcd4",
                        "& .MuiSvgIcon-root": {
                            color: "#FFF"
                        },
                        transition: "all 0.3s",
                    }
                },  
			},
			"& .MuiCardHeader-title": {
				fontWeight: 900,
				fontSize: "14px",
				color: "#121212",
                wordBreak: "break-all",
                whiteSpace: 'wrap',
                maxWidth: '100px',
			},
			"& .MuiCardHeader-subheader": {
				color: '#9e9e9e',
				fontWeight: 900,
				fontSize: '12px',
			}
		},
	},
}));