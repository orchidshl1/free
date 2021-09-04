

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VidLox = function () {
        function VidLox(props) {
                _classCallCheck(this, VidLox);

                this.libs = props.libs;
                this.settings = props.settings;
                this.state = {};
        }

        _createClass(VidLox, [{
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
                                                                return httpRequest.getHTML(url, { 'User-Agent': 'Firefox 59' });

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
                key: 'convertToEmbed',
                value: function convertToEmbed(url) {

                        // convert link detail to link embed
                        // if input is embed then return input

                        // let id = url.match(/\/embed\-([^\-]+)/i);
                        // id = url != null ? url[1] : false;

                        // if( id == false ) return url;

                }
        }, {
                key: 'getLink',
                value: function () {
                        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                                var _this = this;

                                var _libs, httpRequest, cheerio, newUrl, html, m, result, mP;

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
                                                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                                                newUrl = url;


                                                                if (newUrl.includes("embed")) {
                                                                        newUrl = newUrl.replace('embed-', '').replace('.html', '');
                                                                }

                                                                _context3.next = 7;
                                                                return this.checkLive(newUrl);

                                                        case 7:
                                                                html = _context3.sent;

                                                                if (!(html == false)) {
                                                                        _context3.next = 10;
                                                                        break;
                                                                }

                                                                throw new Error("vidlox LINK DIE");

                                                        case 10:
                                                                m = html.match(/sources:([^\]]+)/);

                                                                if (!(m == undefined)) {
                                                                        _context3.next = 13;
                                                                        break;
                                                                }

                                                                throw new Error("vidlox LINK DIE 1");

                                                        case 13:
                                                                m = m[1].trim() + ']';
                                                                m = JSON.parse(m);

                                                                result = [];
                                                                mP = m.map(function () {
                                                                        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(u) {
                                                                                var isDie, regex;
                                                                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                                                        while (1) {
                                                                                                switch (_context2.prev = _context2.next) {
                                                                                                        case 0:
                                                                                                                _context2.next = 2;
                                                                                                                return httpRequest.isLinkDie(u);

                                                                                                        case 2:
                                                                                                                isDie = _context2.sent;
                                                                                                                regex = /(small\.mp4)$/gm;

                                                                                                                if (isDie != 'NOR' && regex.exec(u) == null) result.push({ label: "NOR", file: u, type: 'direct', size: isDie });

                                                                                                        case 5:
                                                                                                        case 'end':
                                                                                                                return _context2.stop();
                                                                                                }
                                                                                        }
                                                                                }, _callee2, _this);
                                                                        }));

                                                                        return function (_x3) {
                                                                                return _ref3.apply(this, arguments);
                                                                        };
                                                                }());
                                                                _context3.next = 19;
                                                                return Promise.all(mP);

                                                        case 19:
                                                                return _context3.abrupt('return', {
                                                                        host: {
                                                                                url: url,
                                                                                name: "vidlox"
                                                                        },
                                                                        result: result
                                                                });

                                                        case 20:
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

        return VidLox;
}();

thisSource.function = function (libs, settings) {
        return new VidLox({ libs: libs, settings: settings });
};