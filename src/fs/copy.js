import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const FS_OP_FAILED = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourcePath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files_copy');

const checkExists = async (path) => {
    try {
        await fs.access(path);
        return true;
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        } else {
            throw error;
        };
    }
}

const copy = async () => {
    try {

        const isSourceExists = await checkExists(sourcePath);
        const isDestExists = await checkExists(destPath);

        if (!isSourceExists || isDestExists) {
            throw new Error(FS_OP_FAILED);
        }

        await fs.cp(sourcePath, destPath, { recursive: true });
    } catch (error) {
        throw error;
    }
};

await copy();
