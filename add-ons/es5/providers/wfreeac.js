

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://www4.watchfree.ac/",
    SEARCH: function SEARCH(title) {
        return 'https://www4.watchfree.ac/search/' + title + '.html';
    },
    HASH_URL: 'https://www4.watchfree.ac/ip.file/swf/plugins/ipplugins.php',
    PLAYER_URL: function PLAYER_URL(key, server_id) {
        return 'https://www4.watchfree.ac/ip.file/swf/ipplayer/ipplayer.php?u=' + key + '&s=' + server_id + '&n=0';
    },
    LAST_URL: function LAST_URL(hash) {
        return 'https://fix.db1k.com/?hash=' + hash;
    },
    HEADERS: function HEADERS(referer) {
        return {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'referer': referer
        };
    }
};

var s123MoviesFree = function () {
    function s123MoviesFree(props) {
        _classCallCheck(this, s123MoviesFree);

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
                        this.headers['User-Agent'] = cookies[i].useragent;
                    }
                }
            } catch (e) {
                console.log('disdis', e, 'e');
            }
        }
    }

    _createClass(s123MoviesFree, [{
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
                                urlSearch = URL.SEARCH(encodeURI(title));
                                _context.next = 7;
                                return httpRequest.getHTML(urlSearch, this.headers);

                            case 7:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch);

                                $('body .item a').each(function () {

                                    var titleMovie = $(this).find('span').text();
                                    var hrefMovie = $(this).attr('href');

                                    var titleMovieFull = titleMovie.replace(/\s+Season\s+[0-9]+/i, '').trim();
                                    if (stringHelper.shallowCompare(title, titleMovieFull)) {
                                        if (type == 'movie' && hrefMovie.indexOf(year) != -1) {
                                            detailUrl = hrefMovie;
                                        } else if (type == 'tv') {
                                            var m = titleMovie.match(/\s+Season\s+([0-9])+/i);
                                            if (m != undefined && parseInt(m[1]) == season) {
                                                detailUrl = hrefMovie;
                                            }
                                        }
                                    }
                                });

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 12:
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
                var _libs2, httpRequest, cheerio, qs, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, htmlDetail, $, m, new_url, servers, sources, headers, sourcesPromise;

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
                                _context3.next = 8;
                                return httpRequest.getHTML(this.state.detailUrl, this.headers);

                            case 8:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);

                                if (!(type == 'tv')) {
                                    _context3.next = 20;
                                    break;
                                }

                                m = htmlDetail.match(/name="epname" value="([^"]+)/);

                                if (!(m != undefined && m[1] != episode)) {
                                    _context3.next = 20;
                                    break;
                                }

                                new_url = false;

                                $('#ip_episode a').each(function () {
                                    var ep = $(this).attr('data-name');
                                    if (ep == episode) {
                                        new_url = $(this).attr('href');
                                        return;
                                    }
                                });

                                if (!new_url) {
                                    _context3.next = 20;
                                    break;
                                }

                                _context3.next = 18;
                                return httpRequest.getHTML(new_url, this.headers);

                            case 18:
                                htmlDetail = _context3.sent;

                                $ = cheerio.load(htmlDetail);

                            case 20:
                                servers = $('#servers-list li a');
                                sources = [];


                                servers.each(function () {
                                    var server_id = $(this).attr('data-server');
                                    var phim_id = $(this).attr('data-film');
                                    var episode = $(this).attr('data-name');

                                    sources.push({
                                        'ipplugins': 1,
                                        'ip_film': phim_id,
                                        'ip_server': server_id,
                                        'ip_name': episode,
                                        'fix': 0
                                    });
                                });

                                headers = this.headers;
                                sourcesPromise = sources.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(source) {
                                        var hash, hashKey, playHtml, hashUrl, fff, last_u;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        hash = void 0;
                                                        _context2.prev = 1;
                                                        _context2.next = 4;
                                                        return httpRequest.post(URL.HASH_URL, headers, source);

                                                    case 4:
                                                        hash = _context2.sent;
                                                        _context2.next = 11;
                                                        break;

                                                    case 7:
                                                        _context2.prev = 7;
                                                        _context2.t0 = _context2['catch'](1);

                                                        console.log('123moviesfree, hash, json error', _context2.t0);
                                                        hash = { data: { s: '1' } };

                                                    case 11:
                                                        hashKey = hash.data.s;
                                                        _context2.next = 14;
                                                        return httpRequest.getHTML(URL.PLAYER_URL(hashKey, source.server_id), headers);

                                                    case 14:
                                                        playHtml = _context2.sent;

                                                        try {
                                                            playHtml = JSON.parse(playHtml);
                                                        } catch (e) {
                                                            console.log('123moviesfree, source, json error', e);
                                                            playHtml = { data: false };
                                                        }

                                                        hash = playHtml.hash;

                                                        if (!(hash == null)) {
                                                            _context2.next = 19;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return');

                                                    case 19:
                                                        hashUrl = URL.LAST_URL(hash);
                                                        _context2.next = 22;
                                                        return httpRequest.getHTML(hashUrl);

                                                    case 22:
                                                        fff = _context2.sent;


                                                        playHtml = JSON.parse(fff);

                                                        last_u = playHtml.embed;

                                                        if (last_u.indexOf('//') == 0) last_u = 'https:' + last_u;
                                                        hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "watchfree"
                                                            },
                                                            result: {
                                                                file: last_u,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 27:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this, [[1, 7]]);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 27;
                                return Promise.all(sourcesPromise);

                            case 27:

                                this.state.hosts = hosts;

                            case 28:
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

    return s123MoviesFree;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new s123MoviesFree({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'watchfree',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        _context4.next = 5;
                        return httpRequest.post('https://getaz.morphtv.club/source/get', {}, bodyPost);

                    case 5:
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
                            _context4.next = 22;
                            break;
                        }

                        _context4.next = 12;
                        return source.searchDetail();

                    case 12:
                        _context4.next = 14;
                        return source.getHostFromDetail();

                    case 14:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context4.next = 17;
                            break;
                        }

                        return _context4.abrupt('return', hosts);

                    case 17:
                        if (!(hosts.length > 0)) {
                            _context4.next = 22;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 10800;
                        _context4.next = 22;
                        return httpRequest.post('https://getaz.morphtv.club/source/set', {}, bodyPost);

                    case 22:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }
                        return _context4.abrupt('return', hosts);

                    case 24:
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

thisSource.testing = s123MoviesFree;