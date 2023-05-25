import * as MUI from "@mui/material";
import * as React from "react";
import useClick from "../../hooks/useClick";

interface ErrorBarBaseProps {
    error: number | Error | null;
    setError: React.Dispatch<React.SetStateAction<number | Error | null>>;
    lockedMessage?: string
}

enum statusCode {
    INPUT_ERROR = 422,
    CLIENT_ERROR = 400,
    NO_AUTH = 401,
    FORBIDDEN = 403,
    SERVER_ERROR = 500,
    CONFLICT = 409,
    LOCKED = 423,
    TOO_MANY_DATA = 429
}

const errorText = (errorStatus: number| Error | null, lockedMessage?: string) => {

    switch(errorStatus) {
        case statusCode.CLIENT_ERROR:
            return "Please Check your input";
        case statusCode.FORBIDDEN:
            return "Only admin user have this permission";
        case statusCode.NO_AUTH:
            return "Your token has expired, login again"
        case statusCode.SERVER_ERROR:
            return "500"
        case statusCode.CONFLICT: 
            return "Duplicated data"
        case statusCode.TOO_MANY_DATA:
            return "Storage limit reached, delete unused data"
        case statusCode.LOCKED: 
            return lockedMessage
        default: 
            return ""
    }
}

export function SlideTransition(props: MUI.SlideProps) {
    return <MUI.Slide {...props} direction="left" />;
};

const ErrorBar: React.FC<ErrorBarBaseProps> = React.memo(({error, setError, lockedMessage}) => {

    const [handleSnackBar, isOpenSnackbar, setOpenSnackbar] = useClick();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        handleSnackBar();
        setError(null)
    }
    
    React.useEffect(()=> {
        if(error !== null) {
            setOpenSnackbar(true);
        }
    } ,[error]);

    return (
       <MUI.Snackbar
            open={isOpenSnackbar}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
            autoHideDuration={4000}
            anchorOrigin={
                {
                    vertical: "top",
                    horizontal: "right"
                }
            }
        >
            <MUI.Alert onClose={handleClose} severity={"error"} sx={{ width: '100%', visibility: error === null ? "hidden": "visible"  }}>
                {errorText(error, lockedMessage)}
            </MUI.Alert>     
        </MUI.Snackbar>
    )
})

export default ErrorBar;
