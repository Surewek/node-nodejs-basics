import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const filePath = path.join(__dirname, 'files', 'fileToCompress.txt');
const archivePath = path.join(__dirname, 'files', 'archive.gz');


const source = createReadStream(filePath);
const dest = createWriteStream(archivePath);

const compress = async () => {
    const gzip = createGzip();

    source
        .pipe(gzip)
        .pipe(dest);
};

await compress();