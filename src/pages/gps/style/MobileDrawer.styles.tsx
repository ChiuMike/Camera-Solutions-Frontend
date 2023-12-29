import * as MUI from "@mui/material";

export const MobileContentRoot = MUI.styled(MUI.Box)<MUI.BoxProps>(({ theme }) => ({
    position: "relative",
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateRows: "10% 80% 10%",
    "& .header": {
        width: "100%",
        display: "grid",
        gridTemplateRows: 'auto',
        gridTemplateColumns: "minmax(auto, 92%) minmax(auto, 8%)",
        padding: "0px 18px",
        gap: '16px',
        "& .search-box": {
            width: "100%",
            "& > .MuiBox-root": {
                width: "100%",
                borderRadius: "5px",
                "& .MuiSvgIcon-root": {
                    color: theme.palette.mode === "light" ? "#9e9e9e" : "#8b9297",
                    transform: "scale(1.1)",
                },
            },
        },
        "& .search-btn": {
            width: "100%",
            "& .MuiIconButton-root": {
                width: "100%",
                backgroundColor: "#F5f5f5",
                color: theme.palette.background.primary,
                borderRadius: "5px",
            },
        },
    },
    "& .device-list": {
        margin: "0 auto",
        overflowY: "scroll",
        width: "100%",
        padding: "0px 15px",
        "& .content": {
            width: "100%",
            "&:first-of-type": {
                marginTop: "10px",
            }
        },
        borderBottom: "1px solid #f5f5f5",
    },
    "& .footer": {
        margin: "auto auto",
        "& .MuiButton-root": {
            backgroundColor: theme.palette.background.primary,
            color: "#FFF",
            borderRadius: "20px",
            height: '28px',
            fontSize: 12,
            padding: "0px 10px",
            "&:disabled": {
                backgroundColor: "#e4e4e4"
            }
        }
    },
    [theme.breakpoints.down(380)]: {
        "& .header": {
            gridTemplateColumns: "minmax(auto, 90%) minmax(auto, 32px)",
        }
    },
}));

export const MobileDeviceCard = MUI.styled(MUI.Box, {shouldForwardProp: (prop) => prop !== "selected"})<{ selected: boolean }>(({ theme, selected }) => ({
    width: "100%",
    display: "grid",
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `"avatar info info state state state remote-status"`,
    height: "80px",
    marginBottom: "16px",
    border: selected ? "1px solid #02759F" : ".5px solid #f5f5f5",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
    borderRadius: "10px",
    "& .device-avatar": {
        gridArea: "avatar",
        justifySelf: "center",
        alignSelf: "center",
        "& .MuiAvatar-root": {
            width: "60px",
            height: "60px",
        }
    },
    "& .device-info": {
        gridArea: "info",
        alignSelf: "center",
        "& .title": {
            fontWeight: 900,
            fontSize: 15,
            color: "#121212",
            marginBottom: "3px"
        },
        "& .subheader": {
            color: "#9e9e9e",
            fontWeight: 900,
            fontSize: "12px",
        }
    },
    "& .device-remote": {
        gridArea: "remote-status",
        alignSelf: "center",
        justifySelf: "center",
        "& .MuiChip-root": {
            borderRadius: "5px",
            backgroundColor: "#5f8200",
            color: "#FFF",
            border: "none !important",
        }
    },
    "& .device-state": {
        gridArea: "state",
        display: "grid",
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'auto',
        gridTemplateAreas: `"battery gps temp"`,
        borderRight: '1px solid #e3e3e3',
        "& .MuiTypography-root": {
            color: selected ? "#FFF" : "#121212",
            fontWeight: "bold",
            fontSize: "12px",
        },
        "& .battery": {
            gridArea: "battery",
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: '50px',
            "& .MuiTypography-root": {
                marginBottom: "10px",
            },
            borderRight: '1px solid #e3e3e3',
            borderLeft: '1px solid #e3e3e3',
        },
        "& .gps": {
            gridArea: "gps",
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: '50px',
            "& .MuiTypography-root": {
                marginBottom: "10px",
            },
            borderRight: '1px solid #e3e3e3',
        },
        "& .temp": {
            gridArea: "temp",
            justifySelf: "center",
            alignSelf: "center",
            marginBottom: "5px",
        },
    },
    [theme.breakpoints.down(480)]: {
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridTemplateAreas: `"avatar info info state state remote-status"`,
        "& .device-avatar": {
            "& .MuiAvatar-root": {
                width: "50px",
                height: "50px",
            }
        },
        "& .device-info": {
            "& .title": {
                fontSize: 14,
            },
        },
        "& .device-state": {
            width: "100%",
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateAreas: `"battery gps"`,
            "& .gps": {
                borderRight: 'none',
            },
            "& .temp": {
                display: 'none'
            },
        },
        "& .device-remote": {
            "& .MuiChip-root": {
                borderRadius: "50px",
                width: '24px',
                height: '24px',
                position: "relative",
                "& .MuiChip-label": {
                    visibility: "hidden"
                },
                "&:after": {
                    content: `"✔"`,
                    position: 'absolute',
                }
            }
        },
    },
    [theme.breakpoints.down(360)]: {
        gridTemplateAreas: `"avatar avatar info info info remote-status"`,
        "& .device-state": {
            display: "none",
        },
        "& .device-remote": {
            gridArea: "remote-status",
            alignSelf: "center",
            justifySelf: "start",
        },
    }
}));