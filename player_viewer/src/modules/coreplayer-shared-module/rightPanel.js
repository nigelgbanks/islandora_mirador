var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./baseExpandPanel"], function(require, exports, __baseExpandPanel__) {
    
    
    
    var baseExpandPanel = __baseExpandPanel__;

    var RightPanel = (function (_super) {
        __extends(RightPanel, _super);
        function RightPanel($element) {
            _super.call(this, $element);
        }
        RightPanel.prototype.create = function () {
            _super.prototype.create.call(this);

            this.$element.width(this.options.panelCollapsedWidth);
        };

        RightPanel.prototype.getTargetWidth = function () {
            return this.isExpanded ? this.options.panelCollapsedWidth : this.options.panelExpandedWidth;
        };

        RightPanel.prototype.getTargetLeft = function () {
            return this.isExpanded ? this.$element.parent().width() - this.options.panelCollapsedWidth : this.$element.parent().width() - this.options.panelExpandedWidth;
        };

        RightPanel.prototype.toggleComplete = function () {
            _super.prototype.toggleComplete.call(this);

            if (this.isExpanded) {
                $.publish(RightPanel.OPEN_RIGHT_PANEL);
            } else {
                $.publish(RightPanel.CLOSE_RIGHT_PANEL);
            }
        };

        RightPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.$element.css({
                'left': this.$element.parent().width() - this.$element.outerWidth()
            });
        };
        RightPanel.OPEN_RIGHT_PANEL = 'onOpenRightPanel';
        RightPanel.CLOSE_RIGHT_PANEL = 'onCloseRightPanel';
        return RightPanel;
    })(baseExpandPanel.BaseExpandPanel);
    exports.RightPanel = RightPanel;
});
