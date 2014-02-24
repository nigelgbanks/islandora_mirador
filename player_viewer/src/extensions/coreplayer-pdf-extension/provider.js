var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../modules/coreplayer-shared-module/baseProvider"], function(require, exports, __baseProvider__) {
    var baseProvider = __baseProvider__;
    

    var Provider = (function (_super) {
        __extends(Provider, _super);
        function Provider(config, pkg) {
            _super.call(this, config, pkg);

            this.config.options = $.extend(true, this.options, {
                mediaBaseUri: "http://wellcomelibrary.org",
                mediaUriTemplate: "{0}{1}"
            }, config.options);
        }
        Provider.prototype.getPDFUri = function () {
            var baseUri = this.options.mediaBaseUri || "";
            var template = this.options.mediaUriTemplate;
            var uri = String.prototype.format(template, baseUri, this.assetSequence.assets[0].fileUri);

            return uri;
        };
        return Provider;
    })(baseProvider.BaseProvider);
    exports.Provider = Provider;
});
