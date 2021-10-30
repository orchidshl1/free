

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Upstream = function () {
    function Upstream(props) {
        _classCallCheck(this, Upstream);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Upstream, [{
        key: 'getQuality',
        value: function getQuality(url) {
            var qualities = ['DVDRip', 'HDTV', 'HDRip', 'WEB-DL', 'WEBRip', 'BRRip', 'Blu ray', 'Bluray', 'Blu-ray', 'BDRip', 'WEB', 'HDTS', 'TS', 'CAM'];

            for (var i in qualities) {
                var quality = qualities[i];
                if (url.toLowerCase().indexOf(quality.toLowerCase()) != -1) {
                    return quality;
                }
            }

            return false;
        }
    }, {
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

                                _context.prev = 1;
                                _context.next = 4;
                                return httpRequest.getHTML(url, { 'User-agent': 'Mozilla/5.0 (X1111; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/79.0. 3945.79 Chrome/79.0.3945.79 Safari/537.36' });

                            case 4:
                                html = _context.sent;
                                return _context.abrupt('return', html);

                            case 8:
                                _context.prev = 8;
                                _context.t0 = _context['catch'](1);

                                console.log('Upstreamaaa err', _context.t0);

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 8]]);
            }));

            function checkLive(_x) {
                return _ref.apply(this, arguments);
            }

            return checkLive;
        }()
    }, {
        key: 'convertToEmbed',
        value: function convertToEmbed(url) {}
    }, {
        key: 'getLink',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cheerio, sources, html, m, arr_param, stringScript, n, reg, linkEmbed, html1, linkDir, size, r1, r2, r;

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
                                    _context2.next = 30;
                                    break;
                                }

                                arr_param = m[1] + "split('|')))";
                                stringScript = eval(arr_param);
                                n = '';
                                reg = /{file:"([^"]+)/mg;

                                n = reg.exec(stringScript);

                                if (!(n[1].indexOf('http') !== 0)) {
                                    _context2.next = 18;
                                    break;
                                }

                                throw new Error('invalid');

                            case 18:
                                linkEmbed = n[1].replace(/{file:"/, '');
                                _context2.next = 21;
                                return httpRequest.getHTML(linkEmbed, {
                                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                                    'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                                    'cache-control': 'max-age=0',
                                    'upgrade-insecure-requests': 1,
                                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36',
                                    'referer': 'https://upstream.to/'
                                });

                            case 21:
                                html1 = _context2.sent;
                                linkDir = html1.match(/(http.+\.m3u8)/);
                                _context2.next = 25;
                                return httpRequest.isLinkDie(linkDir[1]);

                            case 25:
                                size = _context2.sent;
                                r1 = Math.floor(Math.random() * 5) + 2;
                                r2 = Math.floor(Math.random() * 9) + 1;
                                r = '0.' + r1 + r2;

                                sources.push({
                                    file: linkDir[1], label: 'NOR', type: "direct", size: size != false && size != 'NOR' ? size : r, referer: 'https://upstream.to/'
                                });

                            case 30:
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Upstream"
                                    },
                                    result: sources
                                });

                            case 31:
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

    return Upstream;
}();

thisSource.function = function (libs, settings) {
    return new Upstream({ libs: libs, settings: settings });
};