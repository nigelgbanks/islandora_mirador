define(["require", "exports"], function(require, exports) {
    String.prototype.format = function () {
        var s = arguments[0];
        for (var i = 0; i < arguments.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, arguments[i + 1]);
        }

        return s;
    };

    String.prototype.startsWith = function (str) {
        return this.indexOf(str) == 0;
    };
    String.prototype.trim = function () {
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };
    String.prototype.ltrim = function () {
        return this.replace(/^\s+/, '');
    };
    String.prototype.rtrim = function () {
        return this.replace(/\s+$/, '');
    };
    String.prototype.fulltrim = function () {
        return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
    };
    String.prototype.toFileName = function () {
        return this.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    };
    String.prototype.contains = function (str) {
        return this.indexOf(str) !== -1;
    };

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement, fromIndex) {
            var i = (fromIndex || 0);
            var j = this.length;

            for (i; i < j; i++) {
                if (this[i] === searchElement) {
                    return i;
                }
            }
            return -1;
        };
    }

    if (!Array.prototype.clone) {
        Array.prototype.clone = function () {
            return this.slice(0);
        };
    }

    if (!Array.prototype.last) {
        Array.prototype.last = function () {
            return this[this.length - 1];
        };
    }
    ;

    if (!Array.prototype.contains) {
        Array.prototype.contains = function (val) {
            return this.indexOf(val) !== -1;
        };
    }

    window.BrowserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        },
        searchString: function (data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) != -1) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1)
                return;
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        },
        dataBrowser: [
            { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
            { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
            { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
            { string: navigator.userAgent, subString: "Safari", identity: "Safari" },
            { string: navigator.userAgent, subString: "Opera", identity: "Opera" }
        ]
    };

    window.BrowserDetect.init();

    var Size = (function () {
        function Size(width, height) {
            this.width = width;
            this.height = height;
        }
        return Size;
    })();
    exports.Size = Size;

    var Utils = (function () {
        function Utils() {
        }
        Utils.ellipsis = function (text, chars) {
            if (text.length <= chars)
                return text;
            var trimmedText = text.substr(0, chars);
            trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")));
            return trimmedText + "&hellip;";
        };

        Utils.numericalInput = function (event) {
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
                return true;
            } else {
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                    return false;
                }
                return true;
            }
        };

        Utils.getTimeStamp = function () {
            return new Date().getTime();
        };

        Utils.getHashParameter = function (key, doc) {
            if (!doc)
                doc = window.document;
            var regex = new RegExp("#.*[?&]" + key + "=([^&]+)(&|$)");
            var match = regex.exec(doc.location.hash);
            return (match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
        };

        Utils.setHashParameter = function (key, value, doc) {
            if (!doc)
                doc = window.document;

            var kvp = this.updateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);

            var newHash = "#?" + kvp;

            var url = doc.URL;

            var index = url.indexOf('#');

            if (index != -1) {
                url = url.substr(0, url.indexOf('#'));
            }

            doc.location.replace(url + newHash);
        };

        Utils.getQuerystringParameter = function (key, doc) {
            if (!doc)
                doc = window.document;
            key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
            var match = regex.exec(window.location.search);
            return (match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
        };

        Utils.setQuerystringParameter = function (key, value, doc) {
            if (!doc)
                doc = window.document;

            var kvp = this.updateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);

            window.location.search = kvp;
        };

        Utils.updateURIKeyValuePair = function (uriSegment, key, value) {
            key = encodeURIComponent(key);
            value = encodeURIComponent(value);

            var kvp = uriSegment.split('&');

            if (kvp[0] == "")
                kvp.shift();

            var i = kvp.length;
            var x;

            while (i--) {
                x = kvp[i].split('=');

                if (x[0] == key) {
                    x[1] = value;
                    kvp[i] = x.join('=');
                    break;
                }
            }

            if (i < 0) {
                kvp[kvp.length] = [key, value].join('=');
            }

            return kvp.join('&');
        };

        Utils.getScaleFraction = function (minSize, currentSize, scaleFactor, maxScale) {
            var maxSize = minSize * Math.pow(scaleFactor, maxScale);

            var n = currentSize / maxSize;

            var l = (Math.log(n) / Math.log(scaleFactor));

            var f = (maxScale - Math.abs(l)) / maxScale;

            return f;
        };

        Utils.getScaleFromFraction = function (fraction, minSize, scaleFactor, maxScale) {
            var p = maxScale * fraction;
            return minSize * Math.pow(scaleFactor, p);
        };

        Utils.clamp = function (value, min, max) {
            return Math.min(Math.max(value, min), max);
        };

        Utils.roundNumber = function (num, dec) {
            return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
        };

        Utils.normalise = function (num, min, max) {
            return (num - min) / (max - min);
        };

        Utils.fitRect = function (width1, height1, width2, height2) {
            var ratio1 = height1 / width1;
            var ratio2 = height2 / width2;

            var width, height, scale;

            if (ratio1 < ratio2) {
                scale = width2 / width1;
                width = width1 * scale;
                height = height1 * scale;
            }
            if (ratio2 < ratio1) {
                scale = height2 / height1;
                width = width1 * scale;
                height = height1 * scale;
            }

            return new Size(Math.floor(width), Math.floor(height));
        };

        Utils.getBool = function (val, defaultVal) {
            if (typeof (val) === 'undefined') {
                return defaultVal;
            }

            return val;
        };

        Utils.getUrlParts = function (url) {
            var a = document.createElement('a');
            a.href = url;
            return a;
        };

        Utils.convertToRelativeUrl = function (url) {
            var parts = this.getUrlParts(url);
            var relUri = parts.pathname + parts.search;

            if (!relUri.startsWith("/")) {
                relUri = "/" + relUri;
            }

            return relUri;
        };

        Utils.debounce = function (fn, debounceDuration) {
            debounceDuration = debounceDuration || 100;

            return function () {
                if (!fn.debouncing) {
                    var args = Array.prototype.slice.apply(arguments);
                    fn.lastReturnVal = fn.apply(window, args);
                    fn.debouncing = true;
                }
                clearTimeout(fn.debounceTimeout);
                fn.debounceTimeout = setTimeout(function () {
                    fn.debouncing = false;
                }, debounceDuration);

                return fn.lastReturnVal;
            };
        };

        Utils.createElement = function (tagName, id, className) {
            var $elem = $(document.createElement(tagName));

            if (id)
                $elem.attr('id', id);
            if (className)
                $elem.attr('class', className);

            return $elem;
        };

        Utils.createDiv = function (className) {
            return Utils.createElement('div', null, className);
        };

        Utils.loadCss = function (uri) {
            $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', uri));
        };
        return Utils;
    })();
    exports.Utils = Utils;
});
