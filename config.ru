require "bundler"
Bundler.require :default

base = File.dirname(__FILE__)
$:.unshift File.join(base, "lib")

require "site_template"

Sinatra::Base.set(:root) { base }

set :cache, Dalli::Client.new

run SiteTemplate::Application