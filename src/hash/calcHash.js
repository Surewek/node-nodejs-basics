import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import { createReadStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = 'fileToCalculateHashFor.txt'

const filePath = path.join(__dirname, 'files', fileName);

const calculateHash = async () => {

    async function getHash(filePath) {
        return await new Promise((resolve, reject) => {
            const hash = createHash('sha256');
            const input = createReadStream(filePath);

            input.on('error', (err) => {
                reject(err);
            });

            input.on('data', (chunk) => {
                hash.update(chunk);
            });

            input.on('end', () => {
                resolve(hash.digest('hex'));
            });
        });
    }

    const fileHash = await getHash(filePath);

    process.stdout.write(fileHash);

};

await calculateHash();