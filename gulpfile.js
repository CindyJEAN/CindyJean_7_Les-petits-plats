"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require('node-sass'));
const browserSync = require("browser-sync").create();
const ejs = require("gulp-ejs");
sass.compiler = require("node-sass");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");


function makeCss() {
	return gulp
		.src(["./src/style/base.scss", "./src/**/*.scss"])
		.pipe(concat("style.css"))
		.pipe(sass().on("error", sass.logError))
		.pipe(
			autoprefixer({
				cascade: false,
			})
		)
		.pipe(cleanCSS({ compatibility: "ie8" }))
		.pipe(gulp.dest("./www/css"));
}

function makePage() {
	return gulp.src("./src/pages/*.html").pipe(ejs()).pipe(gulp.dest("./www"));
}

function watch() {
	browserSync.init({
		server: "./www",
	});

	gulp.watch("./src/pages/*.html", makePage);
	gulp.watch("./src/**/*.scss", makeCss);
	gulp.watch("./www").on("change", browserSync.reload);
}

module.exports = { watch };
