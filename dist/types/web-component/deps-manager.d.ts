export declare class DepsManager {
    /** Загружены ли стили */
    private stylesLoaded;
    /** Инициализирован ли веб-компонент */
    private modelInited;
    /**
     * Состояние инициализации веб-компонента
     * null - без ошибок
     * symbol - имеется ошибка
     */
    private modelInitError;
    /** Функция-callback, которая отработает при загрузке всех ресурсов */
    private onLoadCallback;
    constructor();
    private checkDeps;
    setOnLoadCallback(cb: (err: symbol | null) => void): void;
    setStylesLoaded(): void;
    setModelInited(err: symbol | null): void;
    getModelInitError: () => symbol;
}
