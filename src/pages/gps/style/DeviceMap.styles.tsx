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