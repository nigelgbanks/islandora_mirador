var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../coreplayer-shared-module/baseExtension", "../coreplayer-shared-module/baseView", "../coreplayer-treeviewleftpanel-module/treeNode"], function(require, exports, __baseExtension__, __baseView__, __TreeNode__) {
    
    var baseExtension = __baseExtension__;
    
    var baseView = __baseView__;
    var TreeNode = __TreeNode__;

    var TreeView = (function (_super) {
        __extends(TreeView, _super);
        function TreeView($element) {
            _super.call(this, $element, true, false);
        }
        TreeView.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);

            $.subscribe(baseExtension.BaseExtension.ASSET_INDEX_CHANGED, function (e, assetIndex) {
                _this.selectIndex(assetIndex);
            });

            this.createTreeNodes();

            this.$tree = $('<ul class="tree"></ul>');
            this.$element.append(this.$tree);

            $.templates({
                pageTemplate: '{^{for nodes}}\
                               {^{tree/}}\
                           {{/for}}',
                treeTemplate: '<li>\
                               {^{if nodes && nodes.length}}\
                                   {^{if expanded}}\
                                       <div class="toggle expanded"></div>\
                                   {{else}}\
                                       <div class="toggle"></div>\
                                   {{/if}}\
                               {{else}}\
                                   <div class="spacer"></div>\
                               {{/if}}\
                               {^{if selected}}\
                                   <a href="#" class="selected">{{>label}}</a>\
                               {{else}}\
                                   <a href="#">{{>label}}</a>\
                               {{/if}}\
                           </li>\
                           {^{if expanded}}\
                               <li>\
                                   <ul>\
                                       {^{for nodes}}\
                                           {^{tree/}}\
                                       {{/for}}\
                                   </ul>\
                               </li>\
                           {{/if}}'
            });

            $.views.tags({
                tree: {
                    toggle: function () {
                        $.observable(this.data).setProperty("expanded", !this.data.expanded);
                    },
                    init: function (tagCtx, linkCtx, ctx) {
                        this.data = tagCtx.view.data;
                    },
                    onAfterLink: function () {
                        var self = this;

                        self.contents("li").first().on("click", ".toggle", function () {
                            self.toggle();
                        }).on("click", "a", function (e) {
                            e.preventDefault();

                            if (self.data.type == 'structure') {
                                $.publish(TreeView.VIEW_STRUCTURE, [self.data.ref]);
                            } else {
                                $.publish(TreeView.VIEW_SECTION, [self.data.ref]);
                            }
                        });
                    },
                    template: $.templates.treeTemplate
                }
            });

            this.$tree.link($.templates.pageTemplate, this.structuresRootNode);

            this.resize();
        };

        TreeView.prototype.parseStructure = function (node, structure) {
            node.label = structure.name || "root";
            node.type = "structure";
            node.ref = structure;
            structure.treeNode = node;
            node.path = node.ref.path;

            if (this.provider.assetSequence.structure == structure) {
                this.sectionsRootNode = node;
                this.sectionsRootNode.selected = true;
                this.sectionsRootNode.expanded = true;
            }

            if (structure.structures) {
                for (var i = 0; i < structure.structures.length; i++) {
                    var childStructure = structure.structures[i];

                    var childNode = new TreeNode();
                    node.nodes.push(childNode);

                    this.parseStructure(childNode, childStructure);
                }
            }
        };

        TreeView.prototype.parseSection = function (node, section) {
            node.label = section.sectionType;
            node.type = "section";
            node.ref = section;
            section.treeNode = node;
            node.path = node.ref.path;

            if (section.sections) {
                for (var i = 0; i < section.sections.length; i++) {
                    var childSection = section.sections[i];

                    var childNode = new TreeNode();
                    node.nodes.push(childNode);

                    this.parseSection(childNode, childSection);
                }
            }
        };

        TreeView.prototype.createTreeNodes = function () {
            this.structuresRootNode = new TreeNode('root');

            if (this.provider.pkg.rootStructure) {
                this.parseStructure(this.structuresRootNode, this.provider.pkg.rootStructure);
            }

            if (!this.sectionsRootNode)
                this.sectionsRootNode = this.structuresRootNode;

            if (this.provider.assetSequence.rootSection.sections) {
                for (var i = 0; i < this.provider.assetSequence.rootSection.sections.length; i++) {
                    var section = this.provider.assetSequence.rootSection.sections[i];

                    var childNode = new TreeNode();
                    this.sectionsRootNode.nodes.push(childNode);

                    this.parseSection(childNode, section);
                }
            }
        };

        TreeView.prototype.selectIndex = function (index) {
            if (index == -1)
                return;

            var section = this.extension.getSectionByAssetIndex(index);
            this.selectPath(section.path);
        };

        TreeView.prototype.selectPath = function (path) {
            var pathArr = path.split("/");

            if (pathArr.length >= 1)
                pathArr.shift();

            if (this.selectedSection)
                $.observable(this.selectedSection.treeNode).setProperty("selected", false);

            this.selectedSection = this.getSection(this.provider.assetSequence.rootSection, pathArr);

            $.observable(this.selectedSection.treeNode).setProperty("selected", true);
        };

        TreeView.prototype.show = function () {
            var _this = this;
            this.$element.show();

            setTimeout(function () {
                _this.selectIndex(_this.extension.currentAssetIndex);
            }, 1);
        };

        TreeView.prototype.hide = function () {
            this.$element.hide();
        };

        TreeView.prototype.getSection = function (parentSection, path) {
            if (path.length == 0)
                return parentSection;

            parentSection.expanded = true;

            var index = path.shift();

            var section = parentSection.sections[index];

            return this.getSection(section, path);
        };

        TreeView.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        TreeView.VIEW_SECTION = 'treeView.onViewSection';
        TreeView.VIEW_STRUCTURE = 'treeView.onViewStructure';
        return TreeView;
    })(baseView.BaseView);
    exports.TreeView = TreeView;
});
