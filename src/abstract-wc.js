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
        constructor() {
            super();

            if (new.target === Abstract__NAME__) {
                throw new Error('Cannot be created directly with "new" keyword');
            }

            this.depsManages = new DepsManages();
        }

        connectedCallback() {}
    }

    window[Abstract__NAME__.name] = Abstract__NAME__;
})();
