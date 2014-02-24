var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./baseExtension", "./dialogue"], function(require, exports, __baseExtension__, __dialogue__) {
    var baseExtension = __baseExtension__;
    
    
    var dialogue = __dialogue__;

    var GenericDialogue = (function (_super) {
        __extends(GenericDialogue, _super);
        function GenericDialogue($element) {
            _super.call(this, $element);
        }
        GenericDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('genericDialogue');

            _super.prototype.create.call(this);

            $.subscribe(GenericDialogue.SHOW_GENERIC_DIALOGUE, function (e, params) {
                _this.showMessage(params);
            });

            $.subscribe(GenericDialogue.HIDE_GENERIC_DIALOGUE, function (e) {
                _this.close();
            });

            this.$message = $('<p></p>');
            this.$content.append(this.$message);

            this.$acceptButton = $('<a href="#" class="button accept"></a>');
            this.$content.append(this.$acceptButton);
            this.$acceptButton.text(this.content.ok);

            this.$acceptButton.on('click', function (e) {
                e.preventDefault();

                _this.accept();
            });

            this.returnFunc = function () {
                if (_this.isActive) {
                    _this.accept();
                }
            };

            this.$element.hide();
        };

        GenericDialogue.prototype.accept = function () {
            $.publish(baseExtension.BaseExtension.CLOSE_ACTIVE_DIALOGUE);

            if (this.acceptCallback)
                this.acceptCallback();
        };

        GenericDialogue.prototype.showMessage = function (params) {
            this.$message.html(params.message);

            if (params.buttonText) {
                this.$acceptButton.text(params.buttonText);
            } else {
                this.$acceptButton.text(this.content.ok);
            }

            this.acceptCallback = params.acceptCallback;

            if (params.allowClose === false) {
                this.disableClose();
            }

            this.open();
        };

        GenericDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        GenericDialogue.SHOW_GENERIC_DIALOGUE = 'onShowGenericDialogue';
        GenericDialogue.HIDE_GENERIC_DIALOGUE = 'onHideGenericDialogue';
        return GenericDialogue;
    })(dialogue.Dialogue);
    exports.GenericDialogue = GenericDialogue;
});
