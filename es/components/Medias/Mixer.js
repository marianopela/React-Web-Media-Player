function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from "./Channels/Video";
import Audio from "./Channels/Audio";
import Slideshow from "./Channels/Slideshow";
import Vinyl from "./Channels/Vinyl";
import { isIE, isNaN } from '../../services/Utils';
var MAX_DIFFERENCE_AUDIO_SLIDESHOW = 0.1; //in seconds

var BUFFER_UPDATE_PRECISION = 0.1; //in seconds

var IE_IMPRECISION = 1;
var ASKED_TIME_TREATED = "isTreated";
var FLOAT_IMPRECISION = 0.1;

var Mixer = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Mixer, _Component);

  function Mixer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "synchronize", function () {
      if (!_this.props.channelsWait) {
        if (_this.props.hasVideo) {
          var currentTime = _this.video.getCurrentTime();

          if (currentTime <= _this.video.getDuration() + IE_IMPRECISION) {
            _this.props.dispatch({
              type: 'UPDATE_CURRENT_TIME',
              payload: {
                currentTime: currentTime
              }
            });
          } else {
            return;
          }
        } else {
          if (_this.props.hasAudio && _this.props.hasSlideshow) {
            if (_this.audio.getDuration() > _this.props.currentTime) {
              var _currentTime = _this.audio.getCurrentTime();

              if (_currentTime <= _this.audio.getDuration() + IE_IMPRECISION) {
                _this.props.dispatch({
                  type: 'UPDATE_CURRENT_TIME',
                  payload: {
                    currentTime: _currentTime
                  }
                });

                var diff = Math.abs(_this.audio.getCurrentTime() - _this.slideshow.getCurrentTime());
                if (diff > MAX_DIFFERENCE_AUDIO_SLIDESHOW) //re-synchronize audio and slideshow 
                  _this.slideshow.changeTime(_this.audio.getCurrentTime());
              } else {
                return;
              }
            } else {
              _this.props.dispatch({
                type: 'UPDATE_CURRENT_TIME',
                payload: {
                  currentTime: _this.slideshow.getCurrentTime()
                }
              });
            }
          } else if (_this.props.hasAudio && _this.props.hasVinyl) {
            var _currentTime2 = _this.audio.getCurrentTime();

            if (_currentTime2 <= _this.audio.getDuration()) {
              _this.props.dispatch({
                type: 'UPDATE_CURRENT_TIME',
                payload: {
                  currentTime: _currentTime2
                }
              });
            } else {
              return;
            }
          } else {
            _this.props.dispatch({
              type: 'UPDATE_CURRENT_TIME',
              payload: {
                currentTime: _this.slideshow.getCurrentTime()
              }
            });
          }
        }
      } //Sometime the video is already loaded and no event generated by the HTML5 API allows you to turn off the loading state, this force it 
      //May generate undesired side-effects


      if (_this.props.hasVideo && _this.props.currentTime > 0.1) {
        _this.props.dispatch({
          type: 'NOT_LOADING'
        });
      }

      if (_this.props.currentTime >= _this.props.duration && _this.props.duration > 0) {
        _this.stop();

        _this.props.dispatch({
          type: 'READING_TERMINATED'
        });

        _this.props.dispatch({
          type: 'PAUSE'
        });

        _this.props.dispatch({
          type: 'SHOW_MENUS'
        });

        return;
      }

      _this.refreshBufferState();
    });

    _defineProperty(_assertThisInitialized(_this), "refreshBufferState", function () {
      var timeRangeBuffered;

      if (_this.props.hasVideo) {
        timeRangeBuffered = _this.video.timeRangeBuffered(_this.props.currentTime);
      } else {
        if (_this.props.hasAudio && _this.props.hasSlideshow) {
          var audioTimeRangeBuffered = _this.audio.timeRangeBuffered(_this.props.currentTime);

          var slideshowTimeRangeBuffered = _this.slideshow.timeRangeBuffered(_this.props.currentTime);

          if (_this.audio.getDuration() < _this.props.currentTime || audioTimeRangeBuffered > _this.audio.getDuration() - 0.1) {
            timeRangeBuffered = _this.slideshow.timeRangeBuffered(_this.props.currentTime);
          } else {
            timeRangeBuffered = audioTimeRangeBuffered < slideshowTimeRangeBuffered ? audioTimeRangeBuffered : slideshowTimeRangeBuffered;
          }
        } else if (_this.props.hasAudio && _this.props.hasVinyl) {
          timeRangeBuffered = _this.audio.timeRangeBuffered(_this.props.currentTime);
        } else {
          timeRangeBuffered = _this.slideshow.timeRangeBuffered(_this.props.currentTime);
        }
      }

      if (timeRangeBuffered !== _this.props.timeRangeBuffered && Math.abs(timeRangeBuffered - _this.props.timeRangeBuffered) >= BUFFER_UPDATE_PRECISION) {
        _this.props.dispatch({
          type: 'UPDATE_TIME_RANGE_BUFFERED',
          payload: {
            timeRangeBuffered: timeRangeBuffered
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "play", function () {
      if (_this.props.currentTime >= _this.props.duration && _this.props.duration > 0) {
        _this.stop();

        _this.props.dispatch({
          type: 'NOT_LOADING'
        });

        _this.props.dispatch({
          type: 'PREVENT_MENU_HIDING'
        });

        _this.props.dispatch({
          type: 'PAUSE'
        });

        _this.props.dispatch({
          type: 'READING_TERMINATED'
        });

        _this.props.dispatch({
          type: 'SHOW_MENUS'
        });

        return;
      }

      window.clearInterval(_this.bufferTimer);

      _this.refreshBufferState();

      _this.bufferTimer = window.setInterval(_this.refreshBufferState);
      window.clearInterval(_this.timer);

      _this.synchronize();

      _this.timer = window.setInterval(_this.synchronize, 20);

      if (_this.props.hasVideo) {
        _this.video.play();
      }

      if (_this.props.hasAudio) {
        //When the slideshow last longer than the audio track, it prevent to play the audio track when the current time is bigger than the audio duration 
        if (_this.props.hasSlideshow) {
          if (_this.props.currentTime < _this.audio.getDuration()) _this.audio.play();
        } else {
          _this.audio.play();
        }
      }

      if (_this.props.hasSlideshow) {
        _this.slideshow.play();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "pause", function () {
      window.clearInterval(_this.timer);

      if (_this.props.isInitialized) {
        window.clearInterval(_this.bufferTimer);

        _this.refreshBufferState();

        _this.bufferTimer = window.setInterval(_this.refreshBufferState);
      }

      if (_this.props.hasVideo) {
        _this.video.pause();
      }

      if (_this.props.hasAudio) {
        _this.audio.pause();
      }

      if (_this.props.hasSlideshow) {
        _this.slideshow.pause();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "changeTime", function (time) {
      if (time >= _this.props.duration && _this.props.duration > 0) {
        _this.stop();

        _this.props.dispatch({
          type: 'NOT_LOADING'
        });

        _this.props.dispatch({
          type: 'READING_TERMINATED'
        });

        _this.props.dispatch({
          type: 'PAUSE'
        });

        _this.props.dispatch({
          type: 'SHOW_MENUS'
        });

        return;
      }

      if (_this.props.isPlaying) {
        window.clearInterval(_this.timer);

        _this.synchronize();

        _this.timer = window.setInterval(_this.synchronize, 20);
      }

      window.clearInterval(_this.bufferTimer);

      _this.refreshBufferState();

      _this.bufferTimer = window.setInterval(_this.refreshBufferState);

      if (_this.props.hasVideo) {
        _this.video.changeTime(time);
      }

      if (_this.props.hasAudio && time < _this.audio.getDuration()) {
        _this.audio.changeTime(time);
      }

      if (_this.props.hasSlideshow) {
        _this.slideshow.changeTime(time);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "stop", function () {
      window.clearInterval(_this.timer);
      window.clearInterval(_this.bufferTimer);

      if (_this.props.hasVideo) {
        _this.video.stop();
      }

      if (_this.props.hasAudio) {
        _this.audio.stop();
      }

      if (_this.props.hasSlideshow) {
        _this.slideshow.stop();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setVolume", function (volume) {
      if (_this.props.hasVideo) _this.video.setVolume(volume);else if (_this.props.hasAudio) _this.audio.setVolume(volume);
    });

    _defineProperty(_assertThisInitialized(_this), "mute", function () {
      if (_this.props.hasVideo) _this.video.mute();else if (_this.props.hasAudio) _this.audio.mute();
    });

    _defineProperty(_assertThisInitialized(_this), "unmute", function () {
      if (_this.props.hasVideo) _this.video.unMute();else if (_this.props.hasAudio) _this.audio.unMute();
    });

    _defineProperty(_assertThisInitialized(_this), "hasEnoughBuffered", function () {
      if (_this.props.hasVideo) return _this.props.isVideoReady;else if (_this.props.hasAudio && _this.props.hasSlideshow && _this.props.currentTime < _this.audio.getDuration()) return _this.props.isAudioReady && _this.props.isSlideshowReady;else if (_this.props.hasAudio && _this.props.hasVinyl) return _this.props.isAudioReady && _this.props.isVinylReady;else return _this.props.isSlideshowReady;
    });

    _defineProperty(_assertThisInitialized(_this), "handleChannelsBufferStateChange", function () {
      if (_this.hasEnoughBuffered()) {
        _this.props.dispatch({
          type: 'NOT_LOADING'
        });

        if (_this.props.isPlaying && !_this.props.channelsWait) _this.play();
      } else {
        _this.props.dispatch({
          type: 'LOADING'
        });

        _this.pause();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.handleChannelsBufferStateChange();

      _this.setVolume(_this.props.volume);
    });

    _defineProperty(_assertThisInitialized(_this), "shouldComponentUpdate", function (nextProps) {
      //player props changed
      if (_this.props.initTime !== nextProps.initTime) {
        window.clearInterval(_this.timer);
        window.clearInterval(_this.bufferTimer);
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillMount", function () {
      if (_this.props.autoplay) {
        window.addEventListener('load', function () {
          _this.props.dispatch({
            type: 'INITIALIZE_PLAYER'
          });

          _this.props.dispatch({
            type: 'PLAY'
          });

          _this.props.dispatch({
            type: 'USER_ACTIVE'
          });
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevprops) {
      if (prevprops.initTime !== _this.props.initTime) {
        if (_this.props.autoplay) {
          _this.props.dispatch({
            type: 'INITIALIZE_PLAYER'
          });

          _this.props.dispatch({
            type: 'PLAY'
          });

          _this.props.dispatch({
            type: 'USER_ACTIVE'
          });
        }
      }

      if (prevprops.isInitialized === false && _this.props.isInitialized === true) {
        _this.props.dispatch({
          type: 'LOADING'
        });

        if (_this.props.hasSlideshow) {
          _this.slideshow.load();
        }

        if (_this.props.hasAudio && isNaN(_this.audio.getDuration())) {
          _this.audio.load();
        } else if (_this.props.hasVideo && isNaN(_this.video.getDuration())) {
          _this.video.load();
        } else {
          _this.play();
        }

        return;
      }

      if (prevprops.duration !== _this.props.duration && _this.props.isInitialized) {
        _this.play();
      } //Prevent other functions based on the audio track duration or the video track duration to generate undesired side-effects


      if (_this.props.hasAudio && isNaN(_this.audio.getDuration())) {
        return;
      } else if (_this.props.hasVideo && isNaN(_this.video.getDuration())) {
        return;
      }

      if (prevprops.muted !== _this.props.muted) {
        if (_this.props.muted) {
          _this.mute();

          _this.play();
        } else {
          _this.unmute();
        }
      }

      if (prevprops.askNextImage !== _this.props.askNextImage) {
        var time = _this.slideshow.getTimeNextImage();

        _this.changeTime(time);

        _this.props.dispatch({
          type: 'UPDATE_CURRENT_TIME',
          payload: {
            currentTime: time
          }
        });
      }

      if (prevprops.isAudioReady !== _this.props.isAudioReady || prevprops.isVideoReady !== _this.props.isVideoReady || prevprops.isSlideshowReady !== _this.props.isSlideshowReady || prevprops.isVinylReady !== _this.props.isVinylReady || prevprops.channelsWait !== _this.props.channelsWait) {
        _this.handleChannelsBufferStateChange();
      }

      if (prevprops.isPlaying !== _this.props.isPlaying) {
        if (!_this.props.channelsWait && _this.props.isPlaying && _this.hasEnoughBuffered() && _this.props.duration > 0) _this.play();else _this.pause();
      }

      if (prevprops.channelsWait !== _this.props.channelsWait) {
        if (!_this.props.channelsWait && _this.props.isPlaying && _this.hasEnoughBuffered() & _this.props.duration > 0) _this.play();else _this.pause();
      }

      if (prevprops.askedTime !== _this.props.askedTime && _this.props.duration !== 0 && _this.props.askedTime !== ASKED_TIME_TREATED) {
        _this.changeTime(_this.props.askedTime);

        if (_this.props.isReadingTerminated && _this.props.askedTime < _this.props.duration - FLOAT_IMPRECISION) {
          if (isIE() && _this.props.hasVideo && _this.props.askedTime === 0) {
            _this.video.load();

            _this.video.play();
          }

          _this.props.dispatch({
            type: 'READING_NOT_TERMINATED'
          });

          if (_this.props.allowUnhighlightProgressBar) {
            _this.props.dispatch({
              type: 'PLAY'
            });

            _this.props.dispatch({
              type: 'ALLOW_MENU_HIDING'
            });
          }
        }

        _this.props.dispatch({
          type: 'UPDATE_CURRENT_TIME',
          payload: {
            currentTime: _this.props.askedTime
          }
        });

        _this.props.dispatch({
          type: 'UPDATE_ASKED_TIME',
          payload: {
            askedTime: ASKED_TIME_TREATED
          }
        });
      }

      if (prevprops.volume !== _this.props.volume) {
        _this.setVolume(_this.props.volume);
      }

      if (prevprops.askPreviousImage !== _this.props.askPreviousImage) {
        if (_this.props.isReadingTerminated) _this.props.dispatch({
          type: 'READING_NOT_TERMINATED'
        });

        var _time = _this.slideshow.getTimePreviousImage();

        _this.changeTime(_time);

        _this.props.dispatch({
          type: 'UPDATE_CURRENT_TIME',
          payload: {
            currentTime: _time
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      window.clearInterval(_this.timer);
      window.clearInterval(_this.bufferTimer);
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var video, audio, slideshow, vinyl;

      if (_this.props.hasVideo) {
        video = /*#__PURE__*/React.createElement(Video, {
          ref: function ref(video) {
            return _this.video = video;
          }
        });
      }

      if (_this.props.hasAudio) {
        audio = /*#__PURE__*/React.createElement(Audio, {
          ref: function ref(audio) {
            return _this.audio = audio;
          }
        });
      }

      if (_this.props.hasSlideshow) {
        slideshow = /*#__PURE__*/React.createElement(Slideshow, {
          ref: function ref(slideshow) {
            return _this.slideshow = slideshow;
          }
        });
      }

      if (_this.props.hasVinyl && _this.props.isInitialized) {
        vinyl = /*#__PURE__*/React.createElement(Vinyl, null);
      }

      return /*#__PURE__*/React.createElement("div", {
        style: {
          overflow: "hidden"
        }
      }, video, audio, slideshow, vinyl);
    });

    return _this;
  }

  return Mixer;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    channelsWait: state.channelsWait,
    timeRangeBuffered: state.timeRangeBuffered,
    askNextImage: state.askNextImage,
    askPreviousImage: state.askPreviousImage,
    volume: state.volume,
    hasVideo: state.hasVideo,
    isVideoReady: state.isVideoReady,
    hasAudio: state.hasAudio,
    isAudioReady: state.isAudioReady,
    hasSlideshow: state.hasSlideshow,
    isSlideshowReady: state.isSlideshowReady,
    isInitialized: state.isInitialized,
    currentTime: state.currentTime,
    askedTime: state.askedTime,
    isPlaying: state.isPlaying,
    duration: state.duration,
    hasVinyl: state.hasVinyl,
    isVinylReady: state.isVinylReady,
    isReadingTerminated: state.isReadingTerminated,
    allowUnhighlightProgressBar: state.allowUnhighlightProgressBar,
    autoplay: state.autoplay,
    muted: state.muted,
    initTime: state.initTime
  };
};

export default connect(mapStateToProps)(Mixer);