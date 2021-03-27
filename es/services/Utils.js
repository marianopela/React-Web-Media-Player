var isInsideElement = function isInsideElement(element, event) {
  var elementPointed = document.elementFromPoint(event.clientX, event.clientY);
  return element.contains(elementPointed);
};

var isIE = function isIE() {
  return !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
};

var isNaN = function isNaN(value) {
  // eslint-disable-next-line
  return value !== value;
};

export { isInsideElement, isIE, isNaN };