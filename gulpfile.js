import path from 'path'
import fs from 'fs'
import { src, dest, watch, series } from 'gulp' // series se utiliza para ejecutar todas las tareas. Primero arranca una tarea, la finaliza y se pasa a la siguiente.
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass);

import terser from 'gulp-terser';
import sharp from 'sharp'

export function js(done) {
    src('src/js/app.js')
        .pipe( terser() )
        .pipe( dest('build/js') ) // .pipe es para llevarlo al archivo que le indiquemos

    done(); // done es para terminar la función
}

export function css( done ) {
    src('src/scss/app.scss', {sourcemaps: true}) // son src ubicamos el archivo
        .pipe( sass({
            outputStyle: 'compressed'
        }) .on('error', sass.logError) )
        .pipe( dest('build/css', {sourcemaps: true}) )

    done();
}

export async function crop(done) {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}

export function dev( ) {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
}

export default series( crop, js, css, dev )