function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Thumbnail.css';

var Thumbnail = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Thumbnail, _Component);

  function Thumbnail() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      if (_this.props.thumbnail !== undefined) {
        var style = {
          backgroundImage: "url(" + _this.props.thumbnail + ")"
        };
        return /*#__PURE__*/React.createElement("div", {
          className: "wmp-thumbnail-overlay-image",
          style: style
        });
      }
    });

    return _this;
  }

  return Thumbnail;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    thumbnail: state.thumbnail
  };
};

export default connect(mapStateToProps)(Thumbnail);