import { DepsManager } from './deps-manager';

function createStyles() {
    const style = document.createElement('style');

    return style;
}

export abstract class WebComponent extends HTMLElement {
    private depsManager: DepsManager;

    constructor() {
        super();

        this.depsManager = new DepsManager();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'closed' });

        // Нода в которую будет вмонтирован React-компонент
		const container = document.createElement('div');

        // Создаём стили для веб-компонента и отслеживаем их загрузку
		const styles = createStyles();
		styles.addEventListener('load', this.depsManager.setStylesLoaded);
        shadow.append(styles, container);
    }
}
