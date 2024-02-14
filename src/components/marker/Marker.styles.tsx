import * as MUI from "@mui/material";

export const ABMarkerIcon =   MUI.styled('span', {shouldForwardProp: (prop) => prop !== 'color'})<{color: string}>(({ theme, color }) => ({
    backgroundColor: color,
    opacity: ".55",
    width: '25px',
    height: '25px',
    display: 'block',
    position: 'relative',
    borderRadius: '50px',
    textAlign: "center",
    border:'1px solid #FFF',
    "& .MuiSvgIcon-root, .MuiTypography-root": {
        color: "#FFF",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: "translate(-50%, -50%)",
        fontSize: '12px',
    },
}));

export const HistoryIcon =  MUI.styled('span')<any>(({ theme }) => ({
    backgroundColor: '#4b6700',
    opacity: "1",
    width: '8px',
    height: '8px',
    display: 'block',
    position: 'relative',
    borderRadius: '50px',
    textAlign: "center",
    border:'1px solid #FFF',
}));

export const DynamicIcon =  MUI.styled('span', {
    shouldForwardProp: (prop) => prop !== 'color'})
    <{color: string; zIndex?: number, top?: string}>
    (({ theme, color, zIndex, top }) => ({
        backgroundColor: `${color} !important`,
        width: '25px',
        height: '25px',
        display: 'block',
        position: 'relative',
        borderRadius: '3rem 3rem 0',
        transform: 'rotate(45deg)',
        border: '1px solid #FFFFFF',
        zIndex: zIndex,
        "& .MuiSvgIcon-root": {
            transform: 'rotate(-45deg)',
        }
}));

export const PatrolMarkerIcon = MUI.styled(MUI.Box, {shouldForwardProp: (prop) => prop !== 'color'})<{color: string}>(({ theme, color }) => ({
    backgroundColor: color,
    width: '32px',
    height: '32px',
    background: "#0077C0",
    position: 'relative',
    borderRadius: '50%',
    display: 'block',
    textAlign: "center",
    "&:before": {
        content: `""`,
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "#0077C0",
        borderRadius: "50%",
        zIndex: -1,
        opacity: 0.7,
        animation: "pulse 2s ease-out infinite",
        top: '0%',
        left: '0%',
    },
    "&:after": {
        content: `""`,
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "#0077C0",
        borderRadius: "50%",
        zIndex: -1,
        opacity: 0.7,
        animation: "pulse 2s 1s ease-out infinite",
        top: '0%',
        left: '0%',
    },

    '@keyframes pulse': {
        '100%': {
            transform: "scale(2.5)",
            opacity: 0,
        }
    },

    "& .MuiSvgIcon-root, .MuiTypography-root": {
        color: "#FFF",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: "translate(-50%, -50%)",
        fontSize: '16px',
    },
}));

