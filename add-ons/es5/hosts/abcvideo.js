

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Abcvideo = function () {
    function Abcvideo(props) {
        _classCallCheck(this, Abcvideo);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Abcvideo, [{
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
                var _libs, httpRequest, cheerio, sources, html, m, arr_param, stringScript, n, reg, linkEmbed, _size, r1, r2, _r;

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
                                sources = [];
                                _context2.next = 6;
                                return this.checkLive(url);

                            case 6:
                                html = _context2.sent;

                                if (!(html == false)) {
                                    _context2.next = 9;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 9:
                                //console.log('User-agent Abcvideoxxx nodie');

                                // if(html.toLowerCase().indexOf('File Not Found'.toLowerCase()) != -1) throw new Error('404');

                                // console.log(html);
                                // let m = html.match(/\d+(\.\d+)?\s(GB|MB)/i);
                                // let size = m != null ? m[0] : 0;

                                // if(size.toLowerCase().indexOf('mb') != -1) {
                                //     size = '0.' + size.replace(/\smb?/i, '').replace('.', '');
                                // }

                                // if(size !== 0) size = parseFloat(size.replace(/\sgb/i, '')).toFixed(2);
                                m = html.match(/eval(.+?(?=split))/);

                                if (!(m != undefined)) {
                                    _context2.next = 27;
                                    break;
                                }

                                //console.log(m[1]);
                                arr_param = m[1] + "split('|')))";
                                stringScript = eval(arr_param);

                                console.log(stringScript);
                                n = '';
                                reg = /{file:"([^"]+)/mg;

                                n = reg.exec(stringScript);

                                if (!(n[1].indexOf('http') !== 0)) {
                                    _context2.next = 19;
                                    break;
                                }

                                throw new Error('invalid');

                            case 19:
                                linkEmbed = n[1].replace(/{file:"/, '');
                                _context2.next = 22;
                                return httpRequest.isLinkDie(linkEmbed);

                            case 22:
                                _size = _context2.sent;
                                r1 = Math.floor(Math.random() * 5) + 2;
                                r2 = Math.floor(Math.random() * 9) + 1;
                                _r = '0.' + r1 + r2;


                                sources.push({
                                    file: linkEmbed, label: 'NOR', type: "direct", size: _size != false && _size != 'NOR' ? _size : _r
                                });

                            case 27:
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url.indexOf('-embed') == -1 ? url.replace('c/', 'c/embed-').replace('.html', '') + '.html' : url,
                                        size: size != false && size != 'NOR' ? size : r,
                                        name: "Abcvideo"
                                    },
                                    result: []
                                });

                            case 28:
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

    return Abcvideo;
}();

thisSource.function = function (libs, settings) {
    return new Abcvideo({ libs: libs, settings: settings });
};