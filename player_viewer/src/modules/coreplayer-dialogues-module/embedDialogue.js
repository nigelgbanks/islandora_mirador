var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../utils", "../coreplayer-shared-module/dialogue"], function(require, exports, __utils__, __dialogue__) {
    
    
    var utils = __utils__;
    var dialogue = __dialogue__;

    var EmbedDialogue = (function (_super) {
        __extends(EmbedDialogue, _super);
        function EmbedDialogue($element) {
            _super.call(this, $element);
        }
        EmbedDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('embedDialogue');

            _super.prototype.create.call(this);

            var that = this;

            $.subscribe(EmbedDialogue.SHOW_EMBED_DIALOGUE, function (e, params) {
                _this.open();
                _this.formatCode();
            });

            $.subscribe(EmbedDialogue.HIDE_EMBED_DIALOGUE, function (e) {
                _this.close();
            });

            this.smallWidth = 560;
            this.smallHeight = 420;

            this.mediumWidth = 640;
            this.mediumHeight = 480;

            this.largeWidth = 800;
            this.largeHeight = 600;

            this.currentWidth = this.smallWidth;
            this.currentHeight = this.smallHeight;

            this.$title = $('<h1>' + this.content.title + '</h1>');
            this.$content.append(this.$title);

            this.$intro = $('<p>' + this.content.instructions + '</p>');
            this.$content.append(this.$intro);

            this.$code = $('<textarea class="code"></textarea>');
            this.$content.append(this.$code);

            this.$sizes = $('<div class="sizes"></div>');
            this.$content.append(this.$sizes);

            this.$smallSize = $('<div class="size small"></div>');
            this.$sizes.append(this.$smallSize);
            this.$smallSize.append('<p>' + this.smallWidth + ' x ' + this.smallHeight + '</p>');
            this.$smallSize.append('<div class="box"></div>');

            this.$mediumSize = $('<div class="size medium"></div>');
            this.$sizes.append(this.$mediumSize);
            this.$mediumSize.append('<p>' + this.mediumWidth + ' x ' + this.mediumHeight + '</p>');
            this.$mediumSize.append('<div class="box"></div>');

            this.$largeSize = $('<div class="size large"></div>');
            this.$sizes.append(this.$largeSize);
            this.$largeSize.append('<p>' + this.largeWidth + ' x ' + this.largeHeight + '</p>');
            this.$largeSize.append('<div class="box"></div>');

            this.$customSize = $('<div class="size custom"></div>');
            this.$sizes.append(this.$customSize);
            this.$customSize.append('<p>Custom size</p>');
            this.$customSizeWrap = $('<div class="wrap"></div>');
            this.$customSize.append(this.$customSizeWrap);
            this.$customSizeWidthWrap = $('<div class="width"></div>');
            this.$customSizeWrap.append(this.$customSizeWidthWrap);
            this.$customSizeWidthWrap.append('<label for="width">Width</label>');
            this.$customWidth = $('<input id="width" type="text" maxlength="5"></input>');
            this.$customSizeWidthWrap.append(this.$customWidth);
            this.$customSizeWidthWrap.append('<span>px</span>');
            this.$customSizeHeightWrap = $('<div class="height"></div>');
            this.$customSizeWrap.append(this.$customSizeHeightWrap);
            this.$customSizeHeightWrap.append('<label for="height">Height</label>');
            this.$customHeight = $('<input id="height" type="text" maxlength="5"></input>');
            this.$customSizeHeightWrap.append(this.$customHeight);
            this.$customSizeHeightWrap.append('<span>px</span>');

            this.$code.focus(function () {
                $(this).select();
            });

            this.$code.mouseup(function (e) {
                e.preventDefault();
            });

            this.$smallSize.click(function (e) {
                e.preventDefault();

                _this.currentWidth = _this.smallWidth;
                _this.currentHeight = _this.smallHeight;

                _this.formatCode();
            });

            this.$mediumSize.click(function (e) {
                e.preventDefault();

                _this.currentWidth = _this.mediumWidth;
                _this.currentHeight = _this.mediumHeight;

                _this.formatCode();
            });

            this.$largeSize.click(function (e) {
                e.preventDefault();

                _this.currentWidth = _this.largeWidth;
                _this.currentHeight = _this.largeHeight;

                _this.formatCode();
            });

            this.$smallSize.addClass('selected');

            this.$sizes.find('.size').click(function (e) {
                e.preventDefault();

                that.$sizes.find('.size').removeClass('selected');
                $(this).addClass('selected');
            });

            this.$customWidth.keydown(function (event) {
                utils.Utils.numericalInput(event);
            });

            this.$customWidth.keyup(function (event) {
                _this.getCustomSize();
            });

            this.$customHeight.keydown(function (event) {
                utils.Utils.numericalInput(event);
            });

            this.$customHeight.keyup(function (event) {
                _this.getCustomSize();
            });

            this.formatCode();

            this.$element.hide();
        };

        EmbedDialogue.prototype.getCustomSize = function () {
            this.currentWidth = this.$customWidth.val();
            this.currentHeight = this.$customHeight.val();

            this.formatCode();
        };

        EmbedDialogue.prototype.formatCode = function () {
        };

        EmbedDialogue.prototype.resize = function () {
            this.$element.css({
                'top': this.extension.height() - this.$element.outerHeight(true)
            });
        };
        EmbedDialogue.SHOW_EMBED_DIALOGUE = 'onShowEmbedDialogue';
        EmbedDialogue.HIDE_EMBED_DIALOGUE = 'onHideEmbedDialogue';
        return EmbedDialogue;
    })(dialogue.Dialogue);
    exports.EmbedDialogue = EmbedDialogue;
});
