var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    pug = require('gulp-pug'),
    browserSync = require("browser-sync"),
    runSequence = require('run-sequence');

var paths = {
    styles: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        src: "app/sass/*.sass",
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: "app/css"
    }
};

// function style() {
//     return gulp
//         .src(paths.styles.src)
//         // Initialize sourcemaps before compilation starts
//         .pipe(sourcemaps.init())
//         .pipe(sass())
//         .on("error", sass.logError)
//         // Use postcss with autoprefixer and compress the compiled file using cssnano
//         .pipe(postcss([autoprefixer(), cssnano()]))
//         // Now add/write the sourcemaps
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(paths.styles.dest))
//         // Add browsersync stream pipe after compilation
//         .pipe(browserSync.stream());
// }

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app/',
      index: "index.html"
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('app/sass/*.sass') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

gulp.task('pug', function() {
  return gulp.src("app/pug/*.pug")
      .pipe(pug())
      .pipe(gulp.dest("app"))
      .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/sass/*.sass', ['sass', browserSync.reload]);
  gulp.watch('app/pug/*.pug', ['pug']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

function reload() {
    browserSync.reload();
}

// Add browsersync initialization at the start of the watch task
// function watch() {
//     browserSync.init({
//         // You can tell browserSync to use this directory and serve it as a mini-server
//         server: {
//             baseDir: "app"
//         }
//         // If you are already serving your website locally using something like apache
//         // You can use the proxy setting to proxy that instead
//         // proxy: "yourlocal.dev"
//     });
//     // gulp.watch(paths.styles.src, style, );
//     gulp.watch(paths.styles.src, style, reload);
//     // We should tell gulp which files to watch to trigger the reload
//     // This can be html or whatever you're using to develop your website
//     // Note -- you can obviously add the path to the Paths object
//     gulp.watch("app/pug/*.pug", _pug, reload);
//     // gulp.watch("src/sass/*.sass", reload);
// }

// gulp.task('watch', function() {
//   gulp.watch('app/sass/**/*.sass', ['sass']);
//   gulp.watch('app/*.html', browserSync.reload);
//   gulp.watch('app/js/**/*.js', browserSync.reload);
// })

// exports.watch = watch

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
// exports.style = style;

// exports.pug = _pug;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
// var build = gulp.series(style, _pug, watch);

/*
 * You can still use `gulp.task` to expose tasks
 */
// gulp.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
// gulp.task('default', build);

gulp.task('default', function(callback) {
  runSequence(['sass', 'pug', 'browserSync'], 'watch',
    callback
  )
});
