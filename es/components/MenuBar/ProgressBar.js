function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProgressBar.css';
import { isInsideElement } from '../../services/Utils';

var ProgressBar = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ProgressBar, _Component);

  function ProgressBar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleMouseDown", function (e) {
      e.stopPropagation();

      _this.animateScrubberButton(e);
    });

    _defineProperty(_assertThisInitialized(_this), "animateScrubberButton", function (e) {
      _this.props.dispatch({
        type: 'CHANNELS_WAIT'
      });

      _this.props.dispatch({
        type: 'PREVENT_MENU_HIDING'
      });

      _this.props.dispatch({
        type: 'PREVENT_UNHIGHLIGHT_PROGRESS_BAR'
      });

      var askedTime = _this.calculateTimeFromXCoord(e.clientX);

      _this.props.dispatch({
        type: 'USER_ACTIVE'
      });

      _this.props.dispatch({
        type: 'UPDATE_ASKED_TIME',
        payload: {
          askedTime: askedTime
        }
      });

      document.addEventListener('mousemove', _this.moveScrubberButton, true);
      document.addEventListener('mouseup', _this.stopScrubberButton, true);
    });

    _defineProperty(_assertThisInitialized(_this), "moveScrubberButton", function (e) {
      e.stopPropagation();

      var askedTime = _this.calculateTimeFromXCoord(e.clientX);

      _this.updateSizeProgressBarDesired(e.clientX - _this.progressBarDesired.getBoundingClientRect().left);

      _this.props.dispatch({
        type: 'USER_ACTIVE'
      });

      _this.props.dispatch({
        type: 'UPDATE_ASKED_TIME',
        payload: {
          askedTime: askedTime
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "stopScrubberButton", function (e) {
      e.stopPropagation();
      document.removeEventListener('mousemove', _this.moveScrubberButton, true);
      document.removeEventListener('mouseup', _this.stopScrubberButton, true);

      var askedTime = _this.calculateTimeFromXCoord(e.clientX);

      _this.props.dispatch({
        type: 'UPDATE_ASKED_TIME',
        payload: {
          askedTime: askedTime
        }
      });

      _this.props.dispatch({
        type: 'ALLOW_UNHIGHLIGHT_PROGRESS_BAR'
      });

      _this.props.dispatch({
        type: 'ALLOW_MENU_HIDING'
      });

      _this.props.dispatch({
        type: 'USER_ACTIVE'
      });

      _this.updateSizeProgressBarDesired(e.clientX - _this.progressBarDesired.getBoundingClientRect().left);

      if (!isInsideElement(_this.progressBarWrapper, e)) _this.props.dispatch({
        type: 'UNHIGHLIGHT_PROGRESS_BAR'
      });

      _this.props.dispatch({
        type: 'CHANNELS_CONTINUE'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "calculateTimeFromXCoord", function (clientX) {
      var x = clientX - _this.progressBarWrapper.getBoundingClientRect().left;

      if (x <= 0 || _this.props.duration === 0) {
        return 0;
      } else if (x >= _this.progressBarWrapper.clientWidth) {
        return _this.props.duration;
      } else {
        return x / _this.progressBarWrapper.clientWidth * _this.props.duration;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseEnter", function (e) {
      e.stopPropagation();

      _this.props.dispatch({
        type: 'HIGHLIGHT_PROGRESS_BAR'
      });

      _this.updateSizeProgressBarDesired(e.clientX - _this.progressBarDesired.getBoundingClientRect().left);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function (e) {
      e.stopPropagation();
      if (_this.props.allowUnhighlightProgressBar) _this.props.dispatch({
        type: 'UNHIGHLIGHT_PROGRESS_BAR'
      });

      _this.updateSizeProgressBarDesired(0);
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      e.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseMove", function (e) {
      e.stopPropagation();

      _this.updateSizeProgressBarDesired(e.clientX - _this.progressBarDesired.getBoundingClientRect().left);
    });

    _defineProperty(_assertThisInitialized(_this), "updateSizeProgressBarDesired", function (size) {
      if (size > _this.progressBarWrapper.getBoundingClientRect().width) size = _this.progressBarWrapper.getBoundingClientRect().width;
      _this.progressBarDesired.style.width = size + "px";
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var progressBarLeftMargin, loadedBarLeftMargin;
      if (_this.props.duration > 0) progressBarLeftMargin = _this.props.currentTime / _this.props.duration * 100 + "%";
      if (_this.props.duration > 0) loadedBarLeftMargin = _this.props.timeRangeBuffered / _this.props.duration * 100 + "%";else progressBarLeftMargin = "0%";
      var scrubberButton, progressBarWrappper, progressBarClassName, progressBarLoadedClassName, progressBarProgressionClassName, progressBarDesiredClassName;

      if (_this.props.highlightProgressBar) {
        scrubberButton = /*#__PURE__*/React.createElement("div", {
          className: "wmp-scrubber-button",
          ref: function ref(node) {
            return _this.nodeScrubberButton = node;
          },
          style: {
            left: progressBarLeftMargin
          }
        });
        progressBarWrappper = "wmp-progress-bar-wrapper wmp-progress-bar-wrapper-highighted";
        progressBarClassName = "wmp-progress-bar wmp-progress-bar-highighted";
        progressBarLoadedClassName = "wmp-progress-bar loaded wmp-progress-bar-highighted";
        progressBarProgressionClassName = "wmp-progress-bar progression wmp-progress-bar-highighted";
        progressBarDesiredClassName = "wmp-progress-bar desired wmp-progress-bar-highighted";
      } else {
        progressBarWrappper = "wmp-progress-bar-wrapper";
        progressBarClassName = "wmp-progress-bar";
        progressBarLoadedClassName = "wmp-progress-bar loaded";
        progressBarProgressionClassName = "wmp-progress-bar progression";
        progressBarDesiredClassName = "wmp-progress-bar desired";
      }

      return /*#__PURE__*/React.createElement("div", {
        className: progressBarWrappper,
        ref: function ref(progressBarWrapper) {
          return _this.progressBarWrapper = progressBarWrapper;
        },
        onMouseEnter: _this.handleMouseEnter,
        onMouseLeave: _this.handleMouseLeave,
        onMouseMove: _this.handleMouseMove,
        onMouseDown: _this.handleMouseDown,
        onClick: _this.handleClick
      }, /*#__PURE__*/React.createElement("div", {
        className: progressBarClassName
      }), /*#__PURE__*/React.createElement("div", {
        className: progressBarLoadedClassName,
        style: {
          width: loadedBarLeftMargin
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: progressBarProgressionClassName,
        style: {
          width: progressBarLeftMargin,
          backgroundColor: _this.props.color
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: progressBarDesiredClassName,
        ref: function ref(progressBarDesired) {
          return _this.progressBarDesired = progressBarDesired;
        }
      }), scrubberButton);
    });

    return _this;
  }

  return ProgressBar;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    timeRangeBuffered: state.timeRangeBuffered,
    highlightProgressBar: state.highlightProgressBar,
    currentTime: state.currentTime,
    duration: state.duration,
    progressBarLeftMargin: state.progressBarLeftMargin,
    allowUnhighlightProgressBar: state.allowUnhighlightProgressBar,
    color: state.color
  };
};

export default connect(mapStateToProps)(ProgressBar);