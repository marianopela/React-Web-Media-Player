function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';
import './Timer.css';

var Timer = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Timer, _Component);

  function Timer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "intToStingTime", function (nbSeconds) {
      var hours = (nbSeconds - nbSeconds % 3600) / 3600;
      var minuts = (nbSeconds % 3600 - nbSeconds % 3600 % 60) / 60;
      var seconds = Math.floor(nbSeconds % 3600 % 60);
      if (seconds < 10) seconds = "0" + seconds;
      if (minuts < 10 && (hours >= 1 || _this.props.duration >= 600)) minuts = "0" + minuts;
      if (hours >= 1 || _this.props.duration >= 3600) return hours + ":" + minuts + ":" + seconds;else return minuts + ":" + seconds;
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return /*#__PURE__*/React.createElement("div", {
        className: "wmp-tool-button button-time wmp-time-display"
      }, /*#__PURE__*/React.createElement("div", {
        className: "wmp-time-positionning"
      }, /*#__PURE__*/React.createElement("span", {
        className: "wmp-time"
      }, _this.intToStingTime(_this.props.currentTime)), /*#__PURE__*/React.createElement("span", {
        className: "wmp-time"
      }, " / "), /*#__PURE__*/React.createElement("span", {
        className: "wmp-time"
      }, _this.intToStingTime(_this.props.duration))));
    });

    return _this;
  }

  return Timer;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    duration: state.duration,
    currentTime: state.currentTime
  };
};

export default connect(mapStateToProps)(Timer);