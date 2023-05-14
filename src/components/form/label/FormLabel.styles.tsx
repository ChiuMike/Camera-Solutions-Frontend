import * as MUI from "@mui/material";

export const FormInputLabel = MUI.styled(MUI.InputLabel)<MUI.InputLabelProps>(({theme}) => ({
    fontSize:"16px", 
    left: "0px",
    color: theme.palette.text.formInputLabel,
    fontWeight: 400,
    alignSelf: 'start',
}))