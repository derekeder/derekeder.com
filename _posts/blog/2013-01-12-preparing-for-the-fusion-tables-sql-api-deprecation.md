---
layout: post
title: Preparing for the Google Fusion Tables SQL API Deprecation
categories: 
  - blog
date: 2013-01-12
description: On January 14, 2013, Google will deprecate the SQL API for their Fusion Tables platform. This post is here to help developers prepare for it (or more likely, fix things after they break).
image: /images/blog/fusion-tables-logo-beta.gif
featured: false
---

<p><a href='https://developers.google.com/fusiontables/'><img class='img-thumbnail' src='/images/blog/fusion-tables-logo-beta.gif' title='Google Fusion Tables' alt='Google Fusion Tables'></a></p>
            
<p>On January 14, 2013, Google will <a href="https://developers.google.com/fusiontables/docs/developers_guide">deprecate the SQL API</a> for their <a href="https://developers.google.com/fusiontables/">Fusion Tables platform</a>. This post is here to help developers prepare for it (or more likely, fix things after they break).</p>

### How to upgrade to the Fusion Tables v1 API

According to [Google's Migration Guide](https://developers.google.com/fusiontables/docs/v1/migration_guide) (very useful!), their recommended path is to upgrade your apps to the [Fusion Tables v1 API](https://developers.google.com/fusiontables/docs/v1/getting_started). 

I've already upgraded the [Searchable Map Template](http://derekeder.com/searchable_map_template/), [Look at Cook](https://github.com/open-city/look-at-cook), and forked the [fusiontips library](https://github.com/derekeder/fusiontips) (as well as [submitted a patch](http://code.google.com/p/gmaps-utility-gis/issues/detail?id=12) to the original) if you are interested in seeing examples of how it's done. 

Other than changing the endpoint you are querying, there are a few hurdles to upgrading to the v1 API:

* First, you need to get an [API key](https://code.google.com/apis/console/). 
* Second, the format of the returned data is [slightly different](https://developers.google.com/fusiontables/docs/v1/using#queryData), so you will need to change how you process it. [This diff](https://github.com/derekeder/FusionTable-Map-Template-Heroku/commit/7e86b0bfba411584e0a305560d07444648835a0c) gives a good example of that change.

### Oops, there are no shortcuts

Earlier, I thought I had a pretty good shortcut around upgrading. I thought that I could just swap out 'google.com/fusiontables/api/query' for 'fusiontables.googleusercontent.com/fusiontables/api/query' and everything would still work.

Well, after doing some digging and finding [this post](https://groups.google.com/forum/?fromgroups=#!topic/fusion-tables-users-group/JlxS6ckszf4), I was pretty sure that wouldn't work. 

So, yah, there are some libraries to update now.

### fusion_tables gem, I'm here to save you!

The [fusion_tables](https://github.com/tokumine/fusion_tables) Ruby gem by [Simon Tokumine](https://twitter.com/tokumin) is one of the more awesome things that has been built on top of Fusion Tables. It acts as a lightweight wrapper to create, update and delete your Fusion Tables. Plus, it formats everything as hashes and arrays for easy data manipulation. It's pretty much the go-to Ruby library for interfacing with Fusion Tables.

Unfortunately, it still uses the old SQL API, so unless it is updated, all applications using it will break after Monday January 14, 2013. 

Good news! I submitted a [pull request](https://github.com/tokumine/fusion_tables/pull/21) with a patch to have it work with the v1 API. Hopefully it will get merged in soon, but in case it doesn't and you're scrambling, you can point to my repo directly.

Update your Gemfile:
{% highlight bash %}
gem 'fusion_tables', :git  => 'git://github.com/derekeder/fusion_tables.git'
{% endhighlight %}

and run:
{% highlight bash %}
bundle update
{% endhighlight %}

From there, you can deploy to your server, and you should be good to go. 

Note that pointing to a Github repo is not a permenant solution. You should plan on changing it back to the regular gem once it's updated.

I'll continue to update this post as things develop. There's a [PHP client library](http://code.google.com/p/fusion-tables-client-php/) that may need saving as well.