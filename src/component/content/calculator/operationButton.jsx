import React, { Component } from "react";
import { connect } from "react-redux";
import ACTIONS from "../../../redux/action";

class OperationButton extends Component {
  state = {};
  render() {
    return (
      <button
        onClick={() => {
          this.props.choose_opration(this.props.operation);
        }}
      >
        {this.props.operation}
      </button>
    );
  }
}

const mapDispatchToProps = {
  choose_opration: (operation) => {
    return {
      type: ACTIONS.CHOOSE_OPERATION,
      operation: operation,
    };
  },
};

export default connect(null, mapDispatchToProps)(OperationButton);
