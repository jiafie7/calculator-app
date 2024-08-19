import React, { Component } from "react";
import Base from "./content";
import $ from "jquery";

class Login extends Component {
  state = {
    error_message: "",
    username: "",
    password: "",
  };

  handleClick = (e) => {
    // use ajax, disable button submit
    e.preventDefault();

    if (this.state.username === "") {
      this.setState({ error_message: "username can't be empty!" });
    } else if (this.state.password === "") {
      this.setState({ error_message: "password can't be empty!" });
    } else {
      $.ajax({
        url: "https://hangzhang.site/calculator/login/",
        type: "get",
        data: {
          username: this.state.username,
          password: this.state.password,
        },
        dataType: "json",
        success: (resp) => {
          if (resp.result === "success") {
            window.location.href = "/calculator";
          } else {
            this.setState({ error_message: resp.result });
          }
        },
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Base>
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col col-sm-3">
                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      onChange={(e) => {
                        this.setState({ username: e.target.value });
                      }}
                      type="text"
                      className="form-control"
                      id="username"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div style={{ height: "2rem", color: "red" }}>
                    {this.state.error_message}
                  </div>
                  <button
                    onClick={this.handleClick}
                    style={{ width: "100%" }}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Log In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Base>
      </React.Fragment>
    );
  }
}

export default Login;
