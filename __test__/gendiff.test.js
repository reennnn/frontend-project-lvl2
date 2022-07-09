import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const formats = ['json', 'plain', 'stylish'];
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('has difference', () => {
  const jsonFile1 = getFixturePath('file1.json');
  const jsonFile2 = getFixturePath('file2.json');

  const yamlFile1 = getFixturePath('file1.yaml');
  const yamlFile2 = getFixturePath('file2.yaml');

  const actual = {
    json: (formatName) => genDiff(jsonFile1, jsonFile2, formatName),
    yaml: (formatName) => genDiff(yamlFile1, yamlFile2, formatName),
  };

  test.each(formats)('in %s format', (formatName) => {
    const expected = fs.readFileSync(getFixturePath(formatName), 'utf-8');
    expect(actual.json(formatName)).toBe(expected);
    expect(actual.yaml(formatName)).toBe(expected);
  });
});

test('file does not exist', () => {
  const rightFilepath = getFixturePath('file1.json');
  expect(() => genDiff(rightFilepath, 'wrongFilepath')).toThrow(/ENOENT/);
});

test('wrong file type', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file1.txt');
  expect(() => genDiff(filepath1, filepath2)).toThrow(/ENOENT/);
});
