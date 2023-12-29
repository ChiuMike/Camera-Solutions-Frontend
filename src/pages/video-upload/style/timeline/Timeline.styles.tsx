import * as MUI from "@mui/material";

export const ProgressBarContainer = MUI.styled(MUI.Box, {shouldForwardProp: (prop) => prop !== 'view' })<{view: boolean}>(({ theme, view }) => ({
    width: "100%",
    height: view ? "75px" : "0px",
    transition: theme.transitions.create('height', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard,
    }),
    display: 'grid',
    gridTemplateColumns: "minmax(auto, 100%)",
    gridTemplateRows: "auto",
    padding: "0px 16px",
    "& .progress-box": {
        margin: "auto 0",
        width:"100%",
        height:"80%",
        overflow:"hidden",
        background:"#f5f5f5",
        borderRadius: "5px",
        position:"relative",
        "& .bar-rate": {
            float:"left",
            minWidth:"1%",
            height:"100%",
            backgroundColor: "rgb(43, 194, 83)",
            backgroundImage: "linear-gradient(center bottom, rgb(43, 194, 83) 37%, rgb(84, 240, 84) 69%)",
            "&:after": {
                content: `""`,
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundImage:"linear-gradient(-45deg,rgba(255, 255, 255, 0.2) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, 0.2) 50%,rgba(255, 255, 255, 0.2) 75%,transparent 75%,transparent)",
                zIndex: 1,
                backgroundSize: "50px 50px",
                animation: "move 2s linear infinite",
                borderTopRightRadius: "8px",
                borderBottomRightRadius:" 8px",
                borderTopLeftRadius: "20px",
                borderBottomLeftRadius: "20px",
                overflow: "hidden",
                '@keyframes move': {
                    '0%': {
                        backgroundPosition: "0 0",
                    },
                    '100%': {
                        backgroundPosition: "50px 50px",
                    },
                }
            },
            "& .percent": {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                margin: 0,
                fontSize: 12,
                fontWeight: "bold",
                color: theme.palette.text.main
            }
        },
    },
    "& .current-file": {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        "& .MuiListItemText-root": {
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            "& .MuiListItemText-primary": {
                color: "#9e9e9e",
                fontSize: "12px",
                marginBottom: "5px",
            },
            "& .MuiListItemText-secondary": {
                fontWeight: 900,
                fontSize: "14px"
            },
        },
    },
    "& .current-file-start-end": {
        margin: "auto 0",
        "& .MuiTypography-root": {
            fontSize: "12px",
        }
    }
}));

export const TimelineContainer = MUI.styled(MUI.Box, {shouldForwardProp: (prop) => prop !== 'view' })<{view: boolean}>(({ theme, view }) => ({
    height: view ? "calc(100% - 75px)" : "100%",
    transition: theme.transitions.create('height', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard,
    }),
    "& .timeline-editor": {
        width: "100%",
        height: "100%",
        background: "#FFF",
        "& .timeline-editor-time-unit": {
            borderRight: "1px solid rgba(18,18,18, .35)",
            borderBottom: "1px solid #1212",
        },
        "& .timeline-editor-time-area": {
            height: "56px",
            background: "#f9fafb",
            backgroundSize: "auto auto",
            backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 5px, rgba(255,255,255, 1) 10px, rgba(255,255,255, 1) 20px)",
        },
        "& .timeline-editor-edit-area": {
            marginTop: "0px",
            "& .ReactVirtualized__Grid__innerScrollContainer": {
                "& .timeline-editor-edit-row": {
                    backgroundImage: "linear-gradient(#FFF, #FFF), linear-gradient(90deg, rgba(224, 224, 224, 1) 1px, transparent 0)",
                    height: "100% !important",
                    borderBottom: '1px dashed rgba(224, 224, 224, 1)',
                },
                "& .timeline-editor-edit-row:nth-of-type(2)": {
                    display: "none"
                },
                "& .timeline-editor-action": {
                    height: "80px !important",
                    position: "absolute",
                    top: '50%',
                    transform: "translateY(-50%)",
                    background: "rgb(0, 119, 192)",
                    cursor: "grab",
                    borderRadius: "5px",
                    "& .effect-area": {
                        display: "flex",
                        justifyContent: "center",
                        height: "100%",
                        "& .effect-text": {
                            alignSelf: "center",
                            color: "#FFF"
                        },
                        "& .draggable-area-left": {
                            position: "absolute",
                            left: 0,
                            width: "18px",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            gap: '1px',
                            backgroundSize: "auto auto",
                            backgroundColor: "rgba(255,255,255,0)",
                            backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 10px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.15) 20px)",
                        },
                        "& .draggable-area-right": {
                            position: "absolute",
                            right: 0,
                            top: 0,
                            width: "18px",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            gap: '1px',
                            backgroundSize: "auto auto",
                            backgroundColor: "rgba(255,255,255,0)",
                            backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 10px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.15) 20px)"
                        },
                        "& .draggable-line": {
                            width: "1.5px",
                            height: "60%",
                            background: "rgba(255,255,255,0.4)",
                            boxShadow: "-1px -1px 0px rgba(0,0,0,0.05)",
                            backgroundBlendMode: "overlay",
                            borderRadius: "1px",
                            margin: "auto 1px",
                            marginLeft: "1px",
                        },
                    },
                    "& .timeline-editor-action-left-stretch": {
                        "&:after": {
                            content: '""',
                            borderLeft: "none",
                            borderRight: "none",
                        }
                    },
                    "& .timeline-editor-action-right-stretch": {
                        "&:after": {
                            content: '""',
                            borderLeft: "none",
                            borderRight: "none",
                        }
                    }
                },
            },
        },
        "&-action:active": {
            cursor: "grabbing",
            opacity: .85
        },
        "& .timeline-editor-cursor": {
            height: "100% !important",
            marginTop: "18px"
        },
    },
}));
