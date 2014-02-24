define(["require", "exports"], function(require, exports) {
    var Thumb = (function () {
        function Thumb(index, url, label, height, visible) {
            this.index = index;
            this.url = url;
            this.label = label;
            this.height = height;
            this.visible = visible;
        }
        return Thumb;
    })();
    
    return Thumb;
});
