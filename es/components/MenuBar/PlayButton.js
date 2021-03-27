function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';
var playLogo = /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "30",
  height: "30",
  viewBox: "0 0 24 24",
  className: "play-logo"
}, /*#__PURE__*/React.createElement("path", {
  className: "wmp-tool-button-logo",
  fill: "#e4e5e8",
  d: "M8 5v14l11-7z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}));
var pauseLogo = /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "29",
  height: "29",
  viewBox: "0 0 24 24",
  className: "pause-logo"
}, /*#__PURE__*/React.createElement("path", {
  className: "wmp-tool-button-logo",
  fill: "#e4e5e8",
  d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}));
var replayLogo = /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "27",
  height: "27",
  viewBox: "0 0 24 24",
  className: "replay-logo"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  className: "wmp-tool-button-logo",
  fill: "#e4e5e8",
  d: "M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
}));

var PlayButton = /*#__PURE__*/function (_Component) {
  _inheritsLoose(PlayButton, _Component);

  function PlayButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      _this.props.dispatch({
        type: 'USER_ACTIVE'
      });

      if (!_this.props.isReadingTerminated) {
        if (_this.props.isPlaying) {
          _this.props.dispatch({
            type: 'PREVENT_MENU_HIDING'
          });

          _this.props.dispatch({
            type: 'PAUSE'
          });
        } else {
          _this.props.dispatch({
            type: 'PLAY'
          });

          _this.props.dispatch({
            type: 'ALLOW_MENU_HIDING'
          });
        }
      } else {
        _this.props.dispatch({
          type: 'UPDATE_ASKED_TIME',
          payload: {
            askedTime: 0
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var action;

      if (!_this.props.isReadingTerminated) {
        if (_this.props.isPlaying) {
          action = pauseLogo;
        } else {
          action = playLogo;
        }
      } else {
        action = replayLogo;
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "wmp-tool-button",
        onClick: _this.handleClick
      }, action);
    });

    return _this;
  }

  return PlayButton;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    isPlaying: state.isPlaying,
    isReadingTerminated: state.isReadingTerminated
  };
};

export default connect(mapStateToProps)(PlayButton);