import * as MUI from "@mui/material";
import * as React from "react";
import { RequestMethod } from "../../apis/Api";
import { AddDeviceResponse, ApiUrl } from "../../apis/device";
import { SubmitButton } from "../../components/button";
import { FormPaper, StyledForm, TextField  } from "../../components/form";
import ErrorBar from "../../components/helpers/ErrorBar";
import { IPopup } from "../../components/popup/Popup";
import { useEventChange } from "../../hooks/FormHooks";
import { useAxios } from "../../hooks/useAxios";

const DeviceForm: React.FC<IPopup> = ({ setOpen, requestMethod }) => {

    const [handleInputChange, inputFields] = useEventChange({ deviceName: "", deviceId: "" });

    const {makeRequest: addIotDevice, error, setError} = useAxios<AddDeviceResponse>({
		onSuccess: () => {
            setOpen(false);
			if(requestMethod)
				requestMethod({
					url: ApiUrl.readDevices(),
				    method: RequestMethod.GET,
				})	
		}
	});

    const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        const name = inputFields.deviceName;
        const device_id = inputFields.deviceId;
        // const device_type = "salute";
        addIotDevice({
            url: ApiUrl.addDevices(),
		    method: RequestMethod.POST,
            data: {
                name, device_id
            }
        })
    };

    return (
        <>
        <ErrorBar error={error} setError={setError}/>
        <MUI.Container maxWidth="xs">
            <FormPaper>
                <MUI.Typography component={"span"} variant={"h5"}>
                    New Device
                </MUI.Typography>
                <StyledForm 
                    component="form" 
                    onSubmit={handleSubmit} 
                    sx={{display: 'flex', flexDirection: 'column'}}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="deviceNname"
                        label="Device name"
                        name="deviceName"
                        autoFocus
                        value={inputFields.deviceName}
                        onChange={handleInputChange}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="deviceId"
                        label="Device id"
                        name="deviceId"
                        value={inputFields.deviceId}
                        onChange={handleInputChange}
                    />

                    <SubmitButton
                        type="submit"
                        variant="outlined"
                        rounded={false}
                    >
                        Connect
                    </SubmitButton>

                </StyledForm>
            </FormPaper>
        </MUI.Container>
        </>
    )
};

export default DeviceForm;