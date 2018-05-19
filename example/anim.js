$(document).ready(function() {

    var ul = document.getElementById("anim-container")
    var animationIdList = [];
    var currentGroupId = localStorage.getItem("currentGroupId")

    xpresso.getAnimationsForGroup(currentGroupId, function(animIdList) {
        animationIdList = animIdList;
        xpresso.generateAnimations(animIdList, res => {
            var result = JSON.parse(res);
            displayGif(result.highResGifs)
        })


    })

    function displayGif(urls) {
        ul.innerHTML = ""
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
        ul.appendChild(div);
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