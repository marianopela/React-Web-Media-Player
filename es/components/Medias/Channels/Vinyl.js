function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Vinyl.css';

var Vinyl = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Vinyl, _Component);

  function Vinyl(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "load", function () {
      _this.vinyl = new Image();

      _this.vinyl.onload = function (e) {
        _this.props.dispatch({
          type: 'VINYL_IS_READY'
        });
      };

      _this.vinyl.src = _this.props.vinyl;
    });

    _defineProperty(_assertThisInitialized(_this), "adaptImageToWidth", function (width, height) {
      var imgWidth = _this.vinyl.width;
      var imgHeight = _this.vinyl.height;
      var margin = (height - imgHeight / imgWidth * width) / 2;
      return {
        marginTop: margin + "px",
        width: "100%",
        height: imgHeight / imgWidth * width + "px"
      };
    });

    _defineProperty(_assertThisInitialized(_this), "adaptImageToHeight", function (width, height) {
      var imgWidth = _this.vinyl.width;
      var imgHeight = _this.vinyl.height;
      var margin = (width - imgWidth / imgHeight * height) / 2;
      return {
        marginLeft: margin + "px",
        height: "100%",
        width: imgWidth / imgHeight * height + "px"
      };
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      if (!_this.props.isVinylReady) return '';
      var width, height;
      var imageSliderStyle = {};
      var blackHole, blackHoleSize;

      if (_this.vinyl !== null) {
        if (_this.props.isFullscreenActivated) {
          width = _this.props.fullscreenWidth;
          height = _this.props.fullscreenHeight;
        } else {
          width = _this.props.width;
          height = _this.props.height;
        }

        var imgWidth = _this.vinyl.width;
        var imgHeight = _this.vinyl.height;

        if (imgWidth >= imgHeight) {
          if (imgHeight / imgWidth * width <= height) {
            blackHoleSize = width;
            imageSliderStyle = _this.adaptImageToWidth(width, height);
          } else {
            blackHoleSize = height;
            imageSliderStyle = _this.adaptImageToHeight(width, height);
          }
        } else {
          if (imgHeight / imgWidth * width <= height) {
            blackHoleSize = width;
            imageSliderStyle = _this.adaptImageToWidth(width, height);
          } else {
            blackHoleSize = height;
            imageSliderStyle = _this.adaptImageToHeight(width, height);
          }
        }
      }

      if (_this.props.rpm !== 0) {
        var time = Math.round(60 / _this.props.rpm);
        imageSliderStyle.animation = "vinyl-spin " + time + "s linear infinite";
        imageSliderStyle.borderRadius = "100%";
        imageSliderStyle.overflow = "hidden";

        if (_this.props.isPlaying) {
          imageSliderStyle.animationPlayState = "running";
        } else {
          imageSliderStyle.animationPlayState = "paused";
        }

        blackHole = /*#__PURE__*/React.createElement("div", {
          style: {
            marginLeft: "-" + blackHoleSize / 20 + "px",
            marginTop: "-" + blackHoleSize / 20 + "px",
            height: "" + blackHoleSize / 10 + "px",
            width: "" + blackHoleSize / 10 + "px",
            backgroundColor: "black",
            borderRadius: "100%",
            position: "absolute",
            left: "50%",
            top: "50%",
            zIndex: "10"
          }
        });
      }

      return /*#__PURE__*/React.createElement("span", null, blackHole, /*#__PURE__*/React.createElement("img", {
        style: imageSliderStyle,
        src: _this.props.vinyl,
        alt: ""
      }));
    });

    _this.load();

    return _this;
  }

  return Vinyl;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    isInitialized: state.isInitialized,
    fullscreenWidth: window.innerWidth,
    fullscreenHeight: window.innerHeight,
    isFullscreenActivated: state.isFullscreenActivated,
    vinyl: state.vinyl,
    isVinylReady: state.isVinylReady,
    currentTime: state.currentTime,
    width: state.width,
    height: state.height,
    rpm: state.rpm,
    isPlaying: state.isPlaying
  };
};

export default connect(mapStateToProps, null, null, {
  forwardRef: true
})(Vinyl);