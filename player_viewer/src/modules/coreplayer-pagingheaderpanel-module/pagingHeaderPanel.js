var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../coreplayer-shared-module/baseExtension", "../../extensions/coreplayer-seadragon-extension/extension", "../coreplayer-shared-module/headerPanel"], function(require, exports, __baseExtension__, __extension__, __baseHeader__) {
    var baseExtension = __baseExtension__;
    var extension = __extension__;
    var baseHeader = __baseHeader__;
    
    
    

    var PagingHeaderPanel = (function (_super) {
        __extends(PagingHeaderPanel, _super);
        function PagingHeaderPanel($element) {
            _super.call(this, $element);
        }
        PagingHeaderPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('pagingHeaderPanel');

            _super.prototype.create.call(this);

            $.subscribe(baseExtension.BaseExtension.ASSET_INDEX_CHANGED, function (e, assetIndex) {
                _this.assetIndexChanged(assetIndex);
            });

            $.subscribe(extension.Extension.MODE_CHANGED, function (e, mode) {
                _this.modeChanged(mode);
            });

            this.$prevOptions = $('<div class="prevOptions"></div>');
            this.$centerOptions.append(this.$prevOptions);

            this.$firstButton = $('<a class="imageButton first"></a>');
            this.$prevOptions.append(this.$firstButton);

            this.$prevButton = $('<a class="imageButton prev"></a>');
            this.$prevOptions.append(this.$prevButton);

            this.$modeOptions = $('<div class="mode"></div>');
            this.$centerOptions.append(this.$modeOptions);

            this.$imageModeLabel = $('<label for="image">' + this.content.image + '</label>');
            this.$modeOptions.append(this.$imageModeLabel);
            this.$imageModeOption = $('<input type="radio" id="image" name="mode"></input>');
            this.$modeOptions.append(this.$imageModeOption);

            this.$pageModeLabel = $('<label for="page">' + this.content.page + '</label>');
            this.$modeOptions.append(this.$pageModeLabel);
            this.$pageModeOption = $('<input type="radio" id="page" name="mode"></input>');
            this.$modeOptions.append(this.$pageModeOption);

            this.$search = $('<div class="search"></div>');
            this.$centerOptions.append(this.$search);

            this.$searchText = $('<input class="searchText" maxlength="5" type="text"></input>');
            this.$search.append(this.$searchText);

            this.$total = $('<span class="total"></span>');
            this.$search.append(this.$total);

            this.$searchButton = $('<a class="imageButton go"></a>');
            this.$search.append(this.$searchButton);

            this.$nextOptions = $('<div class="nextOptions"></div>');
            this.$centerOptions.append(this.$nextOptions);

            this.$nextButton = $('<a class="imageButton next"></a>');
            this.$nextOptions.append(this.$nextButton);

            this.$lastButton = $('<a class="imageButton last"></a>');
            this.$nextOptions.append(this.$lastButton);

            if ((this.extension).getMode() == extension.Extension.PAGE_MODE) {
                this.$pageModeOption.attr('checked', 'checked');
                this.$pageModeOption.removeAttr('disabled');
                this.$pageModeLabel.removeClass('disabled');
            } else {
                this.$imageModeOption.attr('checked', 'checked');

                this.$pageModeOption.attr('disabled', 'disabled');
                this.$pageModeLabel.addClass('disabled');
            }

            this.setTitles();

            this.setTotal();

            if (this.provider.assetSequence.assets.length == 1) {
                this.$centerOptions.hide();
            }

            this.$firstButton.on('click', function (e) {
                e.preventDefault();

                $.publish(PagingHeaderPanel.FIRST);
            });

            this.$prevButton.on('click', function (e) {
                e.preventDefault();

                $.publish(PagingHeaderPanel.PREV);
            });

            this.$nextButton.on('click', function (e) {
                e.preventDefault();

                $.publish(PagingHeaderPanel.NEXT);
            });

            this.$imageModeOption.on('click', function (e) {
                $.publish(PagingHeaderPanel.MODE_CHANGED, [extension.Extension.IMAGE_MODE]);
            });

            this.$pageModeOption.on('click', function (e) {
                $.publish(PagingHeaderPanel.MODE_CHANGED, [extension.Extension.PAGE_MODE]);
            });

            this.$searchText.on('keyup', function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    _this.$searchText.blur();

                    setTimeout(function () {
                        _this.search();
                    }, 1);
                }
            });

            this.$searchButton.on('click', function (e) {
                e.preventDefault();

                _this.search();
            });

            this.$lastButton.on('click', function (e) {
                e.preventDefault();

                $.publish(PagingHeaderPanel.LAST);
            });

            if (this.options.modeOptionsEnabled === false) {
                this.$modeOptions.hide();
                this.$centerOptions.addClass('modeOptionsDisabled');
            }

            if (this.options.helpEnabled === false) {
                this.$helpButton.hide();
            }
        };

        PagingHeaderPanel.prototype.setTitles = function () {
            var mode;

            if ((this.extension).getMode() === extension.Extension.PAGE_MODE) {
                mode = "page";
            } else {
                mode = "image";
            }

            this.$firstButton.prop('title', this.content.first + " " + mode);
            this.$prevButton.prop('title', this.content.previous + " " + mode);
            this.$nextButton.prop('title', this.content.next + " " + mode);
            this.$lastButton.prop('title', this.content.last + " " + mode);
            this.$searchButton.prop('title', this.content.go);
        };

        PagingHeaderPanel.prototype.setTotal = function () {
            var of = this.content.of;

            if ((this.extension).getMode() === extension.Extension.PAGE_MODE) {
                this.$total.html(String.prototype.format(of, this.extension.getLastAssetOrderLabel()));
            } else {
                this.$total.html(String.prototype.format(of, this.provider.assetSequence.assets.length));
            }
        };

        PagingHeaderPanel.prototype.setSearchPlaceholder = function (index) {
            var asset = this.extension.getAssetByIndex(index);

            if ((this.extension).getMode() === extension.Extension.PAGE_MODE) {
                if (asset.orderLabel.trim() === "-") {
                    this.$searchText.val("");
                } else {
                    this.$searchText.val(asset.orderLabel);
                }
            } else {
                index++;
                this.$searchText.val(index);
            }
        };

        PagingHeaderPanel.prototype.search = function () {
            var value = this.$searchText.val();

            if (!value) {
                this.extension.showDialogue(this.content.emptyValue);

                return;
            }

            if ((this.extension).getMode() === extension.Extension.PAGE_MODE) {
                $.publish(PagingHeaderPanel.PAGE_SEARCH, [value]);
            } else {
                var index = parseInt(this.$searchText.val());

                if (isNaN(index)) {
                    this.extension.showDialogue(this.provider.config.modules.genericDialogue.content.invalidNumber);
                    return;
                }

                var asset = this.extension.getAssetByIndex(index);

                if (!asset) {
                    this.extension.showDialogue(this.provider.config.modules.genericDialogue.content.pageNotFound);
                    return;
                }

                index--;
                $.publish(PagingHeaderPanel.IMAGE_SEARCH, [index.toString()]);
            }
        };

        PagingHeaderPanel.prototype.assetIndexChanged = function (index) {
            this.setSearchPlaceholder(index);
        };

        PagingHeaderPanel.prototype.modeChanged = function (mode) {
            this.setSearchPlaceholder(this.extension.currentAssetIndex);
            this.setTitles();
            this.setTotal();
        };

        PagingHeaderPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        PagingHeaderPanel.FIRST = 'header.onFirst';
        PagingHeaderPanel.LAST = 'header.onLast';
        PagingHeaderPanel.PREV = 'header.onPrev';
        PagingHeaderPanel.NEXT = 'header.onNext';
        PagingHeaderPanel.PAGE_SEARCH = 'header.onPageSearch';
        PagingHeaderPanel.IMAGE_SEARCH = 'header.onImageSearch';
        PagingHeaderPanel.MODE_CHANGED = 'header.onModeChanged';
        return PagingHeaderPanel;
    })(baseHeader.HeaderPanel);
    exports.PagingHeaderPanel = PagingHeaderPanel;
});
