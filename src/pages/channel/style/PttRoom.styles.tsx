
import * as MUI from "@mui/material";

const mobileOpenMixin = (theme: MUI.Theme): MUI.CSSObject => ({
    transition: theme.transitions.create(['all'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    height: "calc(100vh - 520px)",
});

const mobileCloseMixin = (theme: MUI.Theme): MUI.CSSObject => ({
    transition: theme.transitions.create(['all'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    height: "calc(100vh - 120px)"
});

export const Container = MUI.styled(MUI.Box, { 
    shouldForwardProp: (prop) => prop !=='mobileOpen' && prop !== 'navDrawerOpen' && prop !== "mediaMatches" && prop !== "expand" && prop !== "mapExpand"})
    <{mobileOpen: boolean, navDrawerOpen: boolean, mediaMatches: boolean, expand: boolean, mapExpand: boolean}>
    (({ theme, mobileOpen, navDrawerOpen, mediaMatches, expand, mapExpand}) => ({
        position: 'relative',
        height: `calc(100vh - 64px)`,
        marginTop: 64,
        flexGrow: 1,
        display: "grid",
        gridTemplateRows: "auto",
        gridTemplateColumns: "minmax(auto, 35%) minmax(auto, 65%)",
        ...((navDrawerOpen && !mediaMatches) && {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            width: 'calc(100vw - 210px)',
        }),
        ...((!navDrawerOpen && !mediaMatches) && {
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: '300ms',
            }),
            marginLeft: '273px', //280
            width: 'calc(100vw - 340px)', //344
        }),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        "& .room-container": {
            height: '100%',
            width: '100%',
            display: "grid",
            gridTemplateColumns: "auto",
            borderRight: "1px solid #e0e0e0",
            ...(expand && {
                gridTemplateRows: "minmax(auto, 10%) minmax(auto, 9%) minmax(auto, 60px) minmax(auto, 71%) minmax(auto, 10%)",
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
                gridTemplateRows: "minmax(auto, 10%) minmax(auto, 9%) minmax(auto, 0px) minmax(auto, 81%) minmax(auto, 0px)",
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
                        marginBottom: '0px',
                    },
                },
            },

        },
        "& .map-container": {
            height: "100%",
            weight: "100%",
        },
        [theme.breakpoints.down(1400)]: {
            gridTemplateColumns: "minmax(auto, 40%) minmax(auto, 60%)",
        },
        [theme.breakpoints.down(1200)]: {
            gridTemplateColumns: "minmax(auto, 45%) minmax(auto, 55%)",
        },
        [theme.breakpoints.down(993)]: {
            gridTemplateColumns: mapExpand ? "minmax(auto, 0px) minmax(auto, 100%)" : "minmax(auto, 60%) minmax(auto, 40%)",
            ...((!navDrawerOpen && !mediaMatches) && {
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: '300ms',
                }),
                marginLeft: '243px', //280
                width: 'calc(100vw - 310px)', //344
            }),
            transition: theme.transitions.create(['all'], {
                easing: theme.transitions.easing.sharp,
                duration: '300ms',
            }),
        },
        [theme.breakpoints.down(770)]: {
            gridTemplateColumns: "minmax(auto, 100%) minmax(auto, 0%)",
            height: "100%",
            width: "100%",
            marginTop: 64,
            ...((mobileOpen) && {
                ...mobileOpenMixin(theme),
            }),
            ...((!mobileOpen) && {
                ...mobileCloseMixin(theme),
            }),
            "& .room-container": {
                display: 'none',
            }
        }
}));

export const RoomNameContainer = MUI.styled(MUI.Box, { shouldForwardProp: (prop) => prop !== 'error'})<{ error: boolean;}>(({ theme, error}) => ({
    display: "grid",
    gridTemplateColumns: error ? "minmax(auto, 100%)" : "minmax(auto, 50%) minmax(auto, 50%)",
    columnGap: error ? "0px" : "4px",
    background: error ? "#c24242" : "#00bcd4",
    padding: "0px 8px",
    "& .error-content": {
        display: "flex",
        alignItems: 'center',
        gap: 8,

    },
    "& .room-title": {
        display: "flex",
        alignItems: "center",
        gap: 4,
        color: "#FFF",
    },
    "& .enable-channel": {
        display: "flex",
        alignItems: "center",
        "& .MuiFormControlLabel-root": {
            gap: "8px",
            margin: 0,
        }
    },
    "& .MuiSvgIcon-root": {
        color: "#FFF",
    },
    "& .MuiTypography-root": {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 14
    }
}));

