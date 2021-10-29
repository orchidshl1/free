

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var END_OF_INPUT = -1;
var arrChrs = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/");
var reversegetFChars = new Array();
for (var i = 0; i < arrChrs.length; i++) {
    reversegetFChars[arrChrs[i]] = i;
}
var getFStr;
var getFCount;

function ntos(e) {
    e = e.toString(16);
    if (e.length == 1) e = "0" + e;
    e = "%" + e;
    return unescape(e);
}

function readReversegetF() {
    if (!getFStr) return END_OF_INPUT;
    while (true) {
        if (getFCount >= getFStr.length) return END_OF_INPUT;
        var e = getFStr.charAt(getFCount);
        getFCount++;
        if (reversegetFChars[e]) {
            return reversegetFChars[e];
        }
        if (e == "A") return 0;
    }
    return END_OF_INPUT;
}

function readgetF() {
    if (!getFStr) return END_OF_INPUT;
    if (getFCount >= getFStr.length) return END_OF_INPUT;
    var e = getFStr.charCodeAt(getFCount) & 255;
    getFCount++;
    return e;
}

function setgetFStr(e) {
    getFStr = e;
    getFCount = 0;
}

function getF(e) {
    setgetFStr(e);
    var t = "";
    var n = new Array(4);
    var r = false;
    while (!r && (n[0] = readReversegetF()) != END_OF_INPUT && (n[1] = readReversegetF()) != END_OF_INPUT) {
        n[2] = readReversegetF();
        n[3] = readReversegetF();
        t += ntos(n[0] << 2 & 255 | n[1] >> 4);
        if (n[2] != END_OF_INPUT) {
            t += ntos(n[1] << 4 & 255 | n[2] >> 2);
            if (n[3] != END_OF_INPUT) {
                t += ntos(n[2] << 6 & 255 | n[3]);
            } else {
                r = true;
            }
        } else {
            r = true;
        }
    }
    return t;
}

function tor(txt) {
    var map = [];
    var tmp = "abcdefghijklmnopqrstuvwxyz";
    var buf = "";
    for (j = 0; j < tmp.length; j++) {
        var x = tmp.charAt(j);var y = tmp.charAt((j + 13) % 26);
        map[x] = y;map[x.toUpperCase()] = y.toUpperCase();
    }
    for (j = 0; j < txt.length; j++) {
        var c = txt.charAt(j);
        buf += c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z' ? map[c] : c;
    }
    return buf;
}

var decrypt = function decrypt(e) {
    var code = unescape(tor(getF(tor(e))));
    return code;
};

