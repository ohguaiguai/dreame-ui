const { series, src, dest } = require('gulp');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function compile() {
  return (
    src('./src/*.scss')
      .pipe(sass.sync())
      .pipe(
        autoprefixer({
          Browserslist: ['ie > 9', 'last 2 versions'],
          cascade: false,
        })
      )
      // .pipe(cssmin())
      .pipe(dest('./lib'))
  );
}

function copyFont() {
  return src('./src/fonts/**').pipe(dest('./lib/fonts'));
}

exports.build = series(compile, copyFont);
