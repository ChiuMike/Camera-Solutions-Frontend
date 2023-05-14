import * as MUI from "@mui/material";
import * as React from "react";
import { useHistory, Link } from "react-router-dom";
import { DrawerHeader } from "../../components/drawer/Drawer.styles";
import { TextField } from "../../components/form";
import { useEventChange } from "../../hooks/FormHooks";
import * as MuiIcons from '@mui/icons-material';
import useClick from "../../hooks/useClick";
import { HomeMainBox, LoginImg, HomeRightSide, LoginBox, LanguageForm, LoginInputForm, HomeLeftSide } from "./Home.styles";
import { LoadingSpinerButton } from "../../components/button";
import { useAxios } from "../../hooks/useAxios";
import { ApiUrl, UserLoginResponse, UserLogoutResponse } from "../../apis/auth";
import { setLocalStorage } from "../../components/helpers/Auth";
import { RequestMethod } from "../../apis/Api";
import BufferPage from "../../components/loading/BufferPage";

interface HomeBaseProps {
    setTokens: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<HomeBaseProps> = ({ setTokens }) => {

    const bufferRef = React.useRef(false);
    const history = useHistory();
    const isLogin = true;
    const [language, setLanguage] = React.useState('en');
    const hasToken = localStorage.getItem("token");

    const [ handleInputChange, inputFields ] = useEventChange({ account: "", password: "" });
    const [ handlePasswordClick, isShow ] = useClick();

    const {loading, makeRequest: userSignin, error} = useAxios<UserLoginResponse>({
        onSuccess: (response) => {
            if (response !== undefined) {
                const { token, uuid, expires_at, refresh_token, refresh_expires_at } = response.data;
                setLocalStorage("token", token);
                setLocalStorage("expires_at", expires_at);
                setLocalStorage("uuid", uuid);
                setLocalStorage("refresh_token", refresh_token);
                setLocalStorage("refresh_expires_at", refresh_expires_at);
                setLocalStorage("email", inputFields.account);

                bufferRef.current = true;
                setTimeout(() =>{
                    setTokens(true);
                    history.push({pathname:"/dashboard", state: { isLogin }})
                }, 1500);
            }
        }
    });

    const { makeRequest: userLogout, error: logoutError} = useAxios<UserLogoutResponse>({
        onSuccess: (response) => {
            setTokens(false);
            localStorage.clear();
        }
    });

    const handleSignout = () => {
        userLogout({
            url: ApiUrl.logout(),
            method: RequestMethod.GET
        })
    };

    const handleChange = (event: MUI.SelectChangeEvent) => {
        setLanguage(event.target.value);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const signIn = (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        userSignin({
            url: ApiUrl.login(),
            method: RequestMethod.POST,
            data: {
                account: inputFields.account,
                password: inputFields.password,
            }
        })
    };

    return (
        <>
        {bufferRef.current ? 
            <MUI.Backdrop
                sx={{
                    background: (theme) => theme.palette.mode === 'light' ? "#FFF" : "#121212",
                    color: "white",
                    zIndex: (theme) => theme.zIndex.drawer + 1  //drawer + 1
                }}
                open={bufferRef.current}
            >
                <BufferPage><img src="/images/logos/logo_wizaviu.svg" style={{width: '100%'}}/></BufferPage>
            </MUI.Backdrop>
            :
            <MUI.Box>
                <DrawerHeader />
                <HomeMainBox>
                    <HomeLeftSide />
                    <HomeRightSide>
                        <LoginBox>
                            <LoginImg src="/images/logos/home_logo.svg" alt="" />
                            <LanguageForm component={"form"}>
                                <MUI.FormControl>
                                    <MUI.InputLabel id="demo-simple-select-label">Language</MUI.InputLabel>
                                    <MUI.Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={language}
                                        label="Language"
                                        onChange={handleChange}
                                    >
                                        <MUI.MenuItem value={"en"}>English</MUI.MenuItem>
                                    </MUI.Select>
                                </MUI.FormControl>
                            </LanguageForm>
                            {hasToken ?
                                <Link to="/" style={{textDecoration: "none"}}>
                                    <LoadingSpinerButton
                                        loading={loading === true}
                                        variant="contained"
                                        onClick={handleSignout}
                                        size="medium"
                                    >
                                        <MUI.Typography variant='h6'>SIGN OUT</MUI.Typography>
                                    </LoadingSpinerButton>
                                </Link>
                                :  
                                <LoginInputForm component={"form"} onSubmit={signIn}>
                                    <TextField
                                        name='account'
                                        type="text"
                                        required
                                        id="account"
                                        label="Account"
                                        value={inputFields.account}
                                        InputProps={{
                                        startAdornment: 
                                            <MUI.InputAdornment position="start">
                                                <MuiIcons.AccountCircle />
                                            </MUI.InputAdornment>
                                        }}
                                        onChange={handleInputChange}
                                        error={error !== null} 
                                    />
                                    <TextField
                                        name='password'
                                        required
                                        id="password"
                                        label="Password"
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
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                            {isShow ? <MuiIcons.VisibilityOff /> : <MuiIcons.Visibility />}
                                            </MUI.IconButton>
                                        </MUI.InputAdornment>
                                        }}
                                        value={inputFields.password}
                                        onChange={handleInputChange}
                                        error={error !== null}
                                        helperText={error === null ? '' : 'incorrect account or password'} 
                                    />
                                    <LoadingSpinerButton
                                        type="submit"
                                        loading={loading}
                                        variant="contained"
                                        size="medium"
                                        disabled={(inputFields.account === '' || inputFields.password === '') ? true: false}
                                    >
                                        <MUI.Typography variant='h6'>LOGIN</MUI.Typography>
                                    </LoadingSpinerButton>
                                </LoginInputForm>
                            }
                        </LoginBox>
                    </HomeRightSide>    
                </HomeMainBox>
            </MUI.Box>
        }
        </>
    )
};

export default Home;