import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const FS_OP_FAILED = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = 'fileToRemove.txt'

const filePath = path.join(__dirname, 'files', fileName);

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

const remove = async () => {
    try {
        const isFileExists = await checkExists(filePath);

        if (!isFileExists) {
            throw new Error(FS_OP_FAILED);
        };

        await fs.rm(filePath);
    } catch (error) {
        throw error;
    }
};

await remove();