@echo off
::1.Ouvrir une invite de commande dans votre projet
::2.Executer la commande: gulp_setup.bat


echo //////////////////// Initialize NPM Project !! Votre projet ne dois pas s'appeler "gulp" !!
call npm init

echo //////////////////// Install gulp
call npm install gulp --save-dev

echo //////////////////// Install gulp-sass
call npm install gulp-sass --save-dev

echo //////////////////// Install gulp-autoprefixer
call npm install gulp-autoprefixer --save-dev

echo //////////////////// Install gulp-rename
call npm install gulp-rename --save-dev

echo //////////////////// Install gulp-concat
::combiner plusieurs fichiers javascript en un seul
call npm install gulp-concat --save-dev


echo //////////////////// Install gulp-uglify
::minifier fichier javascript
call npm install gulp-uglify --save-dev

echo //////////////////// Install browser-sync
call npm install browser-sync --save-dev
