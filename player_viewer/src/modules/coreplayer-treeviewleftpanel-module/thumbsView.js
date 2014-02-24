var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../utils", "../coreplayer-shared-module/baseExtension", "../../extensions/coreplayer-seadragon-extension/extension", "../coreplayer-shared-module/baseView", "../coreplayer-treeviewleftpanel-module/thumb"], function(require, exports, __utils__, __baseExtension__, __extension__, __baseView__, __Thumb__) {
    var utils = __utils__;
    var baseExtension = __baseExtension__;
    var extension = __extension__;
    
    var baseView = __baseView__;
    var Thumb = __Thumb__;
    

    var ThumbsView = (function (_super) {
        __extends(ThumbsView, _super);
        function ThumbsView($element) {
            _super.call(this, $element, true, true);
        }
        ThumbsView.prototype.create = function () {
            var _this = this;
            this.setConfig('treeViewLeftPanel');

            _super.prototype.create.call(this);

            $.subscribe(baseExtension.BaseExtension.ASSET_INDEX_CHANGED, function (e, index) {
                _this.selectIndex(parseInt(index));
            });

            $.subscribe(extension.Extension.MODE_CHANGED, function (e, mode) {
                _this.setLabel();
            });

            $.subscribe(extension.Extension.RELOAD, function () {
                _this.createThumbs();
            });

            this.$thumbs = utils.Utils.createDiv('thumbs');
            this.$element.append(this.$thumbs);

            $.templates({
                thumbsTemplate: '<div class="thumb" data-src="{{>url}}" data-visible="{{>visible}}">\
                                <div class="wrap" style="height:{{>height}}px"></div>\
                                <span class="index">{{:#index + 1}}</span>\
                                <span class="label">{{>label}}&nbsp;</span>\
                            </div>\
                            {{if ~isEven(#index + 1)}} \
                                <div class="separator"></div> \
                            {{/if}}'
            });

            $.views.helpers({
                isEven: function (num) {
                    return (num % 2 == 0) ? true : false;
                }
            });

            this.$element.on('scroll', function () {
                _this.scrollStop();
            }, 1000);

            this.resize();

            this.createThumbs();
        };

        ThumbsView.prototype.scrollStop = function () {
            var scrollPos = 1 / ((this.$thumbs.height() - this.$element.height()) / this.$element.scrollTop());

            if (scrollPos > 1)
                scrollPos = 1;

            var thumbRangeMid = Math.floor((this.thumbs.length - 1) * scrollPos);

            this.loadThumbs(thumbRangeMid);
        };

        ThumbsView.prototype.createThumbs = function () {
            var that = this;
            this.thumbs = [];

            for (var i = 0; i < this.provider.assetSequence.assets.length; i++) {
                var asset = this.provider.assetSequence.assets[i];

                var uri = (this.provider).getThumbUri(asset);
                var section = this.extension.getAssetSection(asset);

                var heightRatio = asset.height / asset.width;
                var height = 90 * heightRatio;

                var visible = true;

                if (section.extensions) {
                    if (section.extensions.authStatus.toLowerCase() !== "allowed") {
                        visible = false;
                    }
                }

                if (asset.orderLabel.trim() === "-") {
                    asset.orderLabel = "";
                }

                this.thumbs.push(new Thumb(i, uri, asset.orderLabel, height, visible));
            }

            this.$thumbs.link($.templates.thumbsTemplate, this.thumbs);

            this.$thumbs.delegate(".thumb", "click", function (e) {
                e.preventDefault();

                var data = $.view(this).data;

                that.lastThumbClickedIndex = data.index;

                $.publish(ThumbsView.THUMB_SELECTED, [data.index]);
            });

            this.selectIndex(this.extension.currentAssetIndex);

            this.setLabel();

            this.loadThumbs(0);
        };

        ThumbsView.prototype.loadThumbs = function (index) {
            index = parseInt(index);

            var thumbRangeMid = index;
            var thumbLoadRange = this.options.thumbsLoadRange;

            var thumbRange = {
                start: (thumbRangeMid > thumbLoadRange) ? thumbRangeMid - thumbLoadRange : 0,
                end: (thumbRangeMid < (this.thumbs.length - 1) - thumbLoadRange) ? thumbRangeMid + thumbLoadRange : this.thumbs.length - 1
            };

            var fadeDuration = this.options.thumbsImageFadeInDuration;

            for (var i = thumbRange.start; i <= thumbRange.end; i++) {
                var thumbElem = $(this.$thumbs.find('.thumb')[i]);
                var imgCont = thumbElem.find('.wrap');

                if (!imgCont.hasClass('loading') && !imgCont.hasClass('loaded')) {
                    var visible = thumbElem.attr('data-visible');

                    if (visible !== "false") {
                        imgCont.addClass('loading');
                        var src = thumbElem.attr('data-src');

                        var img = $('<img src="' + src + '" />');

                        $(img).hide().load(function () {
                            $(this).fadeIn(fadeDuration, function () {
                                $(this).parent().swapClass('loading', 'loaded');
                            });
                        });
                        imgCont.append(img);
                    } else {
                        imgCont.addClass('hidden');
                    }
                }
            }
        };

        ThumbsView.prototype.show = function () {
            var _this = this;
            this.$element.show();

            setTimeout(function () {
                _this.selectIndex(_this.extension.currentAssetIndex);
            }, 1);
        };

        ThumbsView.prototype.hide = function () {
            this.$element.hide();
        };

        ThumbsView.prototype.setLabel = function () {
            if ((this.extension).getMode() == extension.Extension.PAGE_MODE) {
                $(this.$thumbs).find('span.index').hide();
                $(this.$thumbs).find('span.label').show();
            } else {
                $(this.$thumbs).find('span.index').show();
                $(this.$thumbs).find('span.label').hide();
            }
        };

        ThumbsView.prototype.selectIndex = function (index) {
            if (index == -1)
                return;

            index = parseInt(index);

            if (this.$selectedThumb) {
                this.$selectedThumb.removeClass('selected');
            }

            this.$selectedThumb = $(this.$thumbs.find('.thumb')[index]);
            this.$selectedThumb.addClass('selected');

            if (this.lastThumbClickedIndex != index) {
                var scrollTop = this.$element.scrollTop() + this.$selectedThumb.position().top;
                this.$element.scrollTop(scrollTop);
            }

            this.loadThumbs(index);
        };

        ThumbsView.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        ThumbsView.THUMB_SELECTED = 'thumbsView.onThumbSelected';
        return ThumbsView;
    })(baseView.BaseView);
    exports.ThumbsView = ThumbsView;
});
