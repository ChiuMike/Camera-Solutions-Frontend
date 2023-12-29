import * as MUI from "@mui/material";

export const SideBarRoot = MUI.styled(MUI.Box)<MUI.BoxProps>(({ theme }) => ({
    width: "100%",
    position: "relative",
    height: "calc(100vh - 64px)",
    display: "grid",
    gridTemplateRows: "minmax(auto, 10%) minmax(auto, 8%) minmax(auto, 82%)",
    gridTemplateColumns: "auto",
    background: "#FFF",
    "& .header": {
        height: "100%",
        weight: "100%",
        borderBottom: "1px solid #eeeeee",
        display: "grid",
        gridTemplateColumns: "minmax(auto, 50%) minmax(auto, 50%)",
        gridTemplateRows: "auto",
        padding: "0px 12px 0px 8px",
        "& .title-container": {
            display: "flex",
            alignItems: "center",
            "& .MuiTypography-root": {
                fontWeight: "bold",
                fontSize: "18px",
            }
        },
        "& .button-container": {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "8px",
            "& .add": {
                borderRadius: "5px",
                backgroundColor: "#F5FCFF",
                "& .MuiSvgIcon-root": {
                    color: "#02759F"
                },
                "&:hover": {
                    backgroundColor: "#00bcd4",
                    transition: "all 0.3s",
                    "& .MuiSvgIcon-root": {
                        color: "#FFFFFF"
                    },
                }
            },
            "& .delete": {
                borderRadius: "5px",
                backgroundColor: "#c24242",
                "& .MuiSvgIcon-root": {
                    color: "#FFF"
                },
                "&:hover": {
                    backgroundColor: "#d20000",
                    transition: "all 0.3s",
                    "& .MuiSvgIcon-root": {
                        color: "#FFFFFF"
                    },
                },
                '&:disabled' : {
                    backgroundColor: "rgba(0, 0, 0, 0.07)",
                    color: "rgba(0, 0, 0, 0.26)",
                },
            }
        }
    },
    "& .search-filter": {
        height: '100%',
    	width: '100%',
        display: "grid",
        gridTemplateColumns: "minmax(auto, 95%) minmax(auto, 5%)",
        gridTemplateRows: "auto",
        columnGap: "4px",
        "& .search-box": {
            display: "flex",
            paddingLeft: "12px", 
            alignItems: "center",
            "& .search": {
                width: "100%",
                "& .search-icon": {
					color: '#9e9e9e', 
					transform: 'scale(1.2)'
				},
            }
        },
    },
    "& .channel-container": {
        height: '100%',
    	width: '100%',
        padding: '0px 0px',
        overflowY: 'scroll',
        "& .content": {
            width: '100%',
            '&:first-of-type': {
                marginTop: '0px',
				borderTop: "none",
            },
			'&:last-of-type': {
				borderBottom: theme.palette.mode === "light" ? ".5px solid rgba(224, 224, 224, 1)": "1px soild #8b9297",
            },
        }
    },
}));

export const ChannelCard = MUI.styled(MUI.Box, { shouldForwardProp: (prop) => prop !== 'selected'})<{ selected: boolean;}>(({ theme, selected}) => ({
	border: "none",
	marginLeft: '0px',
	borderBottom: theme.palette.mode === "light" ? ".5px solid rgba(224, 224, 224, .5)": "1px soild #8b9297",
	borderTop: theme.palette.mode === "light" ? ".5px solid rgba(224, 224, 224, .5)": "1px soild #8b9297",
	backgroundColor: selected ? "#00bcd4" : "#FFFFFF",
    padding: "16px 8px",
    height: "100%",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "minmax(auto, 15%) 140px minmax(auto, 30%)",
    columnGap: "4px",
    gridTemplateRows: "auto",
    "& .channel-avatar": {
        height: "100%",
        width: "100%",
        "& .MuiAvatar-root": {
            width: "40px", 
            height: "40px",
            borderRadius: "5px",
            backgroundColor: "#F5FCFF",
            "& .MuiSvgIcon-root": {
                color: "#00658b"
            },
        },
    },
    "& .channel-content": {
        height: "100%",
        width: "100%",
        display: "flex",
        paddingLeft: "12px",
        "& .MuiTypography-root": {
            alignSelf: "center",
            fontWeight: 900,
            fontSize: "14px",
            color: selected ? "#FFF" : "#121212",
        }
    },
    "& .channel-control": {
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        columnGap: "4px",
        gridTemplateRows: "auto",
        "& .MuiCheckBox-root": {
            '&.Mui-checked': {
                color: "#00bcd4",
            },
        },
        "& .enter": {
            "& .MuiSvgIcon-root": {
                color: selected ? "#FFF" : "#02759F",
            }
        }
    },
    transition: "all 0.3s",
    [theme.breakpoints.down(992)]: {
        gridTemplateColumns: "minmax(auto, 15%) minmax(auto, 55%) minmax(auto, 30%)",
    }
}));

