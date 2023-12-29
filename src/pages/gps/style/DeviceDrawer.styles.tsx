import * as MUI from "@mui/material";

export const SideBarRoot = MUI.styled(MUI.Box)<MUI.BoxProps>(({ theme }) => ({
    width: "100%",
    position: "relative",
    height: "calc(100vh - 64px)",
    display: "grid",
    gridTemplateRows: "14% 86%",
    "& .header": {
        width: "95%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "85% 15%",
        alignItems: "center",
        gap: "10px",
        "& .search-box": {
            margin: "0 auto",
            "& > .MuiBox-root": {
                width: "100%",
                "& .MuiSvgIcon-root": {
                    color: theme.palette.mode === "light" ? "#9e9e9e" : "#8b9297",
                    transform: "scale(1.1)",
                },
            },
        },
        "& .search-btn": {
            margin: "0 auto",
            width: "100%",
            "& .MuiIconButton-root": {
                backgroundColor: "#F5f5f5",
                color: theme.palette.background.primary,
                borderRadius: "5px",
            },
        },
    },
    "& .device-list": {
        width: "95%",
        margin: "0 auto",
        overflowY: "scroll",
        padding: "0px 15px",
        backgroundColor: theme.palette.mode === "light" ? "#F5f5f5" : "#212121",
        "& .content": {
            width: "100%",
        },
    },
    [theme.breakpoints.up(1600)]: {
        gridTemplateRows: "12% 88%",
    }
}));

export const DeviceCard = MUI.styled(MUI.Card, {shouldForwardProp: (prop) => prop !== "selected"})<{ selected: boolean }>(({ theme, selected }) => ({
    borderRadius: "10px",
    border: selected ? "1.5px solid #ff5722": "1px solid rgba(224, 224, 224, .45)",
    marginTop: "15px",
    "& .card-action": {
        "& .MuiCardHeader-root": {
            padding: "10px",
            position: "relative",
            "& .MuiCardHeader-avatar": {
                marginRight: "10px",
                "& .MuiAvatar-root": {
                    width: "40px",
                    height: "40px",
                    backgroundColor:
                        theme.palette.mode === "light" ? "transparent" : "#212121",
                    },
            },
            "& .MuiCardHeader-action": {
                position: "absolute",
                right: 20,
                top: 20,
                "& .MuiChip-root": {
                    borderRadius: "5px",
                    backgroundColor: "#5f8200",
                    color: "#FFF",
                    border: "none !important",
                },
            },
            "& .MuiCardHeader-title": {
                fontWeight: 900,
                fontSize: 15,
                color: "#121212",
            },
            "& .MuiCardHeader-subheader": {
                color: "#9e9e9e",
                fontWeight: 900,
                fontSize: "12px",
            },
        },
        "& .MuiCardContent-root": {
            height: '80px',
            padding: "3px 8px",
            display: 'grid',
            gridTemplateColumns: "24.25% 1% 24.25% 1% 24.25% 1% 24.25%",
            gridTemplateTows: "auto",
            "& .MuiTypography-root": {
                color: "#121212",
                fontWeight: "bold",
                fontSize: "12px",
            },
            "& .view": {
                color: theme.palette.background.formButton,
                "& .view-btn": {
                    cursor: "pointer",
                    border: "none",
                    backgroundColor: "#FFF",
                    "&:hover": {
                        "& .MuiTypography-root": {
                            color: "#00bcd4",
                        },
                        transform: "scale(1.1)",
                        animation: "shake 600ms ease-in-out",
                        "@keyframes shake": {
                            "10% 90%": {
                                transform: "translate3d(-1px, 0 ,0)",
                            },
                            "20% 80%": {
                                transform: "translate3d(+2px, 0 ,0)",
                            },
                            "30% 70%": {
                                transform: "translate3d(-4px, 0 ,0)",
                            },
                            "40% 60%": {
                                transform: "translate3d(+4px, 0 ,0)",
                            },
                            "50%": {
                                transform: "translate3d(-4px, 0 ,0)",
                            },
                        },
                    }
                }
            },
            "& .temperature": {
                marginTop: "12px",
            }
        },
    },
}));

export const selectedMixin = (theme: MUI.Theme): MUI.CSSObject => ({
  backgroundColor: "rgba(0,188,212,1)",
  "& .MuiCardHeader-root": {
    "& .MuiChip-root": {
      backgroundColor: "#F8F8F8",
      color: "#5f8200",
      fontWeight: "bold",
    },
    "& .MuiCardHeader-title": {
      color: "#FFF",
    },
    "& .MuiCardHeader-subheader": {
      color: "#FFF",
    },
  },
  "& .MuiCardContent-root": {
    "& .MuiTypography-root": {
      color: "#FFF",
    },
    "& .MuiBadge-root": {
      "& .MuiBadge-badge": {
        backgroundColor: "#4b6700",
        color: "#4b6700",
      },
      "& .gps-icon": {
        color: "#FFF",
      },
    },
    "& .battery-level": {
      backgroundColor: "#FFF",
    },
    "& .MuiButton-root": {
      color: "#FFF",
      transform: "scale(1.1)",
      animation: "shake 600ms ease-in-out",
      "@keyframes shake": {
        "10% 90%": {
          transform: "translate3d(-1px, 0 ,0)",
        },
        "20% 80%": {
          transform: "translate3d(+2px, 0 ,0)",
        },
        "30% 70%": {
          transform: "translate3d(-4px, 0 ,0)",
        },
        "40% 60%": {
          transform: "translate3d(+4px, 0 ,0)",
        },
        "50%": {
          transform: "translate3d(-4px, 0 ,0)",
        },
      },
    },
  },
});

export const StyledBadge = MUI.styled(MUI.Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#c24242',
        color: '#c24242',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));
