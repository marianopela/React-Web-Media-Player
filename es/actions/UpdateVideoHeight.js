function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var updateVideoHeight = function updateVideoHeight(state, action) {
  return _extends({}, state, {
    videoHeight: action.payload.videoHeight
  });
};

export default updateVideoHeight;