export const MobileDrawerRoot = MUI.styled(MUI.Box, { shouldForwardProp: (prop) => prop !== 'roomOpen'})<{ roomOpen: boolean}>(({ theme, roomOpen }) => ({
	width: '100%',
    height: '100%',
    display: roomOpen ? "none": 'grid',
    gridTemplateRows: "minmax(auto, 60px) minmax(auto, auto)",
    "& .mobile-header": {
        display: 'grid',
        gridTemplateColumns: "minmax(auto, 80%) minmax(auto, 20%)",
        columnGap: "8px",
        width: '100%',
		height: '100%',
        padding: '0px 16px',
        "& .search-input": {
            width: '100%',
            margin: "auto 0",
            "& .search-icon": {
                color: theme.palette.mode === "light" ? '#9e9e9e': '#8b9297', 
                transform: 'scale(1.2)',
            },
        },
        "& .button-container": {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            "& .add": {
                borderRadius: "5px",
                backgroundColor: "#F5FCFF",
                "& .MuiSvgIcon-root": {
                    color: "#02759F"
                },
                "&:hover": {
                    backgroundColor: "#00bcd4",
                    transition: "all 0.3s",
                    "& .MuiSvgIcon-root": {
                        color: "#FFFFFF"
                    },
                }
            },
            "& .delete": {
                borderRadius: "5px",
                backgroundColor: "#c24242",
                "& .MuiSvgIcon-root": {
                    color: "#FFF"
                },
                "&:hover": {
                    backgroundColor: "#d20000",
                    transition: "all 0.3s",
                    "& .MuiSvgIcon-root": {
                        color: "#FFFFFF"
                    },
                },
                '&:disabled' : {
                    backgroundColor: "rgba(0, 0, 0, 0.07)",
                    color: "rgba(0, 0, 0, 0.26)",
                },
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

export const MobileChannelRoom = MUI.styled(MUI.Box, { shouldForwardProp: (prop) => prop !== 'roomOpen' && prop !== 'expand'})<{ roomOpen: boolean; expand: boolean}>(({ theme, roomOpen, expand }) => ({
    height: '100%',
    width: '100%',
    display: roomOpen ? "grid" : "none",
    gridTemplateColumns: "auto",
    ...(expand && {
        gridTemplateRows: "minmax(auto, 15%) minmax(auto, 15%) minmax(auto, 10%) minmax(auto, 50%) minmax(auto, 60px)",
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.complex,
        }),
        "& .foot-control-container": {
            height: '100%',
            width: '100%',
            backgroundColor: "#FFF",
            display: "flex",
            alignItems: "center",
            padding: "0px 8px 0px 16px",
        },
    }),
    ...(!expand && {
        gridTemplateRows: "minmax(auto, 15%) minmax(auto, 15%) minmax(auto, 0px) minmax(auto, 70%) minmax(auto, 0px)",
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.complex,
        }),
    }),
    "& .title-container": {
        height: '100%',
        width: '100%',
        backgroundColor: "#FFF",
    },
    "& .room-control": {
        width: "100%",
        height: "100%",
        display: 'grid',
        gridTemplateColumns: "repeat(2, 1fr)",
        "& .device-list-tab": {
            width: "100%",
            height: "100%",
            borderRight: "1px solid rgba(224, 224, 224, 1)"
        },
        "& .ptt-list-tab": {
            width: "100%",
            height: "100%",
        }
    } , 
    "& .chat-container": {
        height: '100%',
        width: '100%',
        overflowY: 'scroll',
        background: "#f5f5f5",
        padding: "12px 12px 0px 12px",
        "& .content": {
            width: '100%',
            overflowY: 'scroll',
            "& .MuiListItem-root": {
                borderRadius: "5px",
                marginBottom: '12px',
                padding: "8px 0px",
                backgroundColor: "#FFFFFF",
                "& .MuiListItemText-root": {
                    "& .MuiTypography-root": {
                        fontWeight: "bold",
                    }
                },
                "& .MuiListItemButton-root:hover": {
                    backgroundColor: "#FFF",
                    cursor: "default"
                }
            },
            '&:first-of-type': {
                marginTop: '0px',
                borderTop: "none",
            },
            '&:last-of-type': {
                marginBottom: '16px',
            },
        },
    },
}));