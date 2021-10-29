

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {

    DOMAIN: "https://5movies.to",
    SEARCH: function SEARCH(title) {
        return 'https://5movies.to/search.php?q=' + title;
    },
    GET_LINK_EMBED: function GET_LINK_EMBED(lk) {
        return 'https://5movies.to/getlink.php?Action=get&lk=' + lk;
    },
    HEADERS: function HEADERS() {
        var refer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var cookie = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        return {
            'Proxy-Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Referer': 'https://5movies.to/'
        };
    },
    BING_SEARCH: function BING_SEARCH(title) {
        return 'https://www.bing.com/search?q=site%3A5movies.to+' + title;
    }
};

var ThreeMovies = function () {
    function ThreeMovies(props) {
        _classCallCheck(this, ThreeMovies);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
        this.headers = {};

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
                        this.headers['cookie'] = c;
                        this.headers['User-Agent'] = cookies[i].useragent;
                    }
                }
            } catch (e) {
                console.log('disdis', e, 'e');
            }
        }
    }

    _createClass(ThreeMovies, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, cryptoJs, qs, _movieInfo, title, year, season, episode, type, detailUrl, tvshowVideo, urlSearch, htmlSearch, $, htmlVideo, $_2, itemEpisode;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, cryptoJs = _libs.cryptoJs, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                tvshowVideo = false;
                                urlSearch = '';

                                if (type == 'tv') {
                                    urlSearch = URL.SEARCH(encodeURI(title));
                                } else {
                                    urlSearch = URL.SEARCH(encodeURI(title));
                                }
                                _context.next = 8;
                                return httpRequest.getHTML(urlSearch, this.headers);

                            case 8:
                                htmlSearch = _context.sent;

                                //let headers = htmlSearch.headers;

                                //let setCookie = headers['set-cookie'];

                                //htmlSearch = await httpRequest.post(urlSearch, URL.HEADERS(urlSearch), URL.BODY_SEARCH);

                                $ = cheerio.load(htmlSearch);

                                $('.movie-list .ml-img').each(function () {
                                    var a = $(this).find('a').attr('href');
                                    a = a.indexOf('http') === 0 ? a : 'https:' + a;
                                    var alt = $(this).find('img').attr('alt');
                                    if (type == 'tv' && stringHelper.shallowCompare(alt.replace(/\s+\(\d+\)/g, ''), title)) detailUrl = a;else if (alt.toLowerCase() == (title + ' (' + year + ')').toLowerCase()) detailUrl = a;
                                });

                                if (!(type == 'tv' && detailUrl != false)) {
                                    _context.next = 18;
                                    break;
                                }

                                _context.next = 14;
                                return httpRequest.getHTML(detailUrl);

                            case 14:
                                htmlVideo = _context.sent;
                                $_2 = cheerio.load(htmlVideo);
                                itemEpisode = $_2('.Season a');


                                itemEpisode.each(function () {
                                    var hrefEpisode = $(this).attr('href');

                                    if (hrefEpisode.indexOf('http') == -1 && hrefEpisode.indexOf('https') == -1) {
                                        hrefEpisode = 'http:' + hrefEpisode;
                                    }

                                    var seasonMovie = hrefEpisode.match(/\-s([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? seasonMovie[1] : -1;
                                    var episodeMovie = hrefEpisode.match(/\-s[0-9]+e([0-9]+)/i);
                                    episodeMovie = episodeMovie != null ? episodeMovie[1] : -1;

                                    if (seasonMovie == season && episodeMovie == episode) {
                                        detailUrl = hrefEpisode;
                                    }
                                });

                            case 18:

                                console.log(detailUrl);
                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 21:
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _this = this;

                var _libs2, httpRequest, cheerio, base64, _, arr_lk, hosts, detailUrl, htmlDetail, $, itemLk, arr_promise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64, _ = _libs2._;

                                if (this.state.detailUrl) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                arr_lk = [];
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                _context3.next = 8;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 8:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);
                                itemLk = $('.links ul');


                                itemLk.each(function () {
                                    var hrefLk = $(this).find('.link-button').html();
                                    var hostName = $(this).find('.link-name').text().trim();
                                    var m = hrefLk.match(/lk=([^"]+)/);
                                    if (m != undefined) {
                                        arr_lk.push(m[1]);
                                    }
                                });

                                arr_promise = arr_lk.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var hrefEmbed, m;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.prev = 0;
                                                        _context2.next = 3;
                                                        return httpRequest.post(URL.GET_LINK_EMBED(val), {}, {});

                                                    case 3:
                                                        hrefEmbed = _context2.sent;

                                                        hrefEmbed = hrefEmbed.data;

                                                        if (hrefEmbed.indexOf('http') == -1 && hrefEmbed.indexOf('https') == -1) {
                                                            hrefEmbed = 'http:' + hrefEmbed;
                                                        }

                                                        m = hrefEmbed.match(/href='([^']+)/);

                                                        if (m != undefined) {
                                                            hrefEmbed = m[1].indexOf('//') == 0 ? 'https:' + m[1] : m[1];
                                                        }

                                                        hrefEmbed && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "Movie25V2"
                                                            },
                                                            result: {
                                                                file: hrefEmbed,
                                                                label: "embed",
                                                                type: 'embed'
                                                            }
                                                        });
                                                        _context2.next = 13;
                                                        break;

                                                    case 11:
                                                        _context2.prev = 11;
                                                        _context2.t0 = _context2['catch'](0);

                                                    case 13:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this, [[0, 11]]);
                                    }));

                                    return function (_x3) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 15;
                                return Promise.all(arr_promise);

                            case 15:
                                this.state.hosts = hosts;
                                return _context3.abrupt('return');

                            case 17:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return ThreeMovies;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new ThreeMovies({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });


                        if (movieInfo.type == 'movie') {
                            movieInfo.season = 0;movieInfo.episode = 0;
                        }

                        bodyPost = {
                            name_source: '5moviesx1',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        _context4.next = 6;
                        return httpRequest.post('https://getaz.morphtv.club/source/get', {}, bodyPost);

                    case 6:
                        res = _context4.sent;
                        js = void 0, hosts = [];


                        try {
                            res = res['data'];
                            if (res['status']) {
                                hosts = JSON.parse(res['hosts']);
                            }
                        } catch (err) {
                            console.log('err', err);
                        }

                        if (movieInfo.checker != undefined) hosts = [];

                        if (!(hosts.length == 0)) {
                            _context4.next = 23;
                            break;
                        }

                        _context4.next = 13;
                        return source.searchDetail();

                    case 13:
                        _context4.next = 15;
                        return source.getHostFromDetail();

                    case 15:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context4.next = 18;
                            break;
                        }

                        return _context4.abrupt('return', hosts);

                    case 18:
                        if (!(hosts.length > 0)) {
                            _context4.next = 23;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 7200;
                        _context4.next = 23;
                        return httpRequest.post('https://getaz.morphtv.club/source/set', {}, bodyPost);

                    case 23:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }
                        return _context4.abrupt('return', hosts);

                    case 25:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x4, _x5, _x6) {
        return _ref4.apply(this, arguments);
    };
}();

thisSource.testing = ThreeMovies;