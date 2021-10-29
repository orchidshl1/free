

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://vidembed.cc",
    SEARCH: function SEARCH(title) {
        return 'https://vidembed.cc/search.html?keyword=' + title;
    },
    HEADERS: function HEADERS(ref) {
        return {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
            'X-Requested-With': 'XMLHttpRequest'
        };
    },
    MAX_LINK: 25
};

var Vidembedcc = function () {
    function Vidembedcc(props) {
        _classCallCheck(this, Vidembedcc);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
        this.headers = {};
    }

    _createClass(Vidembedcc, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, urlSearch, htmlSearch, $, item;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                urlSearch = '';


                                urlSearch = URL.SEARCH(encodeURI(title));
                                _context.next = 7;
                                return httpRequest.get(urlSearch, this.headers);

                            case 7:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch.data);
                                item = $('.video-block');

                                item.each(function () {

                                    var hrefMovie = $(this).find('a').attr('href');
                                    var titleMovie = $(this).find('.name').text();
                                    var arrtitle = titleMovie.trim().split(' - ');
                                    if (type == 'movie' && stringHelper.shallowCompare(title, arrtitle[0])) {
                                        detailUrl = URL.DOMAIN + hrefMovie;
                                    }

                                    if (type == 'tv' && stringHelper.shallowCompare(title, arrtitle[0])) {
                                        var ssee = arrtitle[1].trim().split(' ');
                                        if (ssee[1] == season) {
                                            detailUrl = URL.DOMAIN + hrefMovie;
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _libs2, httpRequest, cheerio, stringHelper, base64, _movieInfo2, title, type, season, episode, hosts, keys, detailUrl, url, html, $, itemSeason, htmlDetail, dom, urlIframe, htmlSuperDetail, xdom;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, stringHelper = _libs2.stringHelper, base64 = _libs2.base64;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, type = _movieInfo2.type, season = _movieInfo2.season, episode = _movieInfo2.episode;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                keys = [];
                                detailUrl = this.state.detailUrl;
                                url = detailUrl;

                                if (!(url.indexOf('http://') != 0 && url.indexOf('https://') != 0)) {
                                    _context2.next = 10;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 10:
                                _context2.next = 12;
                                return httpRequest.getHTML(this.state.detailUrl, this.headers);

                            case 12:
                                html = _context2.sent;
                                $ = cheerio.load(html);
                                itemSeason = $('.lists .video-block');

                                itemSeason.each(function () {
                                    var hrefMovie = $(this).find('a').attr('href');
                                    var titleMovie = $(this).find('.name').text();
                                    var arrtitle = titleMovie.trim().split(' - ');
                                    if (type == 'movie' && stringHelper.shallowCompare(title, arrtitle[0])) {
                                        detailUrl = URL.DOMAIN + hrefMovie;
                                    }
                                    if (type == 'tv' && stringHelper.shallowCompare(title, arrtitle[0]) && stringHelper.shallowCompare(arrtitle[1], 'Season ' + season + ' Episode ' + episode)) {
                                        detailUrl = URL.DOMAIN + hrefMovie;
                                    }
                                });
                                _context2.next = 18;
                                return httpRequest.getHTML(detailUrl, this.headers);

                            case 18:
                                htmlDetail = _context2.sent;
                                dom = cheerio.load(htmlDetail);
                                urlIframe = '';

                                dom('iframe').each(function () {
                                    urlIframe = dom(this).attr('src');
                                    if (urlIframe.indexOf('//') == 0) urlIframe = 'https:' + urlIframe;
                                });
                                _context2.next = 24;
                                return httpRequest.getHTML(urlIframe, this.headers);

                            case 24:
                                htmlSuperDetail = _context2.sent;
                                xdom = cheerio.load(htmlSuperDetail);

                                xdom('.list-server-items .linkserver').each(function () {
                                    var urlembed = xdom(this).attr('data-video');
                                    if (urlembed.indexOf('//') == 0) urlembed = 'https:' + urlembed;
                                    hosts.push({
                                        provider: {
                                            url: detailUrl,
                                            name: "Vidembedcc"
                                        },
                                        result: {
                                            file: urlembed,
                                            label: "embed",
                                            type: "embed"
                                        }
                                    });
                                });
                                this.state.hosts = hosts;
                                return _context2.abrupt('return');

                            case 29:
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

    return Vidembedcc;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Vidembedcc({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });

                        //if(movieInfo.type == 'movie') {movieInfo.season = 0; movieInfo.episode = 0;}

                        bodyPost = {
                            name_source: 'Vidembedcc',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        _context3.next = 5;
                        return httpRequest.post('https://getaz.morphtv.club/source/get', {}, bodyPost);

                    case 5:
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
                        //let hosts = [];

                        if (movieInfo.checker != undefined) hosts = [];

                        if (!(hosts.length == 0)) {
                            _context3.next = 22;
                            break;
                        }

                        _context3.next = 12;
                        return source.searchDetail();

                    case 12:
                        _context3.next = 14;
                        return source.getHostFromDetail();

                    case 14:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context3.next = 17;
                            break;
                        }

                        return _context3.abrupt('return', hosts);

                    case 17:
                        if (!(hosts.length > 0)) {
                            _context3.next = 22;
                            break;
                        }

                        bodyPost['hosts'] = JSON.stringify(hosts);
                        bodyPost['expired'] = 3600;
                        _context3.next = 22;
                        return httpRequest.post('https://getaz.morphtv.club/source/set', {}, bodyPost);

                    case 22:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }
                        return _context3.abrupt('return', hosts);

                    case 24:
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

thisSource.testing = Vidembedcc;