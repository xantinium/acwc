import os from 'os';
import fs from 'fs/promises';
import path from 'path';

export const PROCESS_DIR = process.cwd();
// export const CURRENT_DIR = import.meta.dirname;
export const CURRENT_DIR = __dirname;
const DIST_DIR = path.join(CURRENT_DIR, '..', 'dist');

function toUpperCaseFirstChar(str: string) {
    return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
}

export function convertFromKebabCase(text: string, style: 'pascal-case' | 'spaced-pascal-case') {
    switch (style) {
    case 'pascal-case':
        return text.split('-').map(toUpperCaseFirstChar).join('');
    case 'spaced-pascal-case':
        return text.split('-').map(toUpperCaseFirstChar).join(' ');
    }
}

export enum KNOWN_COMMANDS {
    START = 'start',
    TEST = 'test',
    BUILD = 'build',
}

export function parseCommand(args: string[]) {
    const command = args[2];

    // TODO
    // @ts-ignore
    if (Object.values(KNOWN_COMMANDS).includes(command)) {
        return command;
    }

    return null;
}

const KNOWN_FILES = {
    INDEX_HTML: {
        in: '/public/index.html',
        out: '/public/index.html',
    },
    ABSTRACT_WEB_COMPONENT: {
        in: '/public/abstract-wc.js',
        out: '/public/abstract-wc.js',
    },
};

export function getFileContent(filepath: string) {
    return fs.readFile(filepath, { encoding: 'utf-8' });
}

export async function setFileContent(filepath: string, content: string) {
    try {
        await fs.mkdir(path.dirname(filepath), { recursive: true });
    } catch (err) {
        // TODO
        if (typeof err === 'object' && err !== null && 'code' in err && err.code !== 'EEXIST') {
            throw err;
        }
    }

    return fs.writeFile(filepath, content + os.EOL, { encoding: 'utf-8' })
}

type Params = {
    /** Имя веб-компонента */
    name: string
    /** Человекопонятное имя веб-компонента */
    title: string
};

function fillAllParams(source: string, params: Params) {
    let result = source;

    Object.entries(params).forEach((entry) => {
        const [key, value] = entry;

        result = result.replace(new RegExp(`__${key.toUpperCase()}__`, 'g'), value);
    });

    return result;
}

export async function generateDist(params: Params) {
    try {
        await fs.mkdir(DIST_DIR);
    } catch (err) {
        // TODO
        if (typeof err === 'object' && err !== null && 'code' in err && err.code !== 'EEXIST') {
            throw err;
        }
    }

    const promises = Object.values(KNOWN_FILES).map(async (file) => {
        const content = await getFileContent(path.join(CURRENT_DIR, '..', file.in));

        const contentWithParams = fillAllParams(content, params);

        return setFileContent(path.join(DIST_DIR, file.out), contentWithParams);
    });

    return Promise.all(promises);
}

/** Очистка сбилженых файлов */
export function cleanUp() {
    return fs.rm(DIST_DIR, { force: true, recursive: true });
}
