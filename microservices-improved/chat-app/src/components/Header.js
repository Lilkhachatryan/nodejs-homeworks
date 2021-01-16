import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogOut } from "../store/actions/authAction";
import { Routes } from "../Router";
import { removeToken } from "../services/helpers";

class Header extends Component {
    state = {
        isMobile: null,
        isOpen: false,
        sources: [],
        show: false,
        search: ''
    };

    attemptLogout = () => {
        this.props.logout();
        this.props.history.push(Routes.Login)
    };

    renderNavItems = () => {
        return (
            <>
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink
                            to={Routes.Home}
                            className="nav-link"
                            activeClassName='active'>Home</NavLink>
                    </li>
                </ul>
                <button onClick={this.attemptLogout} type="button" className="btn btn-info">Logout</button>
            </>
        )
    };

    render() {
        return (
            <div className="fixed-top">
                <nav className="navbar navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
                    { this.renderNavItems() }
                </nav>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
     logout: () => dispatch(handleLogOut())
    }
);

export default withRouter(connect(null, mapDispatchToProps)(Header));
