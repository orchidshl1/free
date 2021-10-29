

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://simplestream.in",
    SEARCH: function SEARCH(title) {
        return "https://simplestream.in/api/search";
    },
    MOVIE: "https://simplestream.in/api/releases/movie/",
    TV: function TV(id) {
        return "https://simplestream.in/api/tv/show/" + id + "/episodes";
    },
    TV_DETAIL: function TV_DETAIL(id, eid) {
        return "https://simplestream.in/api/releases/tv/" + id + "/" + eid;
    }
};

var SimpleStream = function () {
    function SimpleStream(props) {
        _classCallCheck(this, SimpleStream);

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

                        this.headers['cookie'] = "__cfduid=" + cfuid + "; cf_clearance=" + cfclear;
                        this.headers['cookie'] = c;
                        this.headers['User-Agent'] = cookies[i].useragent;
                    }
                }
            } catch (e) {
                console.log('Cookie Err: ', e, 'e');
            }
        }
    }

    _createClass(SimpleStream, [{
        key: "searchDetail",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, cryptoJs, qs, _movieInfo, title, year, season, episode, type, detailUrl, tvshowVideo, urlSearch, response, url, tvid, responseMovie;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, cryptoJs = _libs.cryptoJs, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                detailUrl = false;
                                tvshowVideo = false;
                                urlSearch = '';

                                if (type == 'tv') {
                                    urlSearch = URL.SEARCH(encodeURI(title));
                                } else {
                                    urlSearch = URL.SEARCH(encodeURI(title));
                                }
                                _context.next = 8;
                                return httpRequest.put(urlSearch, { Query: title });

                            case 8:
                                response = _context.sent;

                                if (!(response && response.data)) {
                                    _context.next = 25;
                                    break;
                                }

                                if (!(type === 'tv')) {
                                    _context.next = 24;
                                    break;
                                }

                                if (!response.data.TV.length) {
                                    _context.next = 21;
                                    break;
                                }

                                url = false;
                                tvid = false;

                                response.data.TV.forEach(function (tvMovie, index) {
                                    if (tvMovie.Title == title) {
                                        url = URL.TV(tvMovie.IMDB);
                                        tvid = tvMovie.IMDB;
                                    }
                                });

                                _context.next = 17;
                                return httpRequest.getHTML(url);

                            case 17:
                                responseMovie = _context.sent;


                                if (responseMovie) {
                                    responseMovie = JSON.parse(responseMovie);
                                    responseMovie.forEach(function (movie, index) {

                                        if (movie.Season == season && movie.Episode == episode) {
                                            detailUrl = URL.TV_DETAIL(tvid, movie.AbsoluteNumber);
                                        }
                                    });
                                } else {
                                    console.log('Movies not found');
                                }
                                _context.next = 22;
                                break;

                            case 21:
                                console.log('Find not found');

                            case 22:
                                _context.next = 25;
                                break;

                            case 24:
                                if (response.data.Movies.length) {
                                    response.data.Movies.forEach(function (movie, index) {
                                        if (movie.Year == year) detailUrl = URL.MOVIE + movie.IMDB;
                                    });
                                } else {
                                    console.log('Find not found');
                                }

                            case 25:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt("return");

                            case 27:
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _libs2, httpRequest, cheerio, base64, _, hosts, detailUrl, response;

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
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 7:
                                response = _context2.sent;

                                if (response) {
                                    response = JSON.parse(response);
                                    response.forEach(function (res, index) {
                                        hosts.push({
                                            provider: {
                                                url: detailUrl,
                                                name: "simplestream"
                                            },
                                            result: {
                                                file: res.Link,
                                                label: "embed",
                                                type: 'embed'
                                            }
                                        });
                                    });
                                }

                                this.state.hosts = hosts;
                                return _context2.abrupt("return");

                            case 11:
                            case "end":
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

    return SimpleStream;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new SimpleStream({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context3.next = 4;
                        return source.searchDetail();

                    case 4:
                        _context3.next = 6;
                        return source.getHostFromDetail();

                    case 6:
                        hosts = source.state.hosts;
                        return _context3.abrupt("return", hosts);

                    case 8:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
    };
}();

thisSource.testing = SimpleStream;