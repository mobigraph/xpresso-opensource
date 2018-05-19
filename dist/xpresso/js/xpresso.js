var Xpresso = /** @class */ (function () {
    function Xpresso(config) {
        this.baseUrl = "https://violet.mobigraph.co";
        this.config = config;
    }
    Xpresso.prototype.setAvatarByteCode = function (avByteCode) {
        this.avByteCode = avByteCode;
    };
    Xpresso.prototype.getGroups = function (callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.baseUrl + "/xpresso/v1/animgroups?apiKey=" + this.config.apiKey + "&country=" + this.config.countryCode);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200)
                callback(xhr.responseText);
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send("");
    };
    Xpresso.prototype.getAnimationsForGroup = function (groupId, callback) {
        var that = this;
        var xhr = new XMLHttpRequest();
        var url = this.baseUrl + "/xpresso/v1/" + groupId + "/anims?apiKey=" + this.config.apiKey;
        xhr.open('POST', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) {
                var result = JSON.parse(xhr.responseText);
                var gifUrls = result.lowResGifs;
                var animIdList = [];
                for (var i = 0; i < gifUrls.length; ++i) {
                    animIdList.push(gifUrls[i].substring(gifUrls[i].lastIndexOf("/") + 1, gifUrls[i].indexOf(".gif")));
                }
                callback(animIdList);
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send("");
    };
    Xpresso.prototype.getAnimUrl = function (animIdList, text, callback) {
        var postApi = {
            "apiKey": this.config.apiKey,
            "fps": 4,
            "width": 160,
            "animIds": animIdList,
            "avatar": this.avByteCode,
            "text": text
        };
        var xhr = new XMLHttpRequest();
        var url = this.baseUrl + "/xpresso/v1/animUrls";
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200)
                callback(xhr.responseText);
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(JSON.stringify(postApi));
    };
    Xpresso.prototype.getTrendingGif = function (callback) {
        var xhr = new XMLHttpRequest();
        var url = this.baseUrl + "/xpresso/v1/trending?apiKey=" + this.config.apiKey;
        xhr.open('POST', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) {
                var result = JSON.parse(xhr.responseText);
                var gifUrls = result.lowResGifs;
                var animIdList = [];
                for (var i = 0; i < gifUrls.length; ++i) {
                    animIdList.push(gifUrls[i].substring(gifUrls[i].lastIndexOf("/") + 1, gifUrls[i].indexOf(".gif")));
                }
                callback(animIdList);
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send("");
    };
    Xpresso.prototype.searchGif = function (text, callback) {
        var that = this;
        var xhr = new XMLHttpRequest();
        var url = this.baseUrl + "/xpresso/v1/search?apiKey=" + this.config.apiKey + "&query=" + text;
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) {
                var result = JSON.parse(xhr.responseText);
                var gifUrls = result.lowResGifs;
                var animIdList = [];
                for (var i = 0; i < gifUrls.length; ++i) {
                    animIdList.push(gifUrls[i].substring(gifUrls[i].lastIndexOf("/") + 1, gifUrls[i].indexOf(".gif")));
                }
                callback(animIdList);
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
    };
    Xpresso.prototype.generateAnimationsWithCustomText = function (animIdList, customText, callback) {
        this.getAnimUrl(animIdList, customText, function (res) {
            callback(res);
        });
    };
    Xpresso.prototype.generateAnimations = function (animIdList, callback) {
        this.getAnimUrl(animIdList, "", function (res) {
            callback(res);
        });
    };
    return Xpresso;
}());
var Config = /** @class */ (function () {
    function Config() {
    }
    return Config;
}());
function loadXpresso() {
    var div = document.getElementById("avatar-container");
    if (div) {
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", "./dist/xpresso/AvDesign/index.html");
        ifrm.style.width = "100%";
        ifrm.style.height = "100%";
        ifrm.setAttribute("frameBorder", "0");
        div.appendChild(ifrm);
    }
}
document.addEventListener('DOMContentLoaded', loadXpresso, false);
