function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Container.css';
import fscreen from "fscreen";
import TitleBar from "./TitleBar/TitleBar";
import MenuBar from "./MenuBar/MenuBar";
import Spinner from "./Loading/Spinner";
import Thumbnail from "./Init/Thumbnail";
import Mixer from "./Medias/Mixer";
import LargePlayButton from "./Init/LargePlayButton";
var TIME_TO_HIDE_MENU_IN_MILLISECONDS = 3000;

var Container = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Container, _Component);

  function Container(_props) {
    var _this;

    _this = _Component.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      fscreen.addEventListener("fullscreenchange", _this.detectFullScreen.bind(_assertThisInitialized(_this)));
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      fscreen.removeEventListener("fullscreenchange", _this.detectFullScreen.bind(_assertThisInitialized(_this)));

      if (_this.mouseStopTimer) {
        window.clearTimeout(_this.mouseStopTimer);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps) {
      if (prevProps.isFullscreen !== _this.props.isFullscreen) {
        _this.handlePropsChanges(_this.props);
      }

      if (prevProps.timeLastUserAction !== _this.props.timeLastUserAction && _this.node !== undefined) {
        _this.waitUserToBeInactive();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handlePropsChanges", function (props) {
      var enabled = fscreen.fullscreenElement;

      if (enabled && !props.isFullscreen) {
        _this.leaveFullScreen();
      } else if (!enabled && props.isFullscreen) {
        _this.enterFullScreen();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "detectFullScreen", function () {
      if (_this.fscreen.fullscreenElement == null) {
        if (_this.props.isFullscreen) {
          _this.props.dispatch({
            type: 'SWITCH_FULLSCREEN_STATE'
          });
        }

        _this.props.dispatch({
          type: 'FULL_SCREEN_DISABLED'
        });
      } else {
        _this.props.dispatch({
          type: 'FULL_SCREEN_ENABLED'
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "enterFullScreen", function () {
      if (fscreen.fullscreenEnabled) {
        fscreen.requestFullscreen(_this.node);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "leaveFullScreen", function () {
      if (fscreen.fullscreenEnabled) {
        fscreen.exitFullscreen();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseEnter", function (e) {
      e.stopPropagation();

      if (!_this.props.isInitialized) {
        _this.props.dispatch({
          type: 'HIGHLIGHT_PLAYER'
        });
      } else if (_this.props.isPlaying) {//this.props.dispatch({ type: 'SHOW_MENUS' });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function (e) {
      e.stopPropagation();

      if (!_this.props.isInitialized) {
        _this.props.dispatch({
          type: 'UNHIGHLIGHT_PLAYER'
        });
      } else if (_this.props.allowMenuHiding && _this.props.isPlaying) {
        _this.props.dispatch({
          type: 'HIDE_MENUS'
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseMove", function (e) {
      if (_this.props.isInitialized) {
        _this.props.dispatch({
          type: 'USER_ACTIVE'
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      e.stopPropagation();

      _this.props.dispatch({
        type: 'USER_ACTIVE'
      });

      if (!_this.props.isInitialized) {
        _this.props.dispatch({
          type: 'INITIALIZE_PLAYER'
        });

        _this.props.dispatch({
          type: 'PLAY'
        });
      } else {
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
      }
    });

    _defineProperty(_assertThisInitialized(_this), "waitUserToBeInactive", function () {
      _this.props.dispatch({
        type: 'SHOW_MENUS'
      });

      _this.node.style.cursor = "";

      if (_this.mouseStopTimer) {
        window.clearTimeout(_this.mouseStopTimer);
      }

      _this.mouseStopTimer = window.setTimeout(function () {
        if (_this.props.allowMenuHiding && _this.props.isPlaying) {
          _this.props.dispatch({
            type: 'HIDE_MENUS'
          });

          _this.node.style.cursor = "none";
        }
      }, TIME_TO_HIDE_MENU_IN_MILLISECONDS);
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var className = ["wmp-container", "fullscreen"];
      var style = {};
      var id = _this.props.id;
      Object.assign(style, _this.props.style);
      style.width = _this.props.width + "px", style.height = _this.props.height + "px";

      if (_this.props.isFullscreenActivated) {
        className.push("fullscreen-enabled");
        style.width = "100%";
        style.height = "100%";
      }

      var thumbnail, largePlayButton, menuBar, titleBar, spinner;
      if (_this.props.thumbnail && !_this.props.isInitialized && !_this.props.autoplay) thumbnail = /*#__PURE__*/React.createElement(Thumbnail, null);

      if (_this.props.isInitialized && _this.props.showMenus || _this.props.isTestEnvironment) {
        menuBar = /*#__PURE__*/React.createElement(MenuBar, null);
      }

      if (!_this.props.isInitialized && !_this.props.autoplay) {
        largePlayButton = /*#__PURE__*/React.createElement(LargePlayButton, null);
      }

      if (!_this.props.isInitialized || _this.props.showMenus) {
        titleBar = /*#__PURE__*/React.createElement(TitleBar, null);
      }

      if (_this.props.isInitialized && _this.props.isLoading) {
        spinner = /*#__PURE__*/React.createElement(Spinner, null);
      }

      return /*#__PURE__*/React.createElement("div", {
        id: id,
        className: className.join(" "),
        style: style,
        ref: function ref(node) {
          return _this.node = node;
        },
        onMouseEnter: _this.handleMouseEnter,
        onMouseLeave: _this.handleMouseLeave,
        onMouseMoveCapture: _this.handleMouseMove,
        onClick: _this.handleClick
      }, spinner, thumbnail, largePlayButton, titleBar, menuBar, /*#__PURE__*/React.createElement(Mixer, null));
    });

    _this.fscreen = fscreen;
    return _this;
  }

  return Container;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    timeLastUserAction: state.timeLastUserAction,
    width: state.width,
    height: state.height,
    thumbnail: state.thumbnail,
    hasVideo: state.hasVideo,
    hasAudio: state.hasAudio,
    hasSlideshow: state.hasSlideshow,
    isInitialized: state.isInitialized,
    isFullscreen: state.isFullscreen,
    showMenus: state.showMenus,
    isPlaying: state.isPlaying,
    allowMenuHiding: state.allowMenuHiding,
    isLoading: state.isLoading,
    isFullscreenActivated: state.isFullscreenActivated,
    autoplay: state.autoplay,
    style: state.style,
    id: state.id,
    isTestEnvironment: state.isTestEnvironment
  };
};

export default connect(mapStateToProps)(Container);