export const RoomHeaderContainer = MUI.styled(MUI.Box, { shouldForwardProp: (prop) => prop !== 'isPtt' && prop !== 'isChannelSelect'})<{ isPtt: boolean; isChannelSelect: boolean;}>(({ theme, isPtt, isChannelSelect}) => ({
    height: '100%',
    width: '100%',
    display: "grid",
    gridTemplateRows: "auto",
    columnGap: "4px",
    gridTemplateColumns: "minmax(auto, 20%) minmax(auto, 60%) minmax(auto, 30%)",
    borderBottom: "1px solid #e0e0e0",
    "& .avatar-container": {
        height: '100%',
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& .MuiAvatar-root": {
            width: "40px", 
            height: "40px",
            borderRadius: "5px",
            backgroundColor: "#F5FCFF",
            "& .MuiSvgIcon-root": {
                // color: "#00658b"
                color: isChannelSelect ? "#00658b" : "#bdbdbd"
            },
        },
    },
    "& .info-container": {
        height: '100%',
        width: '100%',
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: "4px",
        "& .MuiBox-root": {
            display: "grid",
            gridTemplateRows: "minmax(auto, 50%) minmax(auto, 50%)",
            gridTemplateColumns: "auto",
            "& .primary": {
                fontSize: "14px",
                fontWeight: "bold",
            },
            "& .empty": {
                fontSize: "14px",
                fontWeight: "bold",
                color: "#bdbdbd"
            },
            "& .secondary": {
                fontSize: "12px",
                color: "#bdbdbd"
                //#9e9e9e
            },
        }
    },
    "& .control-container": {
        height: '100%',
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& .MuiBox-root": {
            display: "grid",
            gridTemplateRows: "auto",
            gridTemplateColumns: "repeat(3, 1fr)",
            columnGap: "16px",
            "& .add": {
                borderRadius: "5px",
                backgroundColor: "#02759F",
                "& .MuiSvgIcon-root": {
                    color: "#FFF"
                },
                "&:hover": {
                    backgroundColor: "#00bcd4",
                    transition: "all 0.3s",
                    "& .MuiSvgIcon-root": {
                        color: "#FFFFFF"
                    },
                },
                '&:disabled' : {
                    backgroundColor: "rgba(0, 0, 0, 0.12)",
                    color: "rgba(0, 0, 0, 0.26)",
                },
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
                    backgroundColor: "rgba(0, 0, 0, 0.12)",
                    color: "rgba(0, 0, 0, 0.26)",
                },
            }
        }
    },
    [theme.breakpoints.down(992)]: {
        gridTemplateColumns: "minmax(auto, 15%) minmax(auto, 55%) minmax(auto, 30%)",
        "& .avatar-container": {
            "& .MuiAvatar-root": {
                width: "30px", 
                height: "30px",
            },
        },
        "& .control-container": {
            "& .MuiBox-root": {
                columnGap: "8px",
                "& .add": {
                    width: "30px",
                    height: "30px"
                },
                "& .delete": {
                    width: "30px",
                    height: "30px"
                }
            }
        },
    }
}));

export const RoomDeviceTab = MUI.styled(MUI.Box, { shouldForwardProp: (prop) => prop !== 'selected'})<{ selected: boolean;}>(({ theme, selected}) => ({
	backgroundColor: selected ? "#FFFFFF" : "#FFFFFF",
    cursor: 'pointer',
    height: "100%",
    width: "100%",
    display: "grid",
    gridTemplateRows: "repeat(2 1fr)",
    borderBottom: selected ? "3px solid #02759F" : "1px solid #FFFFFF",
    padding: "6px 0px",
    "& .tab-avatar": {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        "& .MuiSvgIcon-root": {
            color: selected ? "#02759F" : "#9e9e9e",
        },
        "& .MuiAvatar-root": {
            width: "40px", 
            height: "40px",
            borderRadius: "5px",
            backgroundColor: "#FFFFFF",
            "& .MuiSvgIcon-root": {
                color: selected ? "#02759F" : "#9e9e9e",
            },
        },
    },
    "& .tab-title": {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        "& .MuiTypography-root": {
            color: selected ? "#02759F" : "#9e9e9e",
            fontSize: "14px",
            fontWeight: "bold",
        }
    },
    "&:hover": {
        backgroundColor: "#f5f5f5",
        transition: "all 0.3s",
    },
}));

export const FootControlContainer = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
    height: '100%',
    width: '100%',
    display: "grid",
    gridTemplateRows: "auto",
    gridTemplateColumns: "minmax(auto, 8%) minmax(auto, 35%) minmax(auto, 57%)",
    columnGap: "4px",
    "& .user-avatar": {
        height: "100%",
        width: "100%",
        display : "flex",
        "& .MuiAvatar-root": {
            width: "35px", 
            height: "35px",
            alignSelf: "center",
        },
    },
    "& .user-content": {
        height: "100%",
        width: "100%",
        display: "flex",
        paddingLeft: "12px",
        "& .MuiTypography-root": {
            alignSelf: "center",
            fontWeight: 900,
            fontSize: "14px",
            color: "#121212",
        }
    },
    "& .user-control": {
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateRows: "auto",
        gridTemplateColumns: "minmax(auto, 18%) minmax(auto, 18%) minmax(auto, 64%)",
        columnGap: "4px",
        "& .MuiBox-root": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        "& .MuiFormControlLabel-root": {
            gap: "4px",
            margin: 0,
            "& .MuiTypography-root": {
                color: "#757575",
                fontWeight: "bold",
                fontSize: 12
            }
        }
    },
    // [theme.breakpoints.down(770)]: {
    //     zIndex: 1001
    // }
}));