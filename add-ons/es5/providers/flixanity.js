

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = {
    DOMAIN: "https://flixanity.app",
    SEARCH: 'https://api.flixanity.app/api/v1/0A6ru35yevokjaqbb3',
    TOKEN_API_EMBED: 'eCNBuxFGpRmFlWjUJjmjguCJI',
    EMBED_URL: 'https://flixanity.app/ajax/vsozrflxcw.php',
    KEY_SL: '9fc895fbb0b23f1c0fb8e5a5fe02f7b5',
    HEADERS: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }
};

function l() {
    for (var t = "", e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", r = 0; 25 > r; r++) {
        t += e.charAt(Math.floor(Math.random() * e.length));
    }return t;
}

function social_lock(input) {
    return enc("0A6ru35yyi5yn4THYpJqy0X82tE95bta") + input;
}

function enc(data) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1,
        o2,
        o3,
        h1,
        h2,
        h3,
        h4,
        bits,
        i = 0,
        ac = 0,
        enc = "",
        tmp_arr = [];

    if (!data) {
        return data;
    }

    do {
        // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    var r = data.length % 3;

    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}

var Flixanity = function () {
    function Flixanity(props) {
        _classCallCheck(this, Flixanity);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;

        this.state = {};
    }

    _createClass(Flixanity, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, qs, cryptoJs, _movieInfo, title, year, season, episode, type, posts, data, i, m;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper, qs = _libs.qs, cryptoJs = _libs.cryptoJs;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                posts = {
                                    q: title,
                                    verifiedCheck: URL.TOKEN_API_EMBED,
                                    set: '',
                                    rt: '',
                                    sl: cryptoJs.MD5(social_lock('evokjaqbb3')).toString(),
                                    limit: 100,
                                    timestamp: new Date().getTime()
                                };
                                _context.next = 5;
                                return httpRequest.post(URL.SEARCH, {
                                    'referer': 'https://flixanity.app',
                                    'user-agent': 'AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chrom 59'
                                }, posts);

                            case 5:
                                data = _context.sent;
                                i = 0;

                            case 7:
                                if (!(i < data.data.length)) {
                                    _context.next = 20;
                                    break;
                                }

                                m = data.data[i];

                                if (!(type == 'movie' && stringHelper.shallowCompare(title, m.title) && m.year == year)) {
                                    _context.next = 14;
                                    break;
                                }

                                this.state.detailUrl = URL.DOMAIN + m.permalink.replace('movie/', 'film/');
                                return _context.abrupt('break', 20);

                            case 14:
                                if (!(stringHelper.shallowCompare(title, m.title) && m.year == year)) {
                                    _context.next = 17;
                                    break;
                                }

                                this.state.detailUrl = URL.DOMAIN + m.permalink.replace('show/', 'series/') + ('/season/' + season + '/episode/' + episode);
                                return _context.abrupt('break', 20);

                            case 17:
                                i++;
                                _context.next = 7;
                                break;

                            case 20:
                                console.log(this.state.detailUrl);

                                return _context.abrupt('return');

                            case 22:
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
                var _libs2, httpRequest, cheerio, qs, base64, hosts, type, actionEmbed, htmlDetail, elid, dataBody, resultApi, res, keys, k, m, embed;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs, base64 = _libs2.base64;

                                if (this.state.detailUrl) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 3:
                                hosts = [];
                                type = this.movieInfo.type;
                                actionEmbed = type == 'movie' ? 'getMovieEmb' : 'getEpisodeEmb';
                                _context2.next = 8;
                                return httpRequest.getHTML(this.state.detailUrl);

                            case 8:
                                htmlDetail = _context2.sent;
                                elid = htmlDetail.match(/elid *= *\"([^"]*)/);

                                elid = elid != null ? elid[1] : false;

                                if (!(elid != false)) {
                                    _context2.next = 22;
                                    break;
                                }

                                dataBody = {
                                    action: actionEmbed,
                                    idEl: elid,
                                    token: URL.TOKEN_API_EMBED,
                                    nopop: '',
                                    elid: ''
                                };

                                console.log(dataBody);
                                // let resultApi = await httpRequest.postCloudflare(URL.EMBED_URL, {}, dataBody);
                                _context2.next = 16;
                                return httpRequest.post(URL.EMBED_URL, {
                                    'referer': this.state.detailUrl,
                                    'user-agent': 'AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chrom 59',
                                    'x-requested-with': 'XMLHttpRequest'
                                }, dataBody);

                            case 16:
                                resultApi = _context2.sent;

                                if (!(resultApi.data == 'Invalid request, your IP have been reported!')) {
                                    _context2.next = 19;
                                    break;
                                }

                                throw new Error('NOT LINK');

                            case 19:
                                res = resultApi.data;
                                keys = Object.keys(res);

                                for (k in keys) {
                                    m = res[keys[k]];
                                    embed = m.embed.match(/src="([^"]*)/i);

                                    embed = embed != null ? embed[1] : false;

                                    embed && hosts.push({
                                        provider: {
                                            url: this.state.detailUrl,
                                            name: "flixanity"
                                        },
                                        result: {
                                            file: embed,
                                            label: "embed",
                                            type: this.isEmbed(embed) ? "embed" : 'direct'
                                        }
                                    });
                                }

                            case 22:

                                this.state.hosts = hosts;

                            case 23:
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
    }, {
        key: 'isEmbed',
        value: function isEmbed(link) {
            return true;
        }
    }]);

    return Flixanity;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var httpRequest, source, bodyPost, res, js, hosts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        httpRequest = libs.httpRequest;
                        source = new Flixanity({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        bodyPost = {
                            name_source: 'Flixanity',
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
                        bodyPost['expired'] = 10800;
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

thisSource.testing = Flixanity;