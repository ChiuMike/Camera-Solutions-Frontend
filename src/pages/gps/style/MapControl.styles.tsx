import * as MUI from "@mui/material";

export const MapButton =  MUI.styled(MUI.IconButton, {shouldForwardProp: (prop) => prop !== 'open'})<{open: boolean}>(({ theme, open }) => ({
        border: '3px solid rgb(255, 255, 255)',
        backgroundColor: `#02759F`,
        height: '44px',
        width: '44px',
        "& .MuiSvgIcon-root": {
            color:"rgb(255, 255, 255)", 
            fontSize: '30px',
        },
        [theme.breakpoints.down(770)]: {
            height: '32px',
            width: '32px',
            border: '2px solid rgb(255, 255, 255)',
            "& .MuiSvgIcon-root": {
                color:"rgb(255, 255, 255)", 
                fontSize: '20px',
            },
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
}));

export const MapStateChip = MUI.styled(MUI.Chip)<MUI.ChipProps>(({theme}) => ({
    backgroundColor: "#4fd4ca",
    color: "#fff",
    fontWeight: 900,
    borderRadius: '5px',
    height: '35px',
    fontSize: '14px',
    boxShadow: 'rgba(0, 0, 0, 0.15) 2px 2.5px 5px',
    "& .MuiSvgIcon-root": {
        color: "#fff",
    }
}));

