"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebComponent = void 0;
const deps_manager_1 = require("./deps-manager");
function createStyles() {
    const style = document.createElement('style');
    return style;
}
class WebComponent {
    depsManager;
    constructor() {
        // super();
        this.depsManager = new deps_manager_1.DepsManager();
    }
    connectedCallback() {
        // const shadow = this.attachShadow({ mode: 'closed' });
        // Нода в которую будет вмонтирован React-компонент
        // const container = document.createElement('div');
        // Создаём стили для веб-компонента и отслеживаем их загрузку
        // const styles = createStyles();
        // styles.addEventListener('load', this.depsManager.setStylesLoaded);
        // shadow.append(styles, container);
    }
}
exports.WebComponent = WebComponent;
