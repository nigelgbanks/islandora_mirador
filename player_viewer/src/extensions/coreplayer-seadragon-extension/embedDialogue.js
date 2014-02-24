var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../modules/coreplayer-dialogues-module/embedDialogue", "../../modules/coreplayer-seadragoncenterpanel-module/seadragonCenterPanel"], function(require, exports, __embed__, __center__) {
    
    
    
    var embed = __embed__;
    var center = __center__;
    

    var EmbedDialogue = (function (_super) {
        __extends(EmbedDialogue, _super);
        function EmbedDialogue($element) {
            var _this = this;
            _super.call(this, $element);

            $.subscribe(center.SeadragonCenterPanel.SEADRAGON_OPEN, function (viewer) {
                _this.formatCode();
            });

            $.subscribe(center.SeadragonCenterPanel.SEADRAGON_ANIMATION_FINISH, function (viewer) {
                _this.formatCode();
            });
        }
        EmbedDialogue.prototype.create = function () {
            this.setConfig('embedDialogue');

            _super.prototype.create.call(this);
        };

        EmbedDialogue.prototype.formatCode = function () {
            var assetSequenceIndex = this.extension.currentAssetIndex;
            var zoom = (this.extension).getViewerBounds();

            this.code = (this.provider).getEmbedScript(this.extension.currentAssetIndex, zoom, this.currentWidth, this.currentHeight, this.options.embedTemplate);

            this.$code.val(this.code);
        };

        EmbedDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return EmbedDialogue;
    })(embed.EmbedDialogue);
    exports.EmbedDialogue = EmbedDialogue;
});
