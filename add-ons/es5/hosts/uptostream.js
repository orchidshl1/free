

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Uptostream = function () {
    function Uptostream(props) {
        _classCallCheck(this, Uptostream);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Uptostream, [{
        key: 'checkLive',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var httpRequest, html;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(url.indexOf('http://') != 0 && url.indexOf('https://') != 0)) {
                                    _context.next = 2;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 2:
                                httpRequest = this.libs.httpRequest;

                                // you fill the die status text
                                // const dieStatusText = "";

                                _context.prev = 3;
                                _context.next = 6;
                                return httpRequest.getHTML(url);

                            case 6:
                                html = _context.sent;
                                _context.next = 12;
                                break;

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](3);
                                throw new Error('NOT_FOUND');

                            case 12:
                                return _context.abrupt('return', html);

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 9]]);
            }));

            function checkLive(_x) {
                return _ref.apply(this, arguments);
            }

            return checkLive;
        }()
    }, {
        key: 'getLink',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _libs, httpRequest, cheerio, arrVideoQuality, results, html, ff, f, sources, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!(url.search('https://') == -1 && url.search('http://') == -1)) {
                                    _context3.next = 2;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 2:
                                url = url.replace('uptobox', 'uptostream');

                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                arrVideoQuality = [];
                                results = [];
                                _context3.next = 8;
                                return this.checkLive(url);

                            case 8:
                                html = _context3.sent;

                                if (!(html == false)) {
                                    _context3.next = 11;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 11:
                                ff = url.split('/');

                                ff = ff[ff.length - 1];
                                console.log('uptostream ff', ff);
                                _context3.next = 16;
                                return httpRequest.getHTML('https://uptostream.com/api/streaming/source/get?token=null&file_code=' + ff);

                            case 16:
                                f = _context3.sent;

                                console.log('uptostream done ff', ff);
                                f = JSON.parse(f);
                                f = f.data.sources;
                                //let sources = await httpRequest.post('http://localhost:3001/utb', {}, {data: f});
                                _context3.next = 22;
                                return httpRequest.post('http://getutb.streammov.net/utb', {}, { data: f });

                            case 22:
                                sources = _context3.sent;

                                sources = sources.data;
                                //let sources = fk(f);
                                arrPromise = sources.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var isDie;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        console.log('uptostream val', val);
                                                        _context2.next = 3;
                                                        return httpRequest.isLinkDie(val.src);

                                                    case 3:
                                                        isDie = _context2.sent;


                                                        if (isDie != false) {
                                                            results.push({
                                                                file: val.src, label: 'NOR', type: "direct", size: isDie
                                                            });
                                                        }

                                                    case 5:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this);
                                    }));

                                    return function (_x3) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 27;
                                return Promise.all(arrPromise);

                            case 27:
                                return _context3.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Uptostream"
                                    },
                                    result: results
                                });

                            case 28:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Uptostream;
}();

function fk(f) {
    try {
        eval(f);
        console.log('uptostream sources', sources);
        return sources;
    } catch (e) {
        console.log('uptostream e', e);
        console.log('uptostream e f', f);
        return [];
    }
}

thisSource.function = function (libs, settings) {
    return new Uptostream({ libs: libs, settings: settings });
};