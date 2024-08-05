import fs from 'node:fs/promises';
import path from 'node:path';

export const CURRENT_DIR = import.meta.dirname;
const DIST_DIR = path.join(CURRENT_DIR, '..', 'dist');

function toUpperCaseFirstChar(str) {
    return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
};

/**
 * Функция для стилизации текста из "шашлычной" нотации
 * @param {string} text Текст
 * @param {'pascal-case' | 'spaced-pascal-case'} style Стиль
 */
export function convertFromKebabCase(text, style) {
    switch (style) {
    case 'pascal-case':
        return text.split('-').map(toUpperCaseFirstChar).join('');
    case 'spaced-pascal-case':
        return text.split('-').map(toUpperCaseFirstChar).join(' ');
    }
}

const KNOWN_FILES = {
    INDEX_HTML: {
        in: '/public/index.html',
        out: '/public/index.html',
    },
    ABSTRACT_WEB_COMPONENT: {
        in: '/abstract-wc.js',
        out: '/abstract-wc.js',
    },
};

/**
 * Получить содержимое файла в виде строки
 * @param {string} filepath Путь до файла
 */
function getFileContent(filepath) {
    return fs.readFile(filepath, { encoding: 'utf-8' });
}

/**
 * Записать произвольную строку в файл
 * @param {string} filepath Путь до файла
 * @param {string} content Строка
 */
async function setFileContent(filepath, content) {
    try {
        await fs.mkdir(path.dirname(filepath), { recursive: true });
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }

    return fs.writeFile(filepath, content, { encoding: 'utf-8' })
}

/**
 * Параметры для подстановки
 * @typedef Params
 * @property {string} name Имя веб-компонента
 */

/**
 * Функция для подстановки всех необходимых параметров
 * @param {string} source Исходный текст
 * @param {Params} params Параметры
 */
function fillAllParams(source, params) {
    let result = source;

    Object.entries(params).forEach((entry) => {
        const [key, value] = entry;

        result = result.replace(new RegExp(`__${key.toUpperCase()}__`, 'g'), value);
    });

    return result;
}

/**
 * Функция для генерации сбилженых файлов
 * @param {Params} params Параметры
 */
export async function generateDist(params) {
    try {
        await fs.mkdir(DIST_DIR);
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }

    const promises = Object.values(KNOWN_FILES).map(async (file) => {
        const content = await getFileContent(path.join(CURRENT_DIR, file.in));

        const contentWithParams = fillAllParams(content, params);

        return setFileContent(path.join(DIST_DIR, file.out), contentWithParams);
    });

    return Promise.all(promises);
}

/** Очистка сбилженых файлов */
export function cleanUp() {
    return fs.rm(DIST_DIR, { force: true, recursive: true });
}
