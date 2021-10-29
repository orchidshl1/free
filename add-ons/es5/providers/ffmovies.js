

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://ffmovies.ws",
    SEARCH: function SEARCH(title) {
        return 'https://ffmovies.ws/search/' + title + '/movies/1';
    },
    SERVER_URL: function SERVER_URL(id) {
        return 'https://fmovies.world/ajax/film/servers?id=' + id;
    },
    PLAYER_URL: function PLAYER_URL(server_id) {
        return 'https://fmovies.world/ajax/episode/info?id=' + server_id;
    },
    HEADERS: function HEADERS(referer) {
        return {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'referer': referer
        };
    }
};

var Ffmovies = function () {
    function Ffmovies(props) {
        _classCallCheck(this, Ffmovies);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Ffmovies, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, detailUrl, videoUrl, urlSearch, htmlSearch, html, $;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                videoUrl = false;
                                urlSearch = URL.SEARCH(encodeURI(title));
                                _context.next = 7;
                                return httpRequest.getHTML(urlSearch);

                            case 7:
                                htmlSearch = _context.sent;
                                html = htmlSearch;
                                $ = cheerio.load(html);

                                $('.poster_content-list__11G1q .poster_poster__2Tnqo').each(function () {

                                    var titleMovie = $(this).find('a p').text().trim();

                                    var t = titleMovie.match(/ - Season (\d+)/);

                                    var ss = t != undefined ? t[1] : 1000;
                                    titleMovie = titleMovie.replace(/ - Season (\d+)/, '').trim();

                                    var hrefMovie = $(this).find('a').attr('href');
                                    var yearMovie = $(this).find('.poster_release__31qZF').text().trim();

                                    //console.log(titleMovie, title);
                                    if (stringHelper.shallowCompare(title, titleMovie)) {
                                        if (type == 'movie' && yearMovie.indexOf(year) != -1) {
                                            detailUrl = hrefMovie;
                                        } else if (type == 'tv' && season == ss) {
                                            detailUrl = hrefMovie;
                                        }
                                    }
                                });

                                if (detailUrl.indexOf('http') == -1) detailUrl = URL.DOMAIN + detailUrl;

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 14:
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
                var _libs2, httpRequest, cheerio, qs, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, eHash, eHtml, html, newHash, i, ep, embeds, ids, sourcesPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context3.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                detailUrl = this.state.detailUrl;
                                eHash = detailUrl.split('/')[4];
                                _context3.next = 9;
                                return httpRequest.getHTML('https://api.ffmovies.ws/contents/episodes?hash=' + eHash + '&site=72db0c');

                            case 9:
                                eHtml = _context3.sent;
                                html = JSON.parse(eHtml);
                                newHash = false;


                                if (type == 'tv') {
                                    for (i = 0; i < html['episodes'].length; i++) {
                                        ep = html['episodes'][i].name;

                                        if (parseInt(ep) == episode) {
                                            newHash = html['episodes'][i].episode_hash;
                                        }
                                    }
                                } else {
                                    newHash = html['episodes'][0].episode_hash;
                                }

                                if (newHash) {
                                    _context3.next = 15;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 15:
                                _context3.next = 17;
                                return httpRequest.getHTML('https://api.ffmovies.ws/episodes/embeds?hash=' + newHash);

                            case 17:
                                embeds = _context3.sent;
                                ids = [];

                                embeds = JSON.parse(embeds);

                                for (i = 0; i < embeds['embeds'].length; i++) {
                                    ids.push(embeds['embeds'][i].hash);
                                }sourcesPromise = ids.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
                                        var fHtml;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.getHTML('https://api.ffmovies.ws/embed?hash=' + id);

                                                    case 2:
                                                        fHtml = _context2.sent;


                                                        try {
                                                            fHtml = JSON.parse(fHtml);
                                                        } catch (e) {}

                                                        hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "ffmovies"
                                                            },
                                                            result: {
                                                                file: fHtml.url,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 5:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 24;
                                return Promise.all(sourcesPromise);

                            case 24:

                                this.state.hosts = hosts;

                            case 25:
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

    return Ffmovies;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Ffmovies({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });


                        if (movieInfo.type == 'movie') {
                            movieInfo.season = 0;movieInfo.episode = 0;
                        }

                        bodyPost = {
                            name_source: 'Ffmovies',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        _context4.next = 6;
                        return httpRequest.post('http://localhost:3001/source/get', {}, bodyPost);

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
                        //let hosts = [];

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
                        return httpRequest.post('http://localhost:3001/source/set', {}, bodyPost);

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

thisSource.testing = Ffmovies;