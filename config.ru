require "bundler"
Bundler.require :default

base = File.dirname(__FILE__)
$:.unshift File.join(base, "lib")

require "site_template"

Sinatra::Base.set(:root) { base }

# Initialize Memcachier on Rack::Cache
use Rack::Cache,
  verbose: true,
  metastore:   Dalli::Client.new,
  entitystore: Dalli::Client.new

run SiteTemplate::Application