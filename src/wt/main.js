import { Worker } from 'worker_threads';
import os from 'os'

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const workerPath = path.join(__dirname, 'worker.js')

const INITIAL_VALUE = 10;

const performCalculations = async () => {
    const сores = os.cpus();

    const promises = сores.map((elem, index) => {
        const workerPromise = new Promise((resolve, reject) => {
            const worker = new Worker(workerPath, {
                workerData: INITIAL_VALUE + index
            });

            worker.on('message', (result) => {
                resolve({
                    status: 'resolved',
                    data: result
                });
            });

            worker.on('error', (error) => {
                reject({
                    status: 'error',
                    data: null
                });
            });
        });

        return workerPromise;
    });

    try {
        const results = await Promise.all(promises);

        console.log(results);
    } catch (error) {
        throw error;
    }
};

await performCalculations();