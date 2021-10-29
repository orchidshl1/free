

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://bmovies.vip",
    SEARCH: function SEARCH(title) {
        return 'https://bmovies.vip/movie/search/' + title;
    },
    HEADERS: function HEADERS(ref) {
        return {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
            'X-Requested-With': 'XMLHttpRequest'
            // 'Referer': ref,
        };
    },
    MAX_LINK: 25
};

var Bmoviesvip = function () {
    function Bmoviesvip(props) {
        _classCallCheck(this, Bmoviesvip);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
        this.headers = {};
    }

    _createClass(Bmoviesvip, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, base64, _movieInfo, title, year, season, episode, type, detailUrl, urlSearch, htmlSearch, $, itemSeason;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, base64 = _libs.base64;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                urlSearch = URL.SEARCH(title.replace(/[\s:'-]+/, '+'));
                                _context.next = 6;
                                return httpRequest.get(urlSearch, this.headers);

                            case 6:
                                htmlSearch = _context.sent;
                                $ = cheerio.load(htmlSearch.data);
                                itemSeason = $('.movies-list .ml-item');

                                itemSeason.each(function () {
                                    var hrefMovie = $(this).find('a').attr('href');
                                    var titleMovie = $(this).find('.mli-info h2').text();
                                    var arrtitle = titleMovie.trim().split(' - ');
                                    if (type == 'movie' && stringHelper.shallowCompare(title, arrtitle[0])) {
                                        detailUrl = URL.DOMAIN + hrefMovie;
                                    }
                                    if (type == 'tv' && stringHelper.shallowCompare(title, arrtitle[0])) {
                                        if (stringHelper.shallowCompare(arrtitle[1], 'Season ' + season)) {
                                            detailUrl = URL.DOMAIN + hrefMovie;
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
                var _this = this;

                var _libs2, httpRequest, cheerio, stringHelper, base64, _movieInfo2, title, type, season, episode, hosts, keys, detailUrl, id, url, data, jsonData, $, itemSever, list, arr_promise;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, stringHelper = _libs2.stringHelper, base64 = _libs2.base64;
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
                                id = detailUrl.split('/')[4].split('-').pop();
                                url = URL.DOMAIN + ('/ajax/movie_episodes/' + id);

                                if (!(url.indexOf('http://') != 0 && url.indexOf('https://') != 0)) {
                                    _context3.next = 11;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 11:
                                _context3.next = 13;
                                return httpRequest.getHTML(url, this.headers);

                            case 13:
                                data = _context3.sent;
                                jsonData = JSON.parse(data);
                                $ = cheerio.load(jsonData.html);
                                itemSever = $('.le-server');
                                list = [];

                                itemSever.each(function () {
                                    var idParam = $(this).find('.les-content a').attr('data-id');

                                    // console.log(data,'gggg');
                                    list.push(idParam);
                                });
                                arr_promise = list.map(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
                                        var urlApi, dataSever, jsonDataSever;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.prev = 0;
                                                        urlApi = URL.DOMAIN + ('/ajax/movie_embed/' + val);
                                                        _context2.next = 4;
                                                        return httpRequest.getHTML(urlApi, _this.headers);

                                                    case 4:
                                                        dataSever = _context2.sent;
                                                        jsonDataSever = JSON.parse(dataSever);

                                                        hosts.push({
                                                            provider: {
                                                                url: detailUrl,
                                                                name: "Bmoviesvip"
                                                            },
                                                            result: {
                                                                file: jsonDataSever.src,
                                                                label: "direct",
                                                                type: 'direct'
                                                            }
                                                        });
                                                        _context2.next = 11;
                                                        break;

                                                    case 9:
                                                        _context2.prev = 9;
                                                        _context2.t0 = _context2['catch'](0);

                                                    case 11:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this, [[0, 9]]);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                                _context3.next = 22;
                                return Promise.all(arr_promise);

                            case 22:
                                this.state.hosts = hosts;
                                return _context3.abrupt('return');

                            case 24:
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

    return Bmoviesvip;
}();

thisSource.function = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Bmoviesvip({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Bmoviesvip',
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
                        bodyPost['expired'] = 3600;
                        _context4.next = 22;
                        return httpRequest.post('https://getaz.morphtv.club/source/set', {}, bodyPost);

                    case 22:

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, hosts);
                        }
                        console.log(hosts, 'host..');
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

thisSource.testing = Bmoviesvip;