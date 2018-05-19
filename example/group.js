$(document).ready(function() {

    $('#searchKey').val("");
    var groups = [];

    init();

    getTrending();

    function init() {
        xpresso.getGroups(res => {
            groups = JSON.parse(res).groups
            for (var i = 0; i < groups.length; i++) {
                var grpItem = groups[i]
                var div = document.createElement("div")
                div.className = "col-sm-3";
                var img = document.createElement("img");
                img.id = "groupImg-" + grpItem.groupId
                img.src = grpItem.groupIcon;
                img.className = "groupPackImage"
                div.appendChild(img);
                div.addEventListener("click", function(e) {
                    var ids = e.target.id.split("-");
                    var currentGroupId = ids[1];
                    localStorage.setItem("currentGroupId", currentGroupId);
                    window.location.href = "anim.html"
                })
                document.getElementById("groupImageContainer").appendChild(div)
            }
        });
    }

    function getTrending() {
        xpresso.getTrendingGif(function(animIdList) {
            xpresso.createAnimUrl(animIdList, res => {
                var result = JSON.parse(res);
                displayGif(result.highResGifs)
            })

        });
    }

    var ul = document.getElementById("anim-container")

    function displayTrendingGif(animUrls) {
        ul.innerHTML = ""
        for (var i = 0; i < animUrls.length; i++) {
            var li = document.createElement("li")
            li.className = "animLi";
            var img = document.createElement("img")
            img.src = animUrls[i];
            li.appendChild(img);
            ul.appendChild(li);
        }
    }

    $('#search-icon').click(function(e) {
        var searchKey = $('#searchKey').val();
        localStorage.setItem("searchKey", searchKey)
        window.location.href = "search.html"

    })


    $('#searchKey').keypress(function(e) {
        if (e.which == 13) {
            $('#search-icon').click();
        }
    });

});