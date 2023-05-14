import { FC } from "react";
import * as MUI from "@mui/material";
import { IPopup } from "../../components/popup/Popup";
import useClick from "../../hooks/useClick";
import { useValidateInputChange } from "../../hooks/FormHooks";
import { validateAccount } from "../../helper/formValidate";
import { useAxios } from "../../hooks/useAxios";
import { AddUserResponse, ApiUrl } from "../../apis/users";
import { RequestMethod } from "../../apis/Api";
import * as MuiIcons from "@mui/icons-material/";
import { AccountInput, FormWithListContainer, StyledForm, FormInputLabel, RoundedTextField } from "../../components/form";
import { FormTypography } from "../../components/typography";
import { SubmitButton } from "../../components/button";
import ErrorBar from "../../components/helpers/ErrorBar";

const UserForm: FC<IPopup> = ({requestMethod, setOpen}) => {

	const [handlePasswordClick, isShow, setIsShow] = useClick();
	const [ handleInputChange, inputFields ] = useValidateInputChange(
		{
			errors: {
				email: "",
				username: "",
				password: "",
			},
			input: {
				email: "",
				username: "",
				password: "",
			}
		},
		validateAccount
	);

    const {data: addResponse, makeRequest: addTenantUsers, error, setError} = useAxios<AddUserResponse>({
		onSuccess: () => {
			setOpen(false);
			if(requestMethod)
				requestMethod({
					url: ApiUrl.readUsers(),
					method: RequestMethod.GET
			})
		}
	});

    const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
		e.preventDefault();
		addTenantUsers({
			url: ApiUrl.addUser(),
			method: RequestMethod.POST,
			data: {
				email: inputFields.input.email,
    			password: inputFields.input.password,
    			username: inputFields.input.username
			}
		})
	};

    return (
        <>
        <ErrorBar error={error} setError={setError}/>
        <FormWithListContainer maxWidth="xl">
            <FormTypography component="h1" variant="h5">
				New User
			</FormTypography>
            <StyledForm component="form" onSubmit={handleSubmit} sx={{display: 'flex'}}>
				<AccountInput>
					<MUI.Box>
						<FormInputLabel htmlFor="email">
							Email
						</FormInputLabel>
						<RoundedTextField
							variant="outlined"
							margin="normal"
							size="small"
							required
							fullWidth
							id="email"
							placeholder="Please enter email"
							name="email"
							value={inputFields.input.email}
							onChange={handleInputChange}
							color="primary"
							error={inputFields.errors.email!==''}
							helperText={inputFields.errors.email}
							InputProps={{
								startAdornment: 
									<MUI.InputAdornment position="start">
										<MuiIcons.Email />
									</MUI.InputAdornment>
							}}
						/>
					</MUI.Box>
					<MUI.Box>
						<FormInputLabel htmlFor="username">
							User Name
						</FormInputLabel>
						<RoundedTextField
							variant="outlined"
							margin="normal"
							size="small"
							required
							fullWidth
							id="username"
							placeholder="Please enter userName"
							name="username"
							value={inputFields.input.username}
							onChange={handleInputChange}
							color="primary"
							error={inputFields.errors.username!== ''}
							helperText={inputFields.errors.username}
							InputProps={{
								startAdornment: 
									<MUI.InputAdornment position="start">
										<MuiIcons.AccountCircle />
									</MUI.InputAdornment>
							}}
						/>
					</MUI.Box>
					<MUI.Box>
						<FormInputLabel htmlFor="username">
							Password
						</FormInputLabel>
						<RoundedTextField
							variant="outlined"
							margin="normal"
							size="small"
							required
							fullWidth
							id="password"
							placeholder="Please enter password"
							name="password"
							value={inputFields.input.password}
							onChange={handleInputChange}
							color="primary"
							error={inputFields.errors.password!== ''}
							helperText={inputFields.errors.password}
							type={isShow ? 'text' : 'password'}
							InputProps={{
								startAdornment: 
									<MUI.InputAdornment position="start">
										<MuiIcons.VpnKeyRounded />
									</MUI.InputAdornment>,
								endAdornment: 
									<MUI.InputAdornment position="end">
										<MUI.IconButton
											aria-label="toggle password visibility"
											onClick={handlePasswordClick}
											edge="end"
										>
											{isShow ? <MuiIcons.VisibilityOff /> : <MuiIcons.Visibility />}
										</MUI.IconButton>
									</MUI.InputAdornment>
							}}
						/>
					</MUI.Box>
					<MUI.Box sx={{display: 'flex', flexDirection: 'column'}}>
					<SubmitButton
						type="submit"
						variant="outlined"
						rounded
						disabled={!Object.values(inputFields.errors).every(value => value === "")}
					>
						Save
					</SubmitButton>
				</MUI.Box>
				</AccountInput>
			</StyledForm>
        </FormWithListContainer>
        </>
    )
};

export default UserForm;