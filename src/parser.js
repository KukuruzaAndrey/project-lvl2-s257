import { safeLoad } from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
};
export default ext => (data) => {
  const parse = parsers[ext];
  if (!parse) {
    throw new Error(`unknown format: ${ext}`);
  }
  return parse(data);
};

