import * as fs from 'fs';
import * as path from 'path';
import parse from './parser.js';
import getComparedData from './compare-data.js';
import format from './formatters/index.js';

const readFile = (filepath) => {
  const filetype = path.extname(filepath).slice(1);
  return parse(fs.readFileSync(filepath, 'utf8'), filetype);
};

const genDiff = (filepath1, filepath2, formatName) => {
  const data = getComparedData(readFile(filepath1), readFile(filepath2));
  return format(data, formatName);
};

export default genDiff;
