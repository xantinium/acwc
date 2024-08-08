export class DepsManager {
    /** Загружены ли стили */
    private stylesLoaded: boolean;

    /** Инициализирован ли веб-компонент */
    private modelInited: boolean;

    /**
     * Состояние инициализации веб-компонента
     * null - без ошибок
	 * symbol - имеется ошибка
     */
    private modelInitError: symbol | null;

    /** Функция-callback, которая отработает при загрузке всех ресурсов */
    private onLoadCallback: (err: symbol | null) => void;

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

	private checkDeps() {
		if (this.stylesLoaded && this.modelInited) {
			this.onLoadCallback(this.modelInitError);
		}
	}

	setOnLoadCallback(cb: (err: symbol | null) => void) {
		this.onLoadCallback = cb;
	}

	setStylesLoaded() {
		this.stylesLoaded = true;
		this.checkDeps();
	}

	setModelInited(err: symbol | null) {
		this.modelInited = true;
		this.modelInitError = err;
		this.checkDeps();
	}

	getModelInitError = () => this.modelInitError;
}