import React from "react";
import { BrowserRouter as ReactRouter, Switch } from "react-router-dom";
import Route from "./components/Route";
import { Home, Login, SignUp } from "./pages";

export const Routes = Object.freeze({
    Root: process.env.PUBLIC_URL + '/',
    Home: '/home',
    Login: '/login',
    SignUp: '/sign-up',
    NotFoundPage: '*'
});

const NotFound = ({ location }) => (
    <div>
        <strong>Error!</strong> No route found matching:
        <div>
            <code>{location.pathname}</code>
        </div>
    </div>
);

function Router() {
    return (
        <ReactRouter>
            <Switch>
                <Route path={Routes.Login} component={Login} />
                <Route path={Routes.SignUp} component={SignUp} />
                <Route guard path={Routes.Home} component={Home} />

                <Route exact guard path={Routes.Root} component={Home} />

                <Route path={Routes.NotFoundPage} component={NotFound}/>
            </Switch>
        </ReactRouter>
    );
}

export default Router;
