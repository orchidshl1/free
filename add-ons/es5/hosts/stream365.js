

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
                                return httpRequest.getHTML(url, { 'referer': 'https://bmovies.vip/' });

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
        key: 'convertToEmbed',
        value: function convertToEmbed() {

            // convert link detail to link embed
            // if input is embed then return input
        }
    }, {
        key: 'getLink',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cheerio, results, html, $, id, new_url, result, isDie;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!(url.indexOf('http://') != 0 && url.indexOf('https://') != 0)) {
                                    _context2.next = 2;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 2:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                results = [];
                                _context2.next = 6;
                                return this.checkLive(url);

                            case 6:
                                html = _context2.sent;
                                $ = cheerio.load(html);
                                id = $('#player').attr("data-id");
                                new_url = 'http://' + url.split("/")[2] + '/ajax/getSources/' + id;
                                _context2.next = 12;
                                return httpRequest.get(new_url, { 'referer': url });

                            case 12:
                                result = _context2.sent;
                                isDie = 'NOR';

                                if (!result.data.sources) {
                                    _context2.next = 25;
                                    break;
                                }

                                _context2.prev = 15;
                                _context2.next = 18;
                                return httpRequest.isLinkDie(result.data.sources[0].file);

                            case 18:
                                isDie = _context2.sent;
                                _context2.next = 24;
                                break;

                            case 21:
                                _context2.prev = 21;
                                _context2.t0 = _context2['catch'](15);

                                console.log('direct_err', _context2.t0);

                            case 24:

                                results.push({
                                    file: result.data.sources[0].file, label: 'NOR', type: "direct", size: isDie, referer: url
                                });

                            case 25:
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Stream365"
                                    },
                                    result: results
                                });

                            case 26:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[15, 21]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Stream365;
}();

thisSource.function = function (libs, settings) {
    return new Stream365({ libs: libs, settings: settings });
};