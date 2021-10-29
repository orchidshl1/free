

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://newepisodes.co/",
    EMBED: function EMBED(id) {
        return "https://newepisodes.co/embed/" + id;
    },
    SEARCH: "https://newepisodes.co/search.js",
    HEADERS: function HEADERS(ref) {
        return {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
            'X-Requested-With': 'XMLHttpRequest',
            'Referer': ref
        };
    }
};

var Newepisodes = function () {
    function Newepisodes(props) {
        _classCallCheck(this, Newepisodes);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
        this.agent = '';

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

                        this.headers['cookie'] = "__cfduid=" + cfuid + "; cf_clearance=" + cfclear;
                        this.headers['cookie'] = c;
                        this.headers['User-Agent'] = cookies[i].useragent;
                    }
                }
            } catch (e) {
                console.log('disdis', e, 'e');
            }
        }
    }

    _createClass(Newepisodes, [{
        key: "searchDetail",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, agents, urlSearch, searchHtml, detailUrl, js, posts, i, p;

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

                                if (this.headers.cookie == undefined) this.headers['User-Agent'] = this.agent;

                                urlSearch = URL.SEARCH;
                                _context.next = 11;
                                return httpRequest.getHTML(urlSearch, this.headers);

                            case 11:
                                searchHtml = _context.sent;
                                detailUrl = void 0;


                                searchHtml = searchHtml.trim().replace('var tipuedrop = ', '');
                                searchHtml = searchHtml.replace(/;$/, '');
                                js = JSON.parse(searchHtml);
                                posts = js.pages;

                                for (i = 0; i < posts.length; i++) {
                                    p = posts[i];

                                    if (stringHelper.shallowCompare(title, p.title)) detailUrl = p.url;
                                }

                                if (detailUrl.indexOf('https:') == -1) detailUrl = 'https:' + detailUrl;

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt("return");

                            case 21:
                            case "end":
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
        key: "getHostFromDetail",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _libs2, httpRequest, cheerio, base64, _movieInfo2, title, type, season, episode, hosts, keys, detailUrl, htmlDetail, $, servers, sources, episodeUrl, ids, agent, headers, idsPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, type = _movieInfo2.type, season = _movieInfo2.season, episode = _movieInfo2.episode;

                                if (this.state.detailUrl) {
                                    _context3.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                keys = [];
                                detailUrl = this.state.detailUrl;
                                _context3.next = 9;
                                return httpRequest.getHTML(this.state.detailUrl, this.headers);

                            case 9:
                                htmlDetail = _context3.sent;
                                $ = cheerio.load(htmlDetail);
                                servers = $('.episodes .list-item');
                                sources = [];
                                episodeUrl = false;


                                servers.each(function () {
                                    var className = $(this).attr('class');
                                    var m = className.match(/season_(\d+)/);
                                    if (m[1] == season) {
                                        var epiUrl = $(this).find('a').attr('href');
                                        m = epiUrl.match(/episode-(\d+)/);
                                        if (m[1] == episode) episodeUrl = epiUrl;
                                    }
                                });

                                if (episodeUrl) {
                                    _context3.next = 17;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 17:
                                if (episodeUrl.indexOf('http:') == -1) episodeUrl = 'http:' + episodeUrl;

                                _context3.next = 20;
                                return httpRequest.getHTML(episodeUrl, this.headers);

                            case 20:
                                htmlDetail = _context3.sent;

                                $ = cheerio.load(htmlDetail);

                                ids = [];

                                $('.playlist_inner .playlist_entry').each(function () {
                                    var name = $(this).find('a').text();
                                    name = name.replace('>', '').replace(/\d+\.\s/g, '');
                                    if (['openload.co', 'vidoza.net', 'vidtodo.com', 'streamango.com', 'www.rapidvideo.com', 'rapidvideo.com', 'vshare.eu'].includes(name)) ids.push($(this).attr('id'));
                                });

                                agent = this.agent;
                                headers = this.headers;
                                idsPromise = ids.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
                                        var idHtml, $;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return httpRequest.post(URL.DOMAIN + 'api', headers, {
                                                            id: id,
                                                            d: 'embed'
                                                        });

                                                    case 2:
                                                        idHtml = _context2.sent;
                                                        $ = cheerio.load(idHtml.data);

                                                        hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "Newepisodes"
                                                            },
                                                            result: {
                                                                file: $('iframe').attr('src'),
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 5:
                                                    case "end":
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 29;
                                return Promise.all(idsPromise);

                            case 29:

                                this.state.hosts = hosts;
                                return _context3.abrupt("return");

                            case 31:
                            case "end":
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

    return Newepisodes;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Newepisodes({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });


                        if (movieInfo.type == 'movie') {
                            movieInfo.season = 0;movieInfo.episode = 0;
                        }

                        bodyPost = {
                            name_source: 'Newepisodes',
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

                        return _context4.abrupt("return", hosts);

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
                        return _context4.abrupt("return", hosts);

                    case 25:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x2, _x3, _x4) {
        return _ref4.apply(this, arguments);
    };
}();

thisSource.testing = Newepisodes;