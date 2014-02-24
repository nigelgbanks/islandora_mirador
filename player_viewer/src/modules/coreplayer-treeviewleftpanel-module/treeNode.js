define(["require", "exports"], function(require, exports) {
    var TreeNode = (function () {
        function TreeNode(label, type, ref, path) {
            this.label = label;
            this.type = type;
            this.ref = ref;
            this.path = path;
            this.nodes = [];
        }
        return TreeNode;
    })();

    
    return TreeNode;
});
