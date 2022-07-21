import yaml from 'js-yaml';

const parse = (string, filetype) => {
  switch (filetype) {
    case 'yaml':
    case 'yml':
      return yaml.load(string);
    case 'json':
      return JSON.parse(string);
    default:
      throw new Error('Wrong filetype. Use json or yaml');
  }
};

export default parse;
