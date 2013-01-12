---
layout: post
title: Preparing for the Google Fusion Tables SQL API Deprecation
---

{% excerpt %}

{% image blog/fusion-tables-logo-beta.gif %}
  title: Google Fusion Tables
  alt: Google Fusion Tables
  link: https://developers.google.com/fusiontables/
{% endimage %}

On January 14th, 2013, Google will [deprecate the SQL API](https://developers.google.com/fusiontables/docs/developers_guide) for their [Fusion Tables platform](https://developers.google.com/fusiontables/). This post is here to help developers prepare for it (or more likely, fix things after they broke). 

While Google is killing one way to access Fusion Tables, there are still _two_ other ways to access the API. 

{% endexcerpt %}

### #1 The Right Way: Upgrade to the Fusion Tables v1 API

According to their [Migration Guide](https://developers.google.com/fusiontables/docs/v1/migration_guide) (very useful!), their recommended path is to upgrade your apps to the [Fusion Tables v1 API](https://developers.google.com/fusiontables/docs/v1/getting_started). 

I would recommend upgrading to the v1 API as well. I've already upgraded my [Searchable Map Template](http://derekeder.com/searchable_map_template/), [Look at Cook](https://github.com/open-city/look-at-cook), and [submitted a patch](http://code.google.com/p/gmaps-utility-gis/issues/detail?id=12) to the [fusiontips](http://code.google.com/p/gmaps-utility-gis/source/browse/trunk/fusiontips/src/fusiontips.js) library if you are interested in seeing examples of how it's done.

Other than changing the endpoint you are querying, there are a few hurdles to upgrading to the v1 API:

* First, you need to get an [API key](https://code.google.com/apis/console/). 
* Second, the format of the returned data is [slightly different](https://developers.google.com/fusiontables/docs/v1/using#queryData), so you will need to change how you process it. [This diff](https://github.com/derekeder/FusionTable-Map-Template-Heroku/commit/7e86b0bfba411584e0a305560d07444648835a0c) gives a good example of that change.

### #2 The Easy Way: Downgrade to the Google Charts API

{% image blog/google-chart-tools.gif %}
  title: Google Chart Tools
  alt: Google Chart Tools
  link: https://developers.google.com/chart/interactive/docs/fusiontables
{% endimage %}

If all that stuff I just described doesn't sound like your bag, there's an easier way! Google is shutting down the old SQL API, but [they say they're keeping](https://groups.google.com/forum/?fromgroups=#!searchin/fusion-tables-users-group/Status$20of$20API$20deprecation$20and$20Google$20Chart$20Tools/fusion-tables-users-group/sHFf9tAzqSg/d8bJvR-1HycJ) the [Fusion Tables Charts API](https://developers.google.com/chart/interactive/docs/fusiontables), which _operates the exact same way as the old SQL API_.

Just replace all instances of:

{% highlight bash %}
google.com/fusiontables/api/query
{% endhighlight %}

with

{% highlight bash %}
fusiontables.googleusercontent.com/fusiontables/api/query
{% endhighlight %}

This was especially useful for my [Fusion Tables to HTML Table](https://github.com/derekeder/Fusion-Tables-to-HTML-Table) library. It uses a PHP library written by kbris...@google.com that hasn't been updated to use the new v1 API. A simple [find and replace using the lines above](https://github.com/derekeder/Fusion-Tables-to-HTML-Table/commit/99f2738892d3b09751df85f494f7a339ec476cda) solved the problem!

<span class="label label-warning">Warning</span>
One final note on this solution. Google [stated they have no plans to deprecate the Charts API](https://groups.google.com/forum/?fromgroups=#!searchin/fusion-tables-users-group/Status$20of$20API$20deprecation$20and$20Google$20Chart$20Tools/fusion-tables-users-group/sHFf9tAzqSg/d8bJvR-1HycJ), but I have a feeling they'll get around to it eventually. 

Taking this shortcut now probably means you'll just have to do it the hard(er) way eventually. Think of it as putting off the work for a later date. The silver lining to this is Google usually gives a 6 month heads up before they turn their products off.