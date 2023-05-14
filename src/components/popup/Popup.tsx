import { FC, SetStateAction, Dispatch } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import * as MUI from "@mui/material";
import { AxiosRequestConfig } from 'axios';
import { IRowData } from '../table';
import { Close } from './Popup.styles';

export interface IPopup {
    setOpen: Dispatch<SetStateAction<boolean>>
    open: boolean;
    content: React.ElementType;
    tenantUUID?: string;
    success?: boolean;
    userUUID?: string;
    maxWidth?: false | MUI.Breakpoint;
    data?: IRowData;
    requestMethod?: (options?: AxiosRequestConfig | undefined) => Promise<void>;
    fullWidth?: boolean
}

const Popup: FC<IPopup> = (props) => {
  
    const { open, setOpen, content: Content, maxWidth, fullWidth } = props;
  
    const handleClose = () => {
      setOpen(false);
    }
  
    return (
      <MUI.Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={fullWidth===undefined ? true: false}
        maxWidth={maxWidth}
      >
        <MUI.DialogContent>
            <MUI.Box className="close" sx={{ display:'flex', flexDirection:'row-reverse'}} >
              <Close size="small" aria-label="delete" onClick={handleClose}><CloseIcon  sx={{color:'background.formButton'}}/></Close>
            </MUI.Box>
            <Content {...props} />
        </MUI.DialogContent>
      </MUI.Dialog>
    );
  };
  
  export default Popup;