var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../modules/coreplayer-shared-module/baseExtension", "../../utils", "../../modules/coreplayer-shared-module/baseProvider", "../../modules/coreplayer-shared-module/shell", "../../modules/coreplayer-shared-module/headerPanel", "../../modules/coreplayer-treeviewleftpanel-module/treeViewLeftPanel", "../../modules/coreplayer-treeviewleftpanel-module/treeView", "../../modules/coreplayer-mediaelementcenterpanel-module/mediaelementCenterPanel", "../../modules/coreplayer-moreinforightpanel-module/moreInfoRightPanel", "../../modules/coreplayer-shared-module/footerPanel", "../../modules/coreplayer-dialogues-module/helpDialogue", "./embedDialogue"], function(require, exports, __baseExtension__, __utils__, __baseProvider__, __shell__, __header__, __left__, __treeView__, __center__, __right__, __footer__, __help__, __embed__) {
    var baseExtension = __baseExtension__;
    var utils = __utils__;
    var baseProvider = __baseProvider__;
    
    var shell = __shell__;
    var header = __header__;
    var left = __left__;
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

            $(window).bind('enterfullscreen', function () {
                $.publish(baseExtension.BaseExtension.TOGGLE_FULLSCREEN);
            });

            $(window).bind('exitfullscreen', function () {
                $.publish(baseExtension.BaseExtension.TOGGLE_FULLSCREEN);
            });

            $.subscribe(treeView.TreeView.VIEW_STRUCTURE, function (e, structure) {
                _this.viewStructure(structure);
            });

            $.subscribe(footer.FooterPanel.EMBED, function (e) {
                $.publish(embed.EmbedDialogue.SHOW_EMBED_DIALOGUE);
            });

            this.createModules();

            this.setParams();

            $.publish(baseExtension.BaseExtension.RESIZE);

            this.viewMedia();
        };

        Extension.prototype.createModules = function () {
            this.headerPanel = new header.HeaderPanel(shell.Shell.$headerPanel);

            if (this.isLeftPanelEnabled()) {
                this.leftPanel = new left.TreeViewLeftPanel(shell.Shell.$leftPanel);
            }

            this.centerPanel = new center.MediaElementCenterPanel(shell.Shell.$centerPanel);
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
            return utils.Utils.getBool(this.provider.config.options.leftPanelEnabled, true) && this.provider.pkg.assetSequences.length > 1;
        };

        Extension.prototype.viewMedia = function () {
            var _this = this;
            var asset = this.getAssetByIndex(0);

            this.viewAsset(0, function () {
                asset.fileUri = (_this.provider).getMediaUri(asset.fileUri);

                $.publish(Extension.OPEN_MEDIA, [asset]);

                _this.setParam(baseProvider.params.assetIndex, 0);
            });
        };
        Extension.OPEN_MEDIA = 'onMediaOpened';
        Extension.MEDIA_PLAYED = 'onMediaPlayed';
        Extension.MEDIA_PAUSED = 'onMediaPaused';
        Extension.MEDIA_ENDED = 'onMediaEnded';
        return Extension;
    })(baseExtension.BaseExtension);
    exports.Extension = Extension;
});
