import {CLIOptions, build} from 'aurelia-cli';
import gulp from 'gulp';
import project from '../aurelia.json';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssUrl from 'postcss-url';

export default function processCSS() {
  return gulp.src(project.cssProcessor.source, {sourcemaps: true})
    .pipe(gulpIf(CLIOptions.hasFlag('watch'), plumber()))
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      // Inline images and fonts
      postcssUrl({url: 'inline', encodeType: 'base64'}),
      cssnano()
    ]))
    .pipe(build.bundle());
}

