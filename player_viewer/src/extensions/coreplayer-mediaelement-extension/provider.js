var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../modules/coreplayer-shared-module/baseProvider", "../../utils"], function(require, exports, __baseProvider__, __utils__) {
    var baseProvider = __baseProvider__;
    var utils = __utils__;
    

    var Provider = (function (_super) {
        __extends(Provider, _super);
        function Provider(config, pkg) {
            _super.call(this, config, pkg);

            this.config.options = $.extend(true, this.options, {
                mediaUriTemplate: "{0}{1}",
                timestampUris: true
            }, config.options);
        }
        Provider.prototype.getEmbedScript = function (width, height, embedTemplate) {
            var esu = this.options.embedScriptUri || this.embedScriptUri;

            var template = this.options.embedTemplate || embedTemplate;

            var configUri = this.config.uri || '';

            var script = String.prototype.format(template, this.dataUri, this.assetSequenceIndex, configUri, width, height, esu);

            return script;
        };

        Provider.prototype.getPosterImageUri = function () {
            var baseUri = this.options.mediaBaseUri || "";
            var template = this.options.mediaUriTemplate;
            var uri = String.prototype.format(template, baseUri, this.assetSequence.extensions.posterImage);

            return uri;
        };

        Provider.prototype.addTimestamp = function (uri) {
            return uri + "?t=" + utils.Utils.getTimeStamp();
        };
        return Provider;
    })(baseProvider.BaseProvider);
    exports.Provider = Provider;
});
