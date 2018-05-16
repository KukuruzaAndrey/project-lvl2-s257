import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
  '.ini': parse,
};
export default ext => (data) => {
  const parser = parsers[ext];
  if (!parser) {
    throw new Error(`unknown format: ${ext}`);
  }
  return parser(data);
};

