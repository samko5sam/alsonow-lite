const { series, src, dest } = require('gulp')
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const pipeline = require('readable-stream').pipeline
const jshint = require('gulp-jshint')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin')

async function runimagemin(cb) {
  src('src/img/*')
		.pipe(imagemin())
		.pipe(dest('dist/img'))
}
function defaultTask(cb) {
  // place code for your default task here
  cb()
}
function runuglify(cb) {
  return src("src/js/*.js")
		// .pipe(rename("bundle.min.js"))
		.pipe(uglify())
		.pipe(dest("src/minjs"));
}
function runconcatjs(cb) {
  return src([
    'src/minjs/jquery-3.6.0.min.js',
    'src/minjs/bootstrap.bundle.js',
    'src/minjs/notify.min.js',
    'src/minjs/jquery.qrcode.min.js',
    'src/minjs/cookies.js',
    'src/minjs/appEE.js'
  ])
    .pipe(concat('bundle.js'))
    .pipe(dest('dist'));
}
function runconcatcss(cb) {
  return src([
    'src/mincss/!(style)*.css', // all files that end in .css EXCEPT style*.css
    'src/mincss/style.css'
  ])
    .pipe(concat('bundle.css'))
    .pipe(dest('dist'));
}
function lint(cb) {
  return src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
}
function minify(cb) {
  return src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(dest('dist'));
}
function clean(cb) {
  return del(['dist'])
}
function cleanmindir(cb) {
  return del(['src/minjs','src/mincss'])
}
function minify_css(cb) {
  return src('src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest('src/mincss'))
}

exports.runimagemin = runimagemin
exports.runuglify = runuglify
exports.runconcatjs = runconcatjs
exports.runconcatcss = runconcatcss
exports.lint = lint
exports.minify = minify
exports.clean = clean
exports.minify_css = minify_css
exports.cleanmindir = cleanmindir

exports.build = series(clean, minify , runuglify, minify_css ,runconcatjs,runconcatcss,runimagemin,cleanmindir)
exports.default = defaultTask