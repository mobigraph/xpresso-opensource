class Xpresso {
    public config: Config;
    public avByteCode: string;
    baseUrl: string ="https://violet.mobigraph.co";

    public constructor(config) {
        this.config = config;
    }

    setAvatarByteCode(avByteCode) {
        this.avByteCode = avByteCode;
    }

    getGroups(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.baseUrl + "/xpresso/v1/animgroups?apiKey=" + this.config.apiKey + "&country=" + this.config.countryCode);
        xhr.onreadystatechange = function() {
            if (xhr.readyState > 3 && xhr.status == 200)
                callback(xhr.responseText);

        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send("");
    }


    getAnimationsForGroup(groupId, callback) {
        var that = this;
        var xhr = new XMLHttpRequest();
        var url = this.baseUrl + "/xpresso/v1/" + groupId + "/anims?apiKey=" + this.config.apiKey
       
        xhr.open('POST', url);

        xhr.onreadystatechange = function() {
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

    }

    getAnimUrl(animIdList, text, callback) {
        var postApi = {
            "apiKey": this.config.apiKey,
            "fps": 4,
            "width": 160,
            "animIds": animIdList,
            "avatar": this.avByteCode,
            "text": text
        }
        var xhr = new XMLHttpRequest();
        var url = this.baseUrl + "/xpresso/v1/animUrls"
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');


        xhr.onreadystatechange = function() {
            if (xhr.readyState > 3 && xhr.status == 200)
                callback(xhr.responseText);
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(JSON.stringify(postApi));
    }

    getTrendingGif(callback) {
        var xhr = new XMLHttpRequest();
        var url = this.baseUrl + "/xpresso/v1/trending?apiKey=" + this.config.apiKey
        xhr.open('POST', url);
  
        xhr.onreadystatechange = function() {
            if (xhr.readyState > 3 && xhr.status == 200) {
                var result = JSON.parse(xhr.responseText);
                var gifUrls = result.lowResGifs;
                var animIdList = [];
                for (var i = 0; i < gifUrls.length; ++i) {
                    animIdList.push(gifUrls[i].substring(gifUrls[i].lastIndexOf("/") + 1, gifUrls[i].indexOf(".gif")));
                }
                callback(animIdList)
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send("");
    }



    searchGif(text, callback) {
        var that = this;

        var xhr = new XMLHttpRequest();
        var url = this.baseUrl + "/xpresso/v1/search?apiKey=" + this.config.apiKey + "&query=" + text;
       
        xhr.open('GET', url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState > 3 && xhr.status == 200) {
                var result = JSON.parse(xhr.responseText);
                var gifUrls = result.lowResGifs;
                var animIdList = [];
                for (var i = 0; i < gifUrls.length; ++i) {
                    animIdList.push(gifUrls[i].substring(gifUrls[i].lastIndexOf("/") + 1, gifUrls[i].indexOf(".gif")));
                }
                callback(animIdList)
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
    }

    generateAnimationsWithCustomText(animIdList, customText, callback) {
        this.getAnimUrl(animIdList, customText, res => {
            callback(res);
        })
    }
    generateAnimations(animIdList, callback) {
        this.getAnimUrl(animIdList, "", res => {
            callback(res);
        })
    }

}



class Config {
    apiKey: string
    countryCode: string
}

function loadXpresso() {
    var div = document.getElementById("avatar-container");
    if(div){
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src","./dist/xpresso/AvDesign/index.html");
    ifrm.style.width = "100%";
    ifrm.style.height = "100%";
    ifrm.setAttribute("frameBorder", "0");
    div.appendChild(ifrm);
    }
}

document.addEventListener('DOMContentLoaded', loadXpresso, false);