

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fastplay = function () {
    function Fastplay(props) {
        _classCallCheck(this, Fastplay);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Fastplay, [{
        key: 'checkLive',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var httpRequest, html;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                httpRequest = this.libs.httpRequest;
                                _context.next = 3;
                                return httpRequest.getHTML(url);

                            case 3:
                                html = _context.sent;
                                return _context.abrupt('return', html);

                            case 5:
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(url) {
                var _this = this;

                var _libs, httpRequest, cheerio, sources, html, $, urls, urlPromise;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                sources = [];
                                _context4.next = 4;
                                return this.checkLive(url);

                            case 4:
                                html = _context4.sent;

                                if (!(html == false)) {
                                    _context4.next = 8;
                                    break;
                                }

                                console.log('Fastplay no link');
                                throw new Error("Fastplay LINK DIE");

                            case 8:
                                $ = cheerio.load(html);
                                urls = [];


                                $('source').each(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                                    var url;
                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    url = $(this).attr('src');

                                                    urls.push(url);

                                                case 2:
                                                case 'end':
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, this);
                                })));

                                urlPromise = urls.map(function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                                        var isDie;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        _context3.next = 2;
                                                        return httpRequest.isLinkDie(url);

                                                    case 2:
                                                        isDie = _context3.sent;


                                                        if (isDie != false) {
                                                            sources.push({
                                                                label: 'NOR',
                                                                file: url,
                                                                type: "direct",
                                                                size: isDie
                                                            });
                                                        }

                                                    case 4:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, _this);
                                    }));

                                    return function (_x3) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());
                                _context4.next = 14;
                                return Promise.all(urlPromise);

                            case 14:
                                return _context4.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "baystream"
                                    },
                                    result: sources
                                });

                            case 15:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Fastplay;
}();

thisSource.function = function (libs, settings) {
    return new Fastplay({ libs: libs, settings: settings });
};