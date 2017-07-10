var rss = [
    'ffbsee.de',
];
var MAX_RSS = 3;

function shorten(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
        ret = ret.substr(0,maxLength-3) + "...";
    }
    return ret;
}

$(document).ready(function() {
    var addItem = function(title, link, date, text) {
        var item = $('<a>')
            .attr('class', 'css-truncate')
            .attr('href', link)
            .attr('target', '_blank')
            .data('date', date)
            .text(title);
        var prev = $('<p>')
            .attr('class', 'css-truncate')
            .html(text);
        $('#news').append($('<li>').append(item).append(prev));
    };

    var forEach = function(x, f) {
        var i;
        for(i = 0; i < x.length; i++) {
            f(x[i]);
        }
    };

    var getAddedItems = function() {
        var news = [];
        forEach($('#news').find('li'), function(item) {
            var a = $(item).children('a');
            var p = $(item).children('p');
            var title = a.text();
            var link = a.attr('href');
            var date = a.data('date');
            var text = p.html();

            news.push({title:title, link:link, date:date, text:text});
        });
        return news;
    };

    var clearNewsFeed = function() {
        forEach($('#news').children(), function(child) {
            child.remove();
        });
    };

    var updateNewsFeed = function(news) {
        var items = getAddedItems().concat(news);

        items.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);

            return a > b ? -1 : a < b ? 1 : 0;
        });

        clearNewsFeed();

        var i = 0;
        items.forEach(function(item) {
            if(i++ >= MAX_RSS) return;
            addItem(item.title, item.link, item.date, shorten(item.text, 80));
        });
    };

    rss.forEach(function(feed) {
        $.get('/feeds/' + feed + '.rss', function(data) {
            var news = [];

            forEach($(data).find('item'), function(entry) {
                var title = $(entry).find('title').text();
                var link = $(entry).find('link').text();
                var date = $(entry).find('pubDate').text();
                var text = $(entry).find('description').text();

                news.push({title:title, link:link, date:date, text:text});
            });

            forEach($(data).find('entry'), function(entry) {
                var title = $(entry).find('title').text();
                var link = $(entry).find('link').attr('href');
                var date = $(entry).find('published').text();
                var text = $(entry).find('content').text();

                news.push({title:title, link:link, date:date, text:text});
            });

            updateNewsFeed(news);
        });
    });
});
