import React from "react";
import {
    Route as ReactRoute,
    Redirect
} from "react-router-dom";
import { Routes } from "../Router";
import { withRouter } from "react-router-dom";
import Header from "./Header";
import {connect} from "react-redux";


const Route = ({ guard, component: Component, fetchUser, user, token, ...rest}) => {
    let isLoggedIn = !!token;

    if (guard) {
        if (isLoggedIn) {
            if (rest.path === Routes.Root) {
                return <Redirect to={Routes.Home}/>
            }

            // if (!Object.keys(user).length) {
            //     return <ReactRoute {...rest} component={() => (<div>Loding...</div>)} />
            // }

            return (
                <>
                    <Header />
                    <ReactRoute {...rest} component={Component} />
                </>
            );
        }
        return <Redirect to={Routes.Login} />
    } else if (isLoggedIn) {
        return <Redirect to={Routes.Home} />;
    }

    return <ReactRoute component={Component} {...rest} />
};

const mapStateToProps = (state) => {
    return {
        token: state.login.token,
        user: state.user
    };
};

export default withRouter(connect(mapStateToProps)(Route));
