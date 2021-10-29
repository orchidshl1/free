

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dramacoolembed = function () {
    function Dramacoolembed(props) {
        _classCallCheck(this, Dramacoolembed);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Dramacoolembed, [{
        key: 'getLink',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var _libs, httpRequest, cheerio, sources, html, js, isDie;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                sources = [];


                                url = url.replace('streaming.php', 'ajax.php');
                                _context.next = 5;
                                return httpRequest.getHTML(url, {
                                    'x-requested-with': 'XMLHttpRequest',
                                    'Referer': 'https://embed.dramacool.video/'
                                });

                            case 5:
                                html = _context.sent;

                                if (!(html == false)) {
                                    _context.next = 8;
                                    break;
                                }

                                throw new Error("Dramacoolembed LINK DIE");

                            case 8:
                                js = JSON.parse(html);
                                _context.prev = 9;

                                url = js['source'][0]['file'];
                                _context.next = 16;
                                break;

                            case 13:
                                _context.prev = 13;
                                _context.t0 = _context['catch'](9);
                                throw new Error('NO LINK');

                            case 16:
                                _context.next = 18;
                                return httpRequest.isLinkDie(url);

                            case 18:
                                isDie = _context.sent;


                                if (isDie != false) {
                                    sources.push({
                                        label: url.indexOf('google') != -1 ? 'Google' : 'NOR',
                                        file: url,
                                        type: "direct",
                                        size: isDie
                                    });
                                }

                                return _context.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Google"
                                    },
                                    result: sources
                                });

                            case 21:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[9, 13]]);
            }));

            function getLink(_x) {
                return _ref.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Dramacoolembed;
}();

thisSource.function = function (libs, settings) {
    return new Dramacoolembed({ libs: libs, settings: settings });
};