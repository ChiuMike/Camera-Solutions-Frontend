import * as MUI from "@mui/material";

export const MapButton =  MUI.styled(MUI.IconButton, {shouldForwardProp: (prop) => prop !== 'open' && prop !== 'btnColor' && prop !== 'sos'})
    <{open: boolean, btnColor: string, sos?: boolean}>
    (({ theme, open, btnColor, sos }) => ({
        border: '3px solid rgb(255, 255, 255)',
        backgroundColor: `${btnColor}`,
        height: '44px',
        width: '44px',
        margin: '0 5px',
        ...(!open && {
            '&:hover': {
                backgroundColor: `${btnColor}`,
                transition: 'all 0.3s linear',
                transform: 'scale(1.2)',
            },
        }),
        scale: open ? '1.2' : 1,
        "& .MuiSvgIcon-root": {
            color:"rgb(255, 255, 255)", 
            fontSize: '30px',
            animation: sos ? 'bell-ring 2s infinite': '',
        },
        animation: sos ? 'sos 1s alternate infinite ease-in-out': "",
        "@keyframes sos" : {
            '0%': {
                transform: "scale(1)"
            },
            '100%': {
                transform: "scale(1.2)"
            }
          
        },
        "@keyframes bell-ring" :{
            "0%": {
                transform: "",
            },
            "5%, 15%" :{
                transform: "rotate(25deg)",
            },
            "10%, 20%": {
                transform: "rotate(-25deg)"
            },
            "25%": {
                transform: "rotate(0deg)"
            },
            "100%": {
                transform: "rotate(0deg)"
            }
        }
}));

export const SearchCard = MUI.styled(MUI.Card)<MUI.CardProps>(({theme}) => ({
    height: 'auto',
    maxHeight: '70%',
    marginTop: '64px', 
    width: '320px', 
    marginRight: '12px', 
    borderRadius: '0.5rem', 
    boxShadow: '0 1px 20px 0 rgb(90 90 100 / 50%)',
    padding: '20px 10px',
    "& .MuiAvatar-root": {
        backgroundColor: theme.palette.background.avatar_2,
    },
    "& .sos": {
        animation: 'sos 1.5s alternate infinite ease-in',
    },
    "@keyframes sos" :{
        '0%': {
            transform: "scale(1)"
        },
        "100%": {
            transform: "scale(1.3)"
        }
    }
}));

export const UpdateDrawer = MUI.styled(MUI.Drawer)<MUI.DrawerProps>(({theme}) => ({
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
}))

export const DrawerContent = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
    width: '300px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    "& .MuiFormLabel-root": {
        color: theme.palette.primary.main, 
        fontWeight: 'bold'
    }
}))

export const DrawerFooter = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    padding: '20px 10px',
}))

