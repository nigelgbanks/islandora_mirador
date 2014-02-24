var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../coreplayer-shared-module/baseExtension", "../../extensions/coreplayer-mediaelement-extension/extension", "../coreplayer-shared-module/centerPanel", "../../utils"], function(require, exports, __baseExtension__, __extension__, __baseCenter__, __utils__) {
    var baseExtension = __baseExtension__;
    
    
    var extension = __extension__;
    var baseCenter = __baseCenter__;
    var utils = __utils__;

    var MediaElementCenterPanel = (function (_super) {
        __extends(MediaElementCenterPanel, _super);
        function MediaElementCenterPanel($element) {
            _super.call(this, $element);
        }
        MediaElementCenterPanel.prototype.create = function () {
            this.setConfig('mediaelementCenterPanel');

            _super.prototype.create.call(this);

            var that = this;

            if (this.provider.type == 'video') {
                $.subscribe(baseExtension.BaseExtension.TOGGLE_FULLSCREEN, function (e) {
                    if (that.extension.isFullScreen) {
                        that.$container.css('backgroundColor', '#000');
                        that.player.enterFullScreen(false);
                    } else {
                        that.$container.css('backgroundColor', 'transparent');
                        that.player.exitFullScreen(false);
                    }
                });
            }

            $.subscribe(extension.Extension.OPEN_MEDIA, function (e, asset) {
                that.viewMedia(asset);
            });

            this.$container = $('<div class="container"></div>');
            this.$content.append(this.$container);

            this.title = this.extension.provider.getTitle();
        };

        MediaElementCenterPanel.prototype.viewMedia = function (asset) {
            var that = this;

            this.$container.empty();

            this.mediaHeight = 576;
            this.mediaWidth = 720;

            this.$container.height(this.mediaHeight);
            this.$container.width(this.mediaWidth);

            var id = utils.Utils.getTimeStamp();

            var poster = (this.provider).getPosterImageUri();

            switch (this.provider.type) {
                case 'video':
                    if (!asset.sources) {
                        this.media = this.$container.append('<video id="' + id + '" type="video/mp4" src="' + asset.fileUri + '" class="mejs-wellcome" controls="controls" preload="none" poster="' + poster + '"></video>');
                    } else {
                        this.media = this.$container.append('<video id="' + id + '" type="video/mp4" class="mejs-wellcome" controls="controls" preload="none" poster="' + poster + '"></video>');
                    }

                    this.player = new MediaElementPlayer("#" + id, {
                        type: ['video/mp4', 'video/webm', 'video/flv'],
                        plugins: ['flash'],
                        alwaysShowControls: false,
                        autosizeProgress: false,
                        success: function (media) {
                            media.addEventListener('canplay', function (e) {
                                that.resize();
                            });

                            media.addEventListener('play', function (e) {
                                $.publish(extension.Extension.MEDIA_PLAYED, [Math.floor(that.player.media.currentTime)]);
                            });

                            media.addEventListener('pause', function (e) {
                                if (Math.floor(that.player.media.currentTime) != Math.floor(that.player.media.duration)) {
                                    $.publish(extension.Extension.MEDIA_PAUSED, [Math.floor(that.player.media.currentTime)]);
                                }
                            });

                            media.addEventListener('ended', function (e) {
                                $.publish(extension.Extension.MEDIA_ENDED, [Math.floor(that.player.media.duration)]);
                            });

                            if (asset.sources && asset.sources.length) {
                                media.setSrc(asset.sources);
                            }

                            try  {
                                media.load();
                            } catch (e) {
                            }
                        }
                    });
                    break;
                case 'audio':
                    this.media = this.$container.append('<audio id="' + id + '" type="audio/mp3" src="' + asset.fileUri + '" class="mejs-wellcome" controls="controls" preload="none" poster="' + poster + '"></audio>');

                    this.player = new MediaElementPlayer("#" + id, {
                        plugins: ['flash'],
                        alwaysShowControls: false,
                        autosizeProgress: false,
                        defaultVideoWidth: that.mediaWidth,
                        defaultVideoHeight: that.mediaHeight,
                        success: function (media) {
                            media.addEventListener('canplay', function (e) {
                                that.resize();
                            });

                            media.addEventListener('play', function (e) {
                                $.publish(extension.Extension.MEDIA_PLAYED, [Math.floor(that.player.media.currentTime)]);
                            });

                            media.addEventListener('pause', function (e) {
                                if (Math.floor(that.player.media.currentTime) != Math.floor(that.player.media.duration)) {
                                    $.publish(extension.Extension.MEDIA_PAUSED, [Math.floor(that.player.media.currentTime)]);
                                }
                            });

                            media.addEventListener('ended', function (e) {
                                $.publish(extension.Extension.MEDIA_ENDED, [Math.floor(that.player.media.duration)]);
                            });

                            try  {
                                media.load();
                            } catch (e) {
                            }
                        }
                    });
                    break;
            }

            this.resize();
        };

        MediaElementCenterPanel.prototype.getPlayer = function () {
            return this.player;
        };

        MediaElementCenterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            if (window.BrowserDetect.browser == 'Firefox' && window.BrowserDetect.version < 13) {
                this.$container.width(this.mediaWidth);
                this.$container.height(this.mediaHeight);
            } else {
                var size = utils.Utils.fitRect(this.mediaWidth, this.mediaHeight, this.$content.width(), this.$content.height());

                this.$container.height(size.height);
                this.$container.width(size.width);
            }

            if (this.player && !this.extension.isFullScreen) {
                this.player.resize();
            }

            var left = Math.floor((this.$content.width() - this.$container.width()) / 2);
            var top = Math.floor((this.$content.height() - this.$container.height()) / 2);

            this.$container.css({
                'left': left,
                'top': top
            });

            this.$title.ellipsisFill(this.title);
        };
        return MediaElementCenterPanel;
    })(baseCenter.CenterPanel);
    exports.MediaElementCenterPanel = MediaElementCenterPanel;
});
