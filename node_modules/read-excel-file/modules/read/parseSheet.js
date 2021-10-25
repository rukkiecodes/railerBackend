import parseCells from './parseCells';
import parseDimensions from './parseDimensions';
import { calculateDimensions } from './coordinates';
export default function parseSheet(content, xml, values, styles, properties, options) {
  var sheet = xml.createDocument(content);
  var cells = parseCells(sheet, xml, values, styles, properties, options);
  var dimensions = parseDimensions(sheet) || calculateDimensions(cells);
  return {
    cells: cells,
    dimensions: dimensions
  };
}
//# sourceMappingURL=parseSheet.js.map