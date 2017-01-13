var gulp = require('gulp');
var rename = require('gulp-rename');

//tache à lancer par defaut, lorsque vous utilisez simplement la commande: gulp //
gulp.task('default', ['watch:all+sync']);

///////////////////////// Sass /////////////////////////
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function()
{
    return gulp.src('../style/**/*.scss')  //dossier 'style' -> tous les sous-dossiers -> tous les .scss
        .pipe(sass(
        {
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('../style/dist'))
        .pipe(browserSync.stream());     //auto-inject in browser-sync
});

gulp.task('watch:sass', function()
{
    gulp.watch('../style/**/*.scss', ['sass']);  //dossier 'style' -> tous les sous-dossiers -> tous les .scss
});

///////////////////////// JavaScript /////////////////////////
var concat = require('gulp-concat'); //combiner plusieurs fichiers js
var uglify = require('gulp-uglify'); //minifier

gulp.task('js', function()
{
    return gulp.src(['../js/externals/jquery.js',       //jquery en premier
                    '../js/externals/*.js',             //tous les js dans 'externals'
                    '../js/*.js'])                      //tous nos propres js
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../js/dist'))
        .pipe(browserSync.stream());                   //auto-inject in browser-sync
});

gulp.task('watch:js', function()
{
    gulp.watch(['../js/**/*.js', '!../js/dist/main.min.js'], ['js']); //dossier 'js' -> tous les sous-dossiers -> tous les .js. on exclus dist/main.min.js
});

///////////////////////// watch all + browser-sync /////////////////////////
var browserSync = require('browser-sync').create();

gulp.task('watch:all+sync', function()
{
    browserSync.init(
    {
        server: '../'
    //  proxy: 'localhost/mon-projet'
    });
    gulp.watch('../style/**/*.scss', ['sass']);                             //dossier 'style' -> tous les sous-dossiers -> tous les .scss
    gulp.watch(['../js/**/*.js', '!../js/dist/main.min.js'], ['js']);       //dossier 'js' -> tous les sous-dossiers -> tous les .js. on exclus dist/main.min.js
    gulp.watch(['../*.html', '../*.php', '../includes/**/*.php']).on('change', browserSync.reload); //auto-inject HTML cand PHP changes in browser-sync
});
