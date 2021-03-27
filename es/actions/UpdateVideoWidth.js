function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var updateVideoWidth = function updateVideoWidth(state, action) {
  return _extends({}, state, {
    videoWidth: action.payload.videoWidth
  });
};

export default updateVideoWidth;