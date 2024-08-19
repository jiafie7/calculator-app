import { current } from "@reduxjs/toolkit";
import { act, startTransition } from "react";
import ACTIONS from "./action";

const evaluate = (state) => {
  let { currentOperand, lastOperand, operation } = state;
  let last = parseFloat(lastOperand);
  let current = parseFloat(currentOperand);

  let res = "";
  switch (operation) {
    case "➕":
      res = last + current;
      break;
    case "➖":
      res = last - current;
      break;
    case "✖️":
      res = last * current;
      break;
    case "➗":
      res = last / current;
      break;
  }

  return res.toString();
};

const reducer = (
  state = {
    currentOperand: "",
    lastOperand: "",
    operation: "",

    overwrite: false,
  },
  action,
) => {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        if (action.digit === ".")
          return {
            ...state,
            currentOperand: "0.",
            overwrite: false,
          };

        return {
          ...state,
          currentOperand: action.digit,
          overwrite: false,
        };
      }

      // avoid 00000
      if (state.currentOperand === "0" && action.digit === "0") return state;

      // avoid 076872
      if (state.currentOperand === "0" && action.digit !== ".")
        return {
          ...state,
          currentOperand: action.digit,
        };

      // avoid 12...12
      if (state.currentOperand.includes(".") && action.digit === ".")
        return state;

      // avoid.12123
      if (state.currentOperand === "" && action.digit === ".") {
        return {
          ...state,
          currentOperand: "0.",
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand + action.digit,
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite)
        return {
          ...state,
          currentOperand: "",
          overwrite: false,
        };

      if (state.currentOperand === "") return state;

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.lastOperand === "" && state.currentOperand === "") return state;

      if (state.lastOperand === "")
        return {
          ...state,
          lastOperand: state.currentOperand,
          operation: action.operation,
          currentOperand: "",
        };

      if (state.currentOperand === "")
        return {
          ...state,
          operation: action.operation,
        };

      return {
        ...state,
        lastOperand: evaluate(state),
        operation: action.operation,
        currentOperand: "",
      };

    case ACTIONS.CLEAR:
      return {
        ...state,
        lastOperand: "",
        currentOperand: "",
        operation: "",
      };

    case ACTIONS.EVALUATE:
      if (
        state.currentOperand === "" ||
        state.lastOperand === "" ||
        state.operation === ""
      )
        return state;

      return {
        ...state,
        currentOperand: evaluate(state),
        operation: "",
        lastOperand: "",
        overwrite: true,
      };

    default:
      return state;
  }
};

export default reducer;
