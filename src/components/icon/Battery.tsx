import * as MUI from "@mui/material";

export const Battery = MUI.styled(MUI.Box, { shouldForwardProp: (prop) => prop !== 'level' })<{ level: number|null;}>(({ theme, level }) => ({
	border: "3px solid #333",
    width: '28px',
    height: '18px',
    padding: "2px",
    borderRadius: "4px",
    position: "relative",
    margin: "0px 0px",
    "&:before": {
        content: `""`,
        height: "8px",
        width: "5px",
        background: "#333",
        display: "block",
        position: "absolute",
        right: -6,
        borderRadius: "0px 4px 4px 0px",
    },
    "&:after": {
        content: `""`,
        display: "block",
        position: "absolute",
        top: "-1px",
        left: "-1px",
        right: "-1px",
        bottom: "-1px",
        border: "1px solid #fff",
        borderRadius:" 2px"
    },
    "& .battery-level": {
        width: `${level}%`,
        height: '100%',
        background: "#30b455",  
        position: "absolute",
        bottom: 0,
        left: 0,
        top: 0,
    }
}));