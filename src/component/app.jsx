import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./navbar";
import Home from "./content/home";
import Calculator from "./content/calculator";
import Login from "./content/login";
import Signup from "./content/signup";
import NotFound from "./content/notFound";
import $ from "jquery";

class App extends Component {
  state = {
    is_login: false,
    username: "",
  };

  componentDidMount() {
    $.ajax({
      url: "https://hangzhang.site/calculator/get_status/",
      type: "get",
      success: (resp) => {
        if (resp.result === "login") {
          this.setState({
            is_login: true,
            username: resp.username,
          });
        } else {
          this.setState({
            is_login: false,
          });
        }
      },
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar is_login={this.state.is_login} username={this.state.username} />
        <div className="container">
          <Routes>
            <Route path="/calculator" element={<Home />} />
            <Route path="/calculator/home" element={<Home />} />
            <Route
              path="/calculator/calculator"
              element={
                this.state.is_login ? (
                  <Calculator />
                ) : (
                  <Navigate replace to="/calculator/login" />
                )
              }
            />
            <Route
              path="/calculator/login"
              element={
                this.state.is_login ? (
                  <Navigate replace to="/calculator/home" />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/calculator/signup"
              element={
                this.state.is_login ? (
                  <Navigate replace to="/calculator/home" />
                ) : (
                  <Signup />
                )
              }
            />
            <Route path="/calculator/404" element={<NotFound />} />
            <Route path="/calculator/*" element={<Navigate replace to="/calculator/404" />} />
          </Routes>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
