

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jsdom = require('jsdom');
var JSDOM = jsdom.JSDOM;

var jqueryPath = './jquery.min.js';
var fs = require('fs');

var Openload = function () {
    function Openload(props) {
        _classCallCheck(this, Openload);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Openload, [{
        key: 'getOpenload',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var _libs, httpRequest, jsdom, cheerio, JSDOM, jqueryUrl, html, jquery, dom, window, $, script, document, opl, isDie;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, jsdom = _libs.jsdom, cheerio = _libs.cheerio;
                                JSDOM = jsdom.JSDOM;
                                jqueryUrl = "https://openload.co/assets/js/jquery.min.js";
                                _context.next = 5;
                                return httpRequest.getHTML(url, { 'User-agent': 'Firefox 49' });

                            case 5:
                                html = _context.sent;

                                if (!(html.indexOf('<h3>We’re Sorry!</h3>') > -1)) {
                                    _context.next = 8;
                                    break;
                                }

                                throw new Error("Invalid fileId");

                            case 8:

                                //let jquery  = await httpRequest.getHTML(jqueryUrl);
                                jquery = fs.readFileSync(jqueryPath, 'utf8');
                                dom = new JSDOM(html, {
                                    runScripts: "outside-only"
                                });
                                window = dom.window;

                                window.eval(jquery);

                                $ = window.jQuery;
                                script = html.substring(html.indexOf("ﾟωﾟﾉ= /｀ｍ´"));

                                script = script.substring(0, script.indexOf("</script>"));
                                window.eval(script);
                                window.ffff = '' + window.ffff;

                                document = window.document;

                                script = script.substring(script.indexOf("$(document)"));
                                script = script.substring(script.indexOf("var"));
                                script = script.substring(0, script.indexOf("ﾟωﾟ"));
                                script = script.substring(0, script.lastIndexOf("});"));
                                script = script.replace(/with\(/g, 'if(1 || ');
                                script = script.replace(/xx/g, '_0x31f4aa.xx');
                                script = script.replace('ke', '/*console.log(_0x31f4aa.ke)*/;_0x31f4aa.ke');
                                script = script.replace(/sin/g, 'Math.sin');
                                script = script.replace('ffff', 'window.ffff');
                                script = script.replace("(!(function(){try{if('_phantom'in window||", "(!(function(){return false;try{if('_phantom'in window||");
                                script = script.replace("if(!_0x45ae41[_0x5949('0x8')", "if(false && !_0x45ae41[_0x5949('0x8')");
                                //script = script.replace("document.createTextNode.toString().indexOf('[native code')", "1");
                                script = script.replace("_0x3d7b02=[];", "");
                                window.eval(script);
                                opl = "https://openload.co/stream/" + window._0x1bf6e5 + "?mime=true";

                                console.log(opl, window.ffff);process.exit();
                                _context.next = 36;
                                return httpRequest.isLinkDie(opl);

                            case 36:
                                isDie = _context.sent;

                                if (!(isDie == false)) {
                                    _context.next = 39;
                                    break;
                                }

                                throw new Error("NOT LINK");

                            case 39:
                                return _context.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "openload"
                                    },
                                    result: [{ file: opl, label: "NOR", type: "embed", size: isDie }]
                                });

                            case 40:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getOpenload(_x) {
                return _ref.apply(this, arguments);
            }

            return getOpenload;
        }()
    }, {
        key: 'getQuality',
        value: function getQuality(url) {
            var qualities = ['DVDRip', 'HDTV', 'HDRip', 'WEB-DL', 'WEBRip', 'BRRip', 'Bluray', 'Blu-ray', 'BDRip', 'WEB', 'HDTS', 'TS', 'CAM'];

            for (var i in qualities) {
                var quality = qualities[i];
                if (url.toLowerCase().indexOf(quality.toLowerCase()) != -1) {
                    return quality;
                }
            }

            return false;
        }
    }, {
        key: 'checkLive',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var httpRequest, html;
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
                                httpRequest = this.libs.httpRequest;

                                // you fill the die status text
                                // const dieStatusText = "";

                                _context2.prev = 3;
                                _context2.next = 6;
                                return httpRequest.getHTML(url);

                            case 6:
                                html = _context2.sent;
                                _context2.next = 12;
                                break;

                            case 9:
                                _context2.prev = 9;
                                _context2.t0 = _context2['catch'](3);
                                throw new Error('NOT_FOUND');

                            case 12:
                                return _context2.abrupt('return', html);

                            case 13:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[3, 9]]);
            }));

            function checkLive(_x2) {
                return _ref2.apply(this, arguments);
            }

            return checkLive;
        }()
    }, {
        key: 'getUsingAPI',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                var _libs2, httpRequest, cryptoJs, cheerio, html, token, apiResponse, _apiResponse$data, status, data, error, isDie, $, title, quality, s;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cryptoJs = _libs2.cryptoJs, cheerio = _libs2.cheerio;
                                html = false;
                                _context3.prev = 2;
                                _context3.next = 5;
                                return this.checkLive(url);

                            case 5:
                                html = _context3.sent;
                                _context3.next = 11;
                                break;

                            case 8:
                                _context3.prev = 8;
                                _context3.t0 = _context3['catch'](2);
                                throw new Error("LINK DIE");

                            case 11:
                                token = cryptoJs.MD5(html + "teatv-openload").toString();
                                apiResponse = void 0;
                                _context3.prev = 13;
                                _context3.next = 16;
                                return httpRequest.post("https://api.teatv.net/api/v2/get_opl", {
                                    //apiResponse   = await httpRequest.post("http://localhost:6789/api/v2/get_opl", {
                                    "Content-Type": "application/json"
                                }, JSON.stringify({
                                    data: html,
                                    token: token
                                }));

                            case 16:
                                apiResponse = _context3.sent;
                                _context3.next = 23;
                                break;

                            case 19:
                                _context3.prev = 19;
                                _context3.t1 = _context3['catch'](13);

                                console.log('teatv.net, error json getopl', _context3.t1);
                                throw new Error('ERROR REQUEST');

                            case 23:

                                // let isDie = await httpRequest.isLinkDie(apiResponse.data.data);
                                // if( isDie == false ) throw new Error("LINK DIE");

                                _apiResponse$data = apiResponse.data, status = _apiResponse$data.status, data = _apiResponse$data.data, error = _apiResponse$data.error;

                                if (!error) {
                                    _context3.next = 26;
                                    break;
                                }

                                throw new Error(error);

                            case 26:
                                if (!(status == 200)) {
                                    _context3.next = 47;
                                    break;
                                }

                                isDie = false;
                                _context3.prev = 28;
                                _context3.next = 31;
                                return httpRequest.isLinkDie(data);

                            case 31:
                                isDie = _context3.sent;
                                _context3.next = 37;
                                break;

                            case 34:
                                _context3.prev = 34;
                                _context3.t2 = _context3['catch'](28);


                                console.log(String(_context3.t2));

                            case 37:
                                if (!(isDie == false)) {
                                    _context3.next = 39;
                                    break;
                                }

                                throw new Error("NOT LINK");

                            case 39:
                                $ = cheerio.load(html);
                                title = $(".title").text();
                                quality = this.getQuality(title);
                                s = { file: data, label: "NOR", type: "direct", size: isDie };

                                if (quality) s.source_label = quality;
                                return _context3.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "openload"
                                    },
                                    result: [s]
                                });

                            case 47:
                                return _context3.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "openload"
                                    },
                                    result: []
                                });

                            case 48:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[2, 8], [13, 19], [28, 34]]);
            }));

            function getUsingAPI(_x3) {
                return _ref3.apply(this, arguments);
            }

            return getUsingAPI;
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
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(url) {
                var _libs3, httpRequest, cheerio, data;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _libs3 = this.libs, httpRequest = _libs3.httpRequest, cheerio = _libs3.cheerio;
                                _context4.prev = 1;
                                _context4.next = 4;
                                return this.getOpenload(url);

                            case 4:
                                _context4.next = 6;
                                return this.getUsingAPI(url);

                            case 6:
                                data = _context4.sent;
                                return _context4.abrupt('return', data);

                            case 10:
                                _context4.prev = 10;
                                _context4.t0 = _context4['catch'](1);
                                throw new Error(_context4.t0);

                            case 13:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[1, 10]]);
            }));

            function getLink(_x4) {
                return _ref4.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Openload;
}();

thisSource.function = function (libs, settings) {
    return new Openload({ libs: libs, settings: settings });
};