import * as MUI from "@mui/material";

const subDrawerWidth = 300;

const mobileOpenMixin = (theme: MUI.Theme): MUI.CSSObject => ({
    transition: theme.transitions.create(['all'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    height: "calc(100vh - 420px)",
});

const mobileCloseMixin = (theme: MUI.Theme): MUI.CSSObject => ({
    transition: theme.transitions.create(['all'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    height: "calc(100vh - 120px)"
});

export const Container = MUI.styled(MUI.Box, { shouldForwardProp: (prop) => 
    prop !=='mobileOpen' && prop !== 'navDrawerOpen' && prop !== "mediaMatches" && prop !== "gridValue"})
    <{mobileOpen: boolean, navDrawerOpen: boolean, mediaMatches: boolean, gridValue: number}>
    (({ theme, mobileOpen, navDrawerOpen, mediaMatches, gridValue}) => ({
        position: 'relative',
        height: `calc(100vh - 64px)`,
        marginTop: 64,
        flexGrow: 1,
        display: "grid",
        gridTemplateRows: "minmax(auto, 64px) minmax(auto, auto)",
        "& .monitor-header": {
            backgroundColor: "#FFF",
            width: '100%',
		    height: '100%',
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: "0px 12px",
            "& .monitor-tips": {
                display: "flex",
                alignItems: "center",
                gap: "4px",
                "& .tips-text": {
                    fontWeight: 900,
                    fontSize: 16,
                    color: "#9e9e9e"
                },
                "& .mobile-title": {
                    fontWeight: 900,
                    fontSize: 16,
                    color: "#02759F",
                }
            },
            "& .MuiToggleButtonGroup-root": {
                "& .MuiSvgIcon-root": {
                    color: "#02759F",
                },
                "& .MuiButtonBase-root.Mui-selected": {
                    backgroundColor: "#02759F",
                    borderColor: "#FFF",
                    "& .MuiSvgIcon-root": {
                        color: "#FFF",
                    }
                },
                "& .MuiButtonBase-root:hover": {
                    backgroundColor: "#00bcd4",
                        "& .MuiSvgIcon-root": {
                            color: "#FFF",
                        },
                        transition: "all 0.3s"
                }
            }
        },
        "& .monitor-wall": {
            height: '100%',
    	    width: '100%',
            overflowY: 'scroll',
            padding: gridValue === 1 ? "20px" : "12px",
            backgroundColor: "#FFF",
            "& .monitor-wall-content": {
                width: '100%',
                height: '100%',
                display: "grid",
                gridTemplateColumns: `repeat(${gridValue}, 1fr)`,
                gridTemplateRows: `repeat(${gridValue}, 1fr)`,
                gridAutoRows: "auto",
                gridAutoFlow: "dense",
                gap: "16px",
            },
        },
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
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
            marginLeft: '254px',
            width: 'calc(100vw - 320px)'
        }),
        [theme.breakpoints.down("md")] : {
            marginLeft: '0px',
            width: '100%',
            ...((mobileOpen) && {
                ...mobileOpenMixin(theme),
            }),
            ...((!mobileOpen) && {
                ...mobileCloseMixin(theme),
            }),
            "& .monitor-header": {
                "& .grid-16": {
                    display: "none"
                }
            },
            "& .monitor-wall": {
                height: '100%',
                width: '100%',
                overflowY: 'scroll',
                padding: "12px",
                backgroundColor: "#FFF",
                "& .monitor-wall-content": {
                    width: '100%',
                    height: '100%',
                    display: "grid",
                    gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
                    gridTemplateRows: `repeat(auto-fit, minmax(300px, 1fr))`,
                    gridAutoRows: "300px",
                    gridAutoFlow: "dense",
                    gap: "16px",
                },
            },
        },
}));

export const MonitorView = MUI.styled(MUI.Box, {shouldForwardProp: (prop) => prop !== 'isdragging' && prop !== 'isDraggable'})<{isdragging: boolean; isDraggable: boolean}>(({ theme, isdragging, isDraggable}) => ({
    borderRadius: "5px",
    backgroundColor: "#f5f5f5",
    opacity : isdragging ? 0.5 : 1,
    transformOrigin: "50% 50%",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
    position: "relative",
    overflow: "hidden",
    "video": {
        backgroundColor: "#111111",
        objectFit: "fill",
        height: "100%",
        width: "100%",
        zIndex: 1
    },
    "& .device-name": {
        display: "none",
        position: "absolute",
        top: "8px",
        left: "8px",
        "& .MuiTypography-root": {
            color: "#FFF",
            fontWeight: "bold",
            fontSize: "18px",
        }
    },
    "& .drag-handler": {
        display: "none",
        position: "absolute",
        top: "8px",
        right: "8px",
        alignItems: "center",
        justifyContent: "center",
        cursor: isDraggable ? 'grab' : 'not-allowed',
        width: '50px',
        height: "50px",
        borderRadius: "5px",
        "&:hover": {
            boxShadow: "0 0px 0px 2px #4c9ffe",
        },
        "& .MuiSvgIcon-root": {
            color: "#FFF",
            fontSize: "40px"
        }
    },
    "&:hover": {
        "& .drag-handler, .device-name": {
            display: "flex",
            zIndex: 2
        },
    },
    [theme.breakpoints.down("md")]: {
        "& .device-name, .drag-handler": {
            display: "flex",
        },
        "& .drag-handler": {
            position: "absolute",
            top: "8px",
            right: "8px",
            alignItems: "center",
            justifyContent: "center",
            cursor: isDraggable ? 'grab' : 'not-allowed',
            width: '32px',
            height: "32px",
            borderRadius: "5px",
            boxShadow: "0 0px 0px 2px #4c9ffe",
            "& .MuiSvgIcon-root": {
                color: "#FFF",
                fontSize: "24px"
            }
        },
    }
}));

export const DropZone = MUI.styled(MUI.Box, {shouldForwardProp: (prop) => prop !== "isOver" && prop !== "isFocus"})<{isOver: boolean, isFocus: boolean}>(({ theme, isOver, isFocus}) => ({
    backgroundColor: isOver ? '#E3FCEF' : "#f5f5f5",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
    height: isFocus ? "95%" :"100%",
    width: isFocus ? "95%" : "100%",
    "& .MuiSvgIcon-root": { 
        color: '#bdbdbd',
        fontSize: '48px',
    },
}));