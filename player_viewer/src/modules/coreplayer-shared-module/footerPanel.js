var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../utils", "./baseExtension", "./baseView"], function(require, exports, __utils__, __baseExtension__, __baseView__) {
    var utils = __utils__;
    var baseExtension = __baseExtension__;
    
    var baseView = __baseView__;

    var FooterPanel = (function (_super) {
        __extends(FooterPanel, _super);
        function FooterPanel($element) {
            _super.call(this, $element, true, false);
        }
        FooterPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('footerPanel');

            _super.prototype.create.call(this);

            $.subscribe(baseExtension.BaseExtension.TOGGLE_FULLSCREEN, function () {
                _this.toggleFullScreen();
            });

            this.$options = utils.Utils.createDiv('options');
            this.$element.append(this.$options);

            this.$embedButton = $('<a href="#" class="imageButton embed" title="' + this.content.embed + '"></a>');
            this.$options.append(this.$embedButton);

            this.$fullScreenBtn = $('<a href="#" class="imageButton fullScreen" title="' + this.content.fullScreen + '"></a>');
            this.$options.append(this.$fullScreenBtn);

            this.$embedButton.on('click', function (e) {
                e.preventDefault();

                $.publish(FooterPanel.EMBED);
            });

            this.$fullScreenBtn.on('click', function (e) {
                e.preventDefault();
                $.publish(baseExtension.BaseExtension.TOGGLE_FULLSCREEN);
            });

            if (this.options.minimiseButtons === true) {
                this.$options.addClass('minimiseButtons');
            }
        };

        FooterPanel.prototype.toggleFullScreen = function () {
            if (this.extension.isFullScreen) {
                this.$fullScreenBtn.swapClass('fullScreen', 'normal');
                this.$fullScreenBtn.attr('title', this.content.exitFullScreen);
            } else {
                this.$fullScreenBtn.swapClass('normal', 'fullScreen');
                this.$fullScreenBtn.attr('title', this.content.fullScreen);
            }
        };

        FooterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.$element.css({
                'top': this.extension.height() - this.$element.height()
            });
        };
        FooterPanel.EMBED = 'footer.onEmbed';
        return FooterPanel;
    })(baseView.BaseView);
    exports.FooterPanel = FooterPanel;
});
