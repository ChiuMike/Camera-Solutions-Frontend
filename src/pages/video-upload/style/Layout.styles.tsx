import * as MUI from "@mui/material";
 
export const VideoUploadContainer = MUI.styled(MUI.Box, {shouldForwardProp: (prop) => prop !== 'expand' })<{expand: boolean}>(({ theme, expand }) => ({
    position: "relative",
    width: "100%",
    height: "calc(100vh - 110px)",
    marginTop: "88px",
    padding: "24px 24px 16px 24px",
    display: "grid",
    gridTemplateRows: '15% minmax(auto, 85%)',
    rowGap: "16px",
    "& .video-header": {
        width: "100%",
        height: "100%",
        background: "#FFF",
        borderRadius: "5px",
        boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 4px",
        padding: "16px 16px",
        display: "grid",
        gridTemplateRows: "1fr 1fr",
        rowGap: "0px",
        "& .MuiTypography-root": {
            fontSize: "24px",
            letterSpacing: "1px",
            fontWeight: 600,
        },
        "& .video-header-control": {
            display: "flex",
            justifyContent: "flex-end",
            "& .MuiButton-root": {
                backgroundColor: "#FFF",
                border: "1px solid rgba(224, 224, 224, 1)",
                borderRadius: "10px",
                color: "#9e9e9e",
                "& .MuiSvgIcon-root": {
                    color: "#9e9e9e",
                },
                ":hover": {
                    backgroundColor: "#F5f5f5",
                    transition: "300ms",
                }
            }
        }
    },
    "& .kanban": {
        width: "100%",
        display: "grid",
        ...(expand && {
            gridTemplateColumns: ".4fr 1fr 2.6fr",
            columnGap: "8px",
            transition: theme.transitions.create('all', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.complex,
            }),
        }),
        ...(!expand && {
            gridTemplateColumns: '1fr 1fr 2.5fr',
            columnGap: "12px",
            transition: theme.transitions.create('all', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.complex,
            }),
        }),
        "& .available, .archiving ": {
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 4px",
        },
    },
    "& .device-timeline": {
        width: "100%",
        background: "#FFFFFF",
        borderRadius: "5px",
        boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 4px",
        display: "grid",
        gridTemplateRows: 'minmax(auto, 15%) minmax(auto, 85%)',
        "& .timeline-header": {
            height: "100%",
            width: "100%",
            borderBottom: "1px solid rgba(224, 224, 224, .8)",
            "& .MuiSvgIcon-root": {
                color: theme.palette.text.main
            },
            "& .selectDate-header": {
                height: "100%",
                width: "100%",
                display: "grid",
                gridTemplateColumns: 'minmax(auto, 25%) minmax(auto, 30%) minmax(auto, 25%) minmax(auto, 20%)',
                "& .selected-device": {
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                    height: "100%",
                    width: "100%",
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center",
                    "& .device": {
                        height: "45px",
                        width: "150px",
                        borderRadius: "5px",
                        border: "2.5px dashed rgba(224, 224, 224, .8)",
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                        "& .wait-for-text": {
                            color: "#9e9e9e",
                            fontSize: "13px"
                        }
                    }
                },
                "& .date-picker": {
                    display: 'flex', 
                    justifyContent: "center", 
                    alignItems: 'center', 
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                    "input": {
                        width: "90%",
                        borderRadius: "5px",
                    },
                },
                "& .custom-range": {
                    height: "100%",
                    width: "100%",
                    position: "relative",
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "& .MuiButton-root": {
                        color: "#FFF",
                        fontWeight: 900,
                        background: "#02759F",
                        padding: "5px 8px",
                        "& .MuiSvgIcon-root": {
                            color: "#FFF",
                        },
                        "&:hover": {
                            background: "#00bcd4",
                            transition: "background 300ms"
                        },
                        "&:disabled": {
                            background: "#dddddd",
                        }
                    }
                },
                "& .confirm-upload": {
                    height: "100%",
                    width: "100%",
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center",
                    "& .MuiButton-root": {
                        backgroundColor: "#c24242",
                        color: "#FFF",
                        "& .MuiSvgIcon-root": {
                            color: "#FFF",
                        },
                        "&:disabled": {
                            backgroundColor: `#dddddd`,
                        }
                    },
                }
            }
        },
        "& .timeline-container": {
            width: "100%",
            height: "100%",
        }
    },
    [theme.breakpoints.down('xl')]: {
        width: "100%",
        height: "100%",
        overflowY: "auto",
        padding: "0px 16px 16px 16px",
        gridTemplateRows: 'minmax(auto, 60px) minmax(auto, 90%)',
        rowGap: "12px",
        "& .video-header": {
            background: theme.palette.background.default,
            boxShadow: "none",
            padding: "16px 0px",
            ".video-header-control": {
                display: "none",
            }
        },
        "& .kanban": {
            ...(!expand && {
                gridTemplateRows: "minmax(auto, 50%) minmax(auto, 50%)",
                gridTemplateColumns: 'minmax(auto, 50%) minmax(auto, 50%)',
                gridTemplateAreas: 
                    `"available archiving"
                     "device-timeline device-timeline"
                    `,
                columnGap: "12px",
                rowGap: "16px",
                "& .available": {
                    gridArea: 'available'
                },
                "& .archiving": {
                    gridArea: 'archiving'
                },
                "& .device-timeline": {
                    gridArea: 'device-timeline'
                },
            }),
        },
        "& .device-timeline": {
            gridTemplateRows: 'minmax(auto, 20%) minmax(auto, 80%)',
        }
    },
    [theme.breakpoints.down("md")]: {
        gridTemplateRows: 'minmax(auto, 8%) minmax(auto, 92%)',
        marginTop: "64px",
        "& .device-timeline": {
            gridTemplateRows: 'minmax(auto, 30%) minmax(auto, 70%)',
            "& .timeline-header": {
                "& .selectDate-header": {
                    display: 'grid',
                    gridTemplateColumns: "repeat(2, 30%) repeat(2, minmax(auto, 20%))",
                    "& .selected-device": {
                        padding: "0px 8px",
                        "& .device": {
                            height: "45px",
                            width: "100%",
                        }
                    },
                    "& .selected-device, .date-picker, .custom-range": {
                        borderRight: "none",
                    },
                }
            }
        }
    },
    [theme.breakpoints.down("sm")]: {
        gridTemplateRows: 'minmax(auto, 60px) minmax(auto, auto)',
        "& .kanban": {
            ...(!expand && {
                gridTemplateRows: "minmax(auto, 300px) minmax(auto, 300px)",
                gridTemplateColumns: 'minmax(auto, 50%) minmax(auto, 50%)',
                gridTemplateAreas: 
                    `"available available"
                     "archiving archiving"
                     "device-timeline device-timeline"
                    `,
            }),
        },
        "& .device-timeline": {
            gridTemplateRows: 'minmax(auto, 200px) minmax(auto, 400px)',
            "& .timeline-header": {
                "& .selectDate-header": {
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    "& .selected-device": {
                        padding: "0px 8px",
                        "& .device": {
                            height: "40px",
                            width: "100%",
                        },
                    },
                    "& .date-picker": {
                        gap: "4px",
                        "input": {
                            width: "100%",
                        },
                    },
                    "& .custom-range, .confirm-upload, .date-picker": {
                        padding: "0px 8px"
                    },
                    "& .MuiButton-root": {
                        width: "100%",
                    }
                }
            }
        }
    }
}));

export const RangeFormContainer = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) =>({ 
    display: 'flex', 
    flexDirection: 'column',
    "& .MuiTypography-h6": {
        alignSelf: 'center'
    },
    "& .MuiDialogContent-root": {
        padding: "0px", 
        alignSelf: 'center',
        "& .MuiBox-root": {
            display: 'flex', 
            flexWrap: 'wrap',
            "& .MuiFormControl-root": {
                margin: "8px", 
                minWidth: 120
            }
        }
    }
}));