import * as MUI from "@mui/material";

export const SideBarRoot = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
	width: '100%',
    position: 'relative',
	height: 'calc(100vh - 64px)',
    gridTemplateRows: "minmax(auto, 120px) minmax(auto, auto)",
    backgroundColor: "#FFF",
    "& .header": {
        width: '100%',
		height: '100%',
        display: "grid",
        gridTemplateColumns: ".2fr 4fr 1fr",
        gridTemplateRows: "auto",
        "& .search-input": {
            width: '98%',
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
    "& .device-list": {
        height: '100%',
    	width: '100%',
        padding: '0px 8px',
        overflowY: 'scroll',
        "& .content": {
			width: '100%',
			'&:first-of-type': {
                marginTop: '0px',
				borderTop: "none",
            },
			'&:last-of-type': {
				borderBottom: theme.palette.mode === "light" ? ".5px solid rgba(224, 224, 224, 1)": "1px soild #8b9297",
            },
		},
    },
}));

export const HistoryDeviceCard = MUI.styled(MUI.Card, { shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'isSalute'})<{ selected: boolean; isSalute: boolean;}>(({ theme, selected, isSalute }) => ({
	borderRadius: '0px',
	border: "none",
	marginLeft: '5px',
	borderBottom: theme.palette.mode === "light" ? ".5px solid rgba(224, 224, 224, .5)": "1px soild #8b9297",
	borderTop: theme.palette.mode === "light" ? ".5px solid rgba(224, 224, 224, .5)": "1px soild #8b9297",
	backgroundColor: isSalute ? "#F5f5f5" : "#FFF",
	"& .card-action": {
		"& .MuiCardHeader-root": {
			padding: "8px 8px",
			position: "relative",
			"& .MuiCardHeader-avatar" :{
				marginRight: "12px",
				"& .MuiAvatar-root": {
					width: "45px", 
					height: "45px",
					borderRadius: "5px",
					backgroundColor: isSalute ? "#F5f5f5" : "#FFF",
					"img": {
						width: "80%",
						height: "80%",
					}
				},
			},
			"& .MuiCardHeader-action": {
				position: 'absolute',
				right: 16,
				top: 15,
			},
			"& .MuiCardHeader-title": {
				fontWeight: 900,
				fontSize: "14px",
				color: selected ? "#FFF" : "#121212",
			},
			"& .MuiCardHeader-subheader": {
				color: selected ? "#FFF" : '#9e9e9e',
				fontWeight: 900,
				fontSize: '12px',
			}
		},
	},
}));