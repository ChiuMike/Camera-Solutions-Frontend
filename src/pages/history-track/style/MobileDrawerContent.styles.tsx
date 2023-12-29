import * as MUI from "@mui/material";

export const MobileDrawerRoot = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
	width: '100%',
    height: '100%',
    gridTemplateRows: "minmax(auto, 80px) minmax(auto, auto)",
    "& .mobile-header": {
        display: 'grid',
        width: '100%',
		height: '100%',
        gridTemplateColumns: ".2fr 4fr 1fr",
        gridTemplateRows: "auto",
        padding: '0px 0px',
        "& .search-input": {
            width: '100%',
            margin: "auto 0",
            "& .search-icon": {
                color: theme.palette.mode === "light" ? '#9e9e9e': '#8b9297', 
                transform: 'scale(1.2)',
            },
        },
        "& .search-btn": {
            margin: "auto auto",
            "& .MuiIconButton-root": {
                borderRadius: '5px', 
                border: 'none', 
                background: theme.palette.mode === "light" ? '#f5f5f5': "#212121",
                "& .MuiSvgIcon-root": {
                    color: theme.palette.background.formButton, 
                    transform: 'scale(1.05)'
                },
                "&:hover": {
                    background: "#f1f1f1",
                    "& .MuiSvgIcon-root": {
                        color: theme.palette.action.hover, 
                    },
                    transition: "300ms",
                },
                "img": {
                    width: 25,
                    height: 25,
                }
            }
        }
    },
    "& .mobile-content": {
        width: '100%',
		height: '100%',
        overflowY: 'scroll',
        padding: '0px 16px',
        "& .content": {
			width: '100%'
		},
    }
}));

