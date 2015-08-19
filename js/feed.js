function RssClient(url) {
  this.url = url;

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
      this.feed = new google.feeds.Feed(this.url);
      this.feed.load(callback);
    }
  }
}