var Afdah = function () {
    function Afdah(props) {
        _classCallCheck(this, Afdah);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Afdah, [{
        key: "checkLive",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var httpRequest, headers, u, html;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                httpRequest = this.libs.httpRequest;

                                // you fill the die status text
                                // const dieStatusText = "";

                                headers = {
                                    'User-Agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
                                    'Referer': url
                                };


                                try {
                                    u = JSON.parse(url);

                                    url = u.url;
                                    headers = {
                                        'Cookie': u.cookie,
                                        'User-Agent': u['User-Agent'],
                                        'referer': url,
                                        'content-type': 'application/x-www-form-urlencoded',
                                        'origin': 'https://afdah.info',
                                        'sec-fetch-site': 'same-origin',
                                        'sec-fetch-mode': 'navigate',
                                        'cache-control': 'no-cache',
                                        'sec-fetch-user': '?1',
                                        'upgrade-insecure-requests': 1
                                    };
                                } catch (e) {}

                                console.log('afdah checkLive', headers, url);

                                _context.next = 6;
                                return httpRequest.post(url, headers, { 'play': 'continue', 'x': 69, 'y': 96 });

                            case 6:
                                html = _context.sent;


                                console.log('afdah checkLive done', html);

                                /*
                                let html = await httpRequest.getHTML(url, {
                                    'User-Agent':' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
                                });
                                */
                                // if(html.includes(dieStatusText)) return true;
                                console.log('afdah post data', html.data);
                                return _context.abrupt("return", html.data);

                            case 10:
                            case "end":
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
        key: "convertToEmbed",
        value: function convertToEmbed() {

            // convert link detail to link embed
            // if input is embed then return input
        }
    }, {
        key: "getLink",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _libs, httpRequest, cheerio, cryptoJs, allowCache, u, sources, bodyPost, embeds, r, i, res, html, decryp, arrPromise, xxx;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, cryptoJs = _libs.cryptoJs;
                                allowCache = false;
                                u = '';
                                sources = [];
                                bodyPost = {};
                                embeds = ['/embed/', '/embed3/', '/embed4/'];
                                r = url.match(/\/embed\d?\/(\d+)/);


                                for (i = 0; i < embeds.length; i++) {
                                    if (url.indexOf(embeds[i]) != -1) {
                                        allowCache = true;
                                        u = r[0];
                                    }
                                }

                                if (!(allowCache && false)) {
                                    _context3.next = 22;
                                    break;
                                }

                                bodyPost = {
                                    name_source: 'afdahhosthihhi',
                                    is_link: 0,
                                    type: 'movie',
                                    season: 0,
                                    episode: 0,
                                    title: u,
                                    year: 2018,
                                    hash: cryptoJs.MD5(u.toLowerCase() + "0aloha0").toString()
                                };

                                _context3.next = 12;
                                return httpRequest.post('https://getaz.morphtv.club/source/get', {}, bodyPost);

                            case 12:
                                res = _context3.sent;
                                _context3.prev = 13;

                                res = res['data'];

                                if (!(res['status'] && false)) {
                                    _context3.next = 17;
                                    break;
                                }

                                return _context3.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "Googlevideo"
                                    },
                                    result: JSON.parse(res['hosts'])
                                });

                            case 17:
                                _context3.next = 22;
                                break;

                            case 19:
                                _context3.prev = 19;
                                _context3.t0 = _context3["catch"](13);

                                console.log('err', _context3.t0);

                            case 22:
                                _context3.next = 24;
                                return this.checkLive(url);

                            case 24:
                                html = _context3.sent;

                                if (!(html == false)) {
                                    _context3.next = 27;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 27:
                                decryp = html.match(/salt\(\"([^\"]+)/i);

                                console.log('afdah decryp', decryp);

                                decryp = decrypt(decryp[1]);
                                console.log('afdah decryp log', decryp);
                                decryp = decryp.match(/sources *: *\[([^\]]+)/i);
                                decryp = decryp != null ? decryp[1] : '';

                                if (!(decryp != '')) {
                                    _context3.next = 46;
                                    break;
                                }

                                decryp = eval("[" + decryp + "]");
                                arrPromise = decryp.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
                                        var isDie;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:

                                                        if (value.file.indexOf('http') != 0) value.file = 'https://afdah.info' + value.file;
                                                        _context2.next = 3;
                                                        return httpRequest.isLinkDie(value.file);

                                                    case 3:
                                                        isDie = _context2.sent;


                                                        if (isDie != false) {

                                                            sources.push({
                                                                label: 'NOR',
                                                                file: value.file,
                                                                type: "direct",
                                                                size: (Math.random() * (2.2 - 1.9) + 1.9).toFixed(2)
                                                            });
                                                        }

                                                    case 5:
                                                    case "end":
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this);
                                    }));

                                    return function (_x3) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 38;
                                return Promise.all(arrPromise);

                            case 38:
                                if (!(sources.length > 0 && allowCache && false)) {
                                    _context3.next = 45;
                                    break;
                                }

                                bodyPost['hosts'] = JSON.stringify(sources);
                                bodyPost['expired'] = 300;
                                console.log(bodyPost, 'bPost');
                                _context3.next = 44;
                                return httpRequest.post('https://getaz.morphtv.club/source/set', {}, bodyPost);

                            case 44:
                                xxx = _context3.sent;

                            case 45:
                                return _context3.abrupt("return", {
                                    host: {
                                        url: url,
                                        name: "Googlevideo"
                                    },
                                    result: sources
                                });

                            case 46:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[13, 19]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Afdah;
}();

thisSource.function = function (libs, settings) {
    return new Afdah({ libs: libs, settings: settings });
};