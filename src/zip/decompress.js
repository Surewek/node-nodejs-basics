import { createUnzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compressedFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
const archivePath = path.join(__dirname, 'files', 'archive.gz');

const source = createReadStream(archivePath);
const dest = createWriteStream(compressedFilePath)

const decompress = async () => {
    const unzip = createUnzip();

    source
        .pipe(unzip)
        .pipe(dest);
};

await decompress();