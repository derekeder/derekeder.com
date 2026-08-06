# Personal website for Derek Eder 

Website for [derekeder.com](http://derekeder.com/).

I work with open data and create open source apps and tools in Chicago to improve the public good.

## Running locally

This website is built using Jekyll, a static site generator that runs on Ruby. The local development environment is managed with Docker and Docker Compose.

To get started, clone this project and build it using Docker Compose:

```
git clone https://github.com/derekeder/derekeder.com.git
cd derekeder.com
docker compose build
```

To serve the site locally, run the following command:

```
docker compose up
```

Then open your web browser and navigate to http://localhost:5001

## Dependencies

* [Jekyll](https://jekyllrb.com/) - Static site generator built in Ruby, plus the `jekyll-redirect-from` plugin for legacy URL redirects (see `Gemfile`)
* [Bootstrap 5](https://getbootstrap.com) ([Spacelab](https://bootswatch.com/spacelab/) theme via Bootswatch) - HTML and CSS layouts, vendored at `css/bootstrap.spacelab.min.css`
* [Isotope](https://isotope.metafizzy.co/) - masonry layout and filtering for the grid of talks on the talks page
* [Highcharts](https://www.highcharts.com/) - charts on the Chicago commute-modes page
* [Font Awesome](https://fontawesome.com/) - icons, loaded via a hosted kit script

The site has no jQuery or other JS framework dependency - all custom scripts are vanilla JS.

## Errors / Bugs

If something is not behaving intuitively, it is a bug, and should be reported.
Report it here: https://github.com/derekeder/derekeder.com/issues