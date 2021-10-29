

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Evoload = function () {
    function Evoload(props) {
        _classCallCheck(this, Evoload);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Evoload, [{
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
                var _libs, httpRequest, cheerio, splitUrl, html, result;

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
                                splitUrl = url.split('/');

                                url = splitUrl[0] + '//' + splitUrl[2] + '/e/' + splitUrl[4];

                                _context2.next = 7;
                                return this.checkLive(url);

                            case 7:
                                html = _context2.sent;


                                console.log(html);
                                // if( html == false ) throw new Error("Streamzz LINK DIE");
                                // let m = html.match(/eval(.+?(?=split))/);
                                // if(m != undefined) {
                                //     let arr_param = m[1] + "split('|'),0,{}))";
                                //     let stringScript = eval(arr_param);

                                //     let n = '';
                                //     let reg = /https\:(.+?(?=dll))/mg;
                                //     n = reg.exec(stringScript);

                                //     if(n[0].indexOf('http') !== 0) throw new Error('invalid');
                                //     let getlink = n[0]+'dll';
                                // let html1 = await httpRequest.getHTML(getlink, {
                                //     'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                                //     'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                                //     'cache-control': 'max-age=0',
                                //     'upgrade-insecure-requests': 1,
                                //     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36',

                                // });
                                //     console.log(getlink)


                                // }
                                // let n = '';
                                // let reg = /document\.getElementById\(\'videoolink\'\)\.innerHTML = \"(.+?(?=.substring))/mg;
                                // n = reg.exec(html);
                                // console.log(n);
                                // let isDie = await httpRequest.isLinkDie(u);
                                result = [];
                                //result.push({ label: "NOR", file: u, type: 'direct', size: isDie });

                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Evoload"
                                    },
                                    result: result
                                });

                            case 11:
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

    return Evoload;
}();

thisSource.function = function (libs, settings) {
    return new Evoload({ libs: libs, settings: settings });
};