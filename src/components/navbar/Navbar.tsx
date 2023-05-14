import * as MUI from "@mui/material";
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory, useLocation } from "react-router-dom";
import { Drawer, DrawerButton, DrawerHeader } from "../drawer/Drawer.styles";
import { AppBar, HeaderImg, Main } from "./Navbar.styles";
import * as MuiIcons from '@mui/icons-material';
import Home from "../../pages/home/Home";
import SidebarMenu from "../sidebar/SidebarMenu";
import Menu from "./Menu";
import { routeGroup } from "../../route/RouteGroup";
import PrivateRoute from "../../route/PrivateRoute";
import { useAxios } from "../../hooks/useAxios";
import { ApiUrl, UserLogoutResponse } from "../../apis/auth";
import { RequestMethod } from "../../apis/Api";

interface NavbarBaseProps {
    themeMode: string;
    handleChangeTheme: () => void;
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarBaseProps> = ({themeMode, handleChangeTheme, setDrawerOpen, drawerOpen}) => {

    const history = useHistory();
    const [tokens, setTokens] = React.useState(false);

    const { makeRequest: userLogout, error: logoutError} = useAxios<UserLogoutResponse>({
        onSuccess: (response) => {
            setTokens(false);
            localStorage.clear();
            history.push("/")
        }
    });

    const handleSignout = () => {
        userLogout({
            url: ApiUrl.logout(),
            method: RequestMethod.GET
        })
    };

    React.useEffect(()=> {

        const hasToken = localStorage.getItem("token");

        if (hasToken !== null) {
            setTokens(true)
        } else {
            setTokens(false)
        }
    } ,[]);

    return (
        <Router>
            <MUI.ClickAwayListener onClickAway={()=> setDrawerOpen(false)}>
                <MUI.Box sx={{display: 'flex'}}>
                    <MUI.CssBaseline />
                    <AppBar position="fixed" open={drawerOpen}>
                        <MUI.Toolbar>
                            <HeaderImg>
                                <img src="/images/logos/logo_wizaviu.svg" alt="WiBASE Cloud"/>
                                <DrawerButton>
                                    {tokens && 
                                        <MUI.IconButton
                                            aria-label="open drawer"
                                            edge="start"
                                            onClick={() => setDrawerOpen((prev) => {
                                                return !prev;
                                            })}
                                        >
                                            <MuiIcons.Menu sx={{color: '#FFF'}}/>
                                        </MUI.IconButton>
                                    }
                                </DrawerButton>
                            </HeaderImg>
                            <MUI.Typography variant="h6" noWrap component={Link} to="/" sx={{flexGrow: 1, textDecoration: "none"}} />
                            <Menu themeMode={themeMode} handleChangeTheme={handleChangeTheme} handleSignout={handleSignout} tokens={tokens}/>
                        </MUI.Toolbar>
                    </AppBar>
                    {tokens && 
                        <Drawer variant="permanent" open={drawerOpen}>
                            <DrawerHeader />
                            <SidebarMenu 
                                drawerOpen={drawerOpen}
                                setDrawerOpen={setDrawerOpen}
                            />
                        </Drawer>
                    }
                    <Main open={drawerOpen}>
                        <Switch>
                            <Route
                                path="/"
                                render={() => (<Home setTokens={setTokens} />)}
                                exact
                            />
                            {routeGroup.map((route: any, index: number) => {
                                return (
                                    <PrivateRoute
                                        key={index}
                                        path={route.path}
                                        component={route.component}
                                        exact
                                    />
                                );
                            })}
                        </Switch>
                    </Main>
                </MUI.Box>
            </MUI.ClickAwayListener>
        </Router>
    )
};

export default Navbar;