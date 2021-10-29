

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Streamzz = function () {
        function Streamzz(props) {
                _classCallCheck(this, Streamzz);

                this.libs = props.libs;
                this.settings = props.settings;
                this.state = {};
        }

        _createClass(Streamzz, [{
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
                                var _libs, httpRequest, cheerio, html, m, result, arr_param, stringScript, n, reg, getlink, tess, isDie;

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
                                                                return this.checkLive(url);

                                                        case 5:
                                                                html = _context2.sent;

                                                                if (!(html == false)) {
                                                                        _context2.next = 8;
                                                                        break;
                                                                }

                                                                throw new Error("Streamzz LINK DIE");

                                                        case 8:
                                                                m = html.match(/eval(.+?(?=split))/);
                                                                result = [];

                                                                if (!(m != undefined)) {
                                                                        _context2.next = 25;
                                                                        break;
                                                                }

                                                                arr_param = m[1] + "split('|'),0,{}))";
                                                                stringScript = eval(arr_param);
                                                                n = '';
                                                                reg = /https\:(.+?(?=dll))/mg;

                                                                n = reg.exec(stringScript);

                                                                if (!(n[0].indexOf('http') !== 0)) {
                                                                        _context2.next = 18;
                                                                        break;
                                                                }

                                                                throw new Error('invalid');

                                                        case 18:
                                                                getlink = n[0] + 'dll';

                                                                tess = function (p, a, c, k, e, d) {
                                                                        e = function e(c) {
                                                                                return c.toString(36);
                                                                        };if (!''.replace(/^/, String)) {
                                                                                while (c--) {
                                                                                        d[c.toString(a)] = k[c] || c.toString(a);
                                                                                }k = [function (e) {
                                                                                        return d[e];
                                                                                }];e = function e() {
                                                                                        return '\\w+';
                                                                                };c = 1;
                                                                        };while (c--) {
                                                                                if (k[c]) {
                                                                                        p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
                                                                                }
                                                                        }return p;
                                                                }('b 2=c(\'d\');2.a({f:\'3://8.5.4/7.9/6-e.m\',g:o,q:0,r:0,n:1,i:h,j:"3://k.l/?p"});', 28, 28, '||my_video_id|https|xyz|cdncache|player|streamz|stc|cc|watermark|var|videojs|video_1|logo|file|xpos|true|clickable|url|streamzz|to|png|opacity|100|logo_dl|ypos|xrepeat'.split('|'), 0, {});

                                                                console.log(tess);
                                                                _context2.next = 23;
                                                                return httpRequest.isLinkDie(getlink);

                                                        case 23:
                                                                isDie = _context2.sent;


                                                                result.push({ label: "NOR", file: getlink, type: 'direct', size: isDie });

                                                        case 25:
                                                                return _context2.abrupt('return', {
                                                                        host: {
                                                                                url: url,
                                                                                name: "Streamzz"
                                                                        },
                                                                        result: result
                                                                });

                                                        case 26:
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

        return Streamzz;
}();

thisSource.function = function (libs, settings) {
        return new Streamzz({ libs: libs, settings: settings });
};