function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var hideCursor = function hideCursor(state) {
  if (state.isFullscreen) {
    return _extends({}, state, {
      hideCursor: false
    });
  } else return state;
};

export default hideCursor;