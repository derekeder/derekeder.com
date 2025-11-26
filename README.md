# Personal website for Derek Eder 

Website for [derekeder.com](http://derekeder.com/).

I work with open data and create open source apps and tools in Chicago to improve the public good.

## Running locally

This website is built using Jekyll, a static site generator that runs on Ruby. The Local development environment is managed with with Docker and Docker Compose.

To get started, clone this project and build it using Docker Compose:

```
git clone https://github.com/datamade/datamade.us.git
cd datamade.us
docker compose build
```

To serve the site locally, run the following command:

```
docker compose up
```

Then open your web browser and navigate to http://localhost:5001

## Dependencies

* [Jekyll](https://jekyllrb.com/) - Static site generator built in Ruby
* [Bootstrap 3](https://getbootstrap.com) - HTML and CSS layouts
* [DataTables](https://datatables.net) - for searching and sorting tables
* [jQuery Address](https://github.com/asual/jquery-address) - for deep linking URLs on the projects page

## Errors / Bugs

If something is not behaving intuitively, it is a bug, and should be reported.
Report it here: https://github.com/derekeder/derekeder.com/issues