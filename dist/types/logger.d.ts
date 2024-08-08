type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
type LogOptions = {
    /** Цвет шрифта */
    color?: Color;
    /** Цвет фона */
    bgColor?: Color;
    /** Нужен ли переход на новую строку */
    withNewline?: boolean;
};
export declare const Logger: {
    /** Очистка консоли */
    clear(): void;
    /**
     * Вывод логотипа
     * @param padding Размер отступа
     */
    printLogo(padding?: number): void;
    /**
     * Стилизованный вывод в консоль
     * @param text Текст
     * @param options Параметры стилизации
     */
    log(text: string, options?: LogOptions): void;
    /**
     * Логирование ошибки и завершение процесса сборки
     * @param text Текст ошибки
     */
    fatal(text: string): never;
};
export {};
