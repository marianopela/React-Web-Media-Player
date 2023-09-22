function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { getInitState } from './services/StateInitiator';
import Container from './components/Container';
import reducer from './reducers/Reducer';

var ReactWebMediaPlayer = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ReactWebMediaPlayer, _Component);

  function ReactWebMediaPlayer(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "shouldComponentUpdate", function (nextProps) {
      _this.store.dispatch({
        type: 'INIT_STATE',
        payload: {
          state: getInitState(nextProps)
        }
      });

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "UNSAFE_componentWillMount", function () {
      _this.store = _this.props.store !== undefined ? _this.props.store : createStore(reducer);

      _this.store.dispatch({
        type: 'INIT_STATE',
        payload: {
          state: getInitState(_this.props)
        }
      });
    });

    return _this;
  }

  var _proto = ReactWebMediaPlayer.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/React.createElement(Provider, {
      store: this.store
    }, /*#__PURE__*/React.createElement(Container, null));
  };

  return ReactWebMediaPlayer;
}(Component);

export default ReactWebMediaPlayer;
