import path from 'node:path';
import { CURRENT_DIR } from '../utils.js';

export async function initPackageJSON() {
    const packageJSON = await import(path.join(CURRENT_DIR, 'package.json'));

    console.log(packageJSON);
}
