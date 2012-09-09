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
    
    # catchall for static pages
    get "/:page/?" do
      begin 
        @current_menu = params[:page]
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
