"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseSheet;

var _parseCells = _interopRequireDefault(require("./parseCells"));

var _parseDimensions = _interopRequireDefault(require("./parseDimensions"));

var _coordinates = require("./coordinates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function parseSheet(content, xml, values, styles, properties, options) {
  var sheet = xml.createDocument(content);
  var cells = (0, _parseCells["default"])(sheet, xml, values, styles, properties, options);
  var dimensions = (0, _parseDimensions["default"])(sheet) || (0, _coordinates.calculateDimensions)(cells);
  return {
    cells: cells,
    dimensions: dimensions
  };
}
//# sourceMappingURL=parseSheet.js.map