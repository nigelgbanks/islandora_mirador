define(["require", "exports", "../../utils", "./baseProvider", "./shell", "./genericDialogue"], function(require, exports, __utils__, __baseProvider__, __shell__, __genericDialogue__) {
    var utils = __utils__;
    var baseProvider = __baseProvider__;
    var shell = __shell__;
    var genericDialogue = __genericDialogue__;
    
    

    var BaseExtension = (function () {
        function BaseExtension(provider) {
            this.isFullScreen = false;
            window.extension = this;

            this.provider = provider;

            this.create();
        }
        BaseExtension.prototype.create = function () {
            var _this = this;
            this.$element = $('#app');

            var $win = $(window);
            this.$element.width($win.width());
            this.$element.height($win.height());

            this.socket = new easyXDM.Socket({
                onMessage: function (message, origin) {
                    message = $.parseJSON(message);
                    _this.handleParentFrameEvent(message);
                }
            });

            this.$element.removeClass();
            if (!this.provider.isHomeDomain)
                this.$element.addClass('embedded');

            window.onresize = function () {
                var $win = $(window);
                $('body').height($win.height());

                $.publish(BaseExtension.RESIZE);
            };

            $(document).on('mousemove', function (e) {
                _this.mouseX = e.pageX;
                _this.mouseY = e.pageY;
            });

            $.subscribe(BaseExtension.TOGGLE_FULLSCREEN, function () {
                if (!_this.isOverlayActive()) {
                    _this.isFullScreen = !_this.isFullScreen;
                    _this.triggerSocket(BaseExtension.TOGGLE_FULLSCREEN, _this.isFullScreen);
                }
            });

            $(document).keyup(function (e) {
                if (e.keyCode === 27)
                    $.publish(BaseExtension.ESCAPE);
                if (e.keyCode === 13)
                    $.publish(BaseExtension.RETURN);
            });

            $.subscribe(BaseExtension.ESCAPE, function () {
                if (_this.isFullScreen) {
                    $.publish(BaseExtension.TOGGLE_FULLSCREEN);
                }
            });

            this.shell = new shell.Shell(this.$element);

            this.currentAssetIndex = -1;
        };

        BaseExtension.prototype.width = function () {
            return $(window).width();
        };

        BaseExtension.prototype.height = function () {
            return $(window).height();
        };

        BaseExtension.prototype.triggerSocket = function (eventName, eventObject) {
            if (this.socket) {
                this.socket.postMessage(JSON.stringify({ eventName: eventName, eventObject: eventObject }));
            }
        };

        BaseExtension.prototype.redirect = function (uri) {
            this.triggerSocket(BaseExtension.REDIRECT, uri);
        };

        BaseExtension.prototype.refresh = function () {
            this.triggerSocket(BaseExtension.REFRESH, null);
        };

        BaseExtension.prototype.handleParentFrameEvent = function (message) {
            switch (message.eventName) {
                case BaseExtension.TOGGLE_FULLSCREEN:
                    $.publish(BaseExtension.TOGGLE_FULLSCREEN, message.eventObject);
                    break;
            }
        };

        BaseExtension.prototype.getParam = function (key) {
            var value;

            if (this.isDeepLinkingEnabled()) {
                value = utils.Utils.getHashParameter(baseProvider.BaseProvider.paramMap[key], parent.document);
            }

            if (!value) {
                value = utils.Utils.getQuerystringParameter(baseProvider.BaseProvider.paramMap[key]);
            }

            return value;
        };

        BaseExtension.prototype.setParam = function (key, value) {
            if (this.isDeepLinkingEnabled()) {
                utils.Utils.setHashParameter(baseProvider.BaseProvider.paramMap[key], value, parent.document);
            }
        };

        BaseExtension.prototype.viewAsset = function (assetIndex, callback) {
            this.currentAssetIndex = assetIndex;

            $.publish(BaseExtension.ASSET_INDEX_CHANGED, [assetIndex]);

            if (callback)
                callback(assetIndex);
        };

        BaseExtension.prototype.viewAssetSequence = function (index) {
            if (this.isFullScreen) {
                $.publish(BaseExtension.TOGGLE_FULLSCREEN);
            }

            this.triggerSocket(BaseExtension.ASSETSEQUENCE_INDEX_CHANGED, index);
        };

        BaseExtension.prototype.viewStructure = function (structure) {
            if (structure.seeAlso && structure.seeAlso.tag && structure.seeAlso.data) {
                if (structure.seeAlso.tag === 'OpenExternal') {
                    var uri = this.provider.getMediaUri(structure.seeAlso.data);
                    window.open(uri, '_blank');
                }
            } else {
                this.viewAssetSequence(structure.assetSequence.index);
            }
        };

        BaseExtension.prototype.isDeepLinkingEnabled = function () {
            return (this.provider.isHomeDomain && this.provider.isOnlyInstance);
        };

        BaseExtension.prototype.getSectionByAssetIndex = function (index) {
            var asset = this.getAssetByIndex(index);

            return this.getAssetSection(asset);
        };

        BaseExtension.prototype.getSectionIndex = function (path) {
            for (var i = 0; i < this.provider.assetSequence.assets.length; i++) {
                var asset = this.provider.assetSequence.assets[i];
                for (var j = 0; j < asset.sections.length; j++) {
                    var section = asset.sections[j];

                    if (section.path == path) {
                        return i;
                    }
                }
            }

            return null;
        };

        BaseExtension.prototype.getAssetSection = function (asset) {
            return asset.sections.last();
        };

        BaseExtension.prototype.getAssetByIndex = function (index) {
            return this.provider.assetSequence.assets[index];
        };

        BaseExtension.prototype.getLastAssetOrderLabel = function () {
            for (var i = this.provider.assetSequence.assets.length - 1; i >= 0; i--) {
                var asset = this.provider.assetSequence.assets[i];

                var regExp = /\d/;

                if (regExp.test(asset.orderLabel)) {
                    return asset.orderLabel;
                }
            }

            return '-';
        };

        BaseExtension.prototype.getAssetIndexByOrderLabel = function (label) {
            var regExp = /(\d*)\D*(\d*)|(\d*)/;
            var match = regExp.exec(label);

            var labelPart1 = match[1];
            var labelPart2 = match[2];

            if (!labelPart1)
                return -1;

            var searchRegExp, regStr;

            if (labelPart2) {
                regStr = "^" + labelPart1 + "\\D*" + labelPart2 + "$";
            } else {
                regStr = "\\D*" + labelPart1 + "\\D*";
            }

            searchRegExp = new RegExp(regStr);

            for (var i = 0; i < this.provider.assetSequence.assets.length; i++) {
                var asset = this.provider.assetSequence.assets[i];

                if (searchRegExp.test(asset.orderLabel)) {
                    return i;
                }
            }

            return -1;
        };

        BaseExtension.prototype.getCurrentAsset = function () {
            return this.provider.assetSequence.assets[this.currentAssetIndex];
        };

        BaseExtension.prototype.showDialogue = function (message, acceptCallback, buttonText, allowClose) {
            $.publish(genericDialogue.GenericDialogue.SHOW_GENERIC_DIALOGUE, [
                {
                    message: message,
                    acceptCallback: acceptCallback,
                    buttonText: buttonText,
                    allowClose: allowClose
                }
            ]);
        };

        BaseExtension.prototype.closeActiveDialogue = function () {
            $.publish(BaseExtension.CLOSE_ACTIVE_DIALOGUE);
        };

        BaseExtension.prototype.isMultiAsset = function () {
            return this.provider.assetSequence.assets.length > 1;
        };

        BaseExtension.prototype.isOverlayActive = function () {
            return shell.Shell.$overlays.is(':visible');
        };

        BaseExtension.prototype.isSeeAlsoEnabled = function () {
            return this.provider.config.options.seeAlsoEnabled !== false;
        };
        BaseExtension.RESIZE = 'onResize';
        BaseExtension.TOGGLE_FULLSCREEN = 'onToggleFullScreen';
        BaseExtension.ASSET_INDEX_CHANGED = 'onAssetIndexChanged';
        BaseExtension.CLOSE_ACTIVE_DIALOGUE = 'onCloseActiveDialogue';
        BaseExtension.ASSETSEQUENCE_INDEX_CHANGED = 'onAssetSequenceIndexChanged';
        BaseExtension.REDIRECT = 'onRedirect';
        BaseExtension.REFRESH = 'onRefresh';
        BaseExtension.RELOAD = 'onReload';
        BaseExtension.ESCAPE = 'onEscape';
        BaseExtension.RETURN = 'onReturn';
        BaseExtension.WINDOW_UNLOAD = 'onWindowUnload';
        BaseExtension.OPEN_MEDIA = 'onOpenMedia';
        BaseExtension.CREATED = 'onCreated';
        BaseExtension.SHOW_MESSAGE = 'onShowMessage';
        BaseExtension.HIDE_MESSAGE = 'onHideMessage';
        return BaseExtension;
    })();
    exports.BaseExtension = BaseExtension;
});
