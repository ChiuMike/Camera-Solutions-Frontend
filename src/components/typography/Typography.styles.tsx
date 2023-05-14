import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import * as MUI from "@mui/material";

export const StyledTitle = styled('h1')<MUI.TypographyProps>(({theme}) =>({
    background: "linear-gradient(to right bottom, #02759F, #00bcd4)",
    WebkitBackgroundClip: "text",
    fontWeight: 800,
    WebkitTextFillColor: "transparent",
    [theme.breakpoints.down('sm')]: {
        fontSize: '24px'
    },
    [theme.breakpoints.down('smallMobile')]: {
        fontSize: '18px'
    }
}));

export const FormTypography = MUI.styled(MUI.Typography)<any>(({theme}) => ({
    color: theme.palette.text.popupTitle, 
    alignSelf: 'center',
    fontWeight: 600,
    padding: '0px 0px 10px 0px',
    [theme.breakpoints.down('md')]: {
        padding: '0px 0px 16px 0px',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '18px' 
    },
    [theme.breakpoints.down('smallMobile')]: {
        fontSize: '14px' 
    }
}))