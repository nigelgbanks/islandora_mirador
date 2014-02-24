var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./baseExtension", "../../utils", "./baseView"], function(require, exports, __baseExtension__, __utils__, __baseView__) {
    var baseExtension = __baseExtension__;
    
    var utils = __utils__;
    var baseView = __baseView__;

    var BaseExpandPanel = (function (_super) {
        __extends(BaseExpandPanel, _super);
        function BaseExpandPanel($element) {
            _super.call(this, $element, false, true);
            this.isExpanded = false;
            this.isUnopened = true;
        }
        BaseExpandPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('shared');

            _super.prototype.create.call(this);

            this.$top = utils.Utils.createDiv('top');
            this.$element.append(this.$top);

            this.$title = utils.Utils.createDiv('title');
            this.$top.append(this.$title);

            this.$collapseButton = utils.Utils.createDiv('collapseButton');
            this.$top.append(this.$collapseButton);

            this.$closed = utils.Utils.createDiv('closed');
            this.$element.append(this.$closed);

            this.$expandButton = $('<a class="expandButton"></a>');
            this.$closed.append(this.$expandButton);

            this.$closedTitle = $('<a class="title"></a>');
            this.$closed.append(this.$closedTitle);

            this.$main = utils.Utils.createDiv('main');
            this.$element.append(this.$main);

            this.$expandButton.on('click', function (e) {
                e.preventDefault();

                _this.toggle();
            });

            this.$closedTitle.on('click', function (e) {
                e.preventDefault();

                _this.toggle();
            });

            this.$title.on('click', function (e) {
                e.preventDefault();

                _this.toggle();
            });

            this.$collapseButton.on('click', function (e) {
                e.preventDefault();

                _this.toggle();
            });

            this.$top.hide();
            this.$main.hide();
        };

        BaseExpandPanel.prototype.init = function () {
            _super.prototype.init.call(this);
        };

        BaseExpandPanel.prototype.toggle = function () {
            var _this = this;
            if (this.isExpanded) {
                this.$top.hide();
                this.$main.hide();
                this.$closed.show();
            }

            var targetWidth = this.getTargetWidth();
            var targetLeft = this.getTargetLeft();

            this.$element.stop().animate({
                width: targetWidth,
                left: targetLeft
            }, this.options.panelAnimationDuration, function () {
                _this.toggled();
            });
        };

        BaseExpandPanel.prototype.toggled = function () {
            this.isExpanded = !this.isExpanded;

            if (this.isExpanded) {
                this.$closed.hide();
                this.$top.show();
                this.$main.show();
            }

            this.toggleComplete();

            this.isUnopened = false;
        };

        BaseExpandPanel.prototype.getTargetWidth = function () {
            return 0;
        };

        BaseExpandPanel.prototype.getTargetLeft = function () {
            return 0;
        };

        BaseExpandPanel.prototype.toggleComplete = function () {
            $.publish(baseExtension.BaseExtension.RESIZE);
        };

        BaseExpandPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.$main.actualHeight(this.$element.parent().height() - this.$top.outerHeight(true));
        };
        return BaseExpandPanel;
    })(baseView.BaseView);
    exports.BaseExpandPanel = BaseExpandPanel;
});
