

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://tele.morphtv.club/",
    SEARCH: function SEARCH(title, nonce) {
        //return `http://fa-source.com/api/notfoundtop`;
        return 'https://tele.morphtv.club/api/notfoundtop';
    },
    HEADERS: function HEADERS(referer) {
        return {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'content-type': 'application/x-www-form-urlencoded'
        };
    }
};

function rmChars(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|é/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|ó/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    str = str.replace("–", "-"); // Â, Ê, Ă, Ơ, Ư
    return str;
}
function getName() {
    var names = ['Hdtop', 'Hdmax', 'f5movies.co', 'SubMovie', 'YesMovies', 'teatv.xyz', 'GoStream', 'Fmoviesxy'];
    var key = Math.floor(Math.random() * 7);
    return key < names.length ? names[key] : names[0];
}

var Hdtop = function () {
    function Hdtop(props) {
        _classCallCheck(this, Hdtop);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Hdtop, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, _movieInfo, title, year, season, episode, type;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;

                                /*if(type == 'movie' && parseInt(year) < 2016) {
                                    this.state.detailUrl = false;
                                    return;
                                }*/

                                this.state.detailUrl = URL.SEARCH();
                                return _context.abrupt('return');

                            case 4:
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
                var _libs2, httpRequest, cheerio, qs, cryptoJs, _movieInfo2, title, year, season, episode, type, titlebase64, key, hosts, detailUrl, ss, ep, sign, posts, res, time, i, link;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs, cryptoJs = _libs2.cryptoJs;
                                _movieInfo2 = this.movieInfo, title = _movieInfo2.title, year = _movieInfo2.year, season = _movieInfo2.season, episode = _movieInfo2.episode, type = _movieInfo2.type, titlebase64 = _movieInfo2.titlebase64;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                if (type == 'movie') {
                                    season = 0;episode = 0;
                                }

                                //title = this.libs.base64.encode(encodeURIComponent(title));
                                title = rmChars(title);
                                if (titlebase64 != undefined) title = titlebase64;

                                key = 'NOT_FOUND';
                                hosts = [];

                                key = key + 'zz';
                                detailUrl = this.state.detailUrl;
                                ss = season;
                                ep = episode;

                                key = key + 'zz';
                                sign = cryptoJs.MD5(title.toLowerCase() + ss.toString() + key + ep.toString()).toString();
                                posts = {
                                    'name': title,
                                    'ss': type == 'tv' ? season : 0,
                                    'ep': type == 'tv' ? episode : 0,
                                    'newkey1': title.indexOf(year) != -1 ? title.indexOf(year) : title.indexOf(season),
                                    'hash': sign,
                                    'year': type == 'movie' ? year : 0
                                };


                                posts['hihi'] = cryptoJs.MD5(sign + posts['ep'].toString()).toString();

                                if (type == 'movie') posts.year = year;

                                _context2.next = 20;
                                return httpRequest.post(this.state.detailUrl, URL.HEADERS(), posts);

                            case 20:
                                res = _context2.sent;
                                time = Math.floor(Date.now() / 1000);


                                if (res.data.status && res.data.links.length > 0) {
                                    for (i in res.data.links) {
                                        link = res.data.links[i].link;
                                        //if(link.indexOf('openload') != -1 && time%3 != 0) continue;

                                        hosts.push({
                                            provider: {
                                                url: 'https://themoviedb.org',
                                                name: getName()
                                            },
                                            result: {
                                                file: link,
                                                label: "embed",
                                                type: "embed"
                                            }
                                        });
                                    }
                                }

                                this.state.hosts = hosts;

                            case 24:
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

    return Hdtop;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Hdtop({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Hdtop',
                            is_link: 0,
                            type: movieInfo.type,
                            season: movieInfo.season,
                            episode: movieInfo.episode,
                            title: movieInfo.title,
                            year: movieInfo.year
                        };
                        _context3.next = 5;
                        return source.searchDetail();

                    case 5:

                        if (!source.state.detailUrl) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }
                        _context3.next = 8;
                        return source.getHostFromDetail();

                    case 8:

                        if (source.state.hosts.length == 0) {
                            bodyPost.is_link = 0;
                        } else {
                            bodyPost.is_link = 1;
                        }

                        if (movieInfo.ss != undefined) {
                            movieInfo.ss.to(movieInfo.cs.id).emit(movieInfo.c, source.state.hosts);
                        }
                        return _context3.abrupt('return', source.state.hosts);

                    case 11:
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

thisSource.testing = Hdtop;