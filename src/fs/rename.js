import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const FS_OP_FAILED = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const oldName = 'wrongFilename.txt'
const newName = 'properFilename.md'

const oldPath = path.join(__dirname, 'files', oldName);
const newPath = path.join(__dirname, 'files', newName);

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

const rename = async () => {
    try {
        const isSourceExists = await checkExists(oldPath);
        const isDestExists = await checkExists(newPath);

        if (!isSourceExists || isDestExists) {
            throw new Error(FS_OP_FAILED);
        }

        await fs.rename(oldPath, newPath)
    } catch (error) {
        throw error;
    }

};

await rename();