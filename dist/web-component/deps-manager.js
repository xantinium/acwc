"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepsManager = void 0;
class DepsManager {
    /** Загружены ли стили */
    stylesLoaded;
    /** Инициализирован ли веб-компонент */
    modelInited;
    /**
     * Состояние инициализации веб-компонента
     * null - без ошибок
     * symbol - имеется ошибка
     */
    modelInitError;
    /** Функция-callback, которая отработает при загрузке всех ресурсов */
    onLoadCallback;
    constructor() {
        this.stylesLoaded = false;
        this.modelInited = false;
        this.modelInitError = null;
        this.onLoadCallback = () => undefined;
        this.checkDeps = this.checkDeps.bind(this);
        this.setOnLoadCallback = this.setOnLoadCallback.bind(this);
        this.setStylesLoaded = this.setStylesLoaded.bind(this);
        this.setModelInited = this.setModelInited.bind(this);
    }
    checkDeps() {
        if (this.stylesLoaded && this.modelInited) {
            this.onLoadCallback(this.modelInitError);
        }
    }
    setOnLoadCallback(cb) {
        this.onLoadCallback = cb;
    }
    setStylesLoaded() {
        this.stylesLoaded = true;
        this.checkDeps();
    }
    setModelInited(err) {
        this.modelInited = true;
        this.modelInitError = err;
        this.checkDeps();
    }
    getModelInitError = () => this.modelInitError;
}
exports.DepsManager = DepsManager;
