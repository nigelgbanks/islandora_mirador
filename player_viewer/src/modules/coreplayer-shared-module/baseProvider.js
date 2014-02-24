define(["require", "exports", "../../utils"], function(require, exports, __utils__) {
    var utils = __utils__;
    

    (function (params) {
        params[params["assetSequenceIndex"] = 0] = "assetSequenceIndex";
        params[params["assetIndex"] = 1] = "assetIndex";
        params[params["zoom"] = 2] = "zoom";
    })(exports.params || (exports.params = {}));
    var params = exports.params;

    var BaseProvider = (function () {
        function BaseProvider(config, pkg) {
            this.options = {};
            this.config = config;
            this.pkg = pkg;

            this.options.dataBaseUri = utils.Utils.getQuerystringParameter('dbu');

            this.dataUri = utils.Utils.getQuerystringParameter('du');
            this.isHomeDomain = utils.Utils.getQuerystringParameter('hd') === "true";
            this.isOnlyInstance = utils.Utils.getQuerystringParameter('oi') === "true";
            this.embedScriptUri = utils.Utils.getQuerystringParameter('esu');
            this.isReload = utils.Utils.getQuerystringParameter('rl') === "true";
            this.domain = utils.Utils.getQuerystringParameter('d');

            if (this.isHomeDomain && !this.isReload) {
                this.assetSequenceIndex = parseInt(utils.Utils.getHashParameter(BaseProvider.paramMap[params.assetSequenceIndex], parent.document));
            }

            if (!this.assetSequenceIndex) {
                this.assetSequenceIndex = parseInt(utils.Utils.getQuerystringParameter(BaseProvider.paramMap[params.assetSequenceIndex])) || 0;
            }

            this.load();
        }
        BaseProvider.prototype.load = function () {
            this.assetSequence = this.pkg.assetSequences[this.assetSequenceIndex];

            for (var i = 0; i < this.pkg.assetSequences.length; i++) {
                if (this.pkg.assetSequences[i].$ref) {
                    this.pkg.assetSequences[i] = {};
                }
            }

            this.type = this.getRootSection().sectionType.toLowerCase();

            if (this.pkg.rootStructure) {
                this.parseStructures(this.pkg.rootStructure, this.pkg.assetSequences, '');
            }

            this.parseSections(this.getRootSection(), this.assetSequence.assets, '');
        };

        BaseProvider.prototype.reload = function (callback) {
            var _this = this;
            var packageUri = this.dataUri;

            if (this.options.dataBaseUri) {
                packageUri = this.options.dataBaseUri + this.dataUri;
            }

            packageUri += "?t=" + utils.Utils.getTimeStamp();

            window.pkgCallback = function (data) {
                _this.pkg = data;

                _this.load();

                callback();
            };

            $.ajax({
                url: packageUri,
                type: 'GET',
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: 'pkgCallback'
            });
        };

        BaseProvider.prototype.parseSections = function (section, assets, path) {
            section.path = path;

            section.sectionType = this.replaceSectionType(section.sectionType);

            for (var i = 0; i < section.assets.length; i++) {
                var index = section.assets[i];

                var asset = assets[index];

                if (!asset.sections)
                    asset.sections = [];

                asset.sections.push(section);
            }

            if (section.sections) {
                for (var j = 0; j < section.sections.length; j++) {
                    this.parseSections(section.sections[j], assets, path + '/' + j);
                }
            }
        };

        BaseProvider.prototype.parseStructures = function (structure, assetSequences, path) {
            structure.path = path;

            if (typeof (structure.assetSequence) != 'undefined') {
                var assetSequence = assetSequences[structure.assetSequence];

                assetSequence.index = structure.assetSequence;
                assetSequence.structure = structure;

                structure.assetSequence = assetSequence;
            }

            if (structure.structures) {
                for (var j = 0; j < structure.structures.length; j++) {
                    this.parseStructures(structure.structures[j], assetSequences, path + '/' + j);
                }
            }
        };

        BaseProvider.prototype.replaceSectionType = function (sectionType) {
            if (this.config.options.sectionMappings && this.config.options.sectionMappings[sectionType]) {
                return this.config.options.sectionMappings[sectionType];
            }

            return sectionType;
        };

        BaseProvider.prototype.getRootSection = function () {
            return this.assetSequence.rootSection;
        };

        BaseProvider.prototype.getTitle = function () {
            return this.getRootSection().title;
        };

        BaseProvider.prototype.getSeeAlso = function () {
            return this.assetSequence.seeAlso;
        };

        BaseProvider.prototype.getMediaUri = function (fileUri) {
            var baseUri = this.options.mediaBaseUri || "";
            var template = this.options.mediaUriTemplate;
            var uri = String.prototype.format(template, baseUri, fileUri);

            return uri;
        };
        BaseProvider.paramMap = ['asi', 'ai', 'z'];
        return BaseProvider;
    })();
    exports.BaseProvider = BaseProvider;
});
