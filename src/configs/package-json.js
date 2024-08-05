import path from 'node:path';
import { getFileContent, PROCESS_DIR, setFileContent } from '../utils.js';

const packageJSONPath = path.join(PROCESS_DIR, 'package.json');

export async function initPackageJSON() {
    let maybePackageJSON;

    try {
        maybePackageJSON = await getFileContent(packageJSONPath);
    } catch (_) {
        throw new Error('No "package.json" found');
    }

    let packageJSON;

    try {
        packageJSON = JSON.parse(maybePackageJSON);
    } catch (_) {
        throw new Error('The "package.json" is invalid');
    }

    packageJSON.scripts = {
        ...(packageJSON.scripts ?? {}),
        start: 'acwc start',
        test: 'acwc test',
        build: 'acwc build',
    };

    setFileContent(packageJSONPath, JSON.stringify(packageJSON, null, 2));
}
