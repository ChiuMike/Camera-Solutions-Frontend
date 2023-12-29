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
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
	border: `2px solid ${theme.palette.background.search}`,
	backgroundColor: theme.palette.background.search,
}));
  
export const SearchIconWrapper = MUI.styled(MUI.Box)(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
export const StyledInputBase = MUI.styled(MUI.InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(.7, 1, .7, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
		'&::placeholder': {
			textOverflow: 'ellipsis',
			color: theme.palette.mode === "light" ?'#121212' : "#c0c7cd",
			fontWeight: 'bold'
		},
    },
}));

export const DateInputWrapper = MUI.styled(MUI.Box)<MUI.TextFieldProps>(({theme}) => ({
	width: '100%',
	"& .datePicker": {
		width: '100%',
		"input": {
			width: '100%',
			borderRadius: '8px',
			border: "1px solid #02759F",
			padding: "10px"
		},
	},
}));