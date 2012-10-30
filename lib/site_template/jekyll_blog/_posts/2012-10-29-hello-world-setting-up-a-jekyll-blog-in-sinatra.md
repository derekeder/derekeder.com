---
layout: post
title: Hello World! Setting up a Jekyll blog in Sinatra
---

{% excerpt %}

This is a test.

{% endexcerpt %}

{% highlight ruby tabsize=2 %}
 
get "/blog/?*" do
  jekyll_blog(request.path) {404}
end
{% endhighlight %}

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