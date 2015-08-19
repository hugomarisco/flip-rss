$(document).ready(function(){
  $('#rssForm').submit(function(e){

    e.preventDefault();

    var submitBtn = $('#searchRss');
    var rssUrlInput = $('#rssUrl');

    submitBtn.prop('disabled', true);
    rssUrlInput.prop('disabled', true);

    new RssClient(rssUrlInput.val()).ready(function(rssClient){
      rssClient.fetchFeed(function(result) {
        if (!result.error) {
          result.feed.entries.forEach(function(v){
            // Title
            var title = $('<a></a>').attr('href', v.link).prop('target', '_blank');
            title.append($('<h2></h2>').text(v.title));

            // Content
            var content = $('<p></p>').text(v.contentSnippet);

            // Row
            var row = $('<div></div>').addClass('row').addClass('entry');

            // Image column
            var col3 = $('<div></div>').addClass('col-sm-3').addClass('text-center');
            col3.append($('<img></img>').prop('src', 'https://placehold.it/150x150'));

            // Content column
            var col9 = $('<div></div>').addClass('col-sm-9');
            col9.append(title);
            col9.append(content);

            row.append(col3).append(col9);

            $('#results').append(row);
          });
        } else {
          alert(result.error.message);
        }
      });
    });
  });
});
