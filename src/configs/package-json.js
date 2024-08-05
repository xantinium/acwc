import path from 'node:path';
import { PROCESS_DIR } from '../utils.js';

export async function initPackageJSON() {
    console.log(PROCESS_DIR);
    // const packageJSON = await import(path.join(PROCESS_DIR, 'package.json'));

    // console.log(packageJSON);
}
