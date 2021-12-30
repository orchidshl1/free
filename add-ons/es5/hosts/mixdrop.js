

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mixdrop = function () {
    function Mixdrop(props) {
        _classCallCheck(this, Mixdrop);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Mixdrop, [{
        key: 'checkLive',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var httpRequest, html, agents, agent;
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
                                return httpRequest.getHTML('https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt');

                            case 6:
                                agents = _context.sent;

                                agents = agents.split("\n");
                                agent = agents[Math.floor(Math.random() * agents.length)];
                                _context.next = 11;
                                return httpRequest.getHTML(url, { 'User-agent': agent });

                            case 11:
                                html = _context.sent;
                                _context.next = 17;
                                break;

                            case 14:
                                _context.prev = 14;
                                _context.t0 = _context['catch'](3);
                                throw new Error('NOT_FOUND');

                            case 17:
                                return _context.abrupt('return', html);

                            case 18:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 14]]);
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
                var urlCheck, _libs, httpRequest, cheerio, results, html, m, size;

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

                                url = url.replace('/e/', '/f/').replace('.to', '.co').replace('.xs', '.co').replace('.bz', '.co');

                                urlCheck = url.replace('/e/', '/f/') + '?download';
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                results = [];
                                _context2.next = 8;
                                return this.checkLive(urlCheck);

                            case 8:
                                html = _context2.sent;

                                if (!(html == false)) {
                                    _context2.next = 11;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 11:
                                if (!(html.toLowerCase().indexOf("we can't find the video you are looking for.") != -1)) {
                                    _context2.next = 13;
                                    break;
                                }

                                throw new Error('DIE link');

                            case 13:
                                //console.log('User-agent mixdropxxx nodie1');

                                m = html.match(/\d+(\.\d+)?\s(GB?|MB?)/i);
                                size = m != null ? m[0] : 0;


                                if (size.toLowerCase().indexOf('mb') != -1) {
                                    size = '0.' + size.replace(/\smb?/i, '').replace('.', '');
                                }

                                if (size !== 0) size = parseFloat(size.replace(/\sgb/i, '')).toFixed(2);

                                return _context2.abrupt('return', {
                                    host: {
                                        size: size,
                                        url: url,
                                        name: "Mixdrop"
                                    },
                                    result: []
                                });

                            case 18:
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

    return Mixdrop;
}();

thisSource.function = function (libs, settings) {
    return new Mixdrop({ libs: libs, settings: settings });
};