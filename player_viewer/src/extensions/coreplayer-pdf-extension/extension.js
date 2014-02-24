var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../modules/coreplayer-shared-module/baseExtension", "../../modules/coreplayer-shared-module/shell"], function(require, exports, __baseExtension__, __shell__) {
    var baseExtension = __baseExtension__;
    
    
    
    
    var shell = __shell__;

    var Extension = (function (_super) {
        __extends(Extension, _super);
        function Extension(provider) {
            _super.call(this, provider);
        }
        Extension.prototype.create = function () {
            _super.prototype.create.call(this);

            this.$pdfLink = $('<a class="pdfLink" href="' + (this.provider).getPDFUri() + '" target="_blank">Open PDF</a>');
            shell.Shell.$element.append(this.$pdfLink);
        };
        return Extension;
    })(baseExtension.BaseExtension);
    exports.Extension = Extension;
});
