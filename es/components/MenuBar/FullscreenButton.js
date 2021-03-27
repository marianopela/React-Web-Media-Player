function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';
var fullscreenLogo = /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "29",
  height: "29",
  viewBox: "0 0 24 24",
  className: "fullscreen-logo"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  className: "wmp-tool-button-logo",
  fill: "#e4e5e8",
  d: "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
}));
var fullscreenExitLogo = /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "29",
  height: "29",
  viewBox: "0 0 24 24",
  className: "fullscreen-exit-logo"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  className: "wmp-tool-button-logo",
  fill: "#e4e5e8",
  d: "M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
}));

var FullscreenButton = /*#__PURE__*/function (_Component) {
  _inheritsLoose(FullscreenButton, _Component);

  function FullscreenButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      e.stopPropagation();

      _this.props.dispatch({
        type: 'SWITCH_FULLSCREEN_STATE'
      });

      _this.props.dispatch({
        type: 'USER_ACTIVE'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var button;
      if (_this.props.isFullscreen) button = fullscreenExitLogo;else button = fullscreenLogo;
      return /*#__PURE__*/React.createElement("div", {
        className: "wmp-tool-button",
        onClick: _this.handleClick
      }, button);
    });

    return _this;
  }

  return FullscreenButton;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    isFullscreen: state.isFullscreen
  };
};

export default connect(mapStateToProps)(FullscreenButton);