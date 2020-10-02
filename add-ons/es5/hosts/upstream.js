

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function fuckfuck(p, a, c, k, e, d) {
    while (c--) {
        if (k[c]) p = p.replace(new RegExp('\\b' + c.toString(a) + '\\b', 'g'), k[c]);
    }return p;
}

var Upstream = function () {
    function Upstream(props) {
        _classCallCheck(this, Upstream);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Upstream, [{
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

                                console.log('Upstreamaaaa', url);
                                _context.prev = 2;
                                _context.next = 5;
                                return httpRequest.getHTML(url, { 'User-agent': 'Mozilla/5.0 (X1111; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/79.0. 3945.79 Chrome/79.0.3945.79 Safari/537.36' });

                            case 5:
                                html = _context.sent;

                                console.log('Upstreamaaaa done', url);
                                // if(html.includes(dieStatusText)) return true;
                                return _context.abrupt('return', html);

                            case 10:
                                _context.prev = 10;
                                _context.t0 = _context['catch'](2);

                                console.log('Upstreamaaa err', _context.t0);

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
                var _libs, httpRequest, cheerio, sources, html, $, size, results, h1, s1, a, m, ff, s;

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
                                $ = cheerio.load(html);

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

                                /*
                                let m = html.match(/sources: \[{file:"([^"]+)/);
                                if(m != undefined) {
                                    if( m[1].search('https://') != -1 || m[1].search('http://') != -1 ) {
                                        let isDie = await httpRequest.isLinkDie(m[1]);
                                        let s = {
                                            label: "NOR",
                                            file: m[1],
                                            type: "direct",
                                            size: isDie ? isDie : "",
                                        };
                                        sources.push(s);
                                    }
                                }
                                 return {
                                    host: {
                                        url: url,
                                        name: "Upstream"
                                    },
                                    result: sources
                                }
                                */

                                size = 'NOR';
                                results = [];
                                h1 = $('.section').html();
                                s1 = h1.match(/\d+(\.\d+)?\s(GB?|MB?)/i);

                                size = s1 != null ? s1[0] : 0;
                                if (size.toLowerCase().indexOf('mb') != -1) {
                                    size = '0.' + size.replace(/\smb?/i, '').replace('.', '');
                                }

                                if (size !== 0) size = parseFloat(size.replace(/\sgb/i, '')).toFixed(2);

                                a = void 0, m = void 0;

                                m = html.split('eval(function(p,a,c,k,e,d)')[1];
                                m = m.split('</script>')[0].trim();
                                m = 'eval(function(p,a,c,k,e,d)' + m;

                                ff = m.split('return p}')[1];

                                ff = 'a = fuckfuck' + ff;
                                ff = ff.replace(/\)$/, '');
                                eval(ff);
                                console.log(a);
                                m = a.match(/file:"([^"]+)/);

                                if (!(m == undefined)) {
                                    _context2.next = 29;
                                    break;
                                }

                                throw new Error('NO ups');

                            case 29:
                                s = {
                                    label: "NOR",
                                    file: m[1],
                                    type: "direct",
                                    size: size
                                };

                                results.push(s);
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Upstream"
                                    },
                                    result: results
                                });

                            case 32:
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

    return Upstream;
}();

thisSource.function = function (libs, settings) {
    return new Upstream({ libs: libs, settings: settings });
};