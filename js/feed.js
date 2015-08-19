function RssClient(url, provider) {
  this.url = url;
  this.provider = provider || 'google';

  errorObj = function(errorMsg) {
    return {error: {message: errorMsg}};
  }

  this.ready = function(callback) {
    var _this = this;
    google.load("feeds", "1", {'callback': function() {
      callback(_this);
    }});
  }

  this.fetchFeed = function(callback) {
    if (!this.url) callback(errorObj("Url is not defined"));
    else {
      if (this.provider == 'google') {
        this.feed = new google.feeds.Feed(this.url);
        this.feed.setNumEntries(-1);
        this.feed.load(callback);
      }

      if (this.provider == 'php') {
        $.get('https://flip-rss-hugomarisco-1.c9.io/rss.php?rss_url=' + this.url, function(data){
          if (data.responseStatus == 200) {
            callback(data.responseData);
          } else {
            callback(errorObj(data.responseDetails));
          }
        }, 'json');
      }
    }
  }
}
