import Fontagon from 'fontagon';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = Fontagon({
  files: [
    path.resolve(__dirname, 'webfont-icons-optimized/*.svg')
  ],
  dist: path.resolve(__dirname, 'webfont-fontagon/'),
  fontName: 'fontagon-icons',
  style: 'all',
  classOptions: {
    baseClass: 'fontagon-icons',
    classPrefix: 'ft'
  }
});

result.then((opts) => {
  console.log('done! ', opts);
}).catch((err) => {
  console.log('fail! ', err);
});
