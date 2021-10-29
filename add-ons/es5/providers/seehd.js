

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: 'http://www.seehd.pl',
    SEARCH: function SEARCH(title) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


        if (page != false) {
            return 'http://www.seehd.pl/page/' + page + '/?s=' + title;
        }
        return 'http://www.seehd.pl/?s=' + title;
    },
    HEADERS: function HEADERS() {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'www.seehd.pl',
            'Referer': 'http://www.seehd.pl/',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
        };
    }
};

var Seehd = function () {
    function Seehd(props) {
        _classCallCheck(this, Seehd);

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
                        this.headers['user-agent'] = cookies[i].useragent;
                    }
                }
            } catch (e) {
                console.log('disdis', e, 'e');
            }
        }
    }

    _createClass(Seehd, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, urlSearch;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;


                                if (!!httpRequest.cookie) {
                                    httpRequest.cookie.clear();
                                }

                                _context.prev = 3;
                                urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'));
                                _context.next = 7;
                                return this.getDetailUrl(1, this.state);

                            case 7:
                                _context.next = 12;
                                break;

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](3);

                                console.log(String(_context.t0), 'error');
                                //process.exit();

                            case 12:
                                return _context.abrupt('return');

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 9]]);
            }));

            function searchDetail() {
                return _ref.apply(this, arguments);
            }

            return searchDetail;
        }()
    }, {
        key: 'getDetailUrl',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(page, state) {
                var _libs2, httpRequest, cheerio, stringHelper, base64, _movieInfo2, title, year, season, episode, type, arrNumber, i, headers, arrPromise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, stringHelper = _libs2.stringHelper, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;
                                arrNumber = [];


                                for (i = 1; i <= page; i++) {
                                    arrNumber.push(i);
                                }

                                //console.log(arrNumber, 'number');

                                headers = this.headers;
                                arrPromise = arrNumber.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var urlSearch, htmlSearch, $, itemPage;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        urlSearch = URL.SEARCH(stringHelper.convertToSearchQueryString(title, '+'), 1);

                                                        //console.log(urlSearch, '1');

                                                        console.log('seehs search', headers);
                                                        _context2.next = 4;
                                                        return httpRequest.getHTML(urlSearch, headers);

                                                    case 4:
                                                        htmlSearch = _context2.sent;
                                                        $ = cheerio.load(htmlSearch);
                                                        itemPage = $('.movie');


                                                        console.log('seehs search done', headers);
                                                        //console.log(itemPage.length, 'page');
                                                        itemPage.each(function () {

                                                            var hrefMovie = $(this).find('.post_thumb a').attr('href');
                                                            var titleMovie = $(this).find('a h2').text();
                                                            titleMovie = titleMovie.replace(/(\d+)?\s?Watch Online( Free)?/, '').trim();
                                                            var yearMovie = titleMovie.split(' ');

                                                            if (stringHelper.shallowCompare(title, titleMovie)) {

                                                                if (type == 'movie') {

                                                                    state.detailUrl = hrefMovie;
                                                                } else if (type == 'tv') {

                                                                    var seasonMovie = yearMovie.match(/S([0-9]+)/i);
                                                                    var episodeMovie = yearMovie.match(/E([0-9]+)/i);
                                                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : 0;
                                                                    episodeMovie = episodeMovie != null ? +episodeMovie[1] : 0;

                                                                    if (season == seasonMovie && episode == episodeMovie) {
                                                                        state.detailUrl = hrefMovie;
                                                                    }
                                                                }
                                                            }
                                                        });

                                                        if (!(val == page)) {
                                                            _context2.next = 11;
                                                            break;
                                                        }

                                                        return _context2.abrupt('return');

                                                    case 11:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this);
                                    }));

                                    return function (_x4) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 8;
                                return Promise.all(arrPromise);

                            case 8:
                                return _context3.abrupt('return');

                            case 9:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getDetailUrl(_x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return getDetailUrl;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var _this = this;

                var _libs3, httpRequest, cheerio, base64, _movieInfo3, title, year, season, episode, type, hosts, arrEmbed, detailUrl, htmlDetail, $, itemEmbed, headers, arrPromise;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _libs3 = this.libs, httpRequest = _libs3.httpRequest, cheerio = _libs3.cheerio, base64 = _libs3.base64;
                                _movieInfo3 = this.movieInfo, title = _movieInfo3.title, year = _movieInfo3.year, season = _movieInfo3.season, episode = _movieInfo3.episode, type = _movieInfo3.type;

                                if (this.state.detailUrl) {
                                    _context5.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                arrEmbed = [];
                                detailUrl = this.state.detailUrl;


                                console.log('seehd', this.state.detailUrl, this.headers);
                                _context5.next = 10;
                                return httpRequest.getHTML(this.state.detailUrl, this.headers);

                            case 10:
                                htmlDetail = _context5.sent;
                                $ = cheerio.load(htmlDetail);

                                if (!(type == 'movie')) {
                                    _context5.next = 15;
                                    break;
                                }

                                if (!($('.entry-content').text().indexOf(' ' + year) == -1)) {
                                    _context5.next = 15;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 15:
                                itemEmbed = $('.tabcontent');


                                itemEmbed.each(function () {

                                    var linkEmbed = $(this).find('center > iframe').attr('src');

                                    if (linkEmbed) {
                                        arrEmbed.push(linkEmbed);
                                    }
                                });

                                headers = this.headers;
                                arrPromise = arrEmbed.map(function () {
                                    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(val) {
                                        var htmlEmbed, $_3, iframe;
                                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                            while (1) {
                                                switch (_context4.prev = _context4.next) {
                                                    case 0:
                                                        if (!(val.indexOf('seehd.pl/d') != -1)) {
                                                            _context4.next = 10;
                                                            break;
                                                        }

                                                        _context4.next = 3;
                                                        return httpRequest.getHTML(val, headers);

                                                    case 3:
                                                        htmlEmbed = _context4.sent;
                                                        $_3 = cheerio.load(htmlEmbed);
                                                        iframe = $_3('iframe').attr('src');


                                                        if (iframe && iframe.indexOf('ok.ru') != -1) {
                                                            iframe = 'https:' + iframe;
                                                        }

                                                        iframe && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "seehd"
                                                            },
                                                            result: {
                                                                file: iframe,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });
                                                        _context4.next = 11;
                                                        break;

                                                    case 10:
                                                        val && hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "seehd"
                                                            },
                                                            result: {
                                                                file: val,
                                                                label: "embed",
                                                                type: "embed"
                                                            }
                                                        });

                                                    case 11:
                                                    case 'end':
                                                        return _context4.stop();
                                                }
                                            }
                                        }, _callee4, _this);
                                    }));

                                    return function (_x5) {
                                        return _ref5.apply(this, arguments);
                                    };
                                }());
                                _context5.next = 21;
                                return Promise.all(arrPromise);

                            case 21:

                                this.state.hosts = hosts;

                            case 22:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function getHostFromDetail() {
                return _ref4.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Seehd;
}();

thisSource.function = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, hosts;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Seehd({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });


                        if (movieInfo.type == 'movie') {
                            movieInfo.season = 0;movieInfo.episode = 0;
                        }

                        bodyPost = {
                            name_source: 'Seehd',
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
                            _context6.next = 15;
                            break;
                        }

                        _context6.next = 9;
                        return source.searchDetail();

                    case 9:
                        _context6.next = 11;
                        return source.getHostFromDetail();

                    case 11:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context6.next = 14;
                            break;
                        }

                        return _context6.abrupt('return', hosts);

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
                        return _context6.abrupt('return', hosts);

                    case 17:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x6, _x7, _x8) {
        return _ref6.apply(this, arguments);
    };
}();

thisSource.testing = Seehd;