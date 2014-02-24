var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../modules/coreplayer-shared-module/baseExtension", "../../utils", "../../modules/coreplayer-shared-module/baseProvider", "../../modules/coreplayer-shared-module/shell", "../../modules/coreplayer-pagingheaderpanel-module/pagingHeaderPanel", "../../modules/coreplayer-treeviewleftpanel-module/treeViewLeftPanel", "../../modules/coreplayer-treeviewleftpanel-module/thumbsView", "../../modules/coreplayer-treeviewleftpanel-module/treeView", "../../modules/coreplayer-seadragoncenterpanel-module/seadragonCenterPanel", "../../modules/coreplayer-moreinforightpanel-module/moreInfoRightPanel", "../../modules/coreplayer-shared-module/footerPanel", "../../modules/coreplayer-dialogues-module/helpDialogue", "../../extensions/coreplayer-seadragon-extension/embedDialogue"], function(require, exports, __baseExtension__, __utils__, __baseProvider__, __shell__, __header__, __left__, __thumbsView__, __treeView__, __center__, __right__, __footer__, __help__, __embed__) {
    var baseExtension = __baseExtension__;
    var utils = __utils__;
    var baseProvider = __baseProvider__;
    
    var shell = __shell__;
    var header = __header__;
    var left = __left__;
    var thumbsView = __thumbsView__;
    var treeView = __treeView__;
    var center = __center__;
    var right = __right__;
    var footer = __footer__;
    var help = __help__;
    var embed = __embed__;
    

    var Extension = (function (_super) {
        __extends(Extension, _super);
        function Extension(provider) {
            _super.call(this, provider);
        }
        Extension.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);

            $.subscribe(header.PagingHeaderPanel.FIRST, function (e) {
                _this.viewPage(0);
            });

            $.subscribe(header.PagingHeaderPanel.LAST, function (e) {
                _this.viewPage(_this.provider.assetSequence.assets.length - 1);
            });

            $.subscribe(header.PagingHeaderPanel.PREV, function (e) {
                if (_this.currentAssetIndex != 0) {
                    _this.viewPage(Number(_this.currentAssetIndex) - 1);
                }
            });

            $.subscribe(header.PagingHeaderPanel.NEXT, function (e) {
                if (_this.currentAssetIndex != _this.provider.assetSequence.assets.length - 1) {
                    _this.viewPage(Number(_this.currentAssetIndex) + 1);
                }
            });

            $.subscribe(header.PagingHeaderPanel.MODE_CHANGED, function (e, mode) {
                Extension.mode = mode;

                $.publish(Extension.MODE_CHANGED, [mode]);
            });

            $.subscribe(header.PagingHeaderPanel.PAGE_SEARCH, function (e, value) {
                _this.viewLabel(value);
            });

            $.subscribe(header.PagingHeaderPanel.IMAGE_SEARCH, function (e, index) {
                _this.viewPage(index);
            });

            $.subscribe(treeView.TreeView.VIEW_STRUCTURE, function (e, structure) {
                _this.viewStructure(structure);
            });

            $.subscribe(treeView.TreeView.VIEW_SECTION, function (e, section) {
                _this.viewSection(section.path);
            });

            $.subscribe(thumbsView.ThumbsView.THUMB_SELECTED, function (e, index) {
                _this.viewPage(index);
            });

            $.subscribe(center.SeadragonCenterPanel.SEADRAGON_ANIMATION_FINISH, function (e, viewer) {
                _this.setParam(baseProvider.params.zoom, _this.centerPanel.serialiseBounds(_this.centerPanel.currentBounds));
            });

            $.subscribe(center.SeadragonCenterPanel.PREV, function (e) {
                if (_this.currentAssetIndex != 0) {
                    _this.viewPage(Number(_this.currentAssetIndex) - 1);
                }
            });

            $.subscribe(center.SeadragonCenterPanel.NEXT, function (e) {
                if (_this.currentAssetIndex != _this.provider.assetSequence.assets.length - 1) {
                    _this.viewPage(Number(_this.currentAssetIndex) + 1);
                }
            });

            $.subscribe(footer.FooterPanel.EMBED, function (e) {
                $.publish(embed.EmbedDialogue.SHOW_EMBED_DIALOGUE);
            });

            this.createModules();

            this.setParams();

            var assetIndex;

            if (!this.provider.isReload) {
                assetIndex = parseInt(this.getParam(baseProvider.params.assetIndex)) || 0;
            }

            this.viewPage(assetIndex || 0);

            $.publish(baseExtension.BaseExtension.RESIZE);
        };

        Extension.prototype.createModules = function () {
            this.headerPanel = new header.PagingHeaderPanel(shell.Shell.$headerPanel);

            if (this.isLeftPanelEnabled()) {
                this.leftPanel = new left.TreeViewLeftPanel(shell.Shell.$leftPanel);
            }

            this.centerPanel = new center.SeadragonCenterPanel(shell.Shell.$centerPanel);
            this.rightPanel = new right.MoreInfoRightPanel(shell.Shell.$rightPanel);
            this.footerPanel = new footer.FooterPanel(shell.Shell.$footerPanel);

            this.$helpDialogue = utils.Utils.createDiv('overlay help');
            shell.Shell.$overlays.append(this.$helpDialogue);
            this.helpDialogue = new help.HelpDialogue(this.$helpDialogue);

            this.$embedDialogue = utils.Utils.createDiv('overlay embed');
            shell.Shell.$overlays.append(this.$embedDialogue);
            this.embedDialogue = new embed.EmbedDialogue(this.$embedDialogue);

            if (this.isLeftPanelEnabled()) {
                this.leftPanel.init();
            }
        };

        Extension.prototype.setParams = function () {
            if (!this.provider.isHomeDomain)
                return;

            this.setParam(baseProvider.params.assetSequenceIndex, this.provider.assetSequenceIndex);
        };

        Extension.prototype.isLeftPanelEnabled = function () {
            return utils.Utils.getBool(this.provider.config.options.leftPanelEnabled, true) && this.provider.assetSequence.assets.length > 1;
        };

        Extension.prototype.viewPage = function (assetIndex) {
            var _this = this;
            this.viewAsset(assetIndex, function () {
                var asset = _this.provider.assetSequence.assets[assetIndex];

                var dziUri = (_this.provider).getDziUri(asset);

                $.publish(Extension.OPEN_MEDIA, [dziUri]);

                _this.setParam(baseProvider.params.assetIndex, assetIndex);
            });
        };

        Extension.prototype.viewSection = function (path) {
            var index = this.getSectionIndex(path);

            this.viewPage(index);
        };

        Extension.prototype.viewLabel = function (label) {
            if (!label) {
                this.showDialogue(this.provider.config.modules.genericDialogue.content.emptyValue);
                return;
            }

            var index = this.getAssetIndexByOrderLabel(label);

            if (index != -1) {
                this.viewPage(index);
            } else {
                this.showDialogue(this.provider.config.modules.genericDialogue.content.pageNotFound);
            }
        };

        Extension.prototype.getMode = function () {
            if (Extension.mode)
                return Extension.mode;

            switch (this.provider.type) {
                case 'monograph':
                    return Extension.PAGE_MODE;
                    break;
                case 'archive':
                case 'boundmanuscript':
                    return Extension.IMAGE_MODE;
                    break;
                default:
                    return Extension.IMAGE_MODE;
            }
        };

        Extension.prototype.getViewerBounds = function () {
            if (!this.centerPanel)
                return;

            var bounds = this.centerPanel.getBounds();

            if (bounds)
                return this.centerPanel.serialiseBounds(bounds);

            return "";
        };
        Extension.MODE_CHANGED = 'onModeChanged';

        Extension.PAGE_MODE = "pageMode";
        Extension.IMAGE_MODE = "imageMode";
        return Extension;
    })(baseExtension.BaseExtension);
    exports.Extension = Extension;
});
