import * as MUI from "@mui/material";

export const FormPaperUser = MUI.styled(MUI.Box, {
    shouldForwardProp: (prop) => prop !== 'myProp'})
      <{myProp?: boolean}>
      (({ theme, myProp }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: '400px',
}));

export const FormPaper = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxHeight: '300px',
}));
    
export const Form = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
    width: "110%", // Fix IE 11 issue.
    marginTop: '10px',
    marginBottom: theme.spacing(2),
    position:'relative'
}));
    
export const StyledForm = MUI.styled(MUI.Box, {
    shouldForwardProp: (prop) => prop !== 'width' && prop !== 'marginTop'})
    <{ width?: string; marginTop?: string}>
    (({ theme, width, marginTop}) => ({
        width: width ? width : '100%',
        marginTop: marginTop ? marginTop : '10px',
        marginBottom: theme.spacing(2),
        position: 'relative',
}));

export const ShowPasswordFormGroup = MUI.styled(MUI.FormGroup)<MUI.FormGroupProps>(({theme}) => ({
    padding: '0px',
    margin: '0px',
}));

export const FormWithListContainer = MUI.styled(MUI.Container)<MUI.ContainerProps>(({theme}) => ({
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center",
    'form' : {
        display: 'flex', 
        alignItems: 'center',
    },
    [theme.breakpoints.down("md")]: {
        'form' : {
            alignItems: 'stretch',
            flexDirection: 'column',
        },
    }
}));

    


    