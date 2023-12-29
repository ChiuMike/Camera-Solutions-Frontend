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

