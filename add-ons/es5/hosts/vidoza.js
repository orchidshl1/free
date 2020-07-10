

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vidoza = function () {
    function Vidoza(props) {
        _classCallCheck(this, Vidoza);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Vidoza, [{
        key: 'getQuality',
        value: function getQuality(url) {
            var qualities = ['DVDRip', 'HDTV', 'HDRip', 'WEB-DL', 'WEBRip', 'BRRip', 'Blu ray', 'Bluray', 'Blu-ray', 'BDRip', 'WEB', 'HDTS', 'TS', 'CAM'];

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
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var httpRequest, html;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                httpRequest = this.libs.httpRequest;

                                // you fill the die status text
                                // const dieStatusText = "";

                                console.log('vidozaaaaa', url);
                                _context.prev = 2;
                                _context.next = 5;
                                return httpRequest.getHTML(url, { 'User-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/79.0. 3945.79 Chrome/79.0.3945.79 Safari/537.36' });

                            case 5:
                                html = _context.sent;

                                console.log('vidozaaaaa done', url);
                                // if(html.includes(dieStatusText)) return true;
                                return _context.abrupt('return', html);

                            case 10:
                                _context.prev = 10;
                                _context.t0 = _context['catch'](2);

                                console.log('vidozaaaa err', _context.t0);

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[2, 10]]);
            }));

            function checkLive(_x) {
                return _ref.apply(this, arguments);
            }

            return checkLive;
        }()
    }, {
        key: 'convertToEmbed',
        value: function convertToEmbed(url) {

            // convert link detail to link embed
            // if input is embed then return input

            // let id = url.match(/\/embed\-([^\-]+)/i);
            // id = url != null ? url[1] : false;

            // if( id == false ) return url;

        }
    }, {
        key: 'getLink',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cheerio, sources, html, m, isDie, $, title, quality, s;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;

                                if (!(url.search('https://') == -1 && url.search('http://') == -1)) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 3:
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

                                /*
                                let startIndex  = html.indexOf('jwplayer("vplayer").setup');
                                html            = html.substring(startIndex);
                                html            = html.substring(0, html.indexOf(".setVolume("));
                                html            = html.replace('jwplayer("vplayer").setup', "player = ");
                                html            += ";";
                                 var player;
                                eval(html);
                                let data = player.sources;
                                 let arrPromise = data.map( async val => {
                                    
                                    let isDie = await httpRequest.isLinkDie(val.file);
                                     if( isDie != false ) {
                                         sources.push({
                                            label: val.file.indexOf("mp4") !== -1 ? val.label : "NOR",
                                            file: val.file,
                                            type: "embed",
                                            size: isDie
                                        });
                                    }
                                
                                 });
                                 await Promise.all(arrPromise);
                                */

                                m = html.match(/source src="([^"]+)/);

                                if (!(m != undefined)) {
                                    _context2.next = 23;
                                    break;
                                }

                                if (!(m[1].search('https://') != -1 || m[1].search('http://') != -1)) {
                                    _context2.next = 23;
                                    break;
                                }

                                if (!(m[1].indexOf('640x360_universal_july16.mp4') != -1)) {
                                    _context2.next = 14;
                                    break;
                                }

                                throw new Error('FUCKING Vidoza');

                            case 14:
                                _context2.next = 16;
                                return httpRequest.isLinkDie(m[1]);

                            case 16:
                                isDie = _context2.sent;
                                $ = cheerio.load(html);
                                title = $('title').text();
                                quality = this.getQuality(title);
                                s = {
                                    label: "NOR",
                                    file: m[1],
                                    type: "direct",
                                    size: isDie ? isDie : ""
                                };

                                if (quality) s.source_label = quality;
                                sources.push(s);

                            case 23:
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "vidoza"
                                    },
                                    result: sources
                                });

                            case 24:
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

    return Vidoza;
}();

thisSource.function = function (libs, settings) {
    return new Vidoza({ libs: libs, settings: settings });
};