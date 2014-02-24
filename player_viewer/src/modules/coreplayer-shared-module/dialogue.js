var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./baseExtension", "./shell", "../../utils", "./baseView"], function(require, exports, __baseExtension__, __shell__, __utils__, __baseView__) {
    var baseExtension = __baseExtension__;
    var shell = __shell__;
    var utils = __utils__;
    var baseView = __baseView__;

    var Dialogue = (function (_super) {
        __extends(Dialogue, _super);
        function Dialogue($element) {
            _super.call(this, $element, false, false);
            this.isActive = false;
            this.allowClose = true;
        }
        Dialogue.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);

            $.subscribe(baseExtension.BaseExtension.CLOSE_ACTIVE_DIALOGUE, function () {
                if (_this.isActive) {
                    if (_this.allowClose) {
                        _this.close();
                    }
                }
            });

            $.subscribe(baseExtension.BaseExtension.ESCAPE, function () {
                if (_this.isActive) {
                    if (_this.allowClose) {
                        _this.close();
                    }
                }
            });

            $.subscribe(baseExtension.BaseExtension.RETURN, function (e) {
                _this.returnFunc();
            });

            this.$top = utils.Utils.createDiv('top');
            this.$element.append(this.$top);

            this.$closeButton = utils.Utils.createDiv('close');
            this.$top.append(this.$closeButton);

            this.$middle = utils.Utils.createDiv('middle');
            this.$element.append(this.$middle);

            this.$content = utils.Utils.createDiv('content');
            this.$middle.append(this.$content);

            this.$bottom = utils.Utils.createDiv('bottom');
            this.$element.append(this.$bottom);

            this.$closeButton.on('click', function (e) {
                e.preventDefault();

                _this.close();
            });

            this.returnFunc = this.close;
        };

        Dialogue.prototype.enableClose = function () {
            this.allowClose = true;
            this.$closeButton.show();
        };

        Dialogue.prototype.disableClose = function () {
            this.allowClose = false;
            this.$closeButton.hide();
        };

        Dialogue.prototype.setArrowPosition = function () {
            var paddingLeft = parseInt(this.$element.css("padding-left"));
            var pos = this.extension.mouseX - paddingLeft - 10;
            if (pos < 0)
                pos = 0;
            this.$bottom.css('backgroundPosition', pos + 'px 0px');
        };

        Dialogue.prototype.open = function () {
            this.$element.show();
            this.setArrowPosition();
            this.isActive = true;

            $.publish(shell.Shell.SHOW_OVERLAY);

            this.resize();
        };

        Dialogue.prototype.close = function () {
            if (this.isActive) {
                this.$element.hide();
                this.isActive = false;

                $.publish(shell.Shell.HIDE_OVERLAY);
            }
        };

        Dialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.$element.css({
                'top': (this.extension.height() / 2) - (this.$element.height() / 2),
                'left': (this.extension.width() / 2) - (this.$element.width() / 2)
            });
        };
        return Dialogue;
    })(baseView.BaseView);
    exports.Dialogue = Dialogue;
});