export const HistoryTimelineRoot= MUI.styled(MUI.Box, { shouldForwardProp: (prop) => prop !== 'show'})<{ show: boolean}>(({ theme, show }) => ({
	width: '100%',
    position: 'relative',
	height: 'calc(100vh - 64px)',
	background: "#FFF",
	display: show ? 'flex': "none",
    flexDirection: 'column',
    justifyContent: 'space-between',
	"& .selected-time": {
		"& .MuiTextField-root" : {
			'& .MuiOutlinedInput-root':{ 
				borderRadius: '0px',
				'&:hover': {
				  borderColor: '#02759F'
				},
			},
		}
	},
	"& .timeline-header": {
		flexShrink: 1,
		flexGrow: 1,
		flexBasis: '140px',
		"& .header": {
			padding: '18px 10px',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			"& .MuiTypography-root": {
				fontWeight: 900,
				fontSize: 22
			},
			"& .MuiSvgIcon-root": {
				transform: 'scale(1.5)'
			},
			"& .MuiAvatar-root": {
				background: "#7dd0ff",
				borderRadius: "100%",
				"img": {
					transform: "scale(.85)"
				}
			},
		},
		"& .datetime-pick": {
			padding: '0px 12px 8px 16px',
			"& .time-select-header": {
				width: '100%',
				height: '40px',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				"& .data-result": {
					color: "#9e9e9e"
				}
			},
			"& .picker": {
				padding: '8px 0px 8px 0px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'start',
				gap: '12px',
				"& .MuiTextField-root": {
					width: '100%',
					"& .MuiInputLabel-root": {
						top: '-3.5px',
					},
					"& .MuiInputBase-input": {
						fontSize: '14px',
						padding: '12px',
					}
				},
				"& .search-btn": {
					backgroundColor: theme.palette.background.formButton,
					borderRadius: '10px',
					"& .MuiSvgIcon-root": {
						color: "#FFF"
					},
					"&:hover": {
						backgroundColor: theme.palette.action.hover
					}
				}
			}
		}
	},
	"& .timeline": {
		flexShrink: 1,
		flexGrow: 1,
		overflowY: 'scroll',
		alignSelf: 'center',
		height: '100%',
    	width: '92%',
		padding: '0px 12px',
		marginTop: '0px',
		backgroundColor: theme.palette.mode === "light" ? '#F5f5f5': "#212121",
		"& .content": {
			width: "100%",
			"& .track-list-item": {
				"&:hover": {
					background: '#FFF',
					cursor: "default",
				},
				width: '100%',
				background: '#FFF',	
				borderBottom: '6px solid #F5f5f5',
				margin: '10px 0px',
				padding: '0px 16px 0px 4px',
				display: "grid",
				columnGap: "4px",
				gridTemplateColumns: "minmax(auto, 5%) minmax(auto, 80%) minmax(auto, 1px) minmax(auto, 15%)",
				"& .MuiListItemAvatar-root": {
					position: 'relative',
					"& .MuiAvatar-root": {
						backgroundColor: '#0c2358',
						border: '3px solid #F5f5f5',
						width: '28px',
						height: '28px',
						fontSize: 13,
						marginLeft: '15px'
					},
				},
				"&:not(:last-of-type)": {
					"& .MuiListItemAvatar-root": {
						"&:after": {
							content: `""`,
							height: '16px',
							position: 'absolute',
							border: '2px solid rgba(224, 224, 224, 1)',
							top: '110%',
							left: '48%',
							borderRadius: '50px'
						},
					},
				},
				"&:not(:first-of-type)": {
					"& .MuiListItemAvatar-root": {
						"&:before": {
							content: `""`,
							height: '16px',
							position: 'absolute',
							border: '2px solid rgba(224, 224, 224, 1)',
							transform: 'translate(-50%, -50%)',
							top: '-12px',
							left: '52%',
							borderRadius: '50px'
						}
					},
				},
				"& .location-info": {
					width: '100%',
					display: "grid",
					gridTemplateRows: "repeat(3, 1fr)",
					"& .secondary": {
						fontSize: 12,
						color: "#9e9e9e"
					},
					"& .MuiSvgIcon-root": {
						transform: "scale(0.6)", 
						marginLeft: "-6.4px", 
						color: '#02759F'
					}
				},
				"& .locate": {
					justifySelf: "end"
				}
			},
		}
	},
	[theme.breakpoints.down("md")]: {
		"& .timeline": {
			width: '95%',
			"& .content": {
				"& .track-list-item": {
					gridTemplateColumns: "minmax(auto, 5%) minmax(auto, 85%) minmax(auto, auto) minmax(auto, 10%)",
					"& .location-info": {
						gridTemplateRows: "auto",
						gridTemplateColumns: 'repeat(3, 1fr)',
						"& .MuiStack-root": {
							gap: "4px"
						}
					},
					"& .locate": {
						justifySelf: "center"
					}
				}
			}
		},
	},
	[theme.breakpoints.down(500)]: {
		"& .timeline": {
			width: '95%',
			"& .content": {
				"& .track-list-item": {
					gridTemplateColumns: "minmax(auto, 5%) minmax(auto, 80%) minmax(auto, auto) minmax(auto, 15%)",
					"& .location-info": {
						gridTemplateRows: "repeat(3, 1fr)",
						gridTemplateColumns: 'auto',
						"& .MuiStack-root": {
							gap: "4px"
						}
					},
					"& .locate": {
						justifySelf: "end"
					}
				}
			}
		},
	}
}));

export const SkeletonListItem = MUI.styled(MUI.ListItem)<MUI.ListItemProps>(({theme}) => ({
	background: '#FFF',
	margin: '12px 0px',
	padding: '8px 0px',
	"& .info-stack": {
		flexGrow: 0,
		flexShrink: 0,
		flexBasis: "180px",
		position: 'relative',
		"& .MuiSkeleton-root": {
			width: '150px'
		},
		"div": {
			"& .MuiSvgIcon-root": {
				transform: "scale(0.6)", 
				marginLeft: "-6.4px", 
				color: '#02759F'
			}
		}
	},
	"& .locate": {
		margin: '0 auto',
	},
	"& .MuiListItemAvatar-root": {
		position: 'relative',
		"& .MuiSkeleton-root": {
			marginLeft: '15px'
		}
	},
	"&:not(:last-of-type)": {
		"& .MuiListItemAvatar-root": {
			"&:after": {
				content: `""`,
				height: '16px',
				position: 'absolute',
				border: '2px solid rgba(224, 224, 224, 1)',
				top: '110%',
				left: '48%',
				borderRadius: '50px'
			},
		},
	},
	"&:not(:first-of-type)": {
		"& .MuiListItemAvatar-root": {
			"&:before": {
				content: `""`,
				height: '16px',
				position: 'absolute',
				border: '2px solid rgba(224, 224, 224, 1)',
				transform: 'translate(-50%, -50%)',
				top: '-12px',
				left: '52%',
				borderRadius: '50px'
			}
		},
	}
}));