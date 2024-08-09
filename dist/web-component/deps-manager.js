"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepsManager = void 0;
var DepsManager = (function () {
    function DepsManager() {
        var _this = this;
        this.getModelInitError = function () { return _this.modelInitError; };
        this.stylesLoaded = false;
        this.modelInited = false;
        this.modelInitError = null;
        this.onLoadCallback = function () { return undefined; };
        this.checkDeps = this.checkDeps.bind(this);
        this.setOnLoadCallback = this.setOnLoadCallback.bind(this);
        this.setStylesLoaded = this.setStylesLoaded.bind(this);
        this.setModelInited = this.setModelInited.bind(this);
    }
    DepsManager.prototype.checkDeps = function () {
        if (this.stylesLoaded && this.modelInited) {
            this.onLoadCallback(this.modelInitError);
        }
    };
    DepsManager.prototype.setOnLoadCallback = function (cb) {
        this.onLoadCallback = cb;
    };
    DepsManager.prototype.setStylesLoaded = function () {
        this.stylesLoaded = true;
        this.checkDeps();
    };
    DepsManager.prototype.setModelInited = function (err) {
        this.modelInited = true;
        this.modelInitError = err;
        this.checkDeps();
    };
    return DepsManager;
}());
exports.DepsManager = DepsManager;
