function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

//this.props.dispatch({ type: 'ADD_IMAGE', payload: { index: i, image: image } });
var addImage = function addImage(state, action) {
  return _extends({}, state, {
    slideshow: state.slideshow.map(function (content, i) {
      return i === action.payload.index ? _extends({}, content, {
        element: action.payload.image
      }) : content;
    })
  });
};

export default addImage;