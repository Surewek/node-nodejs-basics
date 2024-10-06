import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const FS_OP_FAILED = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const freshFilePath = path.join(__dirname, 'files', 'fresh.txt');
const freshFileContent = 'I am fresh and young';

const checkExists = async (filePath) => {
    try {
        await fs.access(filePath);
        return true;
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        } else {
            throw error;
        };
    }
}

const create = async () => {
    try {
        const isFileExists = await checkExists(freshFilePath);

        if (isFileExists) {
            throw new Error(FS_OP_FAILED);
        };

        await fs.writeFile(freshFilePath, freshFileContent);
    } catch (error) {
        throw error;
    };
};

await create();