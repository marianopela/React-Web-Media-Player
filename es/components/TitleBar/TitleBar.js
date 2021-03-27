function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import { connect } from "react-redux";
import "./TitleBar.css";
export var TitleBar = /*#__PURE__*/function (_Component) {
  _inheritsLoose(TitleBar, _Component);

  function TitleBar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      e.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var title;

      if (_this.props.link) {
        title = /*#__PURE__*/React.createElement("a", {
          className: "wmp-title light-grey-to-white",
          href: _this.props.link,
          target: "_blank",
          rel: "noopener noreferrer"
        }, _this.props.title);
      } else {
        title = /*#__PURE__*/React.createElement("span", {
          className: "wmp-title light-grey-to-white"
        }, _this.props.title);
      }
      /*
          <div class="salefi-player-title-container">
              <a class="salefi-player-title light-grey-to-white" href="#" target="_blank">Product name - Store name</a>
              <div class="salefi-player-top-shading"></div>
              </div>
          */


      return /*#__PURE__*/React.createElement("div", {
        className: "wmp-title-container",
        onClick: _this.handleClick
      }, title, /*#__PURE__*/React.createElement("div", {
        className: "wmp-top-shading"
      }));
    });

    return _this;
  }

  return TitleBar;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    title: state.title,
    link: state.link
  };
};

export default connect(mapStateToProps)(TitleBar);