var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./shell", "./baseView", "../../utils"], function(require, exports, __shell__, __baseView__, __utils__) {
    var shell = __shell__;
    var baseView = __baseView__;
    var utils = __utils__;

    var CenterPanel = (function (_super) {
        __extends(CenterPanel, _super);
        function CenterPanel($element) {
            _super.call(this, $element, false, true);
        }
        CenterPanel.prototype.create = function () {
            _super.prototype.create.call(this);

            this.$title = utils.Utils.createDiv('title');
            this.$element.append(this.$title);

            this.$content = utils.Utils.createDiv('content');
            this.$element.append(this.$content);

            if (this.options.titleEnabled === false) {
                this.$title.hide();
            }
        };

        CenterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.$element.css({
                'left': shell.Shell.$leftPanel.width(),
                'width': this.$element.parent().width() - shell.Shell.$leftPanel.width() - shell.Shell.$rightPanel.width()
            });

            var titleHeight;

            if (this.options.titleEnabled === false) {
                titleHeight = 0;
            } else {
                titleHeight = this.$title.height();
            }

            this.$content.height(this.$element.height() - titleHeight);
        };
        return CenterPanel;
    })(baseView.BaseView);
    exports.CenterPanel = CenterPanel;
});
