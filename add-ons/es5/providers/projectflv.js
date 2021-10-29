

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'https://eprojectfreetv.us/',
    SEARCH: function SEARCH(title) {
        return 'https://eprojectfreetv.us/?s=' + title;
    },
    EPISODE: function EPISODE(title, ss, ep) {
        return 'https://eprojectfreetv.us/episodes/' + title + '-' + ss + 'x' + ep + '/';
    },
    EMBED: 'https://eprojectfreetv.us/wp-admin/admin-ajax.php'
};

var Projectfreetv = function () {
    function Projectfreetv(props) {
        _classCallCheck(this, Projectfreetv);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.headers = {};
        this.state = {};
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

    _createClass(Projectfreetv, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, urlSearch, detailUrl, htmlSearch, $, itemSearch, htmlEpisode, $_2, itemSeason;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                detailUrl = false;
                                _context.next = 6;
                                return httpRequest.getHTML(urlSearch, {
                                    'referer': URL.DOMAIN,
                                    'user-agent': 'Firefox 59'
                                });

                            case 6:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);
                                itemSearch = $('.search-page .result-item');


                                itemSearch.each(function () {

                                    var hrefMovie = $(this).find('.image .thumbnail a').attr('href');
                                    var typeMovie = $(this).find('.image .thumbnail a span').text().trim().toLowerCase();
                                    var titleMovie = $(this).find('.details .title a').text();
                                    var yearMovie = $(this).find('.details .meta .year').text();
                                    titleMovie = titleMovie.replace(/\([0-9]+\)/i, '').trim();

                                    if (stringHelper.shallowCompare(title, titleMovie)) {

                                        if (type == 'movie' && typeMovie == 'movie') {

                                            if (+yearMovie == year) {

                                                detailUrl = hrefMovie;
                                            }
                                        } else if (type == 'tv' && typeMovie == 'tv') {

                                            detailUrl = URL.EPISODE(stringHelper.convertToSearchQueryString(title), season, episode);
                                        }
                                    }
                                });

                                if (!(type == 'tv' && detailUrl != false)) {
                                    _context.next = 17;
                                    break;
                                }

                                _context.next = 13;
                                return httpRequest.getHTML(detailUrl, {
                                    'referer': URL.DOMAIN,
                                    'user-agent': 'Firefox 59'
                                });

                            case 13:
                                htmlEpisode = _context.sent;
                                $_2 = cheerio.load(htmlEpisode);
                                itemSeason = $_2('#seasons .se-c');


                                itemSeason.each(function () {

                                    var seasonMovie = $_2(this).find('.se-q .se-t').text().trim();

                                    if (+seasonMovie == season) {

                                        var itemEpisode = $_2(this).find('.se-a .episodios li');

                                        itemEpisode.each(function () {

                                            var hrefEpisode = $_2(this).find('.episodiotitle a').first().attr('href');
                                            var episodeMovies = $_2(this).find('.episodiotitle a').first().text();
                                            episodeMovies = episodeMovies.match(/episode *([0-9]+)/i);
                                            episodeMovies = episodeMovies != null ? +episodeMovies[1] : -1;

                                            if (episodeMovies == episode) {
                                                detailUrl = hrefEpisode;
                                            }
                                        });
                                    }
                                });

                            case 17:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 19:
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

                var _libs2, httpRequest, cheerio, base64, detailUrl, hosts, htmlDetail, $, data, embeds, headersx, dataPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;

                                if (this.state.detailUrl) {
                                    _context3.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                detailUrl = this.state.detailUrl;
                                hosts = [];
                                _context3.next = 7;
                                return httpRequest.getHTML(this.state.detailUrl, {
                                    'referer': URL.DOMAIN,
                                    'user-agent': 'Firefox 59'
                                });

                            case 7:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);
                                data = [];
                                embeds = $('#playeroptionsul li');


                                embeds.each(function () {
                                    var t = $(this).attr('data-type');
                                    var dataPost = $(this).attr('data-post');
                                    var dataNume = $(this).attr('data-nume');
                                    if (isNaN(dataNume)) return;
                                    data.push({
                                        dpost: dataPost,
                                        dnume: dataNume,
                                        dType: t
                                    });
                                });

                                console.log(data);

                                headersx = this.headers;
                                dataPromise = data.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(d) {
                                        var posts, pHtml, m;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        posts = {
                                                            action: 'doo_player_ajax',
                                                            post: d.dpost,
                                                            nume: d.dnume,
                                                            type: d.dType
                                                        };
                                                        _context2.next = 3;
                                                        return httpRequest.post(URL.EMBED, headersx, posts);

                                                    case 3:
                                                        pHtml = _context2.sent;
                                                        m = pHtml.data.match(/src="([^"]+)/);

                                                        if (m != undefined) hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "Projectfreetv"
                                                            },
                                                            result: {
                                                                file: m[1],
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 6:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 17;
                                return Promise.all(dataPromise);

                            case 17:

                                this.state.hosts = hosts;

                            case 18:
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

    return Projectfreetv;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Projectfreetv({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });


                        if (movieInfo.type == 'movie') {
                            movieInfo.season = 0;movieInfo.episode = 0;
                        }

                        bodyPost = {
                            name_source: 'Projectfreetvtv',
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
                        bodyPost['expired'] = 86400;
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

    return function (_x2, _x3, _x4) {
        return _ref4.apply(this, arguments);
    };
}();

thisSource.testing = Projectfreetv;