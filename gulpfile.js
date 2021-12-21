const { src, dest, watch, series } = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const prefixer = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");
const browsersync = require("browser-sync");

// create functions

// pug
function compileHtml() {
  return src("app/views/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(dest("dist/html"));
}

// scss
function compileScss() {
  return src("app/assets/scss/**/*.scss").pipe(sass()).pipe(prefixer()).pipe(minify()).pipe(dest("dist/css"));
}

// js
function jsMin() {
  return src("app/assets/js/**/*.js").pipe(terser()).pipe(dest("dist/js/"));
}

// Browsersync
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: "dist/html/",
    },
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// watch
function watchTask() {
  watch("app/dist/html/*.html", browsersyncReload);
  watch(["app/views/*.pug", "app/assets/scss/**/*.scss", "app/assets/js/**/*.js"], series(compileHtml, compileScss, jsMin, browsersyncReload));
}

// defaults
exports.default = series(compileHtml, compileScss, jsMin, browsersyncServe, watchTask);
