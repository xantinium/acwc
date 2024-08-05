import path from 'node:path';
import { getFileContent, PROCESS_DIR } from '../utils.js';

export async function initPackageJSON() {
    let maybePackageJSON;

    try {
        maybePackageJSON = await getFileContent(path.join(PROCESS_DIR, 'package.json'));
    } catch (_) {
        throw new Error('No "package.json" found');
    }

    let packageJSON;

    try {
        packageJSON = JSON.parse(maybePackageJSON);
    } catch (_) {
        throw new Error('The "package.json" is invalid');
    }

    console.log(packageJSON);
}
