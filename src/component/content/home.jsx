import React, { Component } from "react";
import Base from "./content";
import "./home.css";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    showFeatures: false,
  };

  toggleFeatures = () => {
    this.setState({ showFeatures: !this.state.showFeatures });
  };

  render() {
    return (
      <React.Fragment>
        <Base>
          <div className="home-container">
            <header className="home-header">
              <h1>Welcome to the Calculator App</h1>
              <p>Your go-to solution for quick and easy calculations.</p>
            </header>

            <div className="home-buttons">
              <button className="btn" onClick={this.toggleFeatures}>
                {this.state.showFeatures ? "Hide Features" : "Show Features"}
              </button>
              <button className="btn">
                <Link className="nav-link" to="/calculator/calculator">
                Open Calculator
                </Link>
              </button>
            </div>

            {this.state.showFeatures && (
              <section className="features-section">
                <h2>Features of the Calculator</h2>
                <ul>
                  <li>Basic Arithmetic Operations (Add, Subtract, Multiply, Divide)</li>
                  <li>Coming Soon ...</li>
                </ul>
              </section>
            )}

            <footer className="home-footer">
              <p>&copy; 2024 Calculator App. All rights reserved.</p>
            </footer>
          </div>
        </Base>
      </React.Fragment>
    );
  }
}

export default Home;

