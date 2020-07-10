

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getDomain = function getDomain(url) {
    var m = url.match(/\/\/([^\/]+)/);
    if (m == null) return 'xyzzyx.com';
    return m[1] != undefined ? m[1] : 'xyzzyx.com';
};

var Vidsrc = function () {
    function Vidsrc(props) {
        _classCallCheck(this, Vidsrc);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Vidsrc, [{
        key: 'getLink',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cheerio, html, $, src, wSrc, f1, arrVideoQuality, results, ff, f, arrPromise;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!(url.search('https://') == -1 && url.search('http://') == -1)) {
                                    _context2.next = 2;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 2:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                _context2.next = 5;
                                return httpRequest.getHTML(url);

                            case 5:
                                html = _context2.sent;
                                $ = cheerio.load(html);
                                src = 'https://' + getDomain(url) + $('iframe').attr('src');
                                wSrc = src.replace('/source', '/watch');
                                _context2.next = 11;
                                return httpRequest.getRedirectUrl(wSrc, { 'referer': url });

                            case 11:
                                f1 = _context2.sent;
                                arrVideoQuality = [];
                                results = [];

                                if (!(html == false)) {
                                    _context2.next = 16;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 16:
                                ff = f1.split('/');

                                ff = ff[ff.length - 1];
                                _context2.next = 20;
                                return httpRequest.post('https://vidsrc.xyz/api/source/' + ff, { referer: 'https://vidsrc.xyz/' }, { d: 'vidsrc.xyz', r: src });

                            case 20:
                                f = _context2.sent;

                                f = f.data.data;
                                arrPromise = f.map(function () {
                                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(val) {
                                        var isDie;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        _context.next = 2;
                                                        return httpRequest.isLinkDie(val.file);

                                                    case 2:
                                                        isDie = _context.sent;


                                                        if (isDie != false) {
                                                            results.push({
                                                                file: val.file, label: 'NOR', type: "direct", size: isDie
                                                            });
                                                        }

                                                    case 4:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, this);
                                    }));

                                    return function (_x2) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }());
                                _context2.next = 25;
                                return Promise.all(arrPromise);

                            case 25:
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Vidsrc"
                                    },
                                    result: results
                                });

                            case 26:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getLink(_x) {
                return _ref.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Vidsrc;
}();

function fk(f) {
    eval(f);
    return sources;
}

thisSource.function = function (libs, settings) {
    return new Vidsrc({ libs: libs, settings: settings });
};