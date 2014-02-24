var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../coreplayer-shared-module/dialogue"], function(require, exports, __dialogue__) {
    
    
    
    
    var dialogue = __dialogue__;

    var HelpDialogue = (function (_super) {
        __extends(HelpDialogue, _super);
        function HelpDialogue($element) {
            _super.call(this, $element);
        }
        HelpDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('helpDialogue');

            _super.prototype.create.call(this);

            $.subscribe(HelpDialogue.SHOW_HELP_DIALOGUE, function (e, params) {
                _this.open();
            });

            $.subscribe(HelpDialogue.HIDE_HELP_DIALOGUE, function (e) {
                _this.close();
            });

            this.$title = $('<h1></h1>');
            this.$content.append(this.$title);

            this.$scroll = $('<div class="scroll"></div>');
            this.$content.append(this.$scroll);

            this.$message = $('<p></p>');
            this.$scroll.append(this.$message);

            this.$title.text(this.content.title);
            this.$message.html(this.content.text);

            this.$message.find('a').prop('target', '_blank');

            this.$element.hide();
        };

        HelpDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        HelpDialogue.SHOW_HELP_DIALOGUE = 'onShowHelpDialogue';
        HelpDialogue.HIDE_HELP_DIALOGUE = 'onHideHelpDialogue';
        return HelpDialogue;
    })(dialogue.Dialogue);
    exports.HelpDialogue = HelpDialogue;
});
