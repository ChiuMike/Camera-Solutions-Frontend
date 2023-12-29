import * as MUI from "@mui/material";

const subDrawerTimeline = 350;
const bottomDrawer = 150;

const openBottomMixin = (theme: MUI.Theme, timelineOpen: boolean): MUI.CSSObject => ({
    height: `${bottomDrawer}px`,
    transition: theme.transitions.create(['height'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    })
});

const closeBottomMixin = (theme: MUI.Theme): MUI.CSSObject => ({
    height: 0,
    transition: theme.transitions.create(['height'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
});

export const TimeLineContainer = MUI.styled(MUI.Box,
    {shouldForwardProp: (prop) => prop !== "bottomOpen" && prop !== "timelineOpen"})
    <{bottomOpen: boolean; timelineOpen: boolean}>(({ theme, bottomOpen, timelineOpen}) => ({
        ...(bottomOpen && {
            ...openBottomMixin(theme, timelineOpen),
        }),
        ...(!bottomOpen && {
            ...closeBottomMixin(theme),
        }),
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        "& .time-line-list": {
            display: 'flex',
            backgroundColor: '#FFF',
            gap: "1px",
            height: "100%",
            "& .timeline-list": {
                width: "200px",
                flex: "0 1 auto",
                overflow: "overlay",
                position: "relative",
                "& .list-header": {
                    height: '36px',
                    background: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "& .MuiTypography-root": {
                        fontSize: 12,
                        fontWeight: "bold",
                        color: theme.palette.text.main
                    }
                },
                "& .timeline-list-item": {
                    width: "100%",
                    "& .control-box": {
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                        width: "100%",
                        position: "absolute",
                        top: '50%',
                    }
                }
            }
        },
        "& .timeline-editor": {
            borderTop: '1px solid rgba(224, 224, 224, 1)',
            width: timelineOpen ? "calc(100vw - 405px)" : "calc(100vw - 355px)",
            height: "120px",
            background: "#FFF",
            "& .timeline-editor-time-unit-scale" :{
                // scale text color
                color: "#121212",
            },
            "& .timeline-editor-time-unit": {
                // scale range bottom
                borderRight: "1px solid rgba(18,18,18, .35)",
                borderBottom: "1px solid #1212",
            },
            "& .timeline-editor-edit-row": {
                // scale range background
                backgroundImage: "linear-gradient(#FFF, #FFF), linear-gradient(90deg, rgba(224, 224, 224, 1) 1px, transparent 0)",
                height: "64px !important"
            },
            "& .timeline-editor-time-area": {
                // range slider background
                height: "36px",
                background: "#f9fafb",
                backgroundSize: "auto auto",
                backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 5px, rgba(255,255,255, 1) 10px, rgba(255,255,255, 1) 20px)",
            },
            "& .timeline-editor-edit-row:nth-of-type(2)": {
                display: "none",
            },

            "& .timeline-editor-action": {
                height: "45px !important",
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
            "&-action:active": {
                cursor: "grabbing",
                opacity: .85
            },
            "& .timeline-editor-cursor": {
                height: "100% !important"
            },
        },
}));