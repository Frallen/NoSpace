//Подключаем галп
const gulp = require("gulp");
//Объединение файлов
const concat = require("gulp-concat");
//Добапвление префиксов
const autoprefixer = require("gulp-autoprefixer");
//Оптимизация стилей
const cleanCSS = require("gulp-clean-css");
//Оптимизация скриптов
const uglify = require("gulp-uglify");
//Удаление файлов
const del = require("del");
//Синхронизация с браузером
const browserSync = require("browser-sync").create();
//Для препроцессоров стилей
const sourcemaps = require("gulp-sourcemaps");

//Less препроцессор
const less = require("gulp-less");
//Stylus препроцессор
//const stylus = require('gulp-stylus');
//Модуль для сжатия изображений
const imagemin = require("gulp-imagemin");
//Модуль переименовывания файлов
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const panini = require("panini");
const imagesFiles = ["./src/img/*.{png,jpg,svg,ico,jpeg}"];
const htmlFiles = [
  "./src/*.html",
  /* "!"+"./src/_navbar.html",
   "!"+"./src/_footer.html"*/
];
const fontsFile = ["./src/fonts/*.{eot,ttf,woff}"];
//Порядок подключения файлов со стилями
const styleFiles = ["./src/css/style.less"];
//Порядок подключения js файлов
const scriptFiles = ["./src/js/select.js", "./src/js/main.js","./src/js/auth.js","./src/js/stepTwo.js"];

gulp.task("images", () => {
  return gulp
    .src(imagesFiles)
    .pipe(gulp.dest("./build/img/"))
    .pipe(browserSync.stream());
});
gulp.task("fonts", () => {
  return gulp
    .src(fontsFile)
    .pipe(gulp.dest("./build/fonts/"))
    .pipe(browserSync.stream());
});
gulp.task("html", () => {
  panini.refresh();
  return gulp
    .src(htmlFiles)
    .pipe(plumber())
    .pipe(
      panini({
        root: "./src",
        layouts: "./src" + "/layouts/",
        partials: "./src/partials",
      })
    )
    .pipe(gulp.dest("./build/"))
    .pipe(browserSync.stream());
});

//Таск для обработки стилей
gulp.task("styles", () => {
  //Шаблон для поиска файлов CSS
  //Всей файлы по шаблону './src/css/**/*.css'
  return (
    gulp
      .src(styleFiles)
      .pipe(sourcemaps.init())
      //Указать stylus() , sass() или less()
      .pipe(less())
      //Объединение файлов в один
      .pipe(concat("style.css"))
      //Добавить префиксы
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 2 versions"],
          cascade: false,
        })
      )
      //Сохраняем не сжатый файл
      .pipe(gulp.dest("./build/css"))
      //Минификация CSS
      .pipe(
        cleanCSS({
          level: 2,
        })
      )
      .pipe(sourcemaps.write("./"))
      .pipe(
        rename({
          suffix: ".min",
        })
      )
      //Выходная папка для стилей
      .pipe(gulp.dest("./build/css/min"))
      .pipe(browserSync.stream())
  );
});

//Таск для обработки скриптов
gulp.task("scripts", () => {
  //Шаблон для поиска файлов JS
  //Всей файлы по шаблону './src/js/**/*.js'
  return (
    gulp
      .src(scriptFiles)
      //Объединение файлов в один
      .pipe(concat("main.js"))
      //Сохраняем не оригинальную версию файла
      .pipe(gulp.dest("./build/js"))
      //Минификация JS
      .pipe(
        uglify({
          toplevel: true,
        })
      )
      .pipe(
        rename({
          suffix: ".min",
        })
      )
      //Выходная папка для скриптов
      .pipe(gulp.dest("./build/js/min"))
      .pipe(browserSync.stream())
  );
});

//Таск для очистки папки build
gulp.task("del", () => {
  return del(["build/*"]);
});

//Таск для сжатия изображений
gulp.task("img-compress", () => {
  return gulp
    .src("./src/img/**")
    .pipe(
      imagemin({
        progressive: true,
      })
    )
    .pipe(gulp.dest("./build/img/"));
});

//Таск для отслеживания изменений в файлах
gulp.task("watch", () => {
  browserSync.init({
    server: {
      baseDir: "./build/",
    },
  });
  //Следить за добавлением новых изображений
  gulp
    .watch("./src/img/**", gulp.series("img-compress"))
    .on("change", browserSync.reload);
  //Следить за файлами со стилями с нужным расширением
  gulp
    .watch("./src/css/**/*.less", gulp.series("styles"))
    .on("change", browserSync.reload);
  //Следить за JS файлами
  gulp
    .watch("./src/js/**/*.js", gulp.series("scripts"))
    .on("change", browserSync.reload);
  //При изменении HTML запустить синхронизацию
  gulp.watch("./src/fonts/");
  gulp
    .watch("./src/img/", gulp.series("images"))
    .on("change", browserSync.reload);
  //При изменении HTML запустить синхронизацию
  gulp
    .watch("./src/**/*.html", gulp.series("html"))
    .on("change", browserSync.reload);
});

//Таск по умолчанию, Запускает del, styles, scripts, img-compress и watch
gulp.task(
  "default",
  gulp.series(
    "del",
    gulp.parallel(
      "html",
      "fonts",
      "images",
      "styles",
      "scripts",
      "img-compress"
    ),
    "watch"
  )
);
