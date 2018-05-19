
if(location.hostname == 'web-prod.xpresso.me'){
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })
  (window,document,'script','https://www.google-analytics.com/analytics.js','ga');
}
else {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })
  (window,document,'script','https://www.google-analytics.com/analytics_debug.js','ga');
}


var UUID = localStorage.getItem('UUID');

var trackingID = 'UA-85783554-1';
if (localStorage.getItem('App') == "Xpressoforwhatsapp")
    trackingID = 'UA-101442728-1';
if(UUID != 'undefined' &&
  UUID != undefined &&
  UUID != null &&
  UUID != 'null' &&
  UUID != "null" &&
  UUID != "(null)" &&
  UUID != ' ' &&
  UUID != " "){

    ga('create', {
      trackingId:trackingID ,
      cookieDomain: 'auto',
      userId: UUID
    });

    if(location.hostname != 'web-prod.xpresso.me'){
      ga('set', 'sendHitTask', null);
    }

    ga('send', {
      hitType: 'pageview'
    });

}

var analyticsFunc = {};
analyticsFunc.setTracker = function(UUID) {
  ga('create', {
      trackingId: trackingID,
    cookieDomain: 'auto',
    userId: UUID
  });

  if(location.hostname != 'web-prod.xpresso.me'){
    ga('set', 'sendHitTask', null);
  }

  ga('send', {
    hitType: 'pageview'
  });
}
