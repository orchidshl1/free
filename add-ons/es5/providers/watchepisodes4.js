

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://www.watchepisodes4.com',
    SEARCH: function SEARCH(title) {
        return 'http://www.watchepisodes4.com/search/ajax_search?q=' + title;
    }
};

var getDomain = function getDomain(url) {
    var m = url.match(/\/\/([^\/]+)/);
    if (m == null) return 'xyzzyx.com';
    return m[1] != undefined ? m[1] : 'xyzzyx.com';
};

var WatchEpisode = function () {
    function WatchEpisode(props) {
        _classCallCheck(this, WatchEpisode);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
        this.agent = '';
        this.headers = {};
    }

    _createClass(WatchEpisode, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, agents, detailUrl, detailSeason, urlSearch, jsonSearch, item, slug, titleMovie, htmlSeason, $, itemSeason;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                _context.next = 4;
                                return httpRequest.getHTML('https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt');

                            case 4:
                                agents = _context.sent;

                                agents = agents.split("\n");
                                this.agent = agents[Math.floor(Math.random() * agents.length)];
                                this.headers['User-Agent'] = this.agent;

                                detailUrl = false;
                                detailSeason = false;
                                urlSearch = URL.SEARCH(title.replace(/[\s]/, '+'));
                                _context.next = 13;
                                return httpRequest.get(urlSearch, this.headers);

                            case 13:
                                jsonSearch = _context.sent;

                                jsonSearch = jsonSearch.data;

                                if (!jsonSearch.series) {
                                    _context.next = 26;
                                    break;
                                }

                                _context.t0 = regeneratorRuntime.keys(jsonSearch.series);

                            case 17:
                                if ((_context.t1 = _context.t0()).done) {
                                    _context.next = 26;
                                    break;
                                }

                                item = _context.t1.value;
                                slug = jsonSearch.series[item].seo;
                                titleMovie = jsonSearch.series[item].label;

                                if (!stringHelper.shallowCompare(title, titleMovie)) {
                                    _context.next = 24;
                                    break;
                                }

                                detailSeason = URL.DOMAIN + '/' + slug;
                                return _context.abrupt('break', 26);

                            case 24:
                                _context.next = 17;
                                break;

                            case 26:
                                if (!(detailSeason != false && type == 'tv')) {
                                    _context.next = 33;
                                    break;
                                }

                                _context.next = 29;
                                return httpRequest.getHTML(detailSeason, this.headers);

                            case 29:
                                htmlSeason = _context.sent;
                                $ = cheerio.load(htmlSeason);
                                itemSeason = $('.el-item ');


                                itemSeason.each(function () {

                                    var hrefMovie = $(this).find('a').attr('href');
                                    var seasonMovie = $(this).find('.season').text().replace(/season */i, '').trim();
                                    var episodeMovie = $(this).find('.episode').text().replace(/episode */i, '').trim();
                                    seasonMovie = +seasonMovie;
                                    episodeMovie = +episodeMovie;

                                    if (seasonMovie == season && episodeMovie == episode) {

                                        detailUrl = hrefMovie;
                                    }
                                });

                            case 33:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 35:
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
                var _libs2, httpRequest, cheerio, base64, _, hosts, detailUrl, htmlEpisode, $, itemEmbed;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64, _ = _libs2._;

                                if (this.state.detailUrl) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                _context2.next = 7;
                                return httpRequest.getHTML(this.state.detailUrl, this.headers);

                            case 7:
                                htmlEpisode = _context2.sent;
                                $ = cheerio.load(htmlEpisode);
                                itemEmbed = $('.ldr-item');


                                itemEmbed.each(function () {

                                    var linkEmbed = $(this).find('.watch-button').attr('data-actuallink');

                                    if (linkEmbed.indexOf('https://') != -1 || linkEmbed.indexOf('http://') != -1) {

                                        var hosts_allowed = ['onlystream.tv', 'mixdrop.co', 'vidlox.me', 'vidoza.net', 'vshare.eu', 'clipwatching.com', 'vidtodo.com', 'highstream.tv', 'wolfstream.tv'];

                                        if (hosts_allowed.includes(getDomain(linkEmbed))) {

                                            linkEmbed && hosts.push({
                                                provider: {
                                                    url: detailUrl,
                                                    name: "episode4"
                                                },
                                                result: {
                                                    file: linkEmbed,
                                                    label: "embed",
                                                    type: "embed"
                                                }
                                            });
                                        }
                                    }
                                });

                                //hosts = _.dropRight(hosts, hosts.length - 100);

                                this.state.hosts = hosts;

                            case 12:
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

    return WatchEpisode;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new WatchEpisode({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });


                        if (movieInfo.type == 'movie') {
                            movieInfo.season = 0;movieInfo.episode = 0;
                        }

                        bodyPost = {
                            name_source: 'WatchEpisode',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        _context3.next = 6;
                        return httpRequest.post('https://getaz.morphtv.club/source/get', {}, bodyPost);

                    case 6:
                        res = _context3.sent;
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
                            _context3.next = 23;
                            break;
                        }

                        _context3.next = 13;
                        return source.searchDetail();

                    case 13:
                        _context3.next = 15;
                        return source.getHostFromDetail();

                    case 15:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context3.next = 18;
                            break;
                        }

                        return _context3.abrupt('return', hosts);

                    case 18:
                        if (!(hosts.length > 0)) {
                            _context3.next = 23;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 86400;
                        _context3.next = 23;
                        return httpRequest.post('https://getaz.morphtv.club/source/set', {}, bodyPost);

                    case 23:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }
                        return _context3.abrupt('return', hosts);

                    case 25:
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

thisSource.testing = WatchEpisode;