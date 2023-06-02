import * as MUI from "@mui/material";

export const Container = MUI.styled(MUI.Box, {
    shouldForwardProp: (prop) => prop !== 'isMap' && prop !=='open' && prop !== 'matches'})
    <{isMap: boolean, open?: boolean, matches?:boolean}>
    (({ theme, isMap, open, matches}) => ({   
        position: 'relative',
        height: `calc(100vh - 64px)`,
        marginTop: 64,
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
}));

//DirectionsWalk
export const MarkerIcon =  MUI.styled('span', {shouldForwardProp: (prop) => prop !== 'color'})<{color: string}>
    (({ theme, color }) => ({
        backgroundColor: color,
        width: '40px',
        height: '40px',
        display: 'block',
        position: 'relative',
        borderRadius: '5px',
        textAlign: "center",
        "& .MuiSvgIcon-root": {
            color: "#FFF",
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: "translate(-50%, -50%)",
        },
        "& .triangle-people2": {
            position: 'absolute',
            height: "0px",
            width: "0px",
            borderLeft: '0.5em solid transparent',
            borderRight: '0.5em solid transparent',
            borderTop: `1em solid ${color}`,
            left: '50%',
            top: '100%',
            transform: "translate(-50%, 0%)",
            ziIndex: 999,
        },
}));

export const StyledIcon = MUI.styled('span', {
    shouldForwardProp: (prop) => prop !== 'color'})
    <{color: string; height?: number; width?: number, top?: string}>
    (({ theme, color, height, width, top }) => ({
        backgroundColor: `${color} !important`,
        width: '25px',
        height: '25px',
        display: 'block',
        // left: '1.5rem',
        top: top,
        position: 'relative',
        borderRadius: '3rem 3rem 0',
        transform: 'rotate(45deg)',
        border: color=== 'transparent' ? '1px solid transparent' : '1px solid #FFFFFF',
        
}));

export const HistoryIcon =  MUI.styled('span')<any>(({ theme }) => ({
        backgroundColor: '#0c2358',
        width: '25px',
        height: '25px',
        display: 'block',
        position: 'relative',
        borderRadius: '50px',
        textAlign: "center",
        border:'1px solid #FFF',
        "& .MuiTypography-root": {
            color: "#FFF",
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: "translate(-50%, -50%)",
            fontSize: '20px',
        },
}));