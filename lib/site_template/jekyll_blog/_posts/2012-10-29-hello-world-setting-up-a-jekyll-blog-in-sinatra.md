---
layout: post
title: Hello World! Setting up a Jekyll blog inside Sinatra
---

{% excerpt %}

{% image blog/jekyll.jpg %}
  title: Jekyll
  alt: Jekyll
  link: http://jekyllrb.com
{% endimage %} + {% image blog/sinatra.jpg %}
  title: Sinatra
  alt: Sinatra
  link: http://sinatrarb.com
{% endimage %}

I'm going meta on my first blog post: how to set up a [Jekyll](http://jekyllrb.com/) blog inside a [Sinatra](http://www.sinatrarb.com/) app. A [few](http://recursive-design.com/blog/2010/10/12/static-blogging-the-jekyll-way/) [people](http://mikeferrier.com/2011/04/29/blogging-with-jekyll-haml-sass-and-jammit/) have [written](http://danielmcgraw.com/2011/04/14/The-Ultimate-Guide-To-Getting-Started-With-Jekyll-Part-1/) on this [topic](http://www.engineyard.com/blog/2012/introducing-bloggy-a-simple-way-to-add-a-jekyll-blog-to-any-rails-application/), but I had some specific requirements that no one addressed. So my goal here is to write the post I wish existed when I started out. Here it goes.

{% endexcerpt %}

### The goal
I have an existing Sinatra site and I want to add a blog section to it.

My existing site is written in Ruby with the [Sinatra](http://www.sinatrarb.com/) web framework. I don't want Jekyll to take over my whole application, rather just a certain part of it (the [/blog](/blog) section). Thankfully, this is possible AND I can reuse my layout.haml (header, footer, styles, etc) for the blog pages. Here's how:

### Installing Jekyll

First, you gotta install some stuff. I'll assume you are using [Bundler](http://gembundler.com/) to handle your gems, because you should be.

{% highlight bash %}
# add to your Gemfile
gem 'jekyll'
gem 'rdiscount' # for markdown support
{% endhighlight %}

Next, you will need to clone some basic setup files for Jekyll to a folder within your site. Daniel McGraw has a nice little [Jekyll Base](https://github.com/danielmcgraw/Jekyll-Base) to get you started.

{% highlight bash %}
# from within your Sinatra app lib/[your-app]/ folder
git clone git@github.com:danielmcgraw/Jekyll-Base.git jekyll_blog
{% endhighlight %}

We will add these files to our primary git repo, so you can remove the .git folder that is generated when you clone Jekyll-Base. Keeping it will cause git to assume its a submodule, and your files won't be added.

{% highlight bash %}
cd jekyll_blog
rm -rf .git
{% endhighlight %}

You should also check out \_config.yml. It has all of your [Jekyll configuration](https://github.com/mojombo/jekyll/wiki/Configuration), which is worth understanding to get the most out of it. Once you get it configured, go ahead and run Jekyll for the first time to generate your static pages in to \_site for the first time.

{% highlight bash %}
Jekyll
{% endhighlight %}

Jekyll also offers a built in web server for local development, but we shouldn't need it with our Sinatra app. Once Jekyll generates our pages in _site, we can kill the process. 

__Note__ that whenever you make __any__ change to your Jekyll files, including writing new posts, you will have to run the Jekyll command to re-generate your static files.

### Set up your routes

Next, we need to wire up our routes. In my case, I want Jekyll to handle everything under /blog. 

{% highlight ruby %}
# in application.rb
get "/blog/?*" do
  jekyll_blog(request.path) {404}
end
{% endhighlight %}

Next, create a method to route our page requests correctly to Jekyll. Basically what I'm doing here is looking up the blog post file based on the URL, reading the file in to a string, and rendering that string like I would any .erb page.

{% highlight ruby %}
 
def jekyll_blog(path, &missing_file_block)
  @current_menu = "blog"
  @title = "Blog - Derek Eder"

  file_path = File.join(File.dirname(__FILE__), 'jekyll_blog/_site',  path.gsub('/blog',''))
  file_path = File.join(file_path, 'index.html') unless file_path =~ /\.[a-z]+$/i  

  if File.exist?(file_path)
    file = File.open(file_path, "rb")
    contents = file.read
    file.close

    if (file_path.include?('.xml') || file_path.include?('.css'))
      erb contents, :content_type => 'text/xml'
    else
      erb contents, :layout_engine => :haml
    end
  else
    haml :not_found
  end
end
{% endhighlight %}

We should now be ready to test this out. Go ahead an fire up your local webserver. I prefer [Unicorn](http://unicorn.bogomips.org/).

{% highlight bash %}
unicorn
# navigate to http://localhost:8080/blog
{% endhighlight %}

At this point, you should be up and running with the a basic Jekyll blog within your app. You can start writing posts now, or if you want to add more bells and whistles, read on.

### Add some fancy features
Jekyll supports [Markdown](http://daringfireball.net/projects/markdown/), which is a pretty robust and simple way to write content for the web. However, it doesn't do everything for you. I also wanted to add commenting, sharing and code syntax highlighting.

#### Commenting
[Disqus](http://disqus.com/) is my choice for this. They offer a commenting service for free, have login integration with Twitter and other 3rd party apps and have great moderation tools. To wire it up to Jekyll, create a Disqus account and add this block of code (with your Disqus site ID) to \_post.html in the _layouts folder.

{% highlight html %}
<div id="disqus_thread"></div>
<script type="text/javascript">
    /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
    var disqus_shortname = 'YOUR SITE'; // required: replace example with your forum shortname
  var disqus_identifier = '{{ page.id }}';
    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
<a href="http://disqus.com" class="dsq-brlink">blog comments powered by <span class="logo-disqus">Disqus</span></a>
{% endhighlight %}

#### Sharing
Social media! Everyone loves it. An easy way to offer sharing links for your posts is by using a service called [AddThis](http://www.addthis.com/). Like Disqus, they are free. In fact, you don't even need to create an account with them to get started. Just [grab the code](https://www.addthis.com/get/sharing) and place it in your _post.html file like we did with Disqus.

{% highlight html %}
<!-- AddThis Button BEGIN -->
<div class="addthis_toolbox addthis_default_style " addthis:title="{{ page.title }}" addthis:url="http://[YOUR SITE]/blog{{ page.url }}">
<a class="addthis_button_tweet"></a>
<a class="addthis_button_facebook_like" fb:like:layout="button_count"></a>
</div>
<script type="text/javascript" src="http://s7.addthis.com/js/300/addthis_widget.js#pubid=[YOUR ID]"></script>
<!-- AddThis Button END -->
{% endhighlight %}

#### Syntax highlighting
I like sharing code (like I'm doing in this post), and its important for readability to do syntax highlighting. Jekyll supports this via a Python library called [Pygments](http://pygments.org/). 

In our Jekyll config, enable pygments.

{% highlight ruby %}
pygments: true
{% endhighlight %}

Then we install Pygments and use it to generate our CSS.

{% highlight bash %}
sudo easy_install pygments
pygmentize -S default -f html > code_highlighting.css
{% endhighlight %}

I added this css file to my public/stylesheets/ folder and reference in my site header.

{% highlight bash %}
<link rel="stylesheet" href="/stylesheets/code_highlighting.css"/>
{% endhighlight %}

Then, regenerate Jekyll.

#### RSS, pagination and images
Scott Parker has a [great little tutorial](http://spparker.com/posts/2011-04-26-keeping-jekyll-classy) for adding additional features that don't come out of the box with Jekyll, namely RSS, pagination and convenient image handling. I definitely recommend checking it out.

### Moar code!
If you want to see all of these parts in action together, [check out the code for this site on Github](https://github.com/derekeder/derekeder.com/tree/master/lib/site_template/jekyll_blog).

Happy blogging!