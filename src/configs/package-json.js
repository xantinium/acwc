import path from 'node:path';
import { getFileContent, PROCESS_DIR, setFileContent } from '../utils.js';

const PROJECT_NAME_REGEXP = /^[a-z\d\-]+$/;
const packageJSONPath = path.join(PROCESS_DIR, 'package.json');

async function getPackageJSON() {
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
        throw new Error('The "package.json" is not a valid JSON');
    }

    return packageJSON;
}

function validatePackageJSON(packageJSON) {
    const name = packageJSON.name;

    if (!name) {
        throw new Error('The "package.json" is invalid: no "name" field');
    }

    if (!PROJECT_NAME_REGEXP.test(name)) {
        throw new Error(`The "package.json" is invalid: "name" field should match the pattern: ${PROJECT_NAME_REGEXP}`);
    }
}

export async function initPackageJSON() {
    const packageJSON = await getPackageJSON();

    validatePackageJSON(packageJSON);

    packageJSON.scripts = {
        ...(packageJSON.scripts ?? {}),
        start: 'acwc start',
        test: 'acwc test',
        build: 'acwc build',
    };

    await setFileContent(packageJSONPath, JSON.stringify(packageJSON, null, 2));

    return packageJSON;
}
