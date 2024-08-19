import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from 'jquery'

class NavBar extends Component {
    state = {};

    handleClick = () => {
        $.ajax({
            url: "https://hangzhang.site/calculator/logout/",
            type: "get",
            success: (resp) => {
                if (resp.result === "success") {
                    window.location.href = "/calculator";
                }
            },
        });
    };

    render_calculator = () => {
        if (this.props.is_login) {
            return (
                <li className="nav-item">
                <Link className="nav-link" to="/calculator/calculator">
                Calculator
                </Link>
                </li>
            );
        } else {
            return "";
        }
    };

    render_user = () => {
        if (this.props.is_login) {
            return (
                <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" href="" style={{ cursor: "pointer" }}>
                {this.props.username}
                </a>
                </li>
                <li className="nav-item">
                <Link onClick={this.handleClick} className="nav-link">Log Out</Link>
                </li>
                </ul>
            );
        } else {
            return (
                <ul className="navbar-nav">
                <li className="nav-item">
                <Link className="nav-link" to="/calculator/login">
                Log In
                </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/calculator/signup">
                Sign Up
                </Link>
                </li>
                </ul>
            );
        }
    };

    render() {
        return (
            <React.Fragment>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
            <Link className="navbar-brand" to="/calculator">
            Web Calculator
            </Link>
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link" to="/calculator/home">
            Home
            </Link>
            </li>
            {this.render_calculator()}
            </ul>
            {this.render_user()}
            </div>
            </div>
            </nav>
            </React.Fragment>
        );
    }
}

export default NavBar;
