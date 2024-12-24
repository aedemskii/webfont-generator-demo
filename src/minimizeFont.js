import Fontmin from 'fontmin';
const rename = require('gulp-rename');

const fontmin = new Fontmin()
	.src('src/webfonts-svgtofont/big.ttf')
	.use(rename('small.ttf'));
