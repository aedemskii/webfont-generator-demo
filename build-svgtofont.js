import svgo from "gulp-svgo";
import svgtofont from "svgtofont";
import path from "path";
import { deleteAsync as del } from "del";

import { fileURLToPath } from "url";
import Fontmin from 'fontmin';
import rename from 'gulp-rename';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initWebfontTasks(gulp) {
	const paths = {
		src: "./src/webfont-icons-origin/**/*.svg",
		optimized: "./src/webfont-icons-optimized/",
		fonts: "./src/webfont-svgtofont/",
		css: "./src/webfont-svgtofont/"
	};

	gulp.task("optimize-svg", () => {
		return gulp
			.src(paths.src)
			.pipe(
				svgo({
					plugins: [
						{ removeViewBox: false },
						{ cleanupIDs: false },
					],
				})
			)
			.pipe(gulp.dest(paths.optimized));
	});

	gulp.task("generate-font", (done) => {
		svgtofont({
			src: path.resolve(__dirname, paths.optimized),
			dist: path.resolve(__dirname, paths.fonts),
			fontName: "webfont",
			outSVGReact: false,
			css: {
				output: path.resolve(__dirname, paths.css),
				fileName: "webfont",
				include: "\\.(css)$",
				cssPath: "",
			},
			website: {
				title: "Webfont Preview",
				logo: "",
				version: "1.0.0",
				template: null,
			},
			startUnicode: 0xea01,
			svgicons2svgfont: {
				normalize: true,
				fontHeight: 1000,
			},
		})
			.then(() => {
				console.log("Webfont generation completed!");
				done();
			})
			.catch((error) => {
				console.error("Error during webfont generation:", error);
				done(error);
			});
	});



	gulp.task("clean-fonts", () => {
		return del([
			`${paths.fonts}/*.eot`,
			`${paths.fonts}/*.ttf`,
			`${paths.fonts}/*.json`,
			`${paths.fonts}/*.symbol.svg`,
		]);
	});

	gulp.task(
		"generate-webfont",
		gulp.series("optimize-svg", "generate-font"/*, "clean-fonts"*/)
	);
}

export default initWebfontTasks;
