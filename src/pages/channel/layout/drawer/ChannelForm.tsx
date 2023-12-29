import * as MUI from "@mui/material";
import { FC, useEffect } from "react";
import { SubmitButton } from "../../../../components/button";
import { StyledForm } from "../../../../components/form";
import ErrorBar from "../../../../components/helpers/ErrorBar";
import { validateAccount } from "../../../../helper/formValidate";
import { useValidateInputChange } from "../../../../hooks/FormHooks";
import { useAsyncChannelState, useChannelError } from "../../context/AsyncChannelStateProvider";

const ChannelForm: FC = () => {

    const { handleAddChannel } = useAsyncChannelState();

    const { addChannelError, setAddError } = useChannelError();

    const [handleInputChange, inputFields ] = useValidateInputChange(
		{
			errors: {
				channel: ""
			},
			input: {
				channel: ""
			}
		},
		validateAccount
	);

    const handleSubmit = (e: any) => {
		e.preventDefault();
        if(inputFields.input.channel === "") return;
		handleAddChannel(inputFields.input.channel);
	};

    useEffect(() => {
        return () => setAddError(null);
    }, [])

    return (
        <>
        <ErrorBar error={addChannelError} setError={setAddError} />
        <MUI.Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <MUI.Typography component="h1" variant="h5">
                New Channel
            </MUI.Typography>
            <StyledForm component="form" onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column'}}>
                <MUI.TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="group"
                    label="Channel name"
                    name="channel"
                    autoFocus
                    value={inputFields.input.channel}
                    onChange={handleInputChange}
                    error={inputFields.errors.channel !== ""}
                    helperText={inputFields.errors.channel}
                />
                <SubmitButton
                    type="submit"
                    variant="outlined"
                    rounded={false}
                    disabled={inputFields.errors.channel !== ""}
                >
                    Add
                </SubmitButton>
            </StyledForm>
		</MUI.Container>
        </>
    )
};

export default ChannelForm;