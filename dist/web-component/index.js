"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebComponent = void 0;
var deps_manager_1 = require("./deps-manager");
function createStyles() {
    var style = document.createElement('style');
    return style;
}
var WebComponent = (function () {
    function WebComponent() {
        this.depsManager = new deps_manager_1.DepsManager();
    }
    WebComponent.prototype.connectedCallback = function () {
    };
    return WebComponent;
}());
exports.WebComponent = WebComponent;
