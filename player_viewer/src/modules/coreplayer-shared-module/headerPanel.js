var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./baseExtension", "./baseView", "../coreplayer-dialogues-module/helpDialogue"], function(require, exports, __baseExtension__, __baseView__, __help__) {
    var baseExtension = __baseExtension__;
    var baseView = __baseView__;
    
    var help = __help__;

    var HeaderPanel = (function (_super) {
        __extends(HeaderPanel, _super);
        function HeaderPanel($element) {
            _super.call(this, $element, false, false);
        }
        HeaderPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('headerPanel');

            _super.prototype.create.call(this);

            $.subscribe(baseExtension.BaseExtension.SHOW_MESSAGE, function (e, message) {
                _this.showMessage(message);
            });

            $.subscribe(baseExtension.BaseExtension.HIDE_MESSAGE, function () {
                _this.hideMessage();
            });

            this.$options = $('<div class="options"></div>');
            this.$element.append(this.$options);

            this.$centerOptions = $('<div class="centerOptions"></div>');
            this.$options.append(this.$centerOptions);

            this.$rightOptions = $('<div class="rightOptions"></div>');
            this.$options.append(this.$rightOptions);

            this.$helpButton = $('<a href="#" class="action help">' + this.content.help + '</a>');
            this.$rightOptions.append(this.$helpButton);

            this.$messageBox = $('<div class="messageBox"> \
                                <div class="text"></div> \
                                <div class="close"></div> \
                              </div>');

            this.$element.append(this.$messageBox);

            this.$messageBox.hide();
            this.$messageBox.find('.close').attr('title', this.content.close);
            this.$messageBox.find('.close').on('click', function (e) {
                e.preventDefault();
                _this.hideMessage();
            });

            this.$helpButton.click(function (e) {
                e.preventDefault();

                $.publish(help.HelpDialogue.SHOW_HELP_DIALOGUE);
            });
        };

        HeaderPanel.prototype.showMessage = function (message) {
            this.message = message;
            this.$messageBox.find('.text').html(message).find('a').attr('target', '_top');
            this.$messageBox.show();
            this.$element.addClass('showMessage');
            $.publish(baseExtension.BaseExtension.RESIZE);
        };

        HeaderPanel.prototype.hideMessage = function () {
            this.$element.removeClass('showMessage');
            this.$messageBox.hide();
            $.publish(baseExtension.BaseExtension.RESIZE);
        };

        HeaderPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            var headerWidth = this.$element.width();
            var center = headerWidth / 2;
            var containerWidth = this.$centerOptions.outerWidth();
            var pos = center - (containerWidth / 2);

            this.$centerOptions.css({
                left: pos
            });

            if (this.$messageBox.is(':visible')) {
                var $text = this.$messageBox.find('.text');
                $text.actualWidth(this.$element.width() - this.$messageBox.find('.close').outerWidth(true));
                $text.ellipsisFill(this.message);
            }
        };
        return HeaderPanel;
    })(baseView.BaseView);
    exports.HeaderPanel = HeaderPanel;
});
