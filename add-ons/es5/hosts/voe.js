

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function k(f) {
    f = f.join('');f = f.split('').reverse().join('');return Buffer.from(f, 'base64').toString();
}

var Voe = function () {
    function Voe(props) {
        _classCallCheck(this, Voe);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Voe, [{
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
                var _libs, httpRequest, cheerio, html, result, rg, isDie;

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

                                throw new Error(" LINK DIE");

                            case 8:
                                //let m = html.match(/sources\[\"mp4\"\] =(.+?(?=\]\)))/);
                                result = [];
                                // if(m != undefined) {
                                //     let arrcode = m[1].split('[');

                                //     let arr_param = arrcode[1].split(',');
                                //     let linkdecode = k(arr_param);
                                //     let isDie = await httpRequest.isLinkDie(linkdecode);
                                //     result.push({ label: "NOR", file: linkdecode, type: 'direct', size: isDie });
                                // }


                                rg = html.match(/"hls": "(.+?(?=\"))/);

                                if (!(rg != undefined)) {
                                    _context2.next = 15;
                                    break;
                                }

                                _context2.next = 13;
                                return httpRequest.isLinkDie(rg[1]);

                            case 13:
                                isDie = _context2.sent;

                                result.push({ label: "NOR", file: rg[1], type: 'direct', size: isDie, referer: 'https://voe.sx/' });

                            case 15:
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Voe"
                                    },
                                    result: result
                                });

                            case 16:
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

    return Voe;
}();

thisSource.function = function (libs, settings) {
    return new Voe({ libs: libs, settings: settings });
};