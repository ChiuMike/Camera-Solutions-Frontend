import { Redirect, Route, RouteProps } from "react-router";
import * as React from "react";

interface IPrivateRoute extends RouteProps {
    component: React.ComponentType<any>;
    title?: string;
}
const PrivateRoute: React.FC<IPrivateRoute> = ({ component: Component, ...routeProps }) => {

    const { path } = routeProps;

    if (localStorage.getItem("token") === null) {

        return <Redirect to="/" />;
    }

    return <Route path={path} render={() => {
        return <Component {...routeProps} />
    }}/>
};

export default PrivateRoute;