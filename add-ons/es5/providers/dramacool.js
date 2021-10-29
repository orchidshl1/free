

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://www2.dramacool.movie',
    SEARCH: function SEARCH(title) {
        return 'https://www2.dramacool.movie/search?keyword=' + title + '&type=movies';
    }
};

var Dramacool = function () {
    function Dramacool(props) {
        _classCallCheck(this, Dramacool);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
        this.headers = {
            'User-Agent': 'Firefox 59'
        };

        if (this.movieInfo.cookie != undefined) {
            try {
                var cookies = JSON.parse(this.libs.base64.decode(this.movieInfo.cookie));
                for (var i in cookies) {
                    if (URL.DOMAIN.indexOf(cookies[i].domain) != -1) {
                        var c = cookies[i].cookie;

                        var m = c.match(/__cfduid=([^;]+)/);

                        if (m == undefined) continue;
                        var cfuid = m[1];

                        var cfclear = false;
                        m = c.match(/cf_clearance=([^;]+)/);
                        if (m != undefined) cfclear = m[1];else {
                            m = c.match(/cf_clearance=([^"]+)/);
                            if (m != undefined) cfclear = m[1];
                        }
                        if (!cfclear) continue;

                        this.headers['cookie'] = '__cfduid=' + cfuid + '; cf_clearance=' + cfclear;
                        this.headers['User-Agent'] = cookies[i].useragent;
                    }
                }
            } catch (e) {
                console.log('disdis', e, 'e');
            }
        }
    }

    _createClass(Dramacool, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, clang, detailUrl, h, htmlSearch, js, i, m;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type, clang = _movieInfo.clang;

                                if (!(clang == undefined || clang != 'kr')) {
                                    _context.next = 4;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 4:
                                detailUrl = false;
                                h = this.headers;

                                h['x-requested-with'] = 'XMLHttpRequest';
                                _context.next = 9;
                                return httpRequest.getHTML(URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+')), this.headers);

                            case 9:
                                htmlSearch = _context.sent;
                                js = JSON.parse(htmlSearch);
                                _context.t0 = regeneratorRuntime.keys(js);

                            case 12:
                                if ((_context.t1 = _context.t0()).done) {
                                    _context.next = 20;
                                    break;
                                }

                                i = _context.t1.value;
                                m = js[i];

                                if (!stringHelper.shallowCompare(title, m['name'])) {
                                    _context.next = 18;
                                    break;
                                }

                                detailUrl = URL.DOMAIN + m.url;
                                return _context.abrupt('break', 20);

                            case 18:
                                _context.next = 12;
                                break;

                            case 20:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 22:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function searchDetail() {
                return _ref.apply(this, arguments);
            }

            return searchDetail;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _libs2, httpRequest, cheerio, base64, _movieInfo2, title, year, season, episode, type, hosts, arrId, epiUrl, detailUrl, htmlDetail, urls, $;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrId = [];
                                epiUrl = false;
                                detailUrl = this.state.detailUrl;
                                _context2.next = 10;
                                return httpRequest.getHTML(detailUrl, this.headers);

                            case 10:
                                htmlDetail = _context2.sent;
                                urls = [];
                                $ = cheerio.load(htmlDetail);


                                $('.all-episode a').each(function () {
                                    var url = URL.DOMAIN + $(this).attr('href');
                                    var t = $(this).find('h3').text();
                                    var m = t.match(/Episode\s(\d+)/);
                                    if (m != undefined && episode == m[1]) epiUrl = url;
                                });

                                if (epiUrl) {
                                    _context2.next = 16;
                                    break;
                                }

                                throw new Error("NOT FOUND E");

                            case 16:
                                _context2.next = 18;
                                return httpRequest.getHTML(epiUrl);

                            case 18:
                                htmlDetail = _context2.sent;

                                $ = cheerio.load(htmlDetail);

                                $('li').each(function () {
                                    var url = $(this).attr('data-video');
                                    if (url == undefined) return;
                                    if (url.indexOf('//') === 0) url = 'https:' + url;
                                    hosts.push({
                                        provider: {
                                            url: detailUrl,
                                            name: "Dramacool"
                                        },
                                        result: {
                                            file: url,
                                            label: "embed",
                                            type: "embed"
                                        }
                                    });
                                });

                                this.state.hosts = hosts;

                                return _context2.abrupt('return');

                            case 23:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Dramacool;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, hosts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Dramacool({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });


                        if (movieInfo.type == 'movie') {
                            movieInfo.season = 0;movieInfo.episode = 0;
                        }

                        bodyPost = {
                            name_source: 'Dramacool',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        hosts = [];


                        if (movieInfo.checker != undefined) hosts = [];

                        if (!(hosts.length == 0)) {
                            _context3.next = 15;
                            break;
                        }

                        _context3.next = 9;
                        return source.searchDetail();

                    case 9:
                        _context3.next = 11;
                        return source.getHostFromDetail();

                    case 11:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context3.next = 14;
                            break;
                        }

                        return _context3.abrupt('return', hosts);

                    case 14:

                        if (hosts.length > 0) {
                            bodyPost['hosts'] = JSON.stringify(hosts);
                            bodyPost['expired'] = 86400;
                            //await httpRequest.post('https://getaz.morphtv.club/source/set', {}, bodyPost);
                        }

                    case 15:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }
                        return _context3.abrupt('return', hosts);

                    case 17:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
    };
}();

thisSource.testing = Dramacool;