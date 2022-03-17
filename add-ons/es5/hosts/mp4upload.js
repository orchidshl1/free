

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mp4upload = function () {
    function Mp4upload(props) {
        _classCallCheck(this, Mp4upload);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Mp4upload, [{
        key: 'checkLive',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var httpRequest, html;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                httpRequest = this.libs.httpRequest;

                                // you fill the die status text
                                // const dieStatusText = "";

                                _context.next = 3;
                                return httpRequest.getHTML(url);

                            case 3:
                                html = _context.sent;

                                if (!html.includes("Video Was Deleted 1")) {
                                    _context.next = 6;
                                    break;
                                }

                                return _context.abrupt('return', false);

                            case 6:
                                return _context.abrupt('return', html);

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function checkLive(_x) {
                return _ref.apply(this, arguments);
            }

            return checkLive;
        }()
    }, {
        key: 'getLink',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cheerio, sources, html, m, arr_param, stringScript, n, reg, linkEmbed, size, r1, r2, r;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;

                                if (!(url.search('https://') == -1 && url.search('http://') == -1)) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 3:
                                sources = [];
                                _context2.next = 6;
                                return this.checkLive(url);

                            case 6:
                                html = _context2.sent;

                                if (!(html == false)) {
                                    _context2.next = 9;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 9:
                                m = html.match(/eval(.+?(?=split))/);

                                if (!(m != undefined)) {
                                    _context2.next = 26;
                                    break;
                                }

                                arr_param = m[1] + "split('|')))";
                                stringScript = eval(arr_param);
                                n = '';
                                reg = /{player.src\("([^"]+)/gm;


                                n = reg.exec(stringScript);

                                if (!(n[1].indexOf('http') !== 0)) {
                                    _context2.next = 18;
                                    break;
                                }

                                throw new Error('invalid');

                            case 18:
                                linkEmbed = n[1];
                                _context2.next = 21;
                                return httpRequest.isLinkDie(linkEmbed);

                            case 21:
                                size = _context2.sent;
                                r1 = Math.floor(Math.random() * 5) + 2;
                                r2 = Math.floor(Math.random() * 9) + 1;
                                r = '0.' + r1 + r2;

                                sources.push({
                                    file: linkEmbed, label: 'NOR', type: "direct", size: size != false && size != 'NOR' ? size : r, referer: 'https://www.mp4upload.com/'
                                });

                            case 26:
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Mp4upload"
                                    },
                                    result: sources
                                });

                            case 27:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Mp4upload;
}();

thisSource.function = function (libs, settings) {
    return new Mp4upload({ libs: libs, settings: settings });
};