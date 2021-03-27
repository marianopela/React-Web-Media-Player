function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isIE } from '../../../services/Utils';
var FLOAT_IMPRECISION = 0.1;

var Audio = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Audio, _Component);

  function Audio() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "isPlaying", function () {
      return !_this.audio.paused;
    });

    _defineProperty(_assertThisInitialized(_this), "getCurrentTime", function () {
      return _this.audio.currentTime;
    });

    _defineProperty(_assertThisInitialized(_this), "load", function () {
      _this.audio.load();
    });

    _defineProperty(_assertThisInitialized(_this), "play", function () {
      if (!_this.isPlaying()) {
        var playPromise = _this.audio.play();

        if (playPromise !== undefined) {
          playPromise.then(function (_) {// Automatic playback started!
          })["catch"](function (_) {// Auto-play was prevented
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "changeTime", function (time) {
      _this.audio.currentTime = time;
    });

    _defineProperty(_assertThisInitialized(_this), "pause", function () {
      if (_this.isPlaying()) _this.audio.pause();
    });

    _defineProperty(_assertThisInitialized(_this), "stop", function () {
      if (_this.isPlaying()) _this.audio.pause();
      _this.audio.currentTime = _this.props.duration;
    });

    _defineProperty(_assertThisInitialized(_this), "timeRangeBuffered", function (time) {
      for (var i = 0; i < _this.audio.buffered.length; i++) {
        var portionStartTime = _this.audio.buffered.start(i);

        var portionEndTime = _this.audio.buffered.end(i);

        if (time >= portionStartTime && time <= portionEndTime) {
          return portionEndTime;
        }
      }

      return time;
    });

    _defineProperty(_assertThisInitialized(_this), "setVolume", function (volume) {
      _this.audio.volume = volume;
    });

    _defineProperty(_assertThisInitialized(_this), "mute", function () {
      _this.audio.muted = true;
    });

    _defineProperty(_assertThisInitialized(_this), "unMute", function () {
      _this.audio.muted = false;
    });

    _defineProperty(_assertThisInitialized(_this), "getDuration", function () {
      return _this.audio.duration;
    });

    _defineProperty(_assertThisInitialized(_this), "handleWaiting", function () {
      if (!isIE() && _this.audio.currentTime < _this.audio.duration - FLOAT_IMPRECISION) _this.props.dispatch({
        type: 'AUDIO_IS_NOT_READY'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleCanPlayThrough", function () {
      if (!isIE()) _this.props.dispatch({
        type: 'AUDIO_IS_READY'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSeeking", function () {
      if (isIE()) _this.props.dispatch({
        type: 'AUDIO_IS_NOT_READY'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSeeked", function () {
      if (isIE()) _this.props.dispatch({
        type: 'AUDIO_IS_READY'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handlePlay", function () {
      if (isIE()) {
        _this.props.dispatch({
          type: 'AUDIO_IS_READY'
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleLoadedMetaData", function () {
      if (_this.props.hasVinyl) {
        var duration = _this.audio.duration;

        _this.props.dispatch({
          type: 'UPDATE_DURATION',
          payload: {
            duration: duration
          }
        });
      }
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
      return /*#__PURE__*/React.createElement("audio", {
        src: _this.props.audio,
        ref: function ref(audio) {
          return _this.audio = audio;
        },
        onWaiting: _this.handleWaiting,
        onCanPlayThrough: _this.handleCanPlayThrough,
        onSeeked: _this.handleSeeked,
        onSeeking: _this.handleSeeking,
        onPlay: _this.handlePlay,
        onLoadedMetadata: _this.handleLoadedMetaData
      });
    });

    return _this;
  }

  return Audio;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    duration: state.duration,
    audio: state.audio,
    hasVinyl: state.hasVinyl,
    muted: state.muted,
    initTime: state.initTime
  };
};

export default connect(mapStateToProps, null, null, {
  forwardRef: true
})(Audio);