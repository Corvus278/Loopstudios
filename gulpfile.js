const { src, dest, parallel, series, watch } = require('gulp')

const preprocessor = 'sass'

const browserSync = require('browser-sync').create()

const concat = require('gulp-concat')

const uglify = require('gulp-uglify-es').default

const sass = require('gulp-sass')(require('sass'))

const autoprefixer = require('gulp-autoprefixer')

const cleancss = require('gulp-clean-css')

const imagecomp = require('compress-images')

const del = require('del')

function browsersync() {
  browserSync.init({
    server: { baseDir: 'app/' },
    notify: false,
    online: true
  })
}

function scripts() {
  return src([
    'app/data/data.js',
    'app/js/index.js',
    'app/js/creationsFiller.js'
  ])
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/'))
    .pipe(browserSync.stream())
}

function styles() {
  const prep = preprocessor == 'sass' ? 'scss' : preprocessor

  return src(
    'app/' + preprocessor + '/index.' + prep,
  )
    .pipe(eval(preprocessor)())
    .pipe(concat('index.min.css'))
    .pipe(autoprefixer({ overrideBrowserlist: ['last 10 versions'], grid: true }))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } }, /*format: 'beautify'*/ }))
    .pipe(dest('app/css/'))
    .pipe(browserSync.stream())
}

async function images() {
  imagecomp(
    'app/images/src/**/*',
    'app/images/dest/',
    { compress_force: false, statistic: true, autoupdate: true }, false,
    { jpg: { engine: 'mozjpeg', command: ['-quality', '100'] } },
    { png: { enjine: 'pngquant', command: ['--quality=75-100', '-o'] } },
    { svg: { engine: 'svgo', command: '--multipass' } },
    { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } },
    (err, completed) => {
      if (completed) browserSync.reload()
      if (err) console.log(err)
    }
  )
}

function cleanimg() {
  return del('app/images/dest/**/*', { force: true })
}

function buildcopy() {
  return src([
    'app/css/**/*.min.css',
    'app/js/**/*.min.js',
    'app/images/dest/**/*',
    'app/**/*.html',
  ], { base: 'app' })
    .pipe(dest('dist'))
}

function cleandist() {
  return del('dist/**/*', { force: true })
}

function startWatch() {
  watch(['app/**/*.js', '!app/**/*.min.js'], scripts)

  watch('app/**/' + preprocessor + '/**/*', styles)

  watch('app/**/*.html').on('change', browserSync.reload)

  watch('app/images/src/**/*', images)
}

exports.browsersync = browsersync;

exports.scripts = scripts;

exports.styles = styles;

exports.images = images;

exports.cleanimg = cleanimg;

exports.build = series(cleandist, styles, scripts, images, buildcopy)

exports.default = parallel(styles, scripts, browsersync, images, startWatch)