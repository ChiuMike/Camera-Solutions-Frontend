import * as MUI from "@mui/material";

export const MobileMenu = MUI.styled(MUI.Menu)<MUI.MenuProps>(({theme}) =>({ 
    '& .MuiMenu-paper': {
      backgroundColor: theme.palette.background.appBar,
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
}));

export const MenuStack = MUI.styled(MUI.Stack)<MUI.StackProps>(({theme}) =>({ 
  [theme.breakpoints.down('md')]: {
    display: 'none',
  }
}));
