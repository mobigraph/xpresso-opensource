# XPRESSO API

Xpresso API allows you to create and use XPRESSO GIFs in your application.


## Demo

 [demo link](http://xpresso.tech/xpresso-web-demo/).
 

## Getting Started

To get started, download the dist folder and copy it to your project


### Usage

Include `xpresso.js` to html

```javascript
<script type="text/javascript" src="./dist/xpresso/js/xpresso.js"></script>
```

Create custom avatar.
Add a div with id 'avatar-container' into your html file

```javascript
<div id="avatar-container"></div>
```

After avatar customized, get the avatar byte code from window message event listener.

```javascript
   window.addEventListener('message', function(e) {
          var data = e.data;
          if (data.type && data.type == "avc") {
           //data.bytecode contains avatar bytecode
          }
    }, false);
```
Use this avatar bytecode to create GIF stickers.

#### Initialize Xpresso Object.

```javscript
var xpresso=new Xpresso(config)
```

#### config option 
```
 var config={
   countryCode:<2digitcountrycode>,
   apiKey:<key string>

 }
 
    Test apiKey value is "6hSjEEYWVHTmSUUwvwjJzTpX8_zq8noEYq2-_r5ABnkq98vSw1jvHFKncRlYUA-C";

```

To get Gifs with customized avatar

```javscript
xpresso.setAvatarByteCode(<avbytecode received after customization>)
```

#### To Get the Xpresso Groups

```javascript
  xpresso.getGroups(function(res) {
     var groups = JSON.parse(res).groups
  })

```

#### To get the animations with the groups

```javascript
 xpresso.getAnimationsForGroup(groupId,function(res) {
     //res contains animation Id List
  })

```

#### To search GIF
 
```javascript
  xpresso.searchGif(searchKey, function(res) {
     //res contains animation Id List
  })

```

#### To generate GIF urls from animation Id List

```javascript
    xpresso.generateAnimations(animIdList, response => {
       
    });

    response payload contains,

    {
        "lowResGifs": [],
 	"highResGifs": [],
	"mp4Urls": []
    }

```

#### To generate GIF urls from animation Id List with custom Text

```javascript
    xpresso.generateAnimationsWithCustomText(animIdList, response => {
    
    });
    
    response payload contains,

    {
        "lowResGifs": [],
 	"highResGifs": [],
	"mp4Urls": []
    }

```

#### To get the latest trending GIFs

``` javascript
  xpresso.getTrendingGif(function(res) {
     //res contains animation Id List
  })
```
