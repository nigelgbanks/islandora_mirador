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
                dziUriTemplate: "{0}{1}",
                thumbsUriTemplate: "{0}{1}",
                timestampUris: true
            }, config.options);
        }
        Provider.prototype.getDziUri = function (asset, dziBaseUri, dziUriTemplate) {
            var baseUri = dziBaseUri ? dziBaseUri : this.options.dziBaseUri || this.options.dataBaseUri || "";
            var template = dziUriTemplate ? dziUriTemplate : this.options.dziUriTemplate;
            var uri = String.prototype.format(template, baseUri, asset.dziUri);

            return uri;
        };

        Provider.prototype.getThumbUri = function (asset, thumbsBaseUri, thumbsUriTemplate) {
            var baseUri = thumbsBaseUri ? thumbsBaseUri : this.options.thumbsBaseUri || this.options.dataBaseUri || "";
            var template = thumbsUriTemplate ? thumbsUriTemplate : this.options.thumbsUriTemplate;
            var uri = String.prototype.format(template, baseUri, asset.thumbnailPath);

            if (this.options.timestampUris)
                uri = this.addTimestamp(uri);

            return uri;
        };

        Provider.prototype.getEmbedScript = function (assetIndex, zoom, width, height, embedTemplate) {
            var esu = this.options.embedScriptUri || this.embedScriptUri;

            var template = this.options.embedTemplate || embedTemplate;

            var configUri = this.config.uri || '';

            var script = String.prototype.format(template, this.dataUri, this.assetSequenceIndex, assetIndex, zoom, configUri, width, height, esu);

            return script;
        };

        Provider.prototype.addTimestamp = function (uri) {
            return uri + "?t=" + utils.Utils.getTimeStamp();
        };
        return Provider;
    })(baseProvider.BaseProvider);
    exports.Provider = Provider;
});
