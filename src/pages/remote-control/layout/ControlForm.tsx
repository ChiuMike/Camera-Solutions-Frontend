import * as MUI from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { FC, useEffect } from "react";
import { IDeviceDto } from "../../../apis/device";
import { ControlFormContainer, CustomSwitch, TaskContainer } from "../style/ControlForm.styles";
import * as MuiIcons from "@mui/icons-material/";
import { useClientFiltersState } from "../context/ClientStateProvider";

interface ControlFormBaseProps {
    data: IDeviceDto;
    listIotDevices: ((options?: AxiosRequestConfig | undefined) => Promise<void>) | undefined;
}

const ControlForm: FC<ControlFormBaseProps> = ({data, listIotDevices}) => {

    const { fields, handleFieldsChange, handleSetFields } = useClientFiltersState();

    useEffect(() => {
        handleSetFields(data.status)
    }, [])

    return (
        <ControlFormContainer>
            <MUI.Box className="header">
                <MUI.Typography component={"span"} variant={"h5"} className="form-title">
                    Remote Device Control
                </MUI.Typography>
            </MUI.Box>
            <MUI.Box className="content-container">
                <MUI.Box className="content">
                    {
                        ["READY", "LIVE_RECORD", "VIDEO_RECORD", "SOS", "ARCHIVING"].map((item, index) =>
                            <TaskContainer on={fields.selectedTask === item} key={index}>
                                <MUI.Box className="control-box-title"> 
                                    <MUI.Box>
                                        <MuiIcons.SettingsRemote />
                                        <MUI.Typography>{item.replace("_", " ")}</MUI.Typography>
                                    </MUI.Box>
                                    <MUI.Box>
                                        <CustomSwitch
                                            value={item}
                                            name={item.toLocaleLowerCase()}
                                            checked={fields.selectedTask === item} 
                                            onChange={handleFieldsChange}
                                        />
                                    </MUI.Box>
                                </MUI.Box>
                                <MUI.Divider />
                                <MUI.Box className="control-status">
                                    {fields.selectedTask === item ?
                                        <MUI.Typography className="active">
                                            Active
                                        </MUI.Typography>
                                        :
                                        <MUI.Typography className="off">
                                            Off
                                        </MUI.Typography>
                                    }
                                </MUI.Box>
                            </TaskContainer>
                        )
                    }
                </MUI.Box>
            </MUI.Box>
        </ControlFormContainer>
    )
};

export default ControlForm;