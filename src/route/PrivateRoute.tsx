import { Redirect, Route, RouteProps } from "react-router";
import * as React from "react";
import { startTimer, stopTimer } from "../helper/tokenHelper";
import { useAxios } from "../hooks/useAxios";
import { ApiUrl, UserLogoutResponse } from "../apis/auth";
import { useHistory, useLocation } from "react-router-dom";
import { RequestMethod } from "../apis/Api";

interface IPrivateRoute extends RouteProps {
    component: React.ComponentType<any>;
    drawerOpen: boolean;
    setIsMap: React.Dispatch<React.SetStateAction<boolean>>;
    setTokens: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
}
const PrivateRoute: React.FC<IPrivateRoute> = ({ component: Component, drawerOpen, setIsMap, setTokens, ...routeProps }) => {

    const { path } = routeProps;
    
    const location = useLocation();
    const history = useHistory();

    const { makeRequest: userLogout, error: logoutError} = useAxios<UserLogoutResponse>({
        onSuccess: (response) => {
            setTokens(false);
        }
    });

    const stopCallback = async () => {
        await userLogout({
            url: ApiUrl.logout(),
            method: RequestMethod.GET
        });
        history.push("/");
        stopTimer();
    };


    React.useEffect(() => {
        startTimer(stopCallback);
    }, [location]);

    if (localStorage.getItem("token") === null) {

        return <Redirect to="/" />;
    }

    return <Route path={path} render={() => {
        return <Component {...routeProps} drawerOpen={drawerOpen} setIsMap={setIsMap} />
    }}/>
};

export default PrivateRoute;