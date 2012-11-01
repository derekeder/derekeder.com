---
layout: post
title: Hello World! Setting up a Jekyll blog in Sinatra
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

I'm going meta on my first blog post: how to set up a blog with [Jekyll](http://jekyllrb.com/) and [Sinatra](http://www.sinatrarb.com/). [A](http://spparker.com/posts/2011-04-26-keeping-jekyll-classy) [few](http://recursive-design.com/blog/2010/10/12/static-blogging-the-jekyll-way/) [people](http://mikeferrier.com/2011/04/29/blogging-with-jekyll-haml-sass-and-jammit/) have [written](http://danielmcgraw.com/2011/04/14/The-Ultimate-Guide-To-Getting-Started-With-Jekyll-Part-1/) on this [topic](http://www.engineyard.com/blog/2012/introducing-bloggy-a-simple-way-to-add-a-jekyll-blog-to-any-rails-application/), but I had some specific requirements that no one adressed. So my goal here is to write the post I wish existed when I started out. Here it goes.

{% endexcerpt %}

First of all, my existing site is written in Ruby with the [Sinatra](http://www.sinatrarb.com/) web framework. I don't want Jekyll to take over my whole application, rather just a certain part of it (the /blog section). Thankfully, this is possible AND I can reuse my layout.haml (header, footer, styles, etc) for the blog pages.

Step 1: You gotta install some stuff. I'll assume you are using [Bundler](http://gembundler.com/) to handle your gems, because you should be.

{% highlight %}
 
# add to your Gemfile
gem 'jekyll'
gem 'rdiscount'

{% endhighlight %}

Next, you will need to clone some basic setup files for Jekyll to a folder within your site. Daniel McGraw has a nice little Jekyll Base to get you started.

{% highlight %}
 
# from within your Sinatra app lib/ folder
git clone git@github.com:danielmcgraw/Jekyll-Base.git blog

{% endhighlight %}

We will add these files to our primary git repo, so you can remove the .git folder that is generated when you clone Jekyll-Base.

{% highlight %}

cd blog
rm -rf .git

{% endhighlight %}

Next, we need to wire up our routes.

{% highlight ruby %}
 
get "/blog/?*" do
  jekyll_blog(request.path) {404}
end
{% endhighlight %}

And create a method to route our page requests correctly to Jekyll. Basically, what I'm doing here is looking up the blog post based on the URL, reading the file in to a string, and rendering that string like I would any .erb page.

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

    if file_path.include? '.xml'
      erb contents, :content_type => 'text/xml'
    else
      erb contents, :layout_engine => :haml
    end
  else
    haml :not_found
  end
end
{% endhighlight %}

This is a test post writen in markdown. To learn more about markdown check out the [documentation](http://daringfireball.net/projects/markdown/) on [Daring Fireball](http://daringfireball.net/).

{% image derek.jpg %}
  title: This is just a test title.
  alt: Something descriptive
  link: http://www.google.com
{% endimage %}