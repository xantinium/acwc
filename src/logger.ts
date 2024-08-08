type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

type LogOptions = {
    /** Цвет шрифта */
    color?: Color
    /** Цвет фона */
    bgColor?: Color
    /** Нужен ли переход на новую строку */
    withNewline?: boolean
};

export const Logger = {
    /** Очистка консоли */
    clear() {
        process.stdout.write('\x1Bc');
    },
    /**
     * Вывод логотипа
     * @param padding Размер отступа
     */
    printLogo(padding: number = 12) {
        let logo = `
          _ _    _____            __ _
    /\\   | | |  / ____|          / _| |
   /  \\  | | |_| |     _ __ __ _| |_| |_
  / /\\ \\ | | __| |    | '__/ _\` |  _| __|
 / ____ \\| | |_| |____| | | (_| | | | |_
/_/    \\_\\_|\\__|\\_____|_|  \\__,_|_|  \\__|
        `;

        logo = logo.split('\n').map((line) => `${' '.repeat(padding)}${line}`).join('\n');

        this.log(logo, { color: 'cyan' });

        const title = 'Notify Template\n';
        const titlePadding = padding + 20 - title.length * 0.5;

        this.log(`${' '.repeat(titlePadding)}${title}`);
    },
    /**
     * Стилизованный вывод в консоль
     * @param text Текст
     * @param options Параметры стилизации
     */
    log(text: string, options?: LogOptions) {
        const fontModificators = [];

        const RESET = '\x1b[0m';

        const FONT_COLORS = {
            black: '\x1b[30m',
            red: '\x1b[31m',
            green: '\x1b[32m',
            yellow: '\x1b[33m',
            blue: '\x1b[34m',
            magenta: '\x1b[35m',
            cyan: '\x1b[36m',
            white: '\x1b[37m',
        };

        const BG_COLORS = {
            black: '\x1b[40m',
            red: '\x1b[41m',
            green: '\x1b[42m',
            yellow: '\x1b[43m',
            blue: '\x1b[44m',
            magenta: '\x1b[45m',
            cyan: '\x1b[46m',
            white: '\x1b[47m',
        };

        if (options) {
            if (options.color && options.color in FONT_COLORS) {
                fontModificators.push(FONT_COLORS[options.color]);
            }

            if (options.bgColor && options.bgColor in BG_COLORS) {
                fontModificators.push(BG_COLORS[options.bgColor]);
            }
        }

        if (fontModificators.length === 0) {
            process.stdout.write(text);
        } else {
            for (let i = 0; i < fontModificators.length; i++) {
                process.stdout.write(fontModificators[i]);
            }
            process.stdout.write(text);
            process.stdout.write(RESET);
        }

        if (options?.withNewline !== false) {
            process.stdout.write('\n');
        }
    },
    /**
     * Логирование ошибки и завершение процесса сборки
     * @param text Текст ошибки
     */
    fatal(text: string) {
        this.log(' ERROR ', { bgColor: 'red', withNewline: false });
        this.log(` ${text}`);
        process.exit(1);
    },
};
