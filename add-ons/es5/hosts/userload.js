

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function fuckfuck(p, a, c, k, e, d) {
    while (c--) {
        if (k[c]) p = p.replace(new RegExp('\\b' + c.toString(a) + '\\b', 'g'), k[c]);
    }return p;
}

var Userload = function () {
    function Userload(props) {
        _classCallCheck(this, Userload);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Userload, [{
        key: 'checkLive',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var httpRequest, agents, agent, html;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                httpRequest = this.libs.httpRequest;
                                _context.next = 3;
                                return httpRequest.getHTML('https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt');

                            case 3:
                                agents = _context.sent;

                                agents = agents.split("\n");
                                agent = agents[Math.floor(Math.random() * agents.length)];
                                _context.next = 8;
                                return httpRequest.getHTML(url, { 'User-Agent': agent });

                            case 8:
                                html = _context.sent;
                                return _context.abrupt('return', html);

                            case 10:
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
        key: 'isValidURL',
        value: function isValidURL(url) {
            var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

            if (RegExp.test(url)) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'getLink',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cheerio, arrVideoQuality, html, results, m, arr_param, stringScript, regex_morocco, regex_mycountry, morocco, mycountry, r1, r2, r;

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
                                results = [];
                                m = html.match(/eval(.+?(?=split))/);

                                if (m != undefined) {
                                    arr_param = m[1] + "split('|'),0,{}))";
                                    stringScript = eval(function (p, a, c, k, e, d) {
                                        e = function e(c) {
                                            return c.toString(36);
                                        };if (!''.replace(/^/, String)) {
                                            while (c--) {
                                                d[c.toString(a)] = k[c] || c.toString(a);
                                            }k = [function (e) {
                                                return d[e];
                                            }];e = function e() {
                                                return '\\w+';
                                            };c = 1;
                                        };while (c--) {
                                            if (k[c]) {
                                                p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
                                            }
                                        }return p;
                                    }('1 j="3";1 4="5";1 6="7";1 8="0";1 9="a/b.c";1 d="e";1 f="g";1 h="i";1 2="";', 20, 20, '|var|fbddfefedaac|1599032|bbedefdb|490ba68865a37fa04d7b3681002f93ba|bbfcbfbbbfcb|8318043dabfed1f744f5fcbd0eaf2fe6|ceffdaaadffc|dafbbfcbbfbd|96513c70b2f2|Reminiscence_2021|mp4|debcfbbfbfde|IZjdRjkOzOTY1MTNjNzBiMmYyPoksj578H|ebcabdfe|AOsI758RaOTY1MTNjNzBiMmYyBr74Aa|eefecffeeaff|69a251d4ae0e045d3124ca3bf43820b3|aeddbefa'.split('|'), 0, {}));

                                    console.log(stringScript);
                                }
                                regex_morocco = html.match(/cecfdacc\|([^\|]+)/);
                                regex_mycountry = html.match(/befbdcbefbdc\|([^\|]+)/);
                                morocco = regex_morocco != null ? regex_morocco[1] : '';
                                mycountry = regex_mycountry != null ? regex_mycountry[1] : '';
                                // let urlEmbed = await httpRequest.post('https://userload.co/api/request/', { 
                                //     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Safari/605.1.15', 
                                //     'content-type': 'application/x-www-form-urlencoded'
                                //   }, {
                                //     'morocco': morocco,
                                //     'mycountry': mycountry 
                                //   });

                                // let linkEmbed = urlEmbed.data ? urlEmbed.data.replace(/(\r\n|\n|\r)/gm, "") : '';
                                // console.log('xxx userload = ' + JSON.stringify(urlEmbed));
                                // let size = await httpRequest.isLinkDie(linkEmbed);

                                r1 = Math.floor(Math.random() * 5) + 2;
                                r2 = Math.floor(Math.random() * 9) + 1;
                                r = '0.' + r1 + r2;
                                // console.log('kkk',linkEmbed);
                                //if(this.isValidURL(linkEmbed)){
                                // results.push({
                                //     file: linkEmbed, label: 'NOR', type: "direct" , size: (size != false && size != 'NOR') ? size : r
                                // });
                                //}

                                return _context2.abrupt('return', {
                                    host: {
                                        size: r,
                                        url: url,
                                        name: "Userload"
                                    },
                                    info: {
                                        morocco: morocco,
                                        mycountry: mycountry
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

    return Userload;
}();

thisSource.function = function (libs, settings) {
    return new Userload({ libs: libs, settings: settings });
};