import * as MUI from "@mui/material";

export const ControlFormContainer = MUI.styled(MUI.Container)(({ theme }) => ({
    height: "100%",
    display: "grid",
    gridTemplateRows: "minmax(auto, 15%) minmax(auto, 85%)",
    rowGap: "16px",
    gridTemplateColumns: "auto",
    "& .header": {
        "& .form-title": {
            color: "#02759F",
            fontWeight: 900
        },
    },
    "& .content-container": {
        overflowY: "scroll",
        height: "240px",
        paddingBottom: "8px",
        "& .content": {
            display: "grid",
            gridTemplateRows: "minmax(auto, 50%) minmax(auto, 50%)",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            height: "100%",
        },
    },
    [theme.breakpoints.down("md")]: {
        "& .content-container": {
            height: "300px",
            "& .content": {
                gridTemplateRows: "repeat(3, 1fr)",
                gridTemplateColumns: "repeat(2, 1fr)",
            },
        },
    },
    [theme.breakpoints.down("sm")]: {
        "& .content-container": {
            // height: "240px",
            "& .content": {
                gridTemplateRows: "repeat(6, 1fr)",
                gridTemplateColumns: "auto",
            },
        },
    }
}));

export const TaskContainer = MUI.styled(MUI.Box, { shouldForwardProp: (prop) => prop !== 'on'})<{ on: boolean;}>(({ theme, on }) => ({
    background: on ? '#03AEEC' : "#f6f8fc",
    transition: "background-color .2s linear",
    padding: '8px', 
    borderRadius: '5px',
    "& .control-box-title": {
        display: 'flex',
        justifyContent: 'space-between',
        "& .MuiBox-root": {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            "& .MuiTypography-root": {
                color: on ? '#fff' :'#212121',
                fontWeight: on ? 900 : 400,
                fontSize: '16px'
            },
            "& .MuiSvgIcon-root": {
                color: on ? '#fff' :'#212121',
            }
        },
    },
    "& .control-status": {
        padding: '16px 8px',
        "& .active" :{
            color: on ? '#fff' :'#424242',
        },
        "& .off" :{
            color: "#e0e0e0",
        },
        "& .MuiTypography-root": {
            fontWeight: 'bold',
            fontSize: '18px'
        }
    }
}));

export const CustomSwitch = MUI.styled((props: MUI.SwitchProps) => (
    <MUI.Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
            backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
            opacity: 1,
            border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));