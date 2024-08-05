(function () {
    class DepsManages {
        /**
         * @param {Object} props
         * @param {Function} props.onReady
         */
        constructor(props) {
            this.stylesReady = false;
            this.scriptsReady = false;
            this.onReady = props.onReady;
        }

        tryToInit = () => {
            if (this.stylesReady && this.scriptsReady) {
                this.onReady();
            }
        };

        initStyles = () => {
            this.stylesReady = true;
            this.tryToInit();
        };

        initScripts = () => {
            this.scriptsReady = true;
            this.tryToInit();
        };
    }

    class Abstract__NAME__ extends HTMLElement {
        static getName = () => __TAG__;

        constructor() {
            super();

            if (new.target === Abstract__NAME__) {
                throw new Error('Cannot be created directly with "new" keyword');
            }

            this.depsManages = new DepsManages();

            this.modelRef = { current: null };
        }

        connectedCallback() {
            const shadow = this.attachShadow({ mode: 'closed' });

            const container = document.createElement('div');

            shadow.append(createStyles(), container);

            // Нужно для подгрузки шрифтов в dev-режиме
		    document.head.append(createStyles());
        }
    }

    function createStyles() {
		const styles = document.createElement('style');

		styles.append(__CSS__);

		return styles;
	}

    window.customElements.define(Abstract__NAME__.getName(), Abstract__NAME__);
})();
