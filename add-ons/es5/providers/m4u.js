

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "http://m4ufree.tv",
    SEARCH: function SEARCH(title) {
        return 'http://m4ufree.tv/search/' + title + '.html';
        //return `http://m4ufree.com/search/${title}-m4ufree.html`;
    },
    AJAX_URL: 'http://m4ufree.tv/ajax',
    AJAX_URL_TV: 'http://m4ufree.tv/ajaxtv',
    HEADERS: function HEADERS(ref) {
        return {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
            'X-Requested-With': 'XMLHttpRequest',
            'Referer': ref
        };
    },
    MAX_LINK: 25
};

var M4u = function () {
    function M4u(props) {
        _classCallCheck(this, M4u);

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

                        m = c.match(/XSRF-TOKEN=([^;]+)/);
                        var xsrf = m[1];

                        m = c.match(/laravel_session=(.*)/);
                        var lvsession = m[1];
                        this.headers['cookie'] = '__cfduid=' + cfuid + '; cf_clearance=' + cfclear + '; XSRF-TOKEN=' + xsrf + '; laravel_session=' + lvsession;
                        //this.headers['cookie'] = c;
                        //console.log(this.headers);
                        this.headers['User-Agent'] = cookies[i].useragent;
                    }
                }
            } catch (e) {
                console.log('disdis', e, 'e');
            }
        }
    }

    _createClass(M4u, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, urlSearch, htmlSearch, $, itemSearch, _headers, hhh, key, hHeader, i;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                urlSearch = '';


                                urlSearch = URL.SEARCH(stringHelper._replaceSpecialCharacter(title).replace(/\s+/g, '-'));

                                _context.next = 7;
                                return httpRequest.get(urlSearch, this.headers);

                            case 7:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch.data);
                                itemSearch = $('.item');


                                itemSearch.each(function () {

                                    var hrefM4u = $(this).find('a').attr('href');
                                    var h2 = $(this).find('a').attr('title');
                                    var titleM4u = h2.replace(' (' + year + ')', '');
                                    var f = h2.match(/\s\((\d+)\)/);
                                    var y = f != undefined ? f[1] : 200000;
                                    titleM4u = titleM4u.replace(/\s\(.*/g, '');

                                    if (stringHelper.shallowCompare(title, titleM4u) && year == y) {
                                        detailUrl = hrefM4u;
                                    } else if (stringHelper.shallowCompare(title, titleM4u) && type == 'tv') {
                                        detailUrl = hrefM4u;
                                    }
                                });

                                if (this.movieInfo.fixurl) {
                                    this.state.detailUrl = this.movieInfo.fixurl;
                                } else {
                                    if (detailUrl.indexOf('http://') != 0 && detailUrl.indexOf('https://') != 0) detailUrl = URL.DOMAIN + '/' + detailUrl;
                                    this.state.detailUrl = detailUrl;
                                }

                                _headers = htmlSearch.headers;
                                hhh = void 0;

                                for (key in _headers) {
                                    if (key == 'set-cookie') {
                                        hhh = _headers[key];
                                    }
                                }

                                console.log('m4u', hhh);
                                hHeader = [];

                                for (i in hhh) {
                                    if (hhh[i].indexOf('__cfduid') != -1 || hhh[i].indexOf('XSRF-TOKEN') != -1 || hhh[i].indexOf('laravel_session') != -1) hHeader.push(hhh[i].replace(/;.*$/, ''));
                                }

                                if (hHeader.length > 0) this.headers['cookie'] = this.headers['cookie'] != undefined ? this.headers['cookie'] + '; ' + hHeader.join('; ') : hHeader.join('; ');

                                return _context.abrupt('return');

                            case 20:
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
                var _libs2, httpRequest, cheerio, base64, _movieInfo2, title, type, season, episode, hosts, keys, detailUrl, url, htmlDetail, html, token, $_1, idepisode, poststv, $, item, headers, arrPromise;

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
                                url = detailUrl;

                                if (!(url.indexOf('http://') != 0 && url.indexOf('https://') != 0)) {
                                    _context3.next = 10;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 10:
                                _context3.next = 12;
                                return httpRequest.get(this.state.detailUrl, this.headers);

                            case 12:
                                htmlDetail = _context3.sent;
                                html = htmlDetail.data.match(/name="csrf-token" content="([^"]+)/);

                                if (!(html == null)) {
                                    _context3.next = 16;
                                    break;
                                }

                                throw new Error('NO_TOKEN');

                            case 16:
                                token = html[1];
                                $_1 = cheerio.load(htmlDetail.data);

                                if (!(type == 'tv')) {
                                    _context3.next = 27;
                                    break;
                                }

                                idepisode = void 0;

                                $_1('.episode').each(function () {
                                    var episode_name = $_1(this).text();
                                    var epi_r = episode_name.match(/S([0-9]+)-E([0-9]+)/i);
                                    var _season = +epi_r[1];
                                    var _episode = +epi_r[2];

                                    if (_season == season && _episode == episode) {
                                        idepisode = $_1(this).attr('idepisode');
                                    }
                                });

                                if (!(idepisode == null)) {
                                    _context3.next = 23;
                                    break;
                                }

                                throw new Error('NOT_FOUND_TV');

                            case 23:
                                //headers['cookie'] = cookies;
                                poststv = {
                                    _token: token,
                                    idepisode: idepisode
                                };
                                _context3.next = 26;
                                return httpRequest.post(URL.AJAX_URL_TV, this.headers, poststv);

                            case 26:
                                htmlDetail = _context3.sent;

                            case 27:
                                $ = cheerio.load(htmlDetail.data);
                                item = $('.le-server .singlemv');


                                item.each(function () {
                                    var links = $(this).attr('data');
                                    keys.push(links);
                                });

                                headers = {};
                                //headers['cookies'] = cookies;

                                headers = this.headers;

                                //keys = [keys[0]];

                                arrPromise = keys.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(links) {
                                        var htmlData, posts, html, f, linkEmbed, reUrl;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        htmlData = { data: '' };
                                                        _context2.prev = 1;
                                                        posts = { m4u: links, _token: token };
                                                        //headers['cookie'] = cookies;
                                                        //console.log(posts, headers);

                                                        _context2.next = 5;
                                                        return httpRequest.post(URL.AJAX_URL, headers, posts);

                                                    case 5:
                                                        htmlData = _context2.sent;
                                                        _context2.next = 11;
                                                        break;

                                                    case 8:
                                                        _context2.prev = 8;
                                                        _context2.t0 = _context2['catch'](1);

                                                        console.log('e', _context2.t0);

                                                    case 11:
                                                        html = htmlData.data;
                                                        //console.log(html, 'ff', htmlData, 'linkEmbed');

                                                        if (!(html == undefined)) {
                                                            _context2.next = 14;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return', false);

                                                    case 14:
                                                        f = html.match(/file":"([^"]+)/);

                                                        if (!(f != undefined)) {
                                                            _context2.next = 18;
                                                            break;
                                                        }

                                                        hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "m4ufree"
                                                            },
                                                            result: {
                                                                file: f[1].replace(/\\/g, ''),
                                                                label: "direct",
                                                                type: "direct"
                                                            }
                                                        });
                                                        return _context2.abrupt('return');

                                                    case 18:
                                                        linkEmbed = html.match(/src\=\"([^\"]+)/i);

                                                        linkEmbed = linkEmbed != null ? linkEmbed[1] : false;

                                                        if (linkEmbed) {
                                                            _context2.next = 22;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return', false);

                                                    case 22:
                                                        if (!(linkEmbed.indexOf('http://') != 0 && linkEmbed.indexOf('https://') != 0)) {
                                                            _context2.next = 24;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return', false);

                                                    case 24:
                                                        if (!(linkEmbed.search('them4ufree.com') != -1)) {
                                                            _context2.next = 28;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return', false);

                                                    case 28:
                                                        if (!(linkEmbed.search('openx.tv') != -1)) {
                                                            _context2.next = 35;
                                                            break;
                                                        }

                                                        _context2.next = 31;
                                                        return httpRequest.getRedirectUrl(linkEmbed, this.headers);

                                                    case 31:
                                                        reUrl = _context2.sent;

                                                        reUrl && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "m4ufree"
                                                            },
                                                            result: {
                                                                file: reUrl,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });
                                                        _context2.next = 36;
                                                        break;

                                                    case 35:
                                                        linkEmbed && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "m4ufree"
                                                            },
                                                            result: {
                                                                file: linkEmbed.replace('/preview', '/edit'),
                                                                label: "embed",
                                                                type: linkEmbed.indexOf('drive.google') != -1 ? "direct" : "embed"
                                                            }
                                                        });

                                                    case 36:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this, [[1, 8]]);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 35;
                                return Promise.all(arrPromise);

                            case 35:
                                //console.log(hosts, 'hostsm4u');
                                this.state.hosts = hosts;
                                return _context3.abrupt('return');

                            case 37:
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

    return M4u;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new M4u({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });


                        if (movieInfo.type == 'movie') {
                            movieInfo.season = 0;movieInfo.episode = 0;
                        }

                        bodyPost = {
                            name_source: 'M4uFree',
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

                        return _context4.abrupt('return', hosts);

                    case 18:
                        if (!(hosts.length > 0)) {
                            _context4.next = 23;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 3600;
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

thisSource.testing = M4u;