

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stream365 = function () {
    function Stream365(props) {
        _classCallCheck(this, Stream365);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Stream365, [{
        key: 'convertToEmbed',
        value: function convertToEmbed() {

            // convert link detail to link embed
            // if input is embed then return input
        }
    }, {
        key: 'getLink',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var _libs, httpRequest, cheerio, results, isDie;

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
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                results = [];
                                isDie = 'NOR';
                                _context.prev = 5;
                                _context.next = 8;
                                return httpRequest.isLinkDie(url);

                            case 8:
                                isDie = _context.sent;
                                _context.next = 14;
                                break;

                            case 11:
                                _context.prev = 11;
                                _context.t0 = _context['catch'](5);

                                console.log('direct_err', _context.t0);

                            case 14:
                                console.log(isDie);
                                if (isDie != false && isDie != 'NOR') {
                                    results.push({
                                        file: url, label: 'NOR', type: "direct", size: isDie, referer: 'https://bmovies.vip/'
                                    });
                                }

                                return _context.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Stream365"
                                    },
                                    result: results
                                });

                            case 17:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[5, 11]]);
            }));

            function getLink(_x) {
                return _ref.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Stream365;
}();

thisSource.function = function (libs, settings) {
    return new Stream365({ libs: libs, settings: settings });
};