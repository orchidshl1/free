

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wewon = function () {
    function Wewon(props) {
        _classCallCheck(this, Wewon);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Wewon, [{
        key: 'convertToEmbed',
        value: function convertToEmbed() {

            // convert link detail to link embed
            // if input is embed then return input
        }
    }, {
        key: 'getLink',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var _libs, httpRequest, cheerio, results;

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


                                results.push({
                                    file: url, label: 'NOR', type: "Wewon", size: '1.26'
                                });

                                return _context.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Wewon"
                                    },
                                    result: results
                                });

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getLink(_x) {
                return _ref.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Wewon;
}();

thisSource.function = function (libs, settings) {
    return new Wewon({ libs: libs, settings: settings });
};