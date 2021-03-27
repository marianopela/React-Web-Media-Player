function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Spinner.css';

var Spinner = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Spinner, _Component);

  function Spinner() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return /*#__PURE__*/React.createElement("div", {
        className: "wmp-spinner",
        hidden: !_this.props.isLoading
      }, /*#__PURE__*/React.createElement("div", {
        className: "wmp-spinner-container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "wmp-spinner-rotator"
      }, /*#__PURE__*/React.createElement("div", {
        className: "wmp-spinner-left"
      }, /*#__PURE__*/React.createElement("div", {
        className: "wmp-spinner-circle"
      })), /*#__PURE__*/React.createElement("div", {
        className: "wmp-spinner-right"
      }, /*#__PURE__*/React.createElement("div", {
        className: "wmp-spinner-circle"
      })))));
    });

    return _this;
  }

  return Spinner;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    isLoading: state.isLoading
  };
};

export default connect(mapStateToProps)(Spinner);