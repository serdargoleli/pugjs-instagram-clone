const { src, dest, watch, series } = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const prefixer = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");

// create functions

// pug
function compileHtml() {
  return src("app/views/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(dest("./"));
}

// scss
function compileScss() {
  return src("app/assets/scss/**/*.scss").pipe(sass()).pipe(prefixer()).pipe(minify()).pipe(dest("dist/css"));
}

// js
// function jsMin() {
//   return src("app/assets/js/**/*.js").pipe(terser()).pipe(dest("dist/js/"));
// }

// watch
function watchTask() {
  watch(["app/views/**/*.pug", "app/assets/scss/**/*.scss"], series(compileHtml, compileScss));
  // watch(["app/views/**/*.pug", "app/assets/scss/**/*.scss", "app/assets/js/**/*.js"], series(compileHtml, compileScss, jsMin));
}

// defaults
exports.default = series(compileHtml, compileScss, watchTask);
// exports.default = series(compileHtml, compileScss, jsMin, watchTask);
