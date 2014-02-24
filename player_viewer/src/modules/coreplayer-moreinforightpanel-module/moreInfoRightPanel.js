var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../coreplayer-shared-module/rightPanel"], function(require, exports, __baseRight__) {
    var baseRight = __baseRight__;

    var MoreInfoRightPanel = (function (_super) {
        __extends(MoreInfoRightPanel, _super);
        function MoreInfoRightPanel($element) {
            _super.call(this, $element);
        }
        MoreInfoRightPanel.prototype.create = function () {
            this.setConfig('moreInfoRightPanel');

            _super.prototype.create.call(this);
        };

        MoreInfoRightPanel.prototype.toggleComplete = function () {
            _super.prototype.toggleComplete.call(this);

            if (this.isUnopened) {
                this.getInfo();
            }
        };

        MoreInfoRightPanel.prototype.getInfo = function () {
            this.$main.addClass('loading');

            this.displayInfo();
        };

        MoreInfoRightPanel.prototype.displayInfo = function () {
            this.$main.append(this.content.holdingText);
        };

        MoreInfoRightPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return MoreInfoRightPanel;
    })(baseRight.RightPanel);
    exports.MoreInfoRightPanel = MoreInfoRightPanel;
});
