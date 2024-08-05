import path from 'node:path';

export async function initPackageJSON() {
    const packageJSON = await import(path.join(process.execPath, 'package.json'));

    console.log(packageJSON);
}
