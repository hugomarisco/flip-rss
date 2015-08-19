function RssClient(url) {
  this.url = url;

  google.load("feeds", "1");

  this.ready = google.setOnLoadCallback;

  errorObj = function(errorMsg) {
    return {error: {message: errorMsg}};
  }

  this.fetchFeed = function(callback) {
    if (!this.url) callback(errorObj("Url is not defined"));
    else {
      this.feed = new google.feeds.Feed(this.url);
      this.feed.load(callback);
    }
  }
}

var rss_client = new RssClient("http://feeds.bbci.co.uk/news/rss.xml");

rss_client.ready(function(){
  rss_client.fetchFeed(function(result) {
    if (!result.error) {
      result.feed.entries.forEach(function(v){
        console.log("Title: " + v.title);
        console.log("Link: " + v.link);
        console.log("ContentSnippet: " + v.contentSnippet);
        console.log("-----------------");
      });
    } else {
      console.log("Error: " + result.error.message);
    }
  });
});
