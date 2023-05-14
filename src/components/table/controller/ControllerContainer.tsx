import { AxiosRequestConfig, Method } from "axios";
import * as React from "react";
import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { IRowData } from "../types";
import useClick from "../../../hooks/useClick";
import { DeleteConfirmPopup, Popup } from "../../popup";

interface IControllerContainer<T>{
    dataSelected: IRowData[];
    setDataSelected: React.Dispatch<React.SetStateAction<IRowData[]>>;
	requestMethod: (options?: AxiosRequestConfig | undefined) => Promise<void>;
	requestOnSuccess: (options?: AxiosRequestConfig | undefined) => Promise<void>;
	httpMethodType: Method;
	requestMethodUrlExtractor: (dataSelected: T) => string;
	content: React.ElementType;
	maxWidth?: false | MUI.Breakpoint;
	popupFullWidth?: boolean;
}

const ControllerContainer = <T extends unknown> (props: IControllerContainer<T>) => {

    const { 
        dataSelected, 
        setDataSelected, 
        requestMethod, 
        httpMethodType, 
        requestOnSuccess, 
        requestMethodUrlExtractor, 
        content, 
        maxWidth, 
        popupFullWidth,
    } = props;

    const mobileMatch = MUI.useMediaQuery('(max-width: 576px)')
	const [handleDeleteConfirm, confirmOpen, setConfirmOpen] = useClick();
  	const [handleClickOpen, open, setOpen] = useClick();
	const [handleTablePopupOpen, tablePopupOpen, setTablePopupOpen] = useClick();

    const handleDelete = React.useCallback((dataSelected: T[]) => {

		setConfirmOpen(false);

        dataSelected.forEach((item) => {
            requestMethod({
                url: requestMethodUrlExtractor(item),
                method: httpMethodType
            })
        });

		setDataSelected([]);
        
	}, []);

    return (
        <>
            <DeleteConfirmPopup
                setConfirmOpen={setConfirmOpen} 
                confirmOpen={confirmOpen}
                handleDelete={(dataSelected) => handleDelete(dataSelected as T[])}
                dataSelected={dataSelected}
            />
            <Popup
                setOpen={setOpen}
                open={open}
                content={content}
                requestMethod={requestOnSuccess}
                maxWidth={maxWidth}
                fullWidth={popupFullWidth}
            />
            {!mobileMatch ? 
            <>
                <MUI.Button 
                    variant="contained" 
                    endIcon={<MuiIcons.AddCircle />}
                    onClick={handleClickOpen}
                    sx={{borderRadius: '20px', marginRight: '16px'}}
                >
                    New
                </MUI.Button>
                <MUI.Button 
                    variant="contained" 
                    endIcon={<MuiIcons.DeleteForever/>}
                    onClick={handleDeleteConfirm}
                    disabled={!(dataSelected.length > 0)}
                    sx={{borderRadius: '20px', backgroundColor: '#c24242'}}
                >
                    Delete
                </MUI.Button>
            </>
            :
            <>
                <MUI.IconButton 
                    aria-label="add"
                    onClick={handleClickOpen} 
                    sx={{backgroundColor: '#02759F' ,color: '#FFF', transform: 'scale(1)', marginRight: '12px'}}
                >
                    <MuiIcons.AddCircle />
                </MUI.IconButton>
                <MUI.IconButton 
                    onClick={handleDeleteConfirm}
                    aria-label="delete" 
                    sx={{backgroundColor: '#c24242',color: '#FFF', transform: 'scale(1)'}}
                >
                    <MuiIcons.DeleteForeverRounded />
                </MUI.IconButton> 
            </>
        }  
        </>
    )
};

export default ControllerContainer;