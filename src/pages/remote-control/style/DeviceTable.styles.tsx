import * as MUI from "@mui/material";

export const DeviceTableRoot = MUI.styled(MUI.Box, { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'swipeOpen'})<{ open: boolean; swipeOpen: boolean;}>(({ theme, open, swipeOpen }) => ({
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginTop: '64px',
	height: 'calc(100vh - 64px)',
    position: 'relative',
    display: "grid",
    gridTemplateRows: "minmax(auto, 15%) minmax(auto, 85%)",
    marginLeft: !open ? `220px`: '15px',
    "& .header": {
        height: '100%',
        width: '100%',
        borderBottom: "1px solid #e0e0e0",
        display: "grid",
        gridTemplateRows: "auto",
        gridTemplateColumns: "minmax(auto, 55%) minmax(auto, 45%)",
        "& .title-container": {
            padding: "0px 0px 0px 8px",
            display: "flex",
            alignItems: "center",
            "& .MuiTypography-root": {
                fontWeight: 900,
                color: "#010C0F",
                fontSize: "24px",
                lineHeight: "140%",
            }
        },
        "& .search-container": {
            paddingRight: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            "& .filter-btn": {
                display: "none",
            }
        }
    },
    "& .table-container": {
        height: '100%',
        width: '100%',
        overflowY: 'scroll',
        "& .content": {
            width: '100%',
        }
    },
    [theme.breakpoints.down('lg')]: {
        marginLeft: !open ? `220px`: '15px',
    },
    [theme.breakpoints.down('md')]: {
        marginLeft: !open ? `225px`: '15px',
        "& .header": {
            gridTemplateColumns: "minmax(auto, 55%) minmax(auto, 45%)",
            "& .title-container": {
                padding: "0px 8px 0px 8px",
                "& .MuiTypography-root": {
                    fontSize: "18px",
                }
            },
            "& .search-container": {
                paddingRight: "8px",
            }
        },
    },
	[theme.breakpoints.down(577)]: {
        marginLeft: 0,
        padding: "0px 8px",
        height: `calc(100vh - 120px)` ,
        transition: theme.transitions.create(['all'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
        }),
        gridTemplateRows: "minmax(auto, 18%) minmax(auto, 82%)",
        "& .header": {
            height: '100%',
            width: '100%',
            borderBottom: "1px solid #e0e0e0",
            display: "grid",
            gridTemplateRows: "minmax(auto, 40%) minmax(auto, 60%)",
            gridTemplateColumns: "auto",
            "& .title-container": {
                padding: "0px 0px 0px 0px",
                display: "flex",
                alignItems: "center",
                "& .MuiTypography-root": {
                    fontWeight: 900,
                    color: "#010C0F",
                    fontSize: "18px",
                    lineHeight: "140%",
                }
            },
            "& .search-container": {
                display: "grid",
                gridTemplateColumns: "minmax(auto, 80%) minmax(auto, 20%)",
                gap: '4px',
                "& .filter-btn": {
                    display: "flex",
                }
            }
        },
	}
}));

export const TableWrapper = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
    "& .MuiPaper-root": {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        overflow: 'scroll', 
        flex: 1, 
        boxShadow: 'none',
        border: 'none',
        position: 'unset !important',
        scrollbarWidth: "none",
    },
    "& .MuiTableHead-root": {
        position: 'sticky',
        top: 0,
        zIndex: 2,
        borderRadius: '0px',
        boxShadow: 'rgba(33, 35, 38, 0.2) 0px 12px 10px -10px',
        "& .MuiTableCell-root": {
            color: theme.palette.text.main,
            lineHeight: '2rem',
            height: '75px',
            "& .MuiButtonBase-root": {
                fontSize: '18px',
                fontWeight: 600,
            }
        }
    },
    "& .MuiTableRow-root": {
        backgroundColor: theme.palette.background.paper,
        borderBottom: theme.palette.mode === 'light' ? `3px solid #e1f4ff` : '0.1px solid #FFF',
        '&:last-of-type': {
            borderBottom: 'none'
        },
        "& .table-status": {
            width: "80px", 
            display: 'flex', 
            justifyContent: 'center',
            "& .MuiChip-root": {
                width: '80px',
                borderColor: "#4b6700",
                backgroundColor: "#4b6700",
                color: '#FFF',
                fontWeight: 'bold'
            }
        }
    },

    "& .MuiTableBody-root" :{
        "& .MuiTableRow-root": {
            fontSize: '16px',
        }
    },
    
    "& .MuiTableCell-footer": {
        "& .MuiToolbar-root": {
           display: 'flex',
           flexWrap: 'wrap',
           alignItems: 'center',
           justifyContent: 'center',           
        },
    },
    [theme.breakpoints.down('lg')]: {
        "& .MuiTableCell-footer": {
            "& .MuiToolbar-root": {
                padding: '0px',
            }
        }
    },
    [theme.breakpoints.down('sm')]: {
        "& .MuiTableHead-root": {
            "& .MuiTableCell-root": {
                height: '0px',
                paddingTop: '0px',
                paddingBottom: '0px',
                "& .MuiButtonBase-root": {
                    fontSize: '14px',
                    fontWeight: 900,
                }
            }
        },
        "& .MuiTableCell-footer": {
            "& .MuiToolbar-root": {
               padding: '0px',
               display: 'flex',
               flexWrap: 'wrap',
               alignItems: 'center',
               justifyContent: 'center',
               "& .MuiInputBase-root": {
                   marginRight: '5px',
                   "& .MuiTablePagination-select": {
                       paddingLeft: '0px'
                   }
               },
               'span': {
                   "& .MuiButtonBase-root": {
                       padding: '6px',
                       "& .MuiSvgIcon-root": {
                            transform: 'scale(0.8)'
                        }
                   },
                   
               }
               
            },
        },
    }
}));