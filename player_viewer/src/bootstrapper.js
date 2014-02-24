define(["require", "exports", "utils"], function(require, exports, __utils__) {
    var utils = __utils__;

    var BootStrapper = (function () {
        function BootStrapper(extensions) {
            this.extensions = extensions;

            var that = this;

            that.dataBaseUri = utils.Utils.getQuerystringParameter('dbu');
            that.packageUri = utils.Utils.getQuerystringParameter('du');

            if (that.dataBaseUri) {
                that.packageUri = that.dataBaseUri + that.packageUri;
            }

            jQuery.support.cors = true;

            $.getJSON(that.packageUri, function (pkg) {
                that.pkg = pkg;

                var isHomeDomain = utils.Utils.getQuerystringParameter('hd') == "true";
                var isReload = utils.Utils.getQuerystringParameter('rl') == "true";

                if (isHomeDomain && !isReload) {
                    that.assetSequenceIndex = parseInt(utils.Utils.getHashParameter('asi', parent.document));
                }

                if (!that.assetSequenceIndex) {
                    that.assetSequenceIndex = parseInt(utils.Utils.getQuerystringParameter('asi')) || 0;
                }

                if (!that.pkg.assetSequences) {
                    try  {
                        parent.$(parent.document).trigger("onNotFound");
                        return;
                    } catch (e) {
                    }
                }
                
                console.log(that);
                
                if (!that.pkg.assetSequences[that.assetSequenceIndex].$ref) {
                    that.assetSequence = that.pkg.assetSequences[that.assetSequenceIndex];
                    that.loadDependencies();
                } else {
                    var basePackageUri = that.packageUri.substr(0, that.packageUri.lastIndexOf('/') + 1);
                    var assetSequenceUri = basePackageUri + pkg.assetSequences[that.assetSequenceIndex].$ref;

                    $.getJSON(assetSequenceUri, function (assetSequenceData) {
                        that.assetSequence = that.pkg.assetSequences[that.assetSequenceIndex] = assetSequenceData;
                        that.loadDependencies();
                    });
                }
            });
        }
        BootStrapper.prototype.loadDependencies = function () {
            var that = this;

            var extension = that.extensions[that.assetSequence.assetType];

            yepnope.injectCss(extension.css, function () {
                $.getJSON(extension.config, function (config) {
                    var configExtension = utils.Utils.getQuerystringParameter('c');

                    if (configExtension) {
                        config.uri = configExtension;

                        $.getJSON(configExtension, function (ext) {
                            $.extend(true, config, ext);

                            that.createExtension(extension, config);
                        });
                    } else {
                        that.createExtension(extension, config);
                    }
                });
            });
        };

        BootStrapper.prototype.createExtension = function (extension, config) {
            var provider = new extension.provider(config, this.pkg);

            new extension.type(provider);
        };
        return BootStrapper;
    })();

    
    return BootStrapper;
});
