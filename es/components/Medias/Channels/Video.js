function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isIE } from '../../../services/Utils';
var FLOAT_IMPRECISION = 0.1;

var Video = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Video, _Component);

  function Video() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "isPlaying", function () {
      return !_this.video.paused;
    });

    _defineProperty(_assertThisInitialized(_this), "getCurrentTime", function () {
      return _this.video.currentTime;
    });

    _defineProperty(_assertThisInitialized(_this), "load", function () {
      _this.video.load();
    });

    _defineProperty(_assertThisInitialized(_this), "play", function () {
      if (!_this.isPlaying()) {
        var playPromise = _this.video.play();

        if (playPromise !== undefined) {
          playPromise.then(function (_) {// Automatic playback started!
          })["catch"](function (_) {// Auto-play was prevented
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "changeTime", function (time) {
      _this.video.currentTime = time;
    });

    _defineProperty(_assertThisInitialized(_this), "pause", function () {
      if (_this.isPlaying()) _this.video.pause();
    });

    _defineProperty(_assertThisInitialized(_this), "stop", function () {
      if (_this.isPlaying()) _this.video.pause();
      _this.video.currentTime = _this.props.duration;
    });

    _defineProperty(_assertThisInitialized(_this), "timeRangeBuffered", function (time) {
      for (var i = 0; i < _this.video.buffered.length; i++) {
        var portionStartTime = _this.video.buffered.start(i);

        var portionEndTime = _this.video.buffered.end(i);

        if (time >= portionStartTime && time <= portionEndTime) {
          return portionEndTime;
        }
      }

      return time;
    });

    _defineProperty(_assertThisInitialized(_this), "displayVideo", function () {
      var width, height;

      if (_this.props.isFullscreenActivated) {
        width = window.screen.width;
        height = window.screen.height;
      } else {
        width = _this.props.width;
        height = _this.props.height;
      }

      _this.video.width = width;
      _this.video.height = height;
    });

    _defineProperty(_assertThisInitialized(_this), "setVolume", function (volume) {
      _this.video.volume = volume;
    });

    _defineProperty(_assertThisInitialized(_this), "mute", function () {
      _this.video.muted = true;
    });

    _defineProperty(_assertThisInitialized(_this), "unMute", function () {
      _this.video.muted = false;
    });

    _defineProperty(_assertThisInitialized(_this), "getDuration", function () {
      return _this.video.duration;
    });

    _defineProperty(_assertThisInitialized(_this), "handleWaiting", function () {
      if (!isIE() && _this.video.currentTime < _this.video.duration - FLOAT_IMPRECISION) _this.props.dispatch({
        type: 'VIDEO_IS_NOT_READY'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleCanPlayThrough", function () {
      _this.props.dispatch({
        type: 'VIDEO_IS_READY'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleLoadedMetaData", function () {
      var duration = _this.video.duration;

      _this.props.dispatch({
        type: 'UPDATE_DURATION',
        payload: {
          duration: duration
        }
      });

      _this.props.dispatch({
        type: 'UPDATE_VIDEO_WIDTH',
        payload: {
          videoWidth: _this.video.videoWidth
        }
      });

      _this.props.dispatch({
        type: 'UPDATE_VIDEO_HEIGHT',
        payload: {
          videoHeight: _this.video.videoHeight
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSeeking", function () {
      if (isIE() && _this.video.currentTime < _this.video.duration - FLOAT_IMPRECISION && Math.round(_this.video.currentTime * 100) / 100 !== 0) _this.props.dispatch({
        type: 'VIDEO_IS_NOT_READY'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSeeked", function () {
      if (isIE()) _this.props.dispatch({
        type: 'VIDEO_IS_READY'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handlePlay", function () {
      if (isIE()) {
        _this.props.dispatch({
          type: 'VIDEO_IS_READY'
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "adaptImageToWidth", function (width) {
      return {
        marginTop: (_this.props.fullscreenHeight - _this.props.videoHeight / _this.props.videoWidth * _this.props.fullscreenWidth) / 2,
        width: width,
        height: _this.props.videoHeight / _this.props.videoWidth * _this.props.fullscreenWidth
      };
    });

    _defineProperty(_assertThisInitialized(_this), "adaptImageToHeight", function (height) {
      return {
        marginLeft: (_this.props.fullscreenWidth - _this.props.videoWidth / _this.props.videoHeight * _this.props.fullscreenHeight) / 2,
        height: height,
        width: _this.props.videoWidth / _this.props.videoHeight * _this.props.fullscreenHeight
      };
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      if (_this.props.muted) _this.mute();
    });

    _defineProperty(_assertThisInitialized(_this), "shouldComponentUpdate", function (nextProps) {
      //player props changed
      if (_this.props.initTime !== nextProps.initTime) _this.load();
      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var dimensions;

      if (_this.props.isFullscreenActivated) {
        if (_this.props.videoWidth >= _this.props.videoHeight) {
          if (_this.props.videoHeight / _this.props.videoWidth * _this.props.fullscreenWidth <= _this.props.fullscreenHeight) {
            dimensions = _this.adaptImageToWidth(_this.props.fullscreenWidth);
          } else {
            dimensions = _this.adaptImageToHeight(_this.props.fullscreenHeight);
          }
        } else {
          if (_this.props.videoHeight / _this.props.videoWidth * _this.props.fullscreenWidth <= _this.props.fullscreenHeight) {
            dimensions = _this.adaptImageToWidth(_this.props.fullscreenWidth);
          } else {
            dimensions = _this.adaptImageToHeight(_this.props.fullscreenHeight);
          }
        }
      } else {
        dimensions = {
          width: _this.props.width,
          height: _this.props.height
        };
      }

      return /*#__PURE__*/React.createElement("video", {
        width: dimensions.width,
        style: {
          marginLeft: dimensions.marginLeft,
          marginTop: dimensions.marginTop
        },
        ref: function ref(video) {
          return _this.video = video;
        },
        height: dimensions.height,
        onLoadedMetadata: _this.handleLoadedMetaData,
        onWaiting: _this.handleWaiting,
        onCanPlayThrough: _this.handleCanPlayThrough,
        onSeeked: _this.handleSeeked,
        onSeeking: _this.handleSeeking,
        onPlay: _this.handlePlay,
        onEnded: _this.handleEnded
      }, /*#__PURE__*/React.createElement("source", {
        src: _this.props.video
      }));
    });

    return _this;
  }

  return Video;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    isPlaying: state.isPlaying,
    fullscreenWidth: window.innerWidth,
    fullscreenHeight: window.innerHeight,
    videoHeight: state.videoHeight,
    videoWidth: state.videoWidth,
    isFullscreenActivated: state.isFullscreenActivated,
    duration: state.duration,
    video: state.video,
    width: state.width,
    height: state.height,
    isReadingTerminated: state.isReadingTerminated,
    muted: state.muted,
    initTime: state.initTime
  };
};

export default connect(mapStateToProps, null, null, {
  forwardRef: true
})(Video);