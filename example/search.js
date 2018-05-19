$(document).ready(function() {
    var animationIdList = [];
    var searchKey = localStorage.getItem("searchKey")

    xpresso.searchGif(searchKey, function(animIdList) {
        animationIdList = animIdList;

        xpresso.generateAnimations(animIdList, res => {
            var result = JSON.parse(res);
            displayGif(result.highResGifs)
        })

    })

    var anim_container = document.getElementById("anim-container")

    function displayGif(urls) {
        anim_container.innerHTML = ""
        for (var i = 0; i < urls.length; i++) {
            displayImage(urls[i])
        }
    }

    function displayImage(url) {
        var div = document.createElement("div")
        div.className = "animLi";
        var img = document.createElement("img")
        img.src = "./loading.gif"
        var downloadingImage = new Image();
        downloadingImage.onload = function() {
            img.src = downloadingImage.src;
        };
        downloadingImage.src = url;
        img.style.width = "100%"
        div.appendChild(img);
        anim_container.appendChild(div);
    }


    $('#replace-icon').click(function() {
        var customText = $('#customText').val();
        xpresso.generateAnimationsWithCustomText(animationIdList, customText, res => {
            var result = JSON.parse(res);
            displayGif(result.highResGifs)
        })
    })

    $('#customText').keypress(function(e) {
        if (e.which == 13) {
            $('#replace-icon').click();
        }
    });

});