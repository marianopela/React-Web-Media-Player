function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LargePlayButton.css';
var playLogo = /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "40",
  height: "40",
  viewBox: "0 0 24 24"
}, /*#__PURE__*/React.createElement("path", {
  fill: "white",
  d: "M8 5v14l11-7z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}));

var LargePlayButton = /*#__PURE__*/function (_Component) {
  _inheritsLoose(LargePlayButton, _Component);

  function LargePlayButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var style;

      if (_this.props.isPlayerHighlighted) {
        style = {
          backgroundColor: _this.props.color,
          opacity: 1
        };
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "wmp-large-play-button ",
        style: style
      }, /*#__PURE__*/React.createElement("div", {
        className: "wmp-central-play-arrow material-icons md-40"
      }, playLogo));
    });

    return _this;
  }

  return LargePlayButton;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    isPlayerHighlighted: state.isPlayerHighlighted,
    color: state.color
  };
};

export default connect(mapStateToProps)(LargePlayButton);