var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../coreplayer-shared-module/baseProvider", "../../extensions/coreplayer-seadragon-extension/extension", "../coreplayer-shared-module/centerPanel", "../../utils"], function(require, exports, __baseProvider__, __extension__, __baseCenter__, __utils__) {
    
    var baseProvider = __baseProvider__;
    var extension = __extension__;
    var baseCenter = __baseCenter__;
    var utils = __utils__;

    var SeadragonCenterPanel = (function (_super) {
        __extends(SeadragonCenterPanel, _super);
        function SeadragonCenterPanel($element) {
            _super.call(this, $element);
            this.prevButtonEnabled = false;
            this.nextButtonEnabled = false;
        }
        SeadragonCenterPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('seadragonCenterPanel');

            _super.prototype.create.call(this);

            $.subscribe(extension.Extension.OPEN_MEDIA, function (e, uri) {
                _this.viewer.openDzi(uri);
            });

            this.$viewer = $('<div id="viewer"></div>');
            this.$content.append(this.$viewer);

            OpenSeadragon.DEFAULT_SETTINGS.autoHideControls = true;

            var prefixUrl = (window.DEV) ? 'modules/coreplayer-seadragoncenterpanel-module/img/' : 'img/coreplayer-seadragoncenterpanel-module/';

            this.viewer = OpenSeadragon({
                id: "viewer",
                showNavigationControl: true,
                showNavigator: true,
                defaultZoomLevel: this.options.defaultZoomLevel || 0,
                navigatorPosition: 'BOTTOM_RIGHT',
                prefixUrl: prefixUrl,
                navImages: {
                    zoomIn: {
                        REST: 'zoom_in.png',
                        GROUP: 'zoom_in.png',
                        HOVER: 'zoom_in.png',
                        DOWN: 'zoom_in.png'
                    },
                    zoomOut: {
                        REST: 'zoom_out.png',
                        GROUP: 'zoom_out.png',
                        HOVER: 'zoom_out.png',
                        DOWN: 'zoom_out.png'
                    },
                    home: {
                        REST: 'pixel.gif',
                        GROUP: 'pixel.gif',
                        HOVER: 'pixel.gif',
                        DOWN: 'pixel.gif'
                    },
                    fullpage: {
                        REST: 'pixel.gif',
                        GROUP: 'pixel.gif',
                        HOVER: 'pixel.gif',
                        DOWN: 'pixel.gif'
                    },
                    previous: {
                        REST: 'pixel.gif',
                        GROUP: 'pixel.gif',
                        HOVER: 'pixel.gif',
                        DOWN: 'pixel.gif'
                    },
                    next: {
                        REST: 'pixel.gif',
                        GROUP: 'pixel.gif',
                        HOVER: 'pixel.gif',
                        DOWN: 'pixel.gif'
                    }
                }
            });

            if (this.extension.isMultiAsset()) {
                this.$prevButton = $('<div class="paging btn prev"></div>');
                this.$prevButton.prop('title', this.content.previous);
                this.viewer.addControl(this.$prevButton[0], { anchor: OpenSeadragon.ControlAnchor.TOP_LEFT });

                this.$nextButton = $('<div class="paging btn next"></div>');
                this.$nextButton.prop('title', this.content.next);
                this.viewer.addControl(this.$nextButton[0], { anchor: OpenSeadragon.ControlAnchor.TOP_RIGHT });

                var that = this;

                this.$prevButton.on('touchstart click', function (e) {
                    e.preventDefault();
                    OpenSeadragon.cancelEvent(e);

                    if (!that.prevButtonEnabled)
                        return;

                    $.publish(SeadragonCenterPanel.PREV);
                });

                this.$nextButton.on('touchstart click', function (e) {
                    e.preventDefault();
                    OpenSeadragon.cancelEvent(e);

                    if (!that.nextButtonEnabled)
                        return;

                    $.publish(SeadragonCenterPanel.NEXT);
                });
            }
            ;

            this.viewer.addHandler('open', function (viewer) {
                _this.viewerOpen();
                $.publish(SeadragonCenterPanel.SEADRAGON_OPEN, [viewer]);
            });

            this.viewer.addHandler('resize', function (viewer) {
                $.publish(SeadragonCenterPanel.SEADRAGON_RESIZE, [viewer]);
                _this.viewerResize(viewer);
            });

            this.viewer.addHandler('animation-start', function (viewer) {
                $.publish(SeadragonCenterPanel.SEADRAGON_ANIMATION_START, [viewer]);
            });

            this.viewer.addHandler('animation', function (viewer) {
                $.publish(SeadragonCenterPanel.SEADRAGON_ANIMATION, [viewer]);
            });

            this.viewer.addHandler('animation-finish', function (viewer) {
                _this.currentBounds = _this.getBounds();

                $.publish(SeadragonCenterPanel.SEADRAGON_ANIMATION_FINISH, [viewer]);
            });
console.log("get tile: ");
            this.title = this.extension.provider.getTitle();
            console.log("got tile: ");
        };

        SeadragonCenterPanel.prototype.viewerOpen = function () {
            if (this.extension.isMultiAsset()) {
                $('.navigator').addClass('extraMargin');

                if (this.extension.currentAssetIndex != 0) {
                    this.enablePrevButton();
                } else {
                    this.disablePrevButton();
                }

                if (this.extension.currentAssetIndex != this.provider.assetSequence.assets.length - 1) {
                    this.enableNextButton();
                } else {
                    this.disableNextButton();
                }
            }

            if (!this.currentBounds) {
                var initialBounds = this.extension.getParam(baseProvider.params.zoom);

                if (initialBounds) {
                    initialBounds = this.deserialiseBounds(initialBounds);
                    this.currentBounds = initialBounds;
                }
            }

            if (this.currentBounds) {
                this.fitToBounds(this.currentBounds);
            }
        };

        SeadragonCenterPanel.prototype.disablePrevButton = function () {
            this.prevButtonEnabled = false;
            this.$prevButton.addClass('disabled');
        };

        SeadragonCenterPanel.prototype.enablePrevButton = function () {
            this.prevButtonEnabled = true;
            this.$prevButton.removeClass('disabled');
        };

        SeadragonCenterPanel.prototype.disableNextButton = function () {
            this.nextButtonEnabled = false;
            this.$nextButton.addClass('disabled');
        };

        SeadragonCenterPanel.prototype.enableNextButton = function () {
            this.nextButtonEnabled = true;
            this.$nextButton.removeClass('disabled');
        };

        SeadragonCenterPanel.prototype.serialiseBounds = function (bounds) {
            return bounds.x + ',' + bounds.y + ',' + bounds.width + ',' + bounds.height;
        };

        SeadragonCenterPanel.prototype.deserialiseBounds = function (bounds) {
            var boundsArr = bounds.split(',');

            return {
                x: Number(boundsArr[0]),
                y: Number(boundsArr[1]),
                width: Number(boundsArr[2]),
                height: Number(boundsArr[3])
            };
        };

        SeadragonCenterPanel.prototype.fitToBounds = function (bounds) {
            var rect = new OpenSeadragon.Rect();
            rect.x = bounds.x;
            rect.y = bounds.y;
            rect.width = bounds.width;
            rect.height = bounds.height;

            this.viewer.viewport.fitBounds(rect, true);
        };

        SeadragonCenterPanel.prototype.getBounds = function () {
            if (!this.viewer.viewport)
                return null;

            var bounds = this.viewer.viewport.getBounds(true);

            return {
                x: utils.Utils.roundNumber(bounds.x, 4),
                y: utils.Utils.roundNumber(bounds.y, 4),
                width: utils.Utils.roundNumber(bounds.width, 4),
                height: utils.Utils.roundNumber(bounds.height, 4)
            };
        };

        SeadragonCenterPanel.prototype.viewerResize = function (viewer) {
            if (!viewer.viewport)
                return;

            var center = viewer.viewport.getCenter(true);
            if (!center)
                return;

            setTimeout(function () {
                viewer.viewport.panTo(center, true);
            }, 1);
        };

        SeadragonCenterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.$title.ellipsisFill(this.title);

            this.$viewer.height(this.$content.height());

            if (this.extension.isMultiAsset()) {
                this.$prevButton.css('top', (this.$content.height() - this.$prevButton.height()) / 2);
                this.$nextButton.css('top', (this.$content.height() - this.$nextButton.height()) / 2);
            }
        };
        SeadragonCenterPanel.SEADRAGON_OPEN = 'center.open';
        SeadragonCenterPanel.SEADRAGON_RESIZE = 'center.resize';
        SeadragonCenterPanel.SEADRAGON_ANIMATION_START = 'center.animationstart';
        SeadragonCenterPanel.SEADRAGON_ANIMATION = 'center.animation';
        SeadragonCenterPanel.SEADRAGON_ANIMATION_FINISH = 'center.animationfinish';
        SeadragonCenterPanel.PREV = 'center.onPrev';
        SeadragonCenterPanel.NEXT = 'center.onNext';
        return SeadragonCenterPanel;
    })(baseCenter.CenterPanel);
    exports.SeadragonCenterPanel = SeadragonCenterPanel;
});
