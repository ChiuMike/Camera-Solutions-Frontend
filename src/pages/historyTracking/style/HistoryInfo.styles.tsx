import * as MUI from "@mui/material";

export const HistoryInfoCard = MUI.styled(MUI.Card)<MUI.CardProps>(({theme}) => ({
    height: 'auto',
    maxWidth: '300px',
    minWidth: '220px', 
    marginRight: '12px', 
    borderRadius: '0.5rem', 
    boxShadow: '0 1px 20px 0 rgb(90 90 100 / 50%)',
    "& .MuiCardHeader-root": {
        boxShadow: '0px 15px 15px -14px rgb(90 90 100 / 50%)',
        borderBottomRightRadius: '25px',
        borderBottomLeftRadius: '25px',
        "& .MuiCardHeader-title": {
            fontWeight: 800,
        }
    },
    "& .MuiCardContent-root": {
        padding: 0,
        maxHeight: '400px',
        overflow: 'auto',
        "& .MuiTimeline-root": {
            marginTop: '0px',
            "& .MuiTimelineItem-root": {
                display: 'flex',
                "& .MuiTimelineDot-root": {
                    backgroundColor: '#0c2358',
                    border: '1px solid #FFF',
                    width: '20px',
                    height: '20px',
                    position: 'relative',
                    "& .MuiTypography-root": {
                        color: "#FFF",
                        fontSize: '12px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: "translate(-50%, -50%)",
                    },
                },
                "& .MuiTimelineContent-root": {
                   
                }
            }
        }
    }
}));