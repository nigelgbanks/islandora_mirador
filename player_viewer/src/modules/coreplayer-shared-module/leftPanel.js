var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./baseExpandPanel"], function(require, exports, __baseExpandPanel__) {
    
    
    
    var baseExpandPanel = __baseExpandPanel__;

    var LeftPanel = (function (_super) {
        __extends(LeftPanel, _super);
        function LeftPanel($element) {
            _super.call(this, $element);
        }
        LeftPanel.prototype.create = function () {
            _super.prototype.create.call(this);

            this.$element.width(this.options.panelCollapsedWidth);
        };

        LeftPanel.prototype.init = function () {
            _super.prototype.init.call(this);

            if (this.options.panelOpen && this.provider.isHomeDomain) {
                this.toggle();
            }
        };

        LeftPanel.prototype.getTargetWidth = function () {
            return this.isExpanded ? this.options.panelCollapsedWidth : this.options.panelExpandedWidth;
        };

        LeftPanel.prototype.toggleComplete = function () {
            _super.prototype.toggleComplete.call(this);

            if (this.isExpanded) {
                $.publish(LeftPanel.OPEN_LEFT_PANEL);
            } else {
                $.publish(LeftPanel.CLOSE_LEFT_PANEL);
            }
        };

        LeftPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        LeftPanel.OPEN_LEFT_PANEL = 'onOpenLeftPanel';
        LeftPanel.CLOSE_LEFT_PANEL = 'onCloseLeftPanel';
        return LeftPanel;
    })(baseExpandPanel.BaseExpandPanel);
    exports.LeftPanel = LeftPanel;
});
