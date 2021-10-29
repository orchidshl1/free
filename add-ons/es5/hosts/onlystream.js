

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Onlystream = function () {
    function Onlystream(props) {
        _classCallCheck(this, Onlystream);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
        this.headers = { 'User-Agent': 'Firefox 69' };
    }

    _createClass(Onlystream, [{
        key: 'getQuality',
        value: function getQuality(url) {
            var qualities = ['DVDRip', 'HDTV', 'HDRip', 'WEB-DL', 'WEBRip', 'BRRip', 'Bluray', 'Blu-ray', 'BDRip', 'WEB', 'HDTS', 'TS', 'CAM'];

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
                                return httpRequest.getHTML(url, this.headers);

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
        key: 'getUsingAPI',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url, cookie) {
                var _libs, httpRequest, cryptoJs, cheerio, cookies, i, c, m, cfuid, cfclear, html, results, aSize;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cryptoJs = _libs.cryptoJs, cheerio = _libs.cheerio;


                                url = url.replace('http://', 'https://');

                                if (!(cookie !== false)) {
                                    _context2.next = 23;
                                    break;
                                }

                                cookies = JSON.parse(this.libs.base64.decode(cookie));
                                _context2.t0 = regeneratorRuntime.keys(cookies);

                            case 5:
                                if ((_context2.t1 = _context2.t0()).done) {
                                    _context2.next = 23;
                                    break;
                                }

                                i = _context2.t1.value;

                                if (!(url.indexOf(cookies[i].domain) != -1)) {
                                    _context2.next = 21;
                                    break;
                                }

                                c = cookies[i].cookie;
                                m = c.match(/__cfduid=([^;]+)/);

                                if (!(m == undefined)) {
                                    _context2.next = 12;
                                    break;
                                }

                                return _context2.abrupt('continue', 5);

                            case 12:
                                cfuid = m[1];
                                cfclear = false;

                                m = c.match(/cf_clearance=([^;]+)/);
                                if (m != undefined) cfclear = m[1];else {
                                    m = c.match(/cf_clearance=([^"]+)/);
                                    if (m != undefined) cfclear = m[1];
                                }

                                if (cfclear) {
                                    _context2.next = 18;
                                    break;
                                }

                                return _context2.abrupt('continue', 5);

                            case 18:

                                this.headers['cookie'] = '__cfduid=' + cfuid + '; cf_clearance=' + cfclear;
                                this.headers['cookie'] = c;
                                this.headers['User-Agent'] = cookies[i].useragent;

                            case 21:
                                _context2.next = 5;
                                break;

                            case 23:
                                html = false;
                                _context2.prev = 24;
                                _context2.next = 27;
                                return this.checkLive(url);

                            case 27:
                                html = _context2.sent;
                                _context2.next = 33;
                                break;

                            case 30:
                                _context2.prev = 30;
                                _context2.t2 = _context2['catch'](24);
                                throw new Error("LINK DIE");

                            case 33:

                                //console.log(html);

                                /*
                                let m = html.split('sources: ')[1].split('}],')[0] + '}]';
                                let m1 = m.match(/file:"([^"]+)/g);
                                  let results = [];
                                  let m1Pro = m1.map(async (str) => {
                                    str = str.split('"')[1];
                                    let aSize = false; //await httpRequest.isLinkDie(str);
                                    aSize = (aSize === false) ? 'NOR' : aSize;
                                    if(str.indexOf('http') === 0)
                                      results.push({
                                          file: str, label: 'NOR', type: "direct" , size: aSize
                                      });
                                })
                                await Promise.all(m1Pro);
                                */

                                results = [];


                                html = html.split('updateSrc([{src: "')[1].split('"')[0];
                                _context2.next = 37;
                                return httpRequest.isLinkDie(html);

                            case 37:
                                aSize = _context2.sent;

                                aSize = aSize === false ? 'NOR' : aSize;
                                if (html.indexOf('http') === 0) results.push({
                                    file: html, label: 'NOR', type: "direct", size: aSize
                                });

                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Onlystream"
                                    },
                                    result: results
                                });

                            case 41:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[24, 30]]);
            }));

            function getUsingAPI(_x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return getUsingAPI;
        }()
    }, {
        key: 'getLink',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var cookie = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                var _libs2, httpRequest, cheerio, data;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio;
                                _context3.prev = 1;
                                _context3.next = 4;
                                return this.getUsingAPI(url, cookie);

                            case 4:
                                data = _context3.sent;
                                return _context3.abrupt('return', data);

                            case 8:
                                _context3.prev = 8;
                                _context3.t0 = _context3['catch'](1);
                                throw new Error(_context3.t0);

                            case 11:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[1, 8]]);
            }));

            function getLink(_x4) {
                return _ref3.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Onlystream;
}();

thisSource.function = function (libs, settings) {
    return new Onlystream({ libs: libs, settings: settings });
};