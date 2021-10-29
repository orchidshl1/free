

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://ww1.new-primewire.com",
    SEARCH: function SEARCH(title) {
        return 'https://ww1.new-primewire.com/search/' + title;
    },
    HEADERS: function HEADERS(referer) {
        return {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'referer': referer
        };
    }
};

var NewPrime = function () {
    function NewPrime(props) {
        _classCallCheck(this, NewPrime);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(NewPrime, [{
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

                                $('.wUHmPtOtkrNJcENSKEWrmYLDIDVKPB').each(function () {

                                    var titleMovie = $(this).find('a').attr('title');
                                    var y = $(this).attr('data-year');

                                    var t = title;
                                    if (type == 'tv') t = t + ' - Season ' + season;

                                    var hrefMovie = $(this).find('a').attr('href');

                                    if (stringHelper.shallowCompare(t, titleMovie)) {
                                        if (type == 'movie' && year == y) {
                                            detailUrl = hrefMovie;
                                        } else if (type == 'tv') {
                                            detailUrl = hrefMovie;
                                        }
                                    }
                                });

                                if (detailUrl.indexOf('http') == -1) detailUrl = URL.DOMAIN + detailUrl;

                                console.log(detailUrl);

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 15:
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
                var _libs2, httpRequest, cheerio, qs, _movieInfo2, title, year, season, episode, type, hosts, detailUrl, eHtml, $, h;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                hosts = [];
                                detailUrl = this.state.detailUrl;

                                if (!(type == 'tv')) {
                                    _context2.next = 12;
                                    break;
                                }

                                _context2.next = 9;
                                return httpRequest.getHTML(detailUrl);

                            case 9:
                                eHtml = _context2.sent;
                                $ = cheerio.load(eHtml);

                                $('.wzYoAIUukoCXWcuWOcbwwJnmfpxFpd').each(function () {
                                    var a = $(this).find('a').attr('href');
                                    var t = $(this).find('a').attr('title');
                                    var m = t.match(/(\d+)/);
                                    var e = m != undefined ? m[1] : 1000;
                                    if (parseInt(e) == episode) detailUrl = URL.DOMAIN + a;
                                });

                            case 12:
                                _context2.next = 14;
                                return httpRequest.getHTML(detailUrl + '?server=server_2', { 'x-requested-with': 'XMLHttpRequest' });

                            case 14:
                                h = _context2.sent;

                                h = JSON.parse(h);

                                hosts.push({
                                    provider: {
                                        url: detailUrl,
                                        name: "newPrime"
                                    },
                                    result: {
                                        file: h[0].file,
                                        label: "embed",
                                        type: "embed"
                                    }
                                });

                                this.state.hosts = hosts;

                            case 18:
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

    return NewPrime;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, hosts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new NewPrime({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });


                        if (movieInfo.type == 'movie') {
                            movieInfo.season = 0;movieInfo.episode = 0;
                        }

                        bodyPost = {
                            name_source: 'NewPrime',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year,
                            hash: libs.cryptoJs.MD5(movieInfo.title.toLowerCase() + movieInfo.season.toString() + "aloha" + movieInfo.episode.toString()).toString()
                        };
                        hosts = [];


                        if (movieInfo.checker != undefined) hosts = [];

                        if (!(hosts.length == 0)) {
                            _context3.next = 15;
                            break;
                        }

                        _context3.next = 9;
                        return source.searchDetail();

                    case 9:
                        _context3.next = 11;
                        return source.getHostFromDetail();

                    case 11:
                        hosts = source.state.hosts;

                        if (!(movieInfo.checker != undefined)) {
                            _context3.next = 14;
                            break;
                        }

                        return _context3.abrupt('return', hosts);

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
                        return _context3.abrupt('return', hosts);

                    case 17:
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

thisSource.testing = NewPrime;