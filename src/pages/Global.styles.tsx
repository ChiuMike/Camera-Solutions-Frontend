import * as MUI from "@mui/material";

export const PageMainBox = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
    flexGrow: 1, 
    padding: '16px 32px',
    [theme.breakpoints.down("sm")]: {
        padding: '16px 12px',
    }
}));
  