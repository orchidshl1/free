

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function fuckfuck(p, a, c, k, e, d) {
    while (c--) {
        if (k[c]) p = p.replace(new RegExp('\\b' + c.toString(a) + '\\b', 'g'), k[c]);
    }return p;
}

var Vidiatv = function () {
    function Vidiatv(props) {
        _classCallCheck(this, Vidiatv);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Vidiatv, [{
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
                var _libs, httpRequest, cheerio, arrVideoQuality, html, $, results, size, m, a, ff, reg;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                arrVideoQuality = [];
                                _context2.next = 4;
                                return this.checkLive(url);

                            case 4:
                                html = _context2.sent;

                                if (!(html == false)) {
                                    _context2.next = 7;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 7:
                                $ = cheerio.load(html);
                                results = [];
                                size = 'NOR';


                                $('#download-tab .table tr').each(function () {
                                    var t = $(this).text();
                                    if (t.toLowerCase().indexOf('normal quality') != -1) {
                                        var m = t.match(/\d+(\.\d+)?\s(GB?|MB?)/i);
                                        size = m != null ? m[0] : 0;

                                        if (size.toLowerCase().indexOf('mb') != -1) {
                                            size = '0.' + size.replace(/\smb?/i, '').replace('.', '');
                                        }

                                        if (size !== 0) size = parseFloat(size.replace(/\sgb/i, '')).toFixed(2);
                                    }
                                });

                                _context2.prev = 11;
                                m = void 0, a = void 0;

                                m = html.split('eval(function(p,a,c,k,e,d)')[1];
                                m = m.split('</script>')[0].trim();
                                m = 'eval(function(p,a,c,k,e,d)' + m;

                                ff = m.split('return p}')[1];

                                ff = 'a = fuckfuck' + ff;
                                ff = ff.replace(/\)$/, '');
                                eval(ff);
                                reg = /file"?:\s?"([^"]+)/g;

                            case 21:
                                if (!(m = reg.exec(a))) {
                                    _context2.next = 32;
                                    break;
                                }

                                if (!(m[1].indexOf('jpg') != -1 || m[1].indexOf('png') != -1)) {
                                    _context2.next = 24;
                                    break;
                                }

                                return _context2.abrupt('continue', 21);

                            case 24:
                                if (!(m[1].indexOf('http') !== 0 || m[1].indexOf('.vtt') != -1)) {
                                    _context2.next = 26;
                                    break;
                                }

                                return _context2.abrupt('continue', 21);

                            case 26:
                                if (!(m[1].toLowerCase().indexOf('.srt') != -1)) {
                                    _context2.next = 28;
                                    break;
                                }

                                return _context2.abrupt('continue', 21);

                            case 28:
                                console.log(m[1]);
                                results.push({
                                    file: m[1], label: 'NOR', type: "direct", size: size
                                });
                                _context2.next = 21;
                                break;

                            case 32:
                                _context2.next = 37;
                                break;

                            case 34:
                                _context2.prev = 34;
                                _context2.t0 = _context2['catch'](11);
                                throw new Error(_context2.t0);

                            case 37:
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "VidiaTV"
                                    },
                                    result: results
                                });

                            case 38:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[11, 34]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Vidiatv;
}();

thisSource.function = function (libs, settings) {
    return new Vidiatv({ libs: libs, settings: settings });
};