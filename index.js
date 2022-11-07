"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require('fs/promises');
const path = require('path');
const mv = require('mv');
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    console.time('main');
    const downloadsDirectory = path.join(process.cwd(), '../../Downloads');
    try {
        const files = yield fs.readdir(downloadsDirectory);
        const folders = [];
        const map = new Map();
        for (const file of files) {
            const extension = path.extname(file);
            const fileName = path.basename(file);
            if (extension === '') {
                folders.push(fileName);
                continue;
            }
            if (!map.has(extension)) {
                map.set(extension, [fileName]);
            }
            else {
                map.get(extension).push(fileName);
            }
        }
        ;
        for (const [ext, values] of map) {
            const newFolder = path.join(downloadsDirectory, ext);
            if (!folders.includes(ext)) {
                folders.push(ext);
                fs.mkdir(newFolder);
            }
            for (let i = 0; i < values.length; i++) {
                const start = path.join(downloadsDirectory, values[i]);
                const destination = path.join(newFolder, values[i]);
                yield mv(start, destination, { mkdirp: true });
            }
        }
        ;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        console.timeEnd('main');
    }
});
main();
