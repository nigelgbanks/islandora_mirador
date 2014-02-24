define(["require", "exports"], function(require, exports) {
    var Panel = (function () {
        function Panel($element, fitToParentWidth, fitToParentHeight) {
            this.$element = $element;
            this.fitToParentWidth = fitToParentWidth || false;
            this.fitToParentHeight = fitToParentHeight || false;

            this.create();
        }
        Panel.prototype.create = function () {
            var _this = this;
            $.subscribe('onResize', function () {
                _this.resize();
            });
        };

        Panel.prototype.resize = function () {
            var $parent = this.$element.parent();

            if (this.fitToParentWidth) {
                this.$element.actualWidth($parent.width());
            }

            if (this.fitToParentHeight) {
                this.$element.actualHeight($parent.height());
            }
        };
        return Panel;
    })();
    exports.Panel = Panel;
});
