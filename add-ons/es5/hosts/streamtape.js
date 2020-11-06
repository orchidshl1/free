

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Streamtape = function () {
        function Streamtape(props) {
                _classCallCheck(this, Streamtape);

                this.libs = props.libs;
                this.settings = props.settings;
                this.state = {};
        }

        _createClass(Streamtape, [{
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
                                var _libs, httpRequest, cheerio, html, left, start, end, playUrl, isDie, result;

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

                                                                throw new Error("Streamtape LINK DIE");

                                                        case 8:
                                                                left = 'document.getElementById("videolink").innerHTML = "//';
                                                                start = html.indexOf(left);

                                                                if (!(start === -1)) {
                                                                        _context2.next = 12;
                                                                        break;
                                                                }

                                                                return _context2.abrupt('return', '');

                                                        case 12:

                                                                html = html.slice(start + left.length);
                                                                end = html.indexOf('";</script>');

                                                                if (!(end === -1)) {
                                                                        _context2.next = 16;
                                                                        break;
                                                                }

                                                                return _context2.abrupt('return', '');

                                                        case 16:
                                                                playUrl = html.slice(0, end);


                                                                playUrl = 'https://' + playUrl;

                                                                // playUrl = playUrl + '&stream=1';

                                                                _context2.next = 20;
                                                                return httpRequest.isLinkDie(playUrl);

                                                        case 20:
                                                                isDie = _context2.sent;
                                                                result = [];

                                                                result.push({ label: "NOR", file: playUrl, type: 'direct', size: isDie });

                                                                return _context2.abrupt('return', {
                                                                        host: {
                                                                                url: url,
                                                                                name: "Streamtape"
                                                                        },
                                                                        result: result
                                                                });

                                                        case 24:
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

        return Streamtape;
}();

thisSource.function = function (libs, settings) {
        return new Streamtape({ libs: libs, settings: settings });
};