function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';
var previousLogo = /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "26",
  height: "26",
  viewBox: "0 0 24 24",
  className: "previous-logo"
}, /*#__PURE__*/React.createElement("path", {
  className: "wmp-tool-button-logo",
  fill: "#e4e5e8",
  d: "M6 6h2v12H6zm3.5 6l8.5 6V6z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}));

var PreviousButton = /*#__PURE__*/function (_Component) {
  _inheritsLoose(PreviousButton, _Component);

  function PreviousButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      _this.props.dispatch({
        type: 'ASK_PREVIOUS_IMAGE'
      });

      _this.props.dispatch({
        type: 'USER_ACTIVE'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return /*#__PURE__*/React.createElement("div", {
        className: "wmp-tool-button",
        onClick: _this.handleClick
      }, previousLogo);
    });

    return _this;
  }

  return PreviousButton;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {};
};

export default connect(mapStateToProps)(PreviousButton);