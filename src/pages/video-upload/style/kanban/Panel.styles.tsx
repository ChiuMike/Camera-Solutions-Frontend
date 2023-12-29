import * as MUI from "@mui/material";

export const PanelContainer = MUI.styled(MUI.Box, {shouldForwardProp: (prop) => prop !== 'isDragging' })<{isDragging: boolean}>(({ theme, isDragging }) => ({
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateRows: "minmax(auto, 10%) minmax(auto, 12%) minmax(auto, auto) minmax(auto, 78%)",
    "& .search-box": {
        width: '100%',
        height: '100%',
        display: "grid",
        backgroundColor: "#FFFFFF",
        gridTemplateRows: "auto",
        gridTemplateColumns: "minmax(auto, 5%) minmax(auto, 90%) minmax(auto, 5%)",
        "& .search-input-box": {
            alignSelf: "center",
        },
        "& .MuiIconButton-root": {
            "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0)",
                "& .MuiSvgIcon-root": {
                    color: "#00bcd4"
                }
            }
        }
    },
    [theme.breakpoints.down("xl")]: {
        gridTemplateRows: "minmax(auto, 15%) minmax(auto, 20%) minmax(auto, auto) minmax(auto, 65%)",
    }
}));

export const PanelHeader = MUI.styled(MUI.Box, {shouldForwardProp: (prop) => prop !== 'isDragging' && prop!== 'title' })
    <{isDragging: boolean; title: string}>(({ isDragging, title}) => ({
        position: "relative",
        background: title === "Archiving" ? "#c24242" : "#8bc34a",
        "& .panel-title": {
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50px",
            fontWeight: 900,
            color: "#FFF",
        },
        "& .drag-box": {
            width: 32,
            height: 32,
            borderRadius: "8px",
            backgroundSize: "auto auto",
            backgroundColor: "rgba(255,255,255,0)",
            backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 5px, rgba(255,255,255,0.15) 5px, rgba(255,255,255,0.15) 10px)",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50%",
            right: "0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isDragging ? 'grabbing': 'grab',
            "& .MuiSvgIcon-root": {
                color: "#FFF",
            }
        },
        transition: 'background-color 0.3s ease',
}));

export const PannelItemWrapper = MUI.styled(MUI.Box, {shouldForwardProp: (prop) => prop !== 'isover'})<{isover: boolean}>(({theme, isover}) => ({
    backgroundColor: isover ? '#E3FCEF' : '#FFFFFF',
    padding: '16px',
    border: '1px',
    transition: 'background-color 0.2s ease, opacity 0.1s ease',
    userSelect: 'none',
    width: '100%',
    height: '100%',
    overflowY: 'hidden',
    "& .content": {
        width: '100%',
        height: '100%',
        overflowY: 'scroll',
        "& .panel-item" : {
            marginBottom: "16px",
            "& .MuiChip-root": {
                color: '#FFF',
                border: 'none !important',
            },
        },
        
    }
}));

export const PanelItemContainer = MUI.styled(MUI.Box, {shouldForwardProp: (prop) => prop !== 'isdragging' && prop !== 'isDraggable'})<{isdragging: boolean; isDraggable: boolean;}>(({ theme, isdragging, isDraggable}) => ({
    borderRadius: '5px',
    borderBottom: ".5px solid rgba(224, 224, 224, .5)",
    borderTop: ".5px solid rgba(224, 224, 224, .5)",
    backgroundColor: "#F5f5f5",
    opacity : isdragging ? 0.3 : 1,
    padding: "0px 0px 0px 12px",
    display: "flex",
    minHeight: "60px",
    justifyContent: "space-between",
    gap: "8px",
    "& .panel-item-avatar": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& .MuiAvatar-root": {
            width: "40px", 
            height: "40px",
            borderRadius: "5px",
            backgroundColor: "#FFFFFF",
            "img": {
                maxWidth: "80%",
                maxHeight: "80%",
            }
        },
    },
    "& .panel-item-content": {
        display: "flex",
        flexFlow: "row wrap",
        flexBasis: "150px",
        flexShrink: 2,
        flexGrow: 1,
        justifyContent: "space-between",
        "& .panel-item-title": {
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            "& .MuiTypography-root": {
                fontWeight: "bold",
            }
        },
        "& .panel-item-status": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& .MuiChip-root": {
                opacity: 0.7,
                borderRadius: "5px",
                width: "100%",
                color: '#FFF',
                border: 'none !important',
            },
            "& .ready": {
                backgroundColor: "#8bc34a",
            },
            "& .wait": {
                backgroundColor: "#ffcf33"
            },
            "& .archive": {
                backgroundColor: "#c24242"
            }
        },
    },
    "& .panel-item-control": {
        display: "flex",
        flexFlow: "row nowrap",
        flexBasis: "100px",
        flexShrink: 1,
        gap: '8px',
        "& .panel-item-button": {
            flexBasis: "45px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& .MuiIconButton-root": {
                "& .MuiSvgIcon-root": {
                    color: "#02759F"
                },
                "&:hover": {
                    "& .MuiSvgIcon-root": {
                        color: "#00bcd4"
                    },
                },
            },
        },
        "& .panel-item-drag": {
            borderLeft: "1px solid rgba(224, 224, 224, 1)",
            flexBasis: "55px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isDraggable ? 'grab' : 'not-allowed',
            maxWidth: "100%",
            "&:hover": {
                borderRadius: "0px 5px 5px 0px",
                background: "#00bcd4",
                "& .MuiSvgIcon-root": {
                    color: "#FFF"
                }
            },
            "& .MuiSvgIcon-root": {
                color: "#02759F"
            }
        },
    },
}));
