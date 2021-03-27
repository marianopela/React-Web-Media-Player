function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MenuBar.css';
import PlayButton from './PlayButton';
import NextButton from './NextButton';
import PreviousButton from './PreviousButton';
import Timer from './Timer';
import FullscreenButton from './FullscreenButton';
import VolumeControl from './VolumeControl';
import ProgressBar from "./ProgressBar";
import LogoButton from "./LogoButton";
import Button from "./Button";

var MenuBar = /*#__PURE__*/function (_Component) {
  _inheritsLoose(MenuBar, _Component);

  function MenuBar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      e.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var volumeControl, previousButton, nextButton, logo, fullscreenButton;
      var buttons = [];
      if (_this.props.hasVideo || _this.props.hasAudio) volumeControl = /*#__PURE__*/React.createElement(VolumeControl, null);else {
        previousButton = /*#__PURE__*/React.createElement(PreviousButton, null);
        nextButton = /*#__PURE__*/React.createElement(NextButton, null);
      }

      if (_this.props.logo) {
        logo = /*#__PURE__*/React.createElement(LogoButton, {
          img: _this.props.logo.img,
          href: _this.props.logo.href
        });
      }

      if (_this.props.buttons) {
        for (var i = 0; i < _this.props.buttons.length; ++i) {
          buttons.push( /*#__PURE__*/React.createElement(Button, {
            img: _this.props.buttons[i].img,
            key: i,
            href: _this.props.buttons[i].href,
            style: _this.props.buttons[i].style,
            callback: _this.props.buttons[i].callback
          }));
        }
      }

      if (_this.props.allowFullFrame) {
        fullscreenButton = /*#__PURE__*/React.createElement(FullscreenButton, null);
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "wmp-menu-bar-container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "wmp-bottom-shading"
      }), /*#__PURE__*/React.createElement("div", {
        className: "wmp-menu-bar-offset-left"
      }), /*#__PURE__*/React.createElement("div", {
        className: "wmp-menu-bar-offset-right"
      }), /*#__PURE__*/React.createElement("div", {
        className: "wmp-menu-bar",
        onClick: _this.handleClick
      }, /*#__PURE__*/React.createElement("div", {
        className: "wmp-tool-constainer"
      }, /*#__PURE__*/React.createElement("div", {
        className: "wmp-tool-constainer-left"
      }, /*#__PURE__*/React.createElement(PlayButton, null), volumeControl, previousButton, nextButton, /*#__PURE__*/React.createElement(Timer, null)), /*#__PURE__*/React.createElement("div", {
        className: "wmp-tool-constainer-right"
      }, buttons, logo, fullscreenButton))), /*#__PURE__*/React.createElement(ProgressBar, null));
    });

    return _this;
  }

  return MenuBar;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    hasVideo: state.hasVideo,
    hasAudio: state.hasAudio,
    hasSlideshow: state.hasSlideshow,
    logo: state.logo,
    buttons: state.buttons,
    allowFullFrame: state.allowFullFrame
  };
};

export default connect(mapStateToProps)(MenuBar);