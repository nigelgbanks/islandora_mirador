var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../coreplayer-shared-module/leftPanel", "../../utils", "./treeView", "./thumbsView"], function(require, exports, __baseLeft__, __utils__, __tree__, __thumbs__) {
    var baseLeft = __baseLeft__;
    var utils = __utils__;
    var tree = __tree__;
    var thumbs = __thumbs__;

    var TreeViewLeftPanel = (function (_super) {
        __extends(TreeViewLeftPanel, _super);
        function TreeViewLeftPanel($element) {
            _super.call(this, $element);
        }
        TreeViewLeftPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('treeViewLeftPanel');

            _super.prototype.create.call(this);

            this.$tabs = utils.Utils.createDiv('tabs');
            this.$main.append(this.$tabs);

            this.$treeButton = $('<a class="tab first">' + this.content.index + '</a>');
            this.$tabs.append(this.$treeButton);

            this.$thumbsButton = $('<a class="tab">' + this.content.thumbnails + '</a>');
            this.$tabs.append(this.$thumbsButton);

            this.$tabsContent = utils.Utils.createDiv('tabsContent');
            this.$main.append(this.$tabsContent);

            this.$treeView = utils.Utils.createDiv('treeView');
            this.$tabsContent.append(this.$treeView);

            this.$thumbsView = utils.Utils.createDiv('thumbsView');
            this.$tabsContent.append(this.$thumbsView);

            this.$treeButton.on('click', function (e) {
                e.preventDefault();

                _this.openTreeView();

                $.publish(TreeViewLeftPanel.OPEN_TREE_VIEW);
            });

            this.$thumbsButton.on('click', function (e) {
                e.preventDefault();

                _this.openThumbsView();

                $.publish(TreeViewLeftPanel.OPEN_THUMBS_VIEW);
            });
        };

        TreeViewLeftPanel.prototype.createTreeView = function () {
            this.treeView = new tree.TreeView(this.$treeView);
        };

        TreeViewLeftPanel.prototype.createThumbsView = function () {
            this.thumbsView = new thumbs.ThumbsView(this.$thumbsView);
        };

        TreeViewLeftPanel.prototype.toggleComplete = function () {
            _super.prototype.toggleComplete.call(this);

            if (this.isUnopened) {
                var type = this.provider.type;

                if (!utils.Utils.getBool(this.config.options.thumbsEnabled, true)) {
                    this.$tabs.hide();
                    this.openTreeView();
                } else {
                    if (type == 'archive' || type == 'boundmanuscript' || type == 'artwork') {
                        this.$tabs.hide();
                        this.openThumbsView();
                    } else {
                        this.openTreeView();
                    }
                }
            }
        };

        TreeViewLeftPanel.prototype.openTreeView = function () {
            if (!this.treeView) {
                this.createTreeView();
            }

            this.$treeButton.addClass('on');
            this.$thumbsButton.removeClass('on');

            this.treeView.show();
            if (this.thumbsView)
                this.thumbsView.hide();
        };

        TreeViewLeftPanel.prototype.openThumbsView = function () {
            if (!this.thumbsView) {
                this.createThumbsView();
            }

            this.$treeButton.removeClass('on');
            this.$thumbsButton.addClass('on');

            if (this.treeView)
                this.treeView.hide();
            this.thumbsView.show();
        };

        TreeViewLeftPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.$tabsContent.actualHeight(this.$main.height() - this.$tabs.outerHeight());
        };
        TreeViewLeftPanel.OPEN_TREE_VIEW = 'leftPanel.onOpenTreeView';
        TreeViewLeftPanel.OPEN_THUMBS_VIEW = 'leftPanel.onOpenThumbsView';
        return TreeViewLeftPanel;
    })(baseLeft.LeftPanel);
    exports.TreeViewLeftPanel = TreeViewLeftPanel;
});
