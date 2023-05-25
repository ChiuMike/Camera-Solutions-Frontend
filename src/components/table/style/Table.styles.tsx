import * as MUI from "@mui/material";
import { makeStyles } from '@mui/styles';

export const TableMainBox = MUI.styled(MUI.Box, { shouldForwardProp: (prop) => prop !== 'loading' })<{ loading: boolean}>(({ theme, loading }) => ({
    "& .MuiPaper-root": {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        overflowX: 'hidden', 
        flex: 1, 
        borderRadius: 15,
        boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px',
        border: 'none',
        [theme.breakpoints.down("sm")]: {
            borderRadius: 10,
            boxShadow: 'none'
        }
    },
    "& .header-toolbar" :{
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: loading ? '0px' : '10px 0px 5px 0px',
        "& .btn-stack": {
            marginLeft: '16px',
            alignItems: 'center',
        },
        [theme.breakpoints.down("extraSmallMobile")]: {
            flexDirection: 'column',
            alignItems: 'start',
            "& .btn-stack": {
                marginLeft: '24px',
            },
        }
    },
    "& .MuiToolbar-root" : {
        "& .MuiFormControl-root" : {
            position: 'relative',
            backgroundColor:'#f7f8fc',
            padding: '5px 0px',
            borderRadius: '10px',
            '&:hover': {
                "& .MuiSvgIcon-root": {
                    color: "#00bcd4",
                    transform: 'scale(1.1)'
                }
            },
            "& .MuiInput-root" :{
                "& .MuiInputAdornment-root:first-of-type": {
                    marginLeft: '15px',
                },
            },
            "& .MuiInput-root:before" :{
                borderBottom: 'none',
            },
            "& .MuiInput-root:after": {
                borderBottom: 'none',
            },
            "& .MuiSvgIcon-root": {
                color: "#02759F",
                transform: 'scale(1.1)'
            }
        },
        [theme.breakpoints.down("extraSmallMobile")]: {
            padding: '0px'
        }   
    },
    "& .MuiTableHead-root": {
        width: '500px',
        position: 'sticky',
        top: 0,
        zIndex: 2,
        "& .MuiTableCell-root": {
            backgroundColor: '#e6f1f5',
            color: theme.palette.text.main,
            lineHeight: '2rem',
            fontWeight: 900,
            fontSize: '16px',
            height: loading ? '0px' : '60px',
        },
    },
    "& .MuiTableBody-root" : {
        "& .MuiTableRow-root div": {
            justifyContent: 'center'
        }
    },
    "& .MuiTableRow-root": {
        fontSize: '14px',
        backgroundColor: theme.palette.background.paper,
        borderBottom: theme.palette.mode === 'light' ? `5px solid ${theme.palette.background.default}` : '0.1px solid #FFF',
        "&:hover" : {
            backgroundColor: "#e6f1f5 !important",
        },
        '&:last-of-type': {
            borderBottom: 'none'
        },
        "@media (max-width: 576px)": {
            fontSize: '12px',
        },
    },
}));