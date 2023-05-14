import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import * as MUI from "@mui/material";

export const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.background.navigation;
    return {
      fontSize: '16px',
      backgroundColor,
      color: theme.palette.text.navigation,
      fontWeight: 'bold',
      '&:hover, &:focus': {
        backgroundColor: '#00B4CC',
        fontWeight: 'bold',
        color: '#FFF'
      },
      '&:active': {
        boxShadow: theme.shadows[2],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
      [theme.breakpoints.up("xs")]: {
        fontSize: '12px',
      },
    };
}) as typeof Chip;

export const StyledLink = styled(MUI.Box)(({ theme }) => {
   return {
       fontSize: '16px',
       fontWeight: 900,
       '&:hover, &:focus': {
            color: '#0da5ab',
            cursor: 'pointer'
        },
   }
}) as typeof MUI.Box;

export const ActiveLink = styled(MUI.Typography)<MUI.TypographyProps>(({theme}) =>({
    fontSize: '16px',
    fontWeight: 900,
    color: '#0da5ab'
}));

export const Breadcrumbs = styled(MUI.Breadcrumbs)<MUI.BreadcrumbsProps>(({theme}) =>({
    marginBottom: '32px',
}));

export const BreadcrumbsContainer = styled(MUI.Box)<MUI.BoxProps>(({theme}) =>({
    marginTop: '32px',
    [theme.breakpoints.down('sm')]: {
        marginBottom: '0px',
    },
}));

export const BreadCrumbsMenu = MUI.styled((props: MUI.MenuProps) => (
    <MUI.Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
  ))
  (({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: MUI.alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export const StyledBreadCrumbs = styled(MUI.Box)<MUI.BoxProps>(({theme}) =>({
    display: 'inline-block',
	overflow: 'hidden',
    marginBottom: '32px',
    // counterReset: 'flag',
    'a': {
        textDecoration: 'none',
        outline: ' none',
        display: 'block',
        float: 'left',
        fontSize: '12px',
        lineHeight: '36px',
        color: '#FFF',
        fontWeight: 900,
        padding:' 0 10px 0 30px',
        backgroundColor: '#02759F',
        transition: 'all 0.5s',
        //background: 'linear-gradient(#666, #333)',
        position: 'relative',
    },
    'a: first-of-type': {
        paddingLeft: '20px',
	    borderRadius: '3px 0 0 3px',
    },
    'a: last-of-type': {
        backgroundColor: '#0da5ab',
    },
    '&: first-of-type:before': {
        left: '14px'
    },
    '&: last-of-type': {
        paddingRight: '20px',
	    borderRadius: '0px 5px 5px 0px',
    },
    'a:after': {
        content: `""`,
        position: 'absolute',
        top: 0, 
        right: '-18px',
        width: '36px', 
        height: '36px',
        transform: 'scale(0.707) rotate(45deg)',
        zIndex: 1,
        // boxShadow: '6px -6px 0 6px #eff5f7, 7px -7px 0 6px #eff5f7',
        boxShadow: '2px -2px 0 2px #eff5f7, 3px -3px 0 2px #eff5f7',
        borderRadius: '0 5px 0 50px',

        backgroundColor: '#02759F',
        transition: 'all 0.5s',
        // color: theme.palette.background.primary,
    },
    'a: last-of-type: after': {
        content: `""`,
        backgroundColor: '#0da5ab',
    },
}));