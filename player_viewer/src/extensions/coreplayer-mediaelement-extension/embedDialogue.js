var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../modules/coreplayer-dialogues-module/embedDialogue"], function(require, exports, __embed__) {
    
    
    
    var embed = __embed__;
    

    var EmbedDialogue = (function (_super) {
        __extends(EmbedDialogue, _super);
        function EmbedDialogue() {
            _super.apply(this, arguments);
        }
        EmbedDialogue.prototype.create = function () {
            this.setConfig('embedDialogue');

            _super.prototype.create.call(this);
        };

        EmbedDialogue.prototype.formatCode = function () {
            this.code = (this.provider).getEmbedScript(this.currentWidth, this.currentHeight, this.options.embedTemplate);

            this.$code.val(this.code);
        };

        EmbedDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return EmbedDialogue;
    })(embed.EmbedDialogue);
    exports.EmbedDialogue = EmbedDialogue;
});
