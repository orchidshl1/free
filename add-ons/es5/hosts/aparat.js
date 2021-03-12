

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function fuckfuck(p, a, c, k, e, d) {
    while (c--) {
        if (k[c]) p = p.replace(new RegExp('\\b' + c.toString(a) + '\\b', 'g'), k[c]);
    }return p;
}

var Aparat = function () {
    function Aparat(props) {
        _classCallCheck(this, Aparat);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Aparat, [{
        key: 'checkLive',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var httpRequest, agents, agent, html;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                httpRequest = this.libs.httpRequest;
                                _context.next = 3;
                                return httpRequest.getHTML('https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt');

                            case 3:
                                agents = _context.sent;

                                agents = agents.split("\n");
                                agent = agents[Math.floor(Math.random() * agents.length)];
                                _context.next = 8;
                                return httpRequest.getHTML(url, { 'User-Agent': agent });

                            case 8:
                                html = _context.sent;
                                return _context.abrupt('return', html);

                            case 10:
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
        key: 'convertToEmbed',
        value: function convertToEmbed() {
            // convert link detail to link embed
            // if input is embed then return input
        }
    }, {
        key: 'getLink',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cheerio, arrVideoQuality, html, results, m, reg, size, r1, r2, r;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                arrVideoQuality = [];
                                _context2.next = 4;
                                return this.checkLive(url);

                            case 4:
                                html = _context2.sent;

                                if (!(html == false)) {
                                    _context2.next = 7;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 7:
                                results = [];
                                m = '';
                                reg = /{file:"([^"]+)/mg;

                            case 10:
                                if (!(m = reg.exec(html))) {
                                    _context2.next = 22;
                                    break;
                                }

                                if (!(m[1].indexOf('http') !== 0)) {
                                    _context2.next = 13;
                                    break;
                                }

                                throw new Error('invalid');

                            case 13:
                                _context2.next = 15;
                                return httpRequest.isLinkDie(m[1]);

                            case 15:
                                size = _context2.sent;
                                r1 = Math.floor(Math.random() * 5) + 2;
                                r2 = Math.floor(Math.random() * 9) + 1;
                                r = '0.' + r1 + r2;

                                results.push({
                                    file: m[1], label: 'NOR', type: "direct", size: size != false && size != 'NOR' ? size : r
                                });
                                _context2.next = 10;
                                break;

                            case 22:
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Aparat"
                                    },
                                    result: results
                                });

                            case 23:
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

    return Aparat;
}();

thisSource.function = function (libs, settings) {
    return new Aparat({ libs: libs, settings: settings });
};