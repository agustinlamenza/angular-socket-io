var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('js', function () {
    return gulp
        .src([
            'public/js/app/chat/chat.module.js',
            'public/js/app/chat/chat.service.js',
            'public/js/app/chat/chat.component.js',
            'public/js/app.js'
        ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});