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

{% endexcerpt %}

### How to upgrade to the Fusion Tables v1 API

According to their [Migration Guide](https://developers.google.com/fusiontables/docs/v1/migration_guide) (very useful!), their recommended path is to upgrade your apps to the [Fusion Tables v1 API](https://developers.google.com/fusiontables/docs/v1/getting_started). 

I've already upgraded my [Searchable Map Template](http://derekeder.com/searchable_map_template/), [Look at Cook](https://github.com/open-city/look-at-cook), and [submitted a patch](http://code.google.com/p/gmaps-utility-gis/issues/detail?id=12) to the [fusiontips](http://code.google.com/p/gmaps-utility-gis/source/browse/trunk/fusiontips/src/fusiontips.js) library if you are interested in seeing examples of how it's done.

Other than changing the endpoint you are querying, there are a few hurdles to upgrading to the v1 API:

* First, you need to get an [API key](https://code.google.com/apis/console/). 
* Second, the format of the returned data is [slightly different](https://developers.google.com/fusiontables/docs/v1/using#queryData), so you will need to change how you process it. [This diff](https://github.com/derekeder/FusionTable-Map-Template-Heroku/commit/7e86b0bfba411584e0a305560d07444648835a0c) gives a good example of that change.

### fusion_tables gem, I'm here to save you!

The [fusion_tables](https://github.com/tokumine/fusion_tables) Ruby gem by [Simon Tokumine](https://twitter.com/tokumin) is one of the more awesome things that has been built on top of Fusion Tables. It acts as a lightweight wrapper to create, update, and delete your Fusion Tables. Plus it formats everything as hashes and arrays for easy data manipulation. It's pretty much the go-to Ruby library for interfacing with Fusion Tables.

Unfortunately, it still uses the old SQL API, so unless it is updated, all applications using it will break on Monday Jan 14th, 2013. I just submitted a [pull request](https://github.com/tokumine/fusion_tables/pull/21) with a patch to have it work with the v1 API. Hopefully it will get merged in soon, but in case it doesn't and you're scrambling, you can point to my repo directly.

Update your Gemfile
{% highlight bash %}
gem 'fusion_tables', :git  => 'git://github.com/derekeder/fusion_tables.git'
{% endhighlight %}

and run
{% highlight bash %}
bundle update
{% endhighlight %}

From there, you can deploy to your server and you should be good to go. Note that pointing to a Github repo is not a permenant solution. You should plan on changing it back to the regular gem once it's updated.

I'll continue to update this post as things develop. There's a [PHP client library](http://code.google.com/p/fusion-tables-client-php/) that may need saving as well ...