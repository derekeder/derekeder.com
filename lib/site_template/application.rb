require "sinatra/base"
require "sinatra/reloader"
require "sinatra-initializers"
require "sinatra/r18n"

module SiteTemplate
  class Application < Sinatra::Base
    enable :logging, :sessions
    enable :dump_errors, :show_exceptions if development?

    configure :development do
      register Sinatra::Reloader
    end
    
    register Sinatra::Initializers
    register Sinatra::R18n

    before do
      session[:locale] = params[:locale] if params[:locale]
    end

    use Rack::Logger
    use Rack::Session::Cookie

    helpers SiteTemplate::HtmlHelpers

    get "/" do
      @current_menu = "home"
      @title = 'Derek Eder - Open Data Web Developer'
      haml :index
    end

    # redirects
    get "/budget*" do
      redirect "http://lookatcook.com"
    end

    get "/clearstreets*" do
      redirect "http://clearstreets.org"
    end

    get "/cps-tiers*" do
      redirect "http://cpstiers.opencityapps.org"
    end

    get "/maps/chicago-abandoned-buildings/*" do
      redirect "http://chicagobuildings.org"
    end

    get "/tif-map*" do
      redirect "/maps/chicago-tif/"
    end

    get "/maps/chicago-clinics/table/" do
      redirect "http://old.derekeder.com/maps/chicago-clinics/table/"
    end

    get "/maps/:map/" do
      redirect "/maps/#{params[:map]}/index.html"
    end

    get "/blog/?*" do
      jekyll_blog(request.path) {404}
    end

    def jekyll_blog(path, &missing_file_block)
      @current_menu = "blog"
      @title = "Blog - Derek Eder"

      file_path = File.join(File.dirname(__FILE__), 'blog/_site',  path.gsub('/blog',''))
      file_path = File.join(file_path, 'index.html') unless file_path =~ /\.[a-z]+$/i  
      puts file_path
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
    
    # catchall for static pages
    get "/:page/?" do
      begin 
        @current_menu = params[:page]
        @title = params[:page].capitalize.gsub(/[_-]/, " ") + " - Derek Eder"
        haml params[:page].to_sym
      rescue Errno::ENOENT
        haml :not_found
      end
    end
    
    error do
      'Sorry there was a nasty error - ' + env['sinatra.error'].name
    end
  end
end
