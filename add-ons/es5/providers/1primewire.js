

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://ww1.1primewire.com",
    SEARCH: function SEARCH(title) {
        return 'https://ww1.1primewire.com/search/' + title;
    },
    LIST_SERVERS: function LIST_SERVERS(id, ep) {
        return 'https://ww1.1primewire.com/user/servers/' + id + '?ep=' + ep;
    },
    HEADERS: function HEADERS(referer) {
        return {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'referer': referer
        };
    }
};

var s1Primewire = function () {
    function s1Primewire(props) {
        _classCallCheck(this, s1Primewire);

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

    _createClass(s1Primewire, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type, detailUrl, videoUrl, urlSearch, htmlSearch, $;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                videoUrl = false;
                                urlSearch = URL.SEARCH(title.replace(/[\s:'-]+/, '+'));
                                _context.next = 7;
                                return httpRequest.getHTML(urlSearch, this.headers);

                            case 7:
                                htmlSearch = _context.sent;

                                htmlSearch = htmlSearch.replace(/data\-/g, 'data');
                                $ = cheerio.load(htmlSearch);

                                $('.pwNEmPzdmPUnugMnqHbxDAPLfrlaaw').each(function () {

                                    var titleMovie = $(this).find('a').attr('title');
                                    var yearMovie = $(this).attr('datayear');
                                    var href = URL.DOMAIN + $(this).find('a').attr('href');

                                    var titleMovieFull = titleMovie.replace(/\s-?\s+Season\s[0-9]+/i, '').trim();
                                    if (stringHelper.shallowCompare(title, titleMovieFull)) {
                                        if (type == 'movie' && year == yearMovie) {
                                            detailUrl = href;
                                        } else if (type == 'tv' && titleMovie.toLowerCase() == (title + ' - Season ' + season).toLowerCase()) {
                                            detailUrl = href;
                                        }
                                    }
                                });

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 13:
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
                var _libs2, httpRequest, cheerio, qs, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, html, reg, m, url, ss, sourcesPromise;

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

                                if (!(type == 'tv')) {
                                    _context3.next = 13;
                                    break;
                                }

                                _context3.next = 9;
                                return httpRequest.getHTML(detailUrl);

                            case 9:
                                html = _context3.sent;
                                reg = /url": "([^"]+)/g;
                                m = void 0;

                                while (m = reg.exec(html)) {
                                    url = m[1];

                                    m = url.match(/episode-(\d+)/);
                                    if (m != undefined && parseInt(m[1]) == episode) detailUrl = url;
                                }

                            case 13:
                                ss = ['server_2', 'server_4', 'server_6', 'mystream'];
                                sourcesPromise = ss.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(s) {
                                        var html, res;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.getHTML(detailUrl + '?server=' + s, {
                                                            'x-requested-with': 'XMLHttpRequest'
                                                        });

                                                    case 2:
                                                        html = _context2.sent;


                                                        try {
                                                            res = JSON.parse(html);

                                                            hosts.push({
                                                                provider: {
                                                                    url: detailUrl,
                                                                    name: "1primewire"
                                                                },
                                                                result: {
                                                                    file: res[0].file != undefined ? res[0].file : res.link,
                                                                    label: "embed",
                                                                    type: "embed"
                                                                }
                                                            });
                                                        } catch (e) {}

                                                    case 4:
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
                                _context3.next = 17;
                                return Promise.all(sourcesPromise);

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

    return s1Primewire;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new s1Primewire({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });


                        if (movieInfo.type == 'movie') {
                            movieInfo.season = 0;movieInfo.episode = 0;
                        }

                        bodyPost = {
                            name_source: '1primewire',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };

                        /*
                        let res = await httpRequest.post('https://getaz.morphtv.club/source/get', {}, bodyPost);
                        let js, hosts = [];
                          try {
                            res = res['data'];
                            if(res['status']) {
                                hosts = JSON.parse(res['hosts']);
                            }
                        } catch(err) {
                            console.log('err', err);
                        }
                        */

                        hosts = [];


                        if (movieInfo.checker != undefined) hosts = [];

                        if (!(hosts.length == 0)) {
                            _context4.next = 15;
                            break;
                        }

                        _context4.next = 9;
                        return source.searchDetail();

                    case 9:
                        _context4.next = 11;
                        return source.getHostFromDetail();

                    case 11:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context4.next = 14;
                            break;
                        }

                        return _context4.abrupt('return', hosts);

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
                        return _context4.abrupt('return', hosts);

                    case 17:
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

thisSource.testing = s1Primewire;