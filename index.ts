const fs = require('fs/promises');
const path = require('path');

const main = async() => {
    const downloadsDirectory: string  = path.join(process.cwd(),'../../Downloads');
    
    try{
        const files : string[] = await fs.readdir(downloadsDirectory);
        const folders: string[] = [];

        const map = new Map();
        let file: string 
        for (file of files){
            
            const extension: string = path.extname(file);
            const fileName: string = path.basename(file);
            if (extension === '') {
                folders.push(fileName)
                continue
            }
            if (!map.has(extension)){
                map.set(extension, [fileName])
            } else {
                map.get(extension).push(fileName)
            }
        };
        let ext: string
        for (ext of map.keys()){
            
            if (!folders.includes(ext)){
                console.log(ext)
                const folder = path.join(downloadsDirectory,ext)
                // fs.mkdir(folder);    
            };
        };
        
    }catch(err){
        console.log(err)
    }
};

console.time('main');
main();
console.timeEnd('main');