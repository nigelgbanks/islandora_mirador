var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./baseExtension", "../../utils", "./baseView", "./genericDialogue"], function(require, exports, __baseExtension__, __utils__, __baseView__, __genericDialogue__) {
    var baseExtension = __baseExtension__;
    var utils = __utils__;
    var baseView = __baseView__;
    var genericDialogue = __genericDialogue__;

    var Shell = (function (_super) {
        __extends(Shell, _super);
        function Shell($element) {
            Shell.$element = $element;
            _super.call(this, Shell.$element, true, true);
        }
        Shell.prototype.create = function () {
            _super.prototype.create.call(this);

            $.subscribe(Shell.SHOW_OVERLAY, function () {
                Shell.$overlays.show();
            });

            $.subscribe(Shell.HIDE_OVERLAY, function () {
                Shell.$overlays.hide();
            });

            Shell.$headerPanel = utils.Utils.createDiv('headerPanel');
            this.$element.append(Shell.$headerPanel);

            Shell.$mainPanel = utils.Utils.createDiv('mainPanel');
            this.$element.append(Shell.$mainPanel);

            Shell.$centerPanel = utils.Utils.createDiv('centerPanel');
            Shell.$mainPanel.append(Shell.$centerPanel);

            Shell.$leftPanel = utils.Utils.createDiv('leftPanel');
            Shell.$mainPanel.append(Shell.$leftPanel);

            Shell.$rightPanel = utils.Utils.createDiv('rightPanel');
            Shell.$mainPanel.append(Shell.$rightPanel);

            Shell.$footerPanel = utils.Utils.createDiv('footerPanel');
            Shell.$element.append(Shell.$footerPanel);

            Shell.$overlays = utils.Utils.createDiv('overlays');
            this.$element.append(Shell.$overlays);

            Shell.$genericDialogue = utils.Utils.createDiv('overlay genericDialogue');
            Shell.$overlays.append(Shell.$genericDialogue);

            Shell.$overlays.on('click', function (e) {
                if ($(e.target).hasClass('overlays')) {
                    e.preventDefault();
                    $.publish(baseExtension.BaseExtension.CLOSE_ACTIVE_DIALOGUE);
                }
            });

            new genericDialogue.GenericDialogue(Shell.$genericDialogue);
        };

        Shell.prototype.resize = function () {
            _super.prototype.resize.call(this);

            Shell.$overlays.width(this.extension.width());
            Shell.$overlays.height(this.extension.height());

            var mainHeight = this.$element.height() - Shell.$headerPanel.height() - Shell.$footerPanel.height();
            Shell.$mainPanel.actualHeight(mainHeight);
        };
        Shell.SHOW_OVERLAY = 'onShowOverlay';
        Shell.HIDE_OVERLAY = 'onHideOverlay';
        return Shell;
    })(baseView.BaseView);
    exports.Shell = Shell;
});
