import * as MUI from "@mui/material";

const subDrawerWidth = 300;

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

export const Container = MUI.styled(MUI.Box, { shouldForwardProp: (prop) => 
    prop !=='mobileOpen' && prop !== 'navDrawerOpen' && prop !== "mediaMatches" && prop !== "gridValue" && prop !== "isFocus"})
    <{mobileOpen: boolean, navDrawerOpen: boolean, mediaMatches: boolean, gridValue: number, isFocus: boolean}>
    (({ theme, mobileOpen, navDrawerOpen, mediaMatches, gridValue, isFocus}) => ({
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
            flexDirection: "row-reverse",
            padding: "0px 12px",
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
                //gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
                gridTemplateRows: `repeat(${gridValue}, 1fr)`,
                gridAutoRows: "auto",
                gridAutoFlow: "dense",
                gap: "16px",
                // gridTemplateColumn: "repeat(auto-fit, minmax(300px, 1fr))",
                // gridAutoRows: "150px",
                // gridAutoFlow: "dense"
                // gridTemplateRows: "repeat(2, 1fr)",
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
            width: '100vw',
            height: `calc(100vh - 120px)`,
            // ...((mobileOpen && mediaMatches) && {
            //     ...mobileOpenMixin(theme),
            // }),
            // ...((!mobileOpen && mediaMatches) && {
            //     ...mobileCloseMixin(theme),
            // }),
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
    // gridColumn: "span 2",
    // gridRow: "span 2",
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
        width: '40px',
        height: "40px",
        borderRadius: "5px",
        "&:hover": {
            boxShadow: "0 0px 0px 2px #4c9ffe",
        },
        "& .MuiSvgIcon-root": {
            color: "#FFF",
            fontSize: "32px"
        }
    },
    "&:hover": {
        "& .drag-handler, .device-name": {
            display: "flex",
            zIndex: 2
        },
    },
}));

export const DropZone = MUI.styled(MUI.Box, {shouldForwardProp: (prop) => prop !== "isOver" && prop !== "isFocus"})<{isOver: boolean, isFocus: boolean}>(({ theme, isOver, isFocus}) => ({
    backgroundColor: isOver ? '#E3FCEF' : "#f5f5f5",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
    // gridColumn: isFocus ? 'span 4' : "span 1",
    // gridRow: isFocus ? 'span 4' : "sapn 1",
    "& .MuiSvgIcon-root": { 
        color: '#bdbdbd',
        fontSize: '48px',
    }
}));