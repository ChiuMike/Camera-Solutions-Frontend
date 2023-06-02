import * as MUI from "@mui/material";

export const TextField = MUI.styled(MUI.TextField)<MUI.TextFieldProps>(({theme}) => ({
    '&. MuiOutlinedInput-input:-webkit-autofil': {
        boxShadow: theme.palette.mode === 'light' ? '0 0 0 100px #266798 inset': '0 0 0 100px #424242 inset',  
    },
}));

export const AccountInput = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
    marginLeft: '16px',
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    height: 300,
    [theme.breakpoints.down("md")]: {
        height: 100,
        marginLeft: '0px',
        marginTop: '5px'
    }
}));

export const RoundedTextField = MUI.styled(MUI.TextField)<MUI.TextFieldProps>(({theme}) => ({
    height: '60px',
    marginBottom: '0px',
    '& .MuiOutlinedInput-root':{ 
        borderRadius: '60px',
        height: '40px',
        '&:hover': {
            borderColor: '#02759F'
        }
    },
    '& .MuiInputBase-input': {
        fontSize: '14px',
    },
    'label + &': {
        marginTop: '3px',
    },
    '& .MuiFormHelperText-root': {
        marginTop: '5px',
        lineHeight: '1',
    },
    [theme.breakpoints.down("smallMobile")]: {
        '& .MuiFormHelperText-root': {
            fontSize: '0.5px',
            width: "100%",
        },
    },
    [theme.breakpoints.down("extraSmallMobile")]: {
        height: '65px',
    }
}));

export const Search = MUI.styled(MUI.Box)(({ theme }) => ({
    width: '80%',
    padding: '0px',
    fontSize: '10px',
    paddingRight: 0
}));

export const StyledInputBase = MUI.styled(MUI.InputBase)(({ theme }) => ({
    borderRight: 'none',
    padding: '5px 15px',
    height: '35px',
    borderRadius: '25px 0 0 25px',
    width: '100%',
    border: `2px solid ${theme.palette.background.primary}`,
}));

export const SearchButton = MUI.styled(MUI.IconButton)<MUI.IconButtonProps>(({theme}) => ({
    width: '40px',
    height: '35px',
    border: `2px solid ${theme.palette.background.primary}`,
    background: theme.palette.background.primary,
    textAlign: 'center',
    color: '#fff',
    borderRadius: '0 25px 25px 0',
    cursor:'pointer',
    fontSize: '20px',
    ':hover': {
        background: theme.palette.action.hover,
    }
}));