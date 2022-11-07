const fs = require('fs/promises');
const path = require('path');
const mv = require('mv')

const main = async () => {
    console.time('main');
    const downloadsDirectory: string = path.join(process.cwd(), '../../Downloads');

    try {
        const files: string[] = await fs.readdir(downloadsDirectory);
        const folders: string[] = [];
        const map= new Map();

        for (const file of files) {

            const extension: string = path.extname(file);
            const fileName: string = path.basename(file);
            if (extension === '') {
                folders.push(fileName)
                continue
            }
            if (!map.has(extension)) {
                map.set(extension, [fileName])
            } else {
                map.get(extension).push(fileName)
            }
        };

        for (const [ext, values] of map) {
            const newFolder: string= path.join(downloadsDirectory, ext)
            if (!folders.includes(ext)) {
                folders.push(ext);
                fs.mkdir(newFolder);
            }
            for (let i = 0; i < values.length; i++) {
                const start: string = path.join(downloadsDirectory, values[i])
                const destination: string =  path.join(newFolder, values[i])
                await mv(start, destination, { mkdirp: true })
            }
        };

    } catch (err) {
        console.log(err)
    } finally{
        console.timeEnd('main');
    }
};


main();