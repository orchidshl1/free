

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function fuckfuck(p, a, c, k, e, d) {
    while (c--) {
        if (k[c]) p = p.replace(new RegExp('\\b' + c.toString(a) + '\\b', 'g'), k[c]);
    }return p;
}

var Vidtodo = function () {
    function Vidtodo(props) {
        _classCallCheck(this, Vidtodo);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
        this.headers = {};
    }

    _createClass(Vidtodo, [{
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
                                return httpRequest.getHTML(url, this.headers);

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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url, cookie) {
                var _libs, httpRequest, cheerio, cookies, i, c, _m, cfuid, cfclear, sources, html, m, a, results, ff, reg, size;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;

                                url = url.replace(/\/([^\/]+)/, '/allvids.co');

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
                                _m = c.match(/__cfduid=([^;]+)/);

                                if (!(_m == undefined)) {
                                    _context2.next = 12;
                                    break;
                                }

                                return _context2.abrupt('continue', 5);

                            case 12:
                                cfuid = _m[1];
                                cfclear = false;

                                _m = c.match(/cf_clearance=([^;]+)/);
                                if (_m != undefined) cfclear = _m[1];else {
                                    _m = c.match(/cf_clearance=([^"]+)/);
                                    if (_m != undefined) cfclear = _m[1];
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
                                sources = [];
                                _context2.next = 26;
                                return this.checkLive(url);

                            case 26:
                                html = _context2.sent;

                                if (!(html == false)) {
                                    _context2.next = 30;
                                    break;
                                }

                                console.log('vidtodo no link');
                                throw new Error("vidtodo LINK DIE");

                            case 30:

                                /*
                                let $ = cheerio.load(html);
                                let script = $('#content:last').next().text();
                                 //console.log(script); process.exit();
                                 let startIndex  = html.indexOf('jwplayer("vplayer").setup');
                                html            = html.substring(startIndex);
                                html            = html.substring(0, html.indexOf(".setVolume("));
                                html            = html.replace('jwplayer("vplayer").setup', "player = ");
                                html            += ";";
                                 var player;
                                eval(html);
                                */

                                m = void 0, a = void 0;
                                results = [];

                                m = html.split('eval(function(p,a,c,k,e,d)')[1];
                                m = m.split('</script>')[0].trim();
                                m = 'eval(function(p,a,c,k,e,d)' + m;

                                ff = m.split('return p}')[1];

                                ff = 'a = fuckfuck' + ff;
                                ff = ff.replace(/\)$/, '');
                                eval(ff);
                                reg = /src:"([^"]+)/g;

                            case 40:
                                if (!(m = reg.exec(a))) {
                                    _context2.next = 49;
                                    break;
                                }

                                if (!(m[1].indexOf('jpg') != -1 || m[1].indexOf('png') != -1)) {
                                    _context2.next = 43;
                                    break;
                                }

                                return _context2.abrupt('continue', 40);

                            case 43:
                                _context2.next = 45;
                                return httpRequest.isLinkDie(m[1]);

                            case 45:
                                size = _context2.sent;

                                results.push({
                                    file: m[1], label: 'NOR', type: "direct", size: size == false ? 'NOR' : size
                                });
                                _context2.next = 40;
                                break;

                            case 49:
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "vidtodo"
                                    },
                                    result: results
                                });

                            case 50:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getLink(_x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Vidtodo;
}();

thisSource.function = function (libs, settings) {
    return new Vidtodo({ libs: libs, settings: settings });
};