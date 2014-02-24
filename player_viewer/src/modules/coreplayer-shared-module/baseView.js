var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./panel"], function(require, exports, __panel__) {
    var panel = __panel__;
    
    

    var BaseView = (function (_super) {
        __extends(BaseView, _super);
        function BaseView($element, fitToParentWidth, fitToParentHeight) {
            _super.call(this, $element, fitToParentWidth, fitToParentHeight);
        }
        BaseView.prototype.create = function () {
            _super.prototype.create.call(this);

            this.extension = window.extension;
            this.provider = this.extension.provider;

            if (this.moduleName) {
                this.config = this.provider.config.modules[this.moduleName];
                if (!this.config)
                    this.config = {};
                this.content = this.config.content || {};
                this.options = this.config.options || {};
            }
        };

        BaseView.prototype.init = function () {
        };

        BaseView.prototype.setConfig = function (moduleName) {
            if (!this.moduleName) {
                this.moduleName = moduleName;
            }
        };

        BaseView.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return BaseView;
    })(panel.Panel);
    exports.BaseView = BaseView;
});
