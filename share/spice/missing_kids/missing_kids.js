(function (env) {
    "use strict";
    env.ddg_spice_missing_kids = function (api_result) {
        
        if (!api_result) Spice.failed('missing_kids');
        if (api_result.error) Spice.failed('missing_kids');
        
        var articles = api_result.rss.channel.item;
        if (articles.length == 0) Spice.failed('missing_kids');
        if (articles.length > 20) articles = articles.slice(0,20);
        
        var script = $('[src*="/js/spice/missing_kids/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/missing_kids\/([^\/]+)/)[1],
            decodedQuery = decodeURIComponent(query);

        Spice.add({
            id: 'missing_kids',
            name: 'Missing Kids',
            data: articles,
            meta: {
                primaryText: 'Missing children in ' + decodedQuery,
                sourceName: 'National Center for Missing & Exploited Children',
                sourceUrl: 'http://www.missingkids.com',
                count: articles.length,
            },
            templates: {
                group: 'media',
                detail: false,
                item_detail: false
            },
            normalize: function(item) {
                var title = item.title.text;
                // removing "Missing: ";
                title = title.replace(/.*\:/,"");
                var description = '';
                if (typeof item.description !== 'undefined') {
                    description = item.description.text;
                    description = DDG.strip_html(description);
                    description = description.replace(/&quot;/ig,"\"");
                    description = description.replace(/&#039;/ig,"'");
                    // removing PERSON'S NAME, 
                    description = description.replace(/^.+?,/,"");
                }
                return {
                    title: title,
                    url: item.link.text,
                    description: description,
                    image: item.enclosure.url
                };
            }
        });

    }
}(this));

