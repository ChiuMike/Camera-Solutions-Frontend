import * as MUI from "@mui/material";

export const ChannelDeviceFormContainer = MUI.styled(MUI.Container)<MUI.ContainerProps>(({theme}) => ({
    maxWidth: '500px',
    height: '100%',
    padding: "12px 0px",
    'form': {
        display: "grid",
        gridTemplateRows: "minmax(auto, 10%) minmax(auto, 10%) minmax(auto, 300px) minmax(auto, 10%)",
        gridTemplateColumns: "auto",
        rowGap: "16px",
        "& .search-box": {
            padding: "0px 8px",
        },
        "& .dialog-title": {
            "& .form-title": {
                color: theme.palette.text.main,
                fontSize: '20px',
                fontWeight: 900,
                textAlign: 'center',
            },
        },
        "& .list-select": {
            height: '100%',
            width: '100%',
            overflowY: 'auto',
            padding: "0px 8px",
            "& .content": {
                width: '100%',
            }
        },
        "& .apply-box": {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            "& .MuiButton-root": {
                alignSelf: "start"
            }
        }
    },
}));

export const DeviceListItem = MUI.styled(MUI.Card, { shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'isSalute'})<{ selected: boolean; isSalute: boolean;}>(({ theme, selected, isSalute }) => ({
	borderRadius: '0px',
	border: "none",
	marginLeft: '5px',
	borderBottom: theme.palette.mode === "light" ? ".5px solid rgba(224, 224, 224, .5)": "1px soild #8b9297",
	borderTop: theme.palette.mode === "light" ? ".5px solid rgba(224, 224, 224, .5)": "1px soild #8b9297",
	backgroundColor: isSalute ? "#F5f5f5" : "#FFF",
    cursor: "pointer",
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
				right: 30,
				top: 15,
			},
			"& .MuiCardHeader-title": {
				fontWeight: 900,
				fontSize: "14px",
				color: selected ? "#FFF" : "#121212",
			},
		},
	},
}));