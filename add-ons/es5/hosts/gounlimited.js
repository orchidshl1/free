

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gounlimited = function () {
    function Gounlimited(props) {
        _classCallCheck(this, Gounlimited);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Gounlimited, [{
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
                                _context.prev = 3;
                                _context.next = 6;
                                return httpRequest.getHTML(url, { 'User-Agent': 'Firefox 69' });

                            case 6:
                                html = _context.sent;
                                _context.next = 12;
                                break;

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](3);
                                throw new Error('NOT_FOUND gounlimited');

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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cheerio, results, html, m, hls, sv, domain, fuck, hls1, sv1, domain1, isDie;

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

                                url = url.replace('https://', 'http://'); //

                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                results = [];
                                _context2.next = 7;
                                return this.checkLive(url);

                            case 7:
                                html = _context2.sent;

                                if (!(html == false)) {
                                    _context2.next = 10;
                                    break;
                                }

                                throw new Error("LINK DIE gounlimited");

                            case 10:
                                m = html.split('eval(')[2];

                                m = m.split('</script>')[0];
                                m = 'eval(' + m;
                                console.log('gounlimited', m);
                                _context2.prev = 14;

                                m = m.match(/\|([a-z0-9]+)\|([a-z0-9]+)\|sources/);
                                hls = m[1];
                                sv = m[2];
                                domain = 'https://' + sv + '.gounlimited.to/';
                                fuck = domain + hls + '/v.mp4';

                                console.log(fuck);
                                _context2.next = 42;
                                break;

                            case 23:
                                _context2.prev = 23;
                                _context2.t0 = _context2['catch'](14);

                                m = html.split('eval(')[1];
                                m = m.split('</script>')[0];
                                m = 'eval(' + m;
                                console.log('gounlimited 1', m);
                                _context2.prev = 29;

                                m = m.match(/\|([a-z0-9]+)\|([a-z0-9]+)\|sources/);
                                hls1 = m[1];
                                sv1 = m[2];
                                domain1 = 'https://' + sv1 + '.gounlimited.to/';
                                fuck = domain1 + hls1 + '/v.mp4';

                                console.log(fuck1);
                                _context2.next = 42;
                                break;

                            case 38:
                                _context2.prev = 38;
                                _context2.t1 = _context2['catch'](29);

                                console.log(_context2.t0, _context2.t1, 'err gounlimited');
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Gounlimited"
                                    },
                                    result: []
                                });

                            case 42:
                                if (!(fuck.search('https://') == -1 && fuck.search('http://') == -1)) {
                                    _context2.next = 44;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 44:
                                _context2.next = 46;
                                return httpRequest.isLinkDie(fuck);

                            case 46:
                                isDie = _context2.sent;


                                if (isDie != false) {
                                    results.push({
                                        file: fuck, label: 'NOR', type: "direct", size: isDie
                                    });
                                }

                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Gounlimited"
                                    },
                                    result: results
                                });

                            case 49:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[14, 23], [29, 38]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Gounlimited;
}();

thisSource.function = function (libs, settings) {
    return new Gounlimited({ libs: libs, settings: settings });